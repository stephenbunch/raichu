export default [ '@event', '@bind', function( event, bind ) {
  return class SocketChannel {
    /**
     * @param {socket/Socket} socket
     */
    constructor( socket ) {
      this._handlers = {};
      this._subscriptions = [];
      this._socket = socket;
      this._socket.didReceiveMessage += this._socket_didReceiveMessage;
      this._socket.didConnect += this._socket_didConnect;
    }

    @event didClose

    /**
     * @param {String} event
     * @param {*} data
     */
    send( event, data ) {
      this._socket.send(
        JSON.stringify({
          type: event,
          body: data
        })
      );
    }

    /**
     * @param {String} event
     * @param {Function} handler
     * @returns {SocketChannel}
     */
    on( event, handler ) {
      if ( !this._handlers[ event ] ) {
        this._handlers[ event ] = [];
      }
      this._handlers[ event ].push( handler );
      return this;
    }

    /**
     * @param {String} event
     * @param {Function} [handler]
     * @returns {SocketChannel}
     */
    off( event, handler ) {
      var handlers = this._handlers[ event ];
      if ( handlers ) {
        if ( handler ) {
          let index = handlers.indexOf( handler );
          if ( index > -1 ) {
            handlers.splice( index, 1 );
            if ( handlers.length === 0 ) {
              delete this._handlers[ event ];
            }
          }
        } else {
          delete this._handlers[ event ];
        }
      }
      return this;
    }

    /**
     * @param {String} event
     * @returns {SocketChannel}
     */
    subscribe( event ) {
      if ( this._subscriptions.indexOf( event ) === -1 ) {
        this._subscriptions.push( event );
        if ( this._socket.connected ) {
          this.send( 'subscribe', event );
        }
      }
      return this;
    }

    /**
     * @param {String} event
     * @returns {SocketChannel}
     */
    unsubscribe( event ) {
      var index = this._subscriptions.indexOf( event );
      if ( index > -1 ) {
        this._subscriptions.splice( index, 1 );
        if ( this._socket.connected ) {
          this.send( 'unsubscribe', event );
        }
      }
      return this;
    }

    close() {
      if ( this._socket !== null ) {
        this._subscriptions.slice().forEach( x => this.unsubscribe( x ) );
        this._socket.didReceiveMessage -= this._socket_didReceiveMessage;
        this._socket.didConnect -= this._socket_didConnect;
        this._socket = null;
        this._handlers = {};
        this._didClose.raise();
      }
    }

    dispose() {
      this.close();
    }

    /**
     * @param {String} message
     */
    @bind _socket_didReceiveMessage( message ) {
      try {
        message = JSON.parse( message );
      } catch ( err ) {
        console.error( err.stack );
        return;
      }
      var handlers = this._handlers[ message.type ];
      if ( handlers ) {
        handlers.slice().forEach( function( handler ) {
          try {
            handler( message.body );
          } catch ( err ) {
            console.error( err.stack );
          }
        });
      }
    }

    @bind _socket_didConnect() {
      var subscriptions = this._subscriptions.slice();
      this._subscriptions = [];
      subscriptions.forEach( x => this.subscribe( x ) );
    }
  };
}];
