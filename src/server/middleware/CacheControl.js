export default [ function() {
  return class CacheControl {
    async invokeAsync( request, next ) {
      var result = await next.invokeAsync( request );
      if ( result && result.isResult && result.isFile ) {
        return {
          isResult: true,
          isFile: true,

          async writeHeadAsync( response ) {
            var state = await result.writeHeadAsync( response );
            response.setHeader( 'Cache-Control', 'public, max-age=30672000' );
            response.setHeader( 'Vary', 'Accept-Encoding' );
            response.setHeader( 'Expires', new Date( +new Date() + 30672000000 ).toUTCString() );
            if (
              request.headers[ 'if-modified-since' ] &&
              new Date( response.getHeader( 'Last-Modified' ) ) <= new Date( request.headers[ 'if-modified-since' ] ) ||
              request.headers[ 'if-none-match' ] &&
              response.getHeader( 'ETag' ) === request.headers[ 'if-none-match' ]
            ) {
              response.statusCode = 304;
            }
            return state;
          },

          async writeBodyAsync( response, state ) {
            if ( response.statusCode === 304 ) {
              await response.endAsync();
            } else {
              await result.writeBodyAsync( response, state );
            }
          }
        }
      }
      return result;
    }
  };
}];
