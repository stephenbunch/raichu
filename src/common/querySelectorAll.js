export default [
  'walkChildren', 'immutable',
function( walkChildren, Immutable ) {
  return function( children, selector ) {
    var result = [];
    walkChildren( children, element => {
      if ( selector( element ) ) {
        result.push( element );
      }
    });
    return new Immutable.List( result );
  };
}];
