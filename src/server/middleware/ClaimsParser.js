export default [ 'HttpError', function( HttpError ) {
  return class ClaimsParser {
    /**
     * @param {TokenParser} tokenParser
     */
    constructor( tokenParser ) {
      this._tokenParser = tokenParser;
    }

    /**
     * @param {HttpRequest} request
     * @param {HttpRequestMiddleware} next
     */
    async invokeAsync( request, next ) {
      request.claims = {};
      var auth = request.headers.authorization;
      if ( auth ) {
        let token = auth.replace( /^bearer /i, ''  );
        try {
          request.claims = await this._tokenParser.parseAsync( token );
        } catch ( err ) {
          if ( err.name === 'TokenExpiredError' ) {
            throw new HttpError( 401, 'token expired' );
          }
          console.log( err );
        }
      }
      return next.invokeAsync( request );
    }
  };
}];
