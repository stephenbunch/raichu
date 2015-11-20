export default [ 'result/File', 'fs', function( File, fs ) {
  return class FileServer {
    /**
     * @param {String} baseUrl
     * @param {String} directory
     */
    constructor( baseUrl, directory ) {
      this._baseUrl = baseUrl;
      this._directory = directory;
    }

    /**
     * @param {HttpRequest} request
     * @param {HttpRequestMiddleware} next
     */
    async invokeAsync( request, next ) {
      if ( request.path.startsWith( this._baseUrl ) ) {
        let path =
          this._baseUrl === '/' ?
          this._directory + request.path :
          this._directory + request.path.substr( this._baseUrl.length );
        let hasAccess = await new Promise( resolve => {
          fs.access( path, fs.R_OK, err => {
            resolve( !err );
          });
        });
        if ( hasAccess ) {
          return new File( path );
        }
      }
      return next.invokeAsync( request );
    }
  };
}];
