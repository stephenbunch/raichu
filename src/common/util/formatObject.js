export default [ 'immutable', function( Immutable ) {
  return function formatObject( value ) {
    if ( value ) {
      if ( Immutable.List.isList( value ) ) {
        value = value.map( x => formatObject( x ) ).toArray();
      } else if ( typeof value.toObject === 'function' ) {
        value = value.toObject();
      }
    }
    return value;
  }
}];
