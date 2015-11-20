export default [
  'react', 'cookie', 'common/formatError',
function( React, $cookie, formatError ) {
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
      let cookie = $cookie.parse( request.headers.cookie || '' );
      let claims = request.claims;
      if ( claims && Object.keys( claims ).length === 0 ) {
        claims = null;
      }
      if ( !claims ) {
        try {
          if ( cookie.access_token ) {
            claims = this._delegate.decodeToken( cookie.access_token );
          }
        } catch ( err ) {
          console.log( formatError( err ) );
        }
      }
      if (
        claims &&
        (
          !claims.user_id ||
          !claims.profile_type ||
          !claims.time_zone
        )
      ) {
        claims = null;
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
