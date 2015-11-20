export default [ function() {
  return class MiddlewarePipeline {
    /**
     * @param {Array.<HttpRequestMiddleware>} middleware
     */
    constructor( middleware ) {
      this._middleware = middleware;
    }

    /**
     * @param {HttpRequest} request
     * @returns {Promise}
     */
    invokeAsync( request ) {
      var i = -1;
      var len = this._middleware.length;
      var next = {
        invokeAsync: request => {
          i += 1;
          if ( i < len ) {
            return this._middleware[ i ].invokeAsync( request, next );
          } else {
            return Promise.resolve();
          }
        }
      };
      return next.invokeAsync( request );
    }
  };
}];
