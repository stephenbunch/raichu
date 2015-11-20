export default [
  'result/StatusCode', 'result/Json',
function( StatusCode, Json ) {
  return class ContentNegotiation {
    async invokeAsync( request, next ) {
      // TODO: Return different results based on Accept header.
      var result = await next.invokeAsync( request );
      if ( result !== undefined ) {
        if ( result === null ) {
          result = new StatusCode( 404 );
        } else if ( typeof result === 'number' ) {
          result = new StatusCode( result );
        } else if ( result.isContent ) {
          if ( result.hasBody ) {
            return new Json( result.statusCode, result.body, result.headers );
          } else {
            return new StatusCode( result.statusCode, result.headers );
          }
        } else if ( !result.isResult ) {
          result = new Json( 200, result );
        }
      }
      return result;
    }
  };
}];
