export default [ 'celebi', 'result/StatusCode', function( Celebi, StatusCode ) {
  return class Authorization {
    invokeAsync( request, next ) {
      if ( request.config && request.config.auth ) {
        if ( !request.claims ) {
          return new StatusCode( 403 );
        }
        let result = Celebi.shape( request.config.auth ).unknown().validate( request.claims );
        if ( result.error ) {
          return new StatusCode( 403 );
        } else {
          request.claims = result.value;
        }
      }
      return next.invokeAsync( request );
    }
  };
}];
