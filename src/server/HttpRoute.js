export default [ 'common/UrlPattern', function( UrlPattern ) {
  return class HttpRoute {
    constructor({ method, path, config = {}, handler }) {
      if ( typeof method !== 'string' ) {
        throw new Error( 'Expected route method to be a string.' );
      }

      if ( typeof path !== 'string' ) {
        throw new Error( 'Expected route path to be a string.' );
      }

      if ( !path.startsWith( '/' ) ) {
        throw new Error( 'Expected route path to begin with a forward slash (/).' );
      }

      if ( typeof handler !== 'function' ) {
        throw new Error( 'Expected route to have a handler function.' );
      }

      this._method = method.toUpperCase();
      this._path = path;
      this._pattern = new UrlPattern( path );
      this._config = Object.freeze( config );
      this._handler = handler;
    }

    get isRoute() {
      return true;
    }

    get method() {
      return this._method;
    }

    get path() {
      return this._path;
    }

    get pattern() {
      return this._pattern;
    }

    get config() {
      return this._config;
    }

    get handler() {
      return this._handler;
    }

    /**
     * @param {HttpRequest} request
     * @returns {Promise}
     */
    async invokeAsync( request ) {
      return this._handler.call( undefined, request );
    }
  };
}];
