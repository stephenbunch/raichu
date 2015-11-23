export default [ 'result/StatusCode', function( StatusCode ) {
  return class Cors {
    async invokeAsync( request, next ) {
      if ( request.method === 'OPTIONS' ) {
        return new StatusCode( 200, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS, HEAD, PATCH',
          'Access-Control-Allow-Headers': req.headers[ 'Access-Control-Request-Headers' ]
        });
      } else {
        let result = await next.invokeAsync( request );
        if ( result && result.isResult ) {
          return {
            isResult: true,
            isFile: result.isFile,
            async writeHeadAsync( response ) {
              var state = await result.writeHeadAsync( response );
              response.setHeader( 'Access-Control-Allow-Origin', '*' );
              return state;
            },

            async writeBodyAsync( response, state ) {
              await result.writeBodyAsync( response, state );
            }
          };
        }
        return result;
      }
    }
  };
}];
