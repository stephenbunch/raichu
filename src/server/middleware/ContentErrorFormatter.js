export default [ 'Content', function( Content ) {
  return class ContentErrorFormatter {
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
          throw err;
        }
      }
    }
  };
}];
