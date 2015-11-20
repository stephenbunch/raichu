export default [ 'react', 'immutable', function( React, Immutable ) {
  function makeArray( children ) {
    if ( Immutable.List.isList( children ) ) {
      return children.toArray();
    } else if ( Array.isArray( children ) ) {
      return children.slice();
    } else {
      return [ children ];
    }
  }
  return function( children, callback ) {
    children = makeArray( children );
    var search = children.reverse();
    while ( search.length > 0 ) {
      let element = search.pop();
      if (
        React.isValidElement( element ) ||
        element && element.isMutableReactElement
      ) {
        if ( callback( element ) === false ) {
          break;
        }
        search = makeArray( element.props.children ).reverse().concat( search );
      }
    }
  };
}];
