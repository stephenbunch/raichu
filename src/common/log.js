export default [ function() {
  return function () {
    if ( typeof console !== 'undefined' ) {
      console.log.apply( console, arguments );
    }
  };
}];
