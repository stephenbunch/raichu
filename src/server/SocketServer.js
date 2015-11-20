export default [
  'setTimeout', 'clearTimeout', 'moment', 'Socket', '@bind', 'lodash.isequal',
  'urijs', 'ws', 'JsonWebTokenHandler',
function(
  setTimeout, clearTimeout, moment, Socket, bind, isEqual, URI, ws,
  JsonWebTokenHandler
) {
  return class SocketServer {
    /**
     * @param {Object} params
     * @param {http.Server} params.server
     * @param {String} params.secret
     */
    constructor({ server, secret }) {
      this._middleware = [];
      this._server = new ws.Server({ server });
      this._server.on( 'connection', this._server_onConnection );
      this._tokenHandler = new JsonWebTokenHandler( secret );
    }

    use( middleware ) {
      this._middleware.push( middleware );
    }

    dispose() {
      this._server.off( 'connection', this._server_onConnection );
      this._server = null;
    }

    @bind
    async _server_onConnection( ws ) {
      try {
        var query = URI.parseQuery( new URI( ws.upgradeReq.url ).query() );
        var socket = new Socket( ws );
        socket.claims = this._parseClaims( socket, query.token );
        if ( !socket.claims ) {
          return;
        }

        var _send = ws.send;
        ws.send = ( ...args ) => {
          try {
            return _send.apply( ws, args );
          } catch ( err ) {
            console.log( err.stack || `${ err.name }: ${ err.message }` );
          }
        };

        ws.on( 'close', () => {
          socket.detach();
        });

        await this._attachAsync( socket );
      } catch ( err ) {
        console.log( err.stack || `${ err.name }: ${ err.message }` );
      }
    }

    /**
     * Compares two sets of claims for equality, ignoring the expiration date.
     * @returns {Boolean}
     */
    _areClaimsEqual( claims1, claims2 ) {
      var before = JSON.parse( JSON.stringify( claims1 ) );
      var after = JSON.parse( JSON.stringify( claims2 ) );
      if ( before ) {
        delete before.exp;
      }
      if ( after ) {
        delete after.exp;
      }
      return isEqual( before, after );
    }

    /**
     * Receives an incoming socket.
     * @param {Socket} socket
     */
    async _attachAsync( socket ) {
      var accepted = false;
      var expireTimeout;

      for ( let middleware of this._middleware ) {
        await middleware.invokeAsync( socket.claims, () => {
          accepted = true;
          return socket.channel();
        });
      }

      if ( !accepted ) {
        socket.close();
        return;
      }

      socket.channel().on( 'token', async token => {
        try {
          clearTimeout( expireTimeout );
          var claims = socket.claims;
          socket.claims = this._parseClaims( socket, token );
          if ( socket.claims === false ) {
            return;
          }
          if ( !this._areClaimsEqual( socket.claims, claims ) ) {
            socket.detach();
            await this._attachAsync( socket );
          } else {
            expireTimeout = this._setAuthTimeout( socket );
          }
        } catch ( err ) {
          console.log( err.stack || `${ err.name }: ${ err.message }` );
        }
      });

      expireTimeout = this._setAuthTimeout( socket );
    }

    /**
     * Sets a timeout that closes the socket when the access token expires.
     * @param {Socket} socket
     * @returns {Number}
     */
    _setAuthTimeout( socket ) {
      if ( socket.claims && socket.claims.exp ) {
        return setTimeout( () => {
          socket.close();
        }, ( socket.claims.exp - moment().unix() ) * 1000 );
      }
    }

    _parseClaims( socket, token ) {
      var claims = null;
      if ( token ) {
        try {
          claims = this._tokenHandler.decodeAndVerify( token );
        } catch ( err ) {
          if ( err.name === 'TokenExpiredError' ) {
            socket.close( 4401, 'token expired' );
            console.log( 'Socket connection failed because token was expired: ' + token );
          }
        }
      }
      return claims;
    }
  };
}];
