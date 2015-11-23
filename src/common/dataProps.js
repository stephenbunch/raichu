export default [ function() {
  return function( props ) {
    var ret = {};
    for ( let key in props ) {
      if ( key.startsWith( 'data-' ) ) {
        ret[ key ] = props[ key ];
      }
    }
    return ret;
  };
}];
