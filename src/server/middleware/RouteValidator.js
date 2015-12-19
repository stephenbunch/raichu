export default [ 'celebi', function( Celebi ) {
  return class RequestValidator {
    invokeAsync( request, next ) {
      if ( request.config && request.config.validate ) {
        let errors = [];
        let validate = request.config.validate;
        for ( let prop in validate ) {
          if ( validate[ prop ] ) {
            let schema = Celebi.parse( validate[ prop ] );
            let result = schema.validate( request[ prop ] );
            if ( result.error ) {
              if ( Array.isArray( result.error.details ) ) {
                errors = errors.concat( result.error.details );
              } else {
                errors = [ ...errors, { message: result.error.message } ];
              }
            } else {
              request[ prop ] = result.value;
            }
          }
        }
        if ( errors.length > 0 ) {
          let error = new Error();
          error.message = errors[0].message;
          error.output = {
            statusCode: 400,
            body: {
              errors
            }
          };
          throw error;
        }
      }
      return next.invokeAsync( request );
    }
  };
}];
