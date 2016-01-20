export default [ 'HttpError', 'common/log', function( HttpError, log ) {
  return class JsonResponseTransform {
    async transformResponseAsync( response ) {
      var contentType = response.headers.get( 'Content-Type' ) || '';
      if ( contentType.indexOf( 'application/json' ) > -1 ) {
        var text = await response.text();
        var body;
        try {
          body = JSON.parse( text );
        } catch ( err ) {
          log( text );
          throw err;
        }
        if ( response.ok ) {
          return body;
        } else {
          throw new HttpError({
            status: response.status,
            message:
              body.errors &&
              body.errors[0] &&
              body.errors[0].message ||
              response.statusText,
            errors: body.errors || body.error && [ body.error ] || []
          });
        }
      } else {
        if ( response.ok ) {
          return response;
        } else {
          throw new HttpError({
            status: response.status,
            message: response.statusText
          });
        }
      }
    }
  };
}];
