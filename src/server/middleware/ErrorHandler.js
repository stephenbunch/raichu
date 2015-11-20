export default [ 'Content', function( Content ) {
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
          console.log( err.stack || `${ err.name }: ${ err.message }` );
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
