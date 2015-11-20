export default [ function() {
  return class Html {
    /**
     * @param {Number} statusCode
     * @param {String} content
     * @param {Object} [headers={}]
     */
    constructor( statusCode, content, headers = {} ) {
      this._statusCode = statusCode;
      this._content = content;
      this._headers = headers;
    }

    get isResult() {
      return true;
    }

    /**
     * @param {HttpResponse} response
     * @returns {Promise}
     */
    async writeHeadAsync( response ) {
      response.statusCode = this._statusCode;
      response.setHeader( 'Content-Type', 'text/html; charset=utf-8' );
      response.setHeader( 'Content-Length', Buffer.byteLength( this._content ) );
      response.setHeader( 'Cache-Control', 'no-cache' );
      for ( let name in this._headers ) {
        resopnse.setHeader( name, this._headers[ name ] );
      }
    }

    async writeBodyAsync( response ) {
      response.write( this._content );
      return response.endAsync();
    }
  };
}];
