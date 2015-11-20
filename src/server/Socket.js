export default [ 'SocketChannel', function( SocketChannel ) {
  return class Socket {
    constructor( ws ) {
      this._ws = ws;
      this._channels = [];
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

    detach() {
      this._channels.slice().forEach( x => x.close() );
    }

    close( ...args ) {
      this.detach();
      this._ws.close.apply( this._ws, args );
    }
  };
}];
