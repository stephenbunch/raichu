export default [ function() {
  return function( key ) {
    if ( !process.env[ key ] ) {
      throw new Error( `Environment variable ${ key } is missing.` );
    }
    return process.env[ key ];
  };
}];
