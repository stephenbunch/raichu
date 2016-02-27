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
      if ( auth && /^Bearer /.test( auth ) ) {
        let token = auth.replace( /^Bearer /, '' );
        try {
          request.claims = await this._tokenParser.parseAsync( token );
        } catch ( err ) {
          if ( err.name === 'TokenExpiredError' ) {
            throw new HttpError( 401, 'token expired' );
          }
          console.log( `Error parsing claims "${ token }": ${ err.message }` );
        }
      }
      return next.invokeAsync( request );
    }
  };
}];
