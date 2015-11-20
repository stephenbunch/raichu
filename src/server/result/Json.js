export default [ function() {
  return class Json {
    /**
     * @param {Number} statusCode
     * @param {*} value
     * @param {Object} [headers={}]
     */
    constructor( statusCode, value, headers = {} ) {
      this._statusCode = statusCode;
      this._value = value;
      this._headers = headers;
    }

    get isResult() {
      return true;
    }

    async writeHeadAsync( response ) {
      var content = JSON.stringify( this._value );
      response.statusCode = this._statusCode;
      response.setHeader( 'Content-Type', 'application/json; charset=utf-8' );
      response.setHeader( 'Content-Length', Buffer.byteLength( content ) );
      response.setHeader( 'Cache-Control', 'no-cache' );
      for ( let name in this._headers ) {
        response.setHeader( name, this._headers[ name ] );
      }
      return content;
    }

    /**
     * @param {HttpResponse} response
     * @returns {Promise}
     */
    async writeBodyAsync( response, content ) {
      response.write( content );
      return response.endAsync();
    }
  };
}];
