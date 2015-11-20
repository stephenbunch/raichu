export default [ 'result/StatusCode', function( StatusCode ) {
  return class HttpsRedirect {
    constructor( hostname ) {
      this._hostname = hostname;
    }

    async invokeAsync( request, next ) {
      if ( request.headers['x-forwarded-proto'] !== 'https' ) {
        return new StatusCode( 301, {
          'Location': `https://${ this._hostname }${ request.url }`
        });
      }
      return next.invokeAsync( request );
    }
  };
}];
