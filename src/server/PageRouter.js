export default [ 'react', function( React ) {
  return class PageRouter {
    /**
     * @param {PageRouterDelegate} delegate
     */
    constructor( delegate ) {
      this._delegate = delegate;
    }

    /**
     * @param {HttpRequest} request
     * @param {HttpRequestMiddleware} next
     */
    async invokeAsync( request, next ) {
      let claims = request.claims;
      if ( claims && Object.keys( claims ).length === 0 ) {
        claims = null;
      }
      if ( !claims ) {
        claims = await this._delegate.parseClaimsAsync( request );
      }
      let routes = await this._delegate.routesForUserAsync({
        isLoggedIn: !!claims,
        claims
      });
      for ( let route of routes ) {
        let match = route.match( request.path );
        if ( match ) {
          request.params = match;
          request.claims = claims;
          return this._delegate.createElementAsync( route, request );
        }
      }
      return next.invokeAsync( request );
    }
  }
}];
