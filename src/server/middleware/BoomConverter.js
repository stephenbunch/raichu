export default [ function() {
  return class BoomConverter {
    async invokeAsync( request, next ) {
      var result = await next.invokeAsync( request );
      if ( result && result.isBoom ) {
        let error = new Error();
        error.message = result.output.payload.message;
        error.output = {
          statusCode: result.output.statusCode,
          body: {
            errors: [{
              message: error.message
            }]
          }
        };
        throw error;
      }
      return result;
    }
  };
}];
