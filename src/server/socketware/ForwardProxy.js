export default [
  'urijs', 'WebSocket', 'common/formatError',
function( URI, WebSocket, formatError ) {
  return class ForwardProxy {
    constructor( destHost ) {
      this._destHost = destHost;
    }

    async invokeAsync( socket, next ) {
      var uri = new URI( socket.url );
      uri.host( this._destHost );
      uri = uri.toString();
      console.log( uri );

      var proxy = new WebSocket( uri );
      proxy.on( 'close', () => socket.close() );
      proxy.on( 'error', err => {
        socket.close();
        console.log( formatError( err ) );
      });
      proxy.on( 'message', message => socket.send( message ) );
      socket.onMessage += message => proxy.send( message );
      socket.onClose += () => proxy.close();

      await next.invokeAsync( socket );
    }
  };
}];
