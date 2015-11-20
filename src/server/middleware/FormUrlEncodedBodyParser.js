export default [ 'type-is', 'content-type', function( is, ContentType ) {
  return class FormUrlEncodedBodyParser {
    /**
     * @param {HttpRequest} request
     * @param {HttpRequestMiddleware} next
     * @returns {Promise}
     */
    async invokeAsync( request, next ) {
      if ( is( request, 'application/x-www-form-urlencoded' ) ) {
        let type = ContentType.parse( request.headers[ 'content-type' ] );
        let content = await request.readAsync();
        content = content.toString( type.parameters.charset );
        let fields = content.split( '&' );
        let body = {};
        for ( let field of fields ) {
          let [ key, value ] = field.split( '=' );
          key = decodeURIComponent( key );
          value = decodeURIComponent( value );
          body[ key ] = value;
        }
        request.body = body;
      }
      return next.invokeAsync( request );
    }
  };
}];
