export default [ 'type-is', 'content-type', function( is, ContentType ) {
  return class JsonBodyParser {
    /**
     * @param {HttpRequest} request
     * @param {HttpRequestMiddleware} next
     * @returns {Promise}
     */
    async invokeAsync( request, next ) {
      if ( request.hasBody && is( request, 'application/json' ) ) {
        let type = ContentType.parse( request.headers[ 'content-type' ] );
        let content = await request.readAsync();
        request.body = JSON.parse( content.toString( type.parameters.charset ) );
      }
      return next.invokeAsync( request );
    }
  };
}];
