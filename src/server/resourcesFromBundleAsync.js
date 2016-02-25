export default [ function() {
  /**
   * @param {dialga.Bundle} bundle
   * @param {String} [namespace=""]
   * @returns {Promise}
   */
  return async function( bundle, namespace = '' ) {
    var modules = bundle.listModules();
    var resources = {};
    for ( let name of modules ) {
      if ( !namespace || name.startsWith( namespace ) ) {
        let resource = await bundle.resolveAsync( name );
        if ( resource ) {
          let path = name.substr( namespace.length ).replace( /_/g, '/' ).replace( /#/g, ':' );
          if ( !path.startsWith( '/' ) ) {
            path = '/' + path;
          }
          if ( path.endsWith( '/index' ) ) {
            path = path.replace( /\/index$/, '' );
          }
          resources[ path || '/' ] = resource;
        }
      }
    }
    return resources;
  };
}];
