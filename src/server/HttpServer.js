export default [
  'http', 'MiddlewarePipeline', 'HttpRequest', 'HttpResponse',
  'result/StatusCode', 'common/formatError',
function(
  http, MiddlewarePipeline, HttpRequest, HttpResponse, StatusCode, formatError
) {
  return class HttpServer {
    constructor() {
      this._listener = new http.Server();
      this._listener.on( 'request', ::this._listener_onRequest );
      this._middleware = [];
    }

    /**
     * @returns {http.Server}
     */
    get listener() {
      return this._listener;
    }

    /**
     * @param {HttpRequestMiddleware} middleware
     */
    use( middleware ) {
      this._middleware.push( middleware );
    }

    /**
     * @param {Number} port
     * @returns {Promise}
     */
    listenAsync( port ) {
      return new Promise( ( resolve, reject ) => {
        this._listener.listen( port, err => {
          if ( err ) {
            reject( err );
          } else {
            resolve();
          }
        });
      });
    }

    /**
     * @param {http.IncomingMessage} request
     * @param {http.ServerResponse} response
     */
    async _listener_onRequest( request, response ) {
      response = new HttpResponse( response );
      try {
        let pipeline = new MiddlewarePipeline(
          this._middleware.slice()
        );
        let result;
        try {
          result = await pipeline.invokeAsync( new HttpRequest( request ) );
          if ( result === undefined ) {
            result = new StatusCode( 404 );
          } else if ( !result || !result.isResult ) {
            throw new Error( 'Expected result to be an HttpResult.' );
          }
        } catch ( err ) {
          console.log( formatError( err ) );
          result = new StatusCode( 500 );
        }
        await result.writeBodyAsync(
          response,
          await result.writeHeadAsync( response )
        );
      } catch ( err ) {
        console.log( formatError( err ) );
        response.statusCode = 500;
        await response.endAsync();
      }
    }
  };
}];
