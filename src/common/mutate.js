export default [
  'react', 'MutableReactElement',
function( React, MutableReactElement ) {
  return function( children ) {
    return new MutableReactElement(
      React.createElement( 'div', {
        children
      })
    );
  };
}];
