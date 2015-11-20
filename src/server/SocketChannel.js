export default [
  'events', '@bind', '@event',
function( { EventEmitter }, bind, event ) {
  return class SocketChannel {
    constructor( ws ) {
      this._ws = ws;
      this._ws.on( 'message', this._ws_onMessage );
      this._events = new EventEmitter();
    }

    @event didClose

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
      if ( this._ws ) {
        this._ws.send(
          JSON.stringify({
            type: event,
            body: data
          })
        );
      }
    }

    close() {
      this._ws.removeListener( 'message', this._ws_onMessage );
      this._ws = null;
      this._didClose.raise();
    }

    @bind
    _ws_onMessage( message ) {
      try {
        message = JSON.parse( message );
        this._events.emit( message.type, message.body );
      } catch ( err ) {
        console.log( err.stack || `${ err.name }: ${ err.message }` );
      }
    }
  };
}];
