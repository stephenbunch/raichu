export default [ 'Content', 'common/formatError', function( Content, formatError ) {
  return class ErrorHandler {
    async invokeAsync( request, next ) {
      try {
        return await next.invokeAsync( request );
      } catch ( err ) {
        if ( err.output ) {
          return new Content(
            err.output.statusCode,
            err.output.body,
            err.output.headers
          );
        } else {
          console.log( formatError( err ) );
          return new Content( 500, {
            errors: [{
              message: err.message
            }]
          });
        }
      }
    }
  };
}];
