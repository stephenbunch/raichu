export default [ function() {
  return function( err ) {
    return err.stack || `${ err.name }: ${ err.message }`;
  };
}];
