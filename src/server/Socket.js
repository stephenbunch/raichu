export default [
  'SocketChannel', '@event', 'common/formatError',
function( SocketChannel, event, formatError ) {
  return class Socket {
    constructor( ws ) {
      this._ws = ws;
      this._ws.on( 'close', ::this._ws_onClose );
      this._ws.on( 'message', msg => this._onMessage.raise( msg ) );
      this._channels = [];
    }

    @event onClose
    @event onMessage

    get url() {
      return this._ws.upgradeReq.url;
    }

    channel() {
      var channel = new SocketChannel( this );
      this._channels.push( channel );
      channel.onClose.addListenerOnce( () => {
        var index = this._channels.indexOf( channel );
        if ( index > -1 ) {
          this._channels.splice( index, 1 );
        }
      });
      return channel;
    }

    close( ...args ) {
      this._ws.close.apply( this._ws, args );
    }

    send( message ) {
      if ( typeof message !== 'string' ) {
        throw new Error( 'Socket message must be a string.' );
      }
      try {
        this._ws.send( message );
      } catch ( err ) {
        console.log( formatError( err ) );
      }
    }

    reset() {
      this._channels.slice().forEach( x => x.close() );
    }

    _ws_onClose() {
      this.reset();
      this._onClose.raise();
    }
  };
}];
