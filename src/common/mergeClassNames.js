export default [ function() {
  return function( ...classNames ) {
    var added = {};
    var result = '';
    classNames = classNames.join( ' ' ).split( ' ' );
    for ( let className of classNames ) {
      if ( className ) {
        if ( !added[ className ] ) {
          added[ className ] = true;
          result = result + ' ' + className;
        }
      }
    }
    return result.substr( 1 );
  };
}];
