export default [
  'SocketChannel', '@event', '@bind', 'moment', 'WebSocket', 'urijs',
  'lodash.assign', 'common/log', 'common/formatError',
function(
  SocketChannel, event, bind, moment, WebSocket, URI, assign, log, formatError
) {

  return class Socket {
    /**
     * @param {String} url
     * @param {http/AuthorizationService} auth
     */
    constructor({ url, auth }) {
      this._url = url;
      this._queue = [];
      this._ws = null;
      this._waiting = false;
      this._channels = [];
      this._retries = 0;
      this._token = null;
      this._auth = auth;
      this._auth.didUpdate += this._auth_didUpdate;

      this.connected = false;
    }

    @event didConnect
    @event didDisconnect
    @event didReceiveMessage

    get url() {
      return this._url;
    }

    /**
     * @param {String} message
     */
    send( message ) {
      this._enqueue( 'send', message );
    }

    dispose() {
      this.close();
    }

    close() {
      this._auth.didUpdate -= this._auth_didUpdate;
      this._channels.forEach( x => x.close() );
    }

    channel() {
      var channel = new SocketChannel( this );
      this._channels.push( channel );

      channel.onClose.addListenerOnce( () => {
        var index = this._channels.indexOf( channel );
        if ( index > -1 ) {
          this._channels.splice( index, 1 );
          if ( this._channels.length === 0 && this.connected ) {
            this._enqueue( 'close' );
          }
        }
      });

      this._enqueue( 'open' );
      return channel;
    }

    /**
     * @param {String} command
     * @param {String} data
     */
    _enqueue( command, data ) {
      this._queue.push({
        command: command,
        data: data
      });
      this._resume();
    }

    _resume() {
      while ( this._queue.length > 0 ) {
        if ( this._waiting ) {
          break;
        }
        var task = this._queue.shift();
        switch ( task.command ) {
          case 'open':
            if ( this._ws === null ) {
              this._waiting = true;
              this._auth.tokenAsync().then( token => {
                this._waiting = false;
                this._connect( token );
              }, function( error ) {
                log( error.stack );
                this._retry();
              });
            }
            break;

          case 'send':
            if ( this._ws === null ) {
              this._queue.unshift( task );
              this._queue.unshift({ command: 'open' });
            } else {
              try {
                this._ws.send( task.data );
              } catch ( err ) {
                log( formatError( err ) );
                this._queue.unshift( task );
                this._queue.unshift({ command: 'open' });
              }
            }
            break;

          case 'close':
            if ( this._ws !== null ) {
              this._closing = true;
              this._waiting = true;
              this._ws.close();
            }
            break;
        }
      }
    }

    /**
     * @param {http/AccessToken} token
     */
    _connect( token ) {
      if ( this._ws !== null ) {
        return;
      }
      this._token = token;
      var uri = new URI( this._url );
      uri.query(
        assign( URI.parseQuery( uri.query() ), {
          token: token.value
        })
      );
      this._ws = new WebSocket( uri.toString() );
      this._ws.onclose = this._ws_onClose.bind( this );
      this._ws.onmessage = this._ws_onMessage.bind( this );
      this._ws.onopen = this._ws_onOpen.bind( this );
      this._waiting = true;
    }

    _ws_onOpen() {
      this._ws.onopen = null;
      this._waiting = false;
      this.connected = true;
      this._retries = 0;
      this._didConnect.raise();
      this._resume();
    }

    _ws_onMessage( e ) {
      this._didReceiveMessage.raise( e.data );
    }

    _ws_onClose( e ) {
      this._ws = null;
      this._waiting = false;
      if ( this.connected ) {
        this.connected = false;
        this._didDisconnect.raise();
      }
      if ( this._closing ) {
        this._closing = false;
        this._resume();
      } else {
        this._waiting = true;
        this._retry();
      }
    }

    _retry() {
      var delay = Math.pow( 2, this._retries ) * 100;
      if ( delay > 5000 ) {
        delay = 5000;
      }
      setTimeout( () => {
        this._auth.tokenAsync().then(
          token => this._connect( token ),
          err => {
            log( formatError( err ) );
            this._retry();
          }
        );
      }, delay );
      this._retries += 1;
    }

    @bind
    _auth_didUpdate( accessToken ) {
      if ( !this._waiting && this._token !== accessToken && this.connected ) {
        this._token = accessToken;
        this.send( JSON.stringify({ type: 'token', body: accessToken.value }) );
      }
    }
  };
}];
