export default [ function() {
  return function( a, b ) {
    if (
      typeof a === 'object' &&
      typeof b === 'object' &&
      a !== null &&
      b !== null &&
      typeof a.equals === 'function' &&
      typeof b.equals === 'function' &&
      a.equals( b )
    ) {
      return true;
    }
    return a === b;
  };
}];
