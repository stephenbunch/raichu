export default [
  'HttpRoute', 'HttpChannel',
function( HttpRoute, HttpChannel ) {
  function route( method, path, params ) {
    if ( typeof params === 'function' ) {
      params = {
        handler: params
      };
    }
    params.method = method;
    params.path = path;
    return new HttpRoute( params );
  }
  return {
    route( method, path, params ) {
      return route( method, path, params );
    },

    channel( path, params ) {
      if ( typeof params === 'function' ) {
        params = {
          handler: params
        };
      }
      params.path = path;
      return new HttpChannel( params );
    },

    get( path, params ) {
      return route( 'GET', path, params );
    },

    put( path, params ) {
      return route( 'PUT', path, params );
    },

    post( path, params ) {
      return route( 'POST', path, params );
    },

    delete( path, params ) {
      return route( 'DELETE', path, params );
    },

    head( path, params ) {
      return route( 'HEAD', path, params );
    },

    options( path, params ) {
      return route( 'OPTIONS', path, params );
    },

    patch( path, params ) {
      return route( 'PATCH', path, params );
    }
  };
}];
