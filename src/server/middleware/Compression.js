export default [
  'accepts', 'zlib', 'compressible',
function( accepts, zlib, compressible ) {
  return class Compression {
    async invokeAsync( request, next ) {
      var result = await next.invokeAsync( request );
      if ( result && result.isResult ) {
        let accept = accepts( request );
        if ( accept.encoding([ 'gzip' ] ) ) {
          return {
            isResult: true,
            isFile: result.isFile,

            async writeHeadAsync( response ) {
              var state = await result.writeHeadAsync( response );
              var length = Number( response.getHeader( 'Content-Length' ) );
              if (
                isNaN( length ) ||
                length >= 1024 && compressible( response.getHeader( 'Content-Type' ) )
              ) {
                response.setHeader( 'Content-Encoding', 'gzip' );
                response.setHeader( 'Transfer-Encoding', 'chunked' );
                response.removeHeader( 'Content-Length' );
                return { compress: true, state };
              } else {
                return { compress: false, state };
              }
            },

            async writeBodyAsync( response, state ) {
              if ( state.compress ) {
                let gzipStream = zlib.createGzip();
                gzipStream.pipe( response.stream );
                response.stream = gzipStream;
              }
              await result.writeBodyAsync( response, state.state );
            }
          };
        }
      }
      return result;
    }
  };
}];
