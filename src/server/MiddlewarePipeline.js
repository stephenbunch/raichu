export default [ function() {
  return class MiddlewarePipeline {
    /**
     * @param {Array.<Middleware>} middleware
     */
    constructor( middleware ) {
      this._middleware = middleware;
    }

    /**
     * @param {Object} data
     * @returns {Promise}
     */
    invokeAsync( data ) {
      var i = -1;
      var len = this._middleware.length;
      var next = {
        invokeAsync: data => {
          i += 1;
          if ( i < len ) {
            return this._middleware[ i ].invokeAsync( data, next );
          } else {
            return Promise.resolve();
          }
        }
      };
      return next.invokeAsync( data );
    }
  };
}];
