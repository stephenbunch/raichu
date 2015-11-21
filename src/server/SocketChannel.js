export default [
  'events', '@bind', '@event', 'common/formatError',
function( { EventEmitter }, bind, event, formatError ) {
  return class SocketChannel {
    constructor( socket ) {
      this._socket = socket;
      this._socket.onMessage += this._socket_onMessage;
      this._events = new EventEmitter();
    }

    @event onClose

    on( ...args ) {
      this._events.on.apply( this._events, args );
      return this;
    }

    off( event, handler ) {
      if ( handler ) {
        this._events.removeListener( event, handler );
      } else {
        this._events.removeAllListeners( event );
      }
      return this;
    }

    send( event, data ) {
      if ( this._socket ) {
        this._socket.send(
          JSON.stringify({
            type: event,
            body: data
          })
        );
      }
    }

    close() {
      this._socket.onMessage -= this._socket_onMessage;
      this._socket = null;
      this._onClose.raise();
    }

    @bind
    _socket_onMessage( message ) {
      try {
        message = JSON.parse( message );
        this._events.emit( message.type, message.body );
      } catch ( err ) {
        console.log( formatError( err ) );
      }
    }
  };
}];
