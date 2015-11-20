export default [ 'SocketChannel', '@event', function( SocketChannel, event ) {
  return class Socket {
    constructor( ws ) {
      this._ws = ws;
      this._ws.on( 'close', ::this._ws_onClose );
      this._channels = [];
    }

    @event didClose

    get url() {
      return this._ws.upgradeReq.url;
    }

    channel() {
      var channel = new SocketChannel( this._ws );
      this._channels.push( channel );
      channel.didClose.addListenerOnce( () => {
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

    reset() {
      this._channels.slice().forEach( x => x.close() );
    }

    _ws_onClose() {
      this.reset();
      this._didClose.raise();
    }
  };
}];
