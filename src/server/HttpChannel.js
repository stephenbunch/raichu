export default [ 'common/UrlPattern', function( UrlPattern ) {
  return class HttpChannel {
    constructor({ path, config = {}, handler }) {
      if ( typeof path !== 'string' ) {
        throw new Error( 'Expected channel path to be a string.' );
      }

      if ( !path.startsWith( '/' ) ) {
        throw new Error( 'Expected channel path to begin with a forward slash (/).' );
      }

      if ( typeof handler !== 'function' ) {
        throw new Error( 'Expected channel to have a handler function.' );
      }

      this._path = path;
      this._pattern = new UrlPattern( path );
      this._config = Object.freeze( config );
      this._handler = handler;
    }

    get isChannel() {
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
     * @param {SocketConnection} connection
     * @returns {Promise}
     */
    async invokeAsync( connection ) {
      return this._handler.call( undefined, connection );
    }
  };
}];
