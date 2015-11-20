export default [
  'urijs', 'raw-body', 'type-is',
function( URI, getRawBody, is ) {
  return class HttpRequest {
    /**
     * @param {http.IncomingMessage} request
     */
    constructor( request ) {
      this.hasBody = is.hasBody( request );
      this.headers = request.headers;
      this.method = request.method;
      this.raw = request;
      this.statusCode = request.statusCode;
      this.stream = request;
      this.url = request.url;

      var uri = new URI( request.url );
      this.path = uri.path();
      this.query = URI.parseQuery( uri.query() );
    }

    /**
     * @returns {Promise.<Buffer>}
     */
    readAsync() {
      if ( !this._buffer ) {
        if ( this.hasBody ) {
          this._buffer = getRawBody( this.stream );
        } else {
          this._buffer = Promise.resolve();
        }
      }
      return this._buffer;
    }
  };
}];
