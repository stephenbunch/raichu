export default [
  'JsonWebTokenHandler', 'HttpError',
function( JsonWebTokenHandler, HttpError ) {
  return class ClaimsParser {
    /**
     * @param {String} secret
     */
    constructor( secret ) {
      this._tokenHandler = new JsonWebTokenHandler( secret );
    }

    /**
     * @param {HttpRequest} request
     * @param {HttpRequestMiddleware} next
     */
    invokeAsync( request, next ) {
      request.claims = {};
      var auth = request.headers.authorization || request.query.token;
      if ( auth ) {
        let token = auth.replace( /^bearer /i, ''  );
        try {
          request.claims = this._tokenHandler.decodeAndVerify( token );
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
