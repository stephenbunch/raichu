export default [ function() {
  return class Text {
    constructor( statusCode, value, headers = {} ) {
      this._statusCode = statusCode;
      this._value = value;
      this._headers = headers;
    }

    get isResult() {
      return true;
    }

    async writeHeadAsync( response ) {
      response.statusCode = this._statusCode;
      response.setHeader( 'Content-Type', 'text/plain' );
      response.setHeader( 'Content-Length', Buffer.byteLength( this._value ) );
      response.setHeader( 'Cache-Control', 'no-cache' );
      for ( let name in this._headers ) {
        response.setHeader( name, this._headers[ name ] );
      }
    }

    /**
     * @param {HttpResponse} response
     * @returns {Promise}
     */
    async writeBodyAsync( response ) {
      response.write( this._value );
      return response.endAsync();
    }
  }
}];
