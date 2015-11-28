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
        claims = this._delegate.parseClaims( request );
      }
      let routes = this._delegate.routesForUser({
        isLoggedIn: !!claims,
        claims
      });
      for ( let route of routes ) {
        let match = route.match( request.path );
        if ( match ) {
          request.params = match;
          request.claims = claims;
          return React.createElement(
            await this._delegate.resolveComponentAsync( route.meta.component )
          );
        }
      }
      return next.invokeAsync( request );
    }
  }
}];
