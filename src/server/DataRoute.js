export default [ 'common/UrlPattern', function( UrlPattern ) {
  return class DataRoute {
    constructor( url, handler ) {
      this._pattern = new UrlPattern( url );
      this._handler = handler;
    }

    match( url ) {
      return this._pattern.match( url );
    }

    async invokeAsync( request ) {
      return this._handler( request );
    }
  }
}];
