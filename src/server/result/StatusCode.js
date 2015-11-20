export default [ function() {
  return class StatusCode {
    /**
     * @param {Number} status
     * @param {Object} [headers={}]
     */
    constructor( statusCode, headers = {} ) {
      this._statusCode = statusCode;
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
      return response.endAsync();
    }
  };
}];
