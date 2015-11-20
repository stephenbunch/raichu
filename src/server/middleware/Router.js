export default [
  'result/StatusCode', 'HttpRequestPipeline', 'path', 'HttpRoute',
function( StatusCode, HttpRequestPipeline, path, HttpRoute ) {
  return class Router {
    constructor() {
      this._routes = [];
      this._middleware = [];
    }

    use( middleware ) {
      this._middleware.push( middleware );
    }

    route( route, ns ) {
      if ( ns ) {
        route = new HttpRoute({
          path: path.join( ns, route.path ),
          method: route.method,
          config: route.config,
          handler: route.handler
        });
      }
      this._routes.push( route );
    }

    /**
     * @param {HttpRequest} request
     * @param {HttpRequestMiddleware} next
     * @returns {Promise}
     */
    async invokeAsync( request, next ) {
      var routes = this._routes.slice();
      for ( let route of routes ) {
        if ( route.method === request.method ) {
          let match = route.pattern.match( request.url );
          if ( match ) {
            request.params = match;
            request.config = route.config;
            let pipeline = new HttpRequestPipeline(
              this._middleware.concat([ route ])
            );
            let result = await pipeline.invokeAsync( request );
            if ( result === undefined ) {
              return new StatusCode( 204 );
            } else {
              return result;
            }
          }
        }
      }
      return next.invokeAsync( request );
    }
  };
}];
