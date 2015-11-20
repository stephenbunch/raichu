export default [ 'util/walkChildren', function( walkChildren ) {
  return function( children, selector ) {
    var result;
    walkChildren( children, element => {
      if ( selector( element ) ) {
        result = element;
        return false;
      }
    });
    return result;
  };
}];
