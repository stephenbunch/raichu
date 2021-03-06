export default [
  'Socket', '@bind', 'WebSocketServer', 'common/formatError',
  'MiddlewarePipeline',
function( Socket, bind, WebSocketServer, formatError, MiddlewarePipeline ) {
  return class SocketServer {
    /**
     * @param {http.Server} server
     */
    constructor( server ) {
      this._server = new WebSocketServer({ server });
      this._server.on( 'connection', this._server_onConnection );
      this._middleware = [];
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
        var socket = new Socket( ws );
        var pipeline = new MiddlewarePipeline( this._middleware );
        await pipeline.invokeAsync( socket );
      } catch ( err ) {
        console.log( formatError( err ) );
      }
    }
  };
}];
