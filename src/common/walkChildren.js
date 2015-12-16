export default [ 'react', 'immutable', function( React, Immutable ) {
  return function( children, callback ) {
    children = flatten( children );
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
        search = flatten( element.props.children ).reverse().concat( search );
      }
    }
  };

  function makeArray( children ) {
    if ( Immutable.List.isList( children ) ) {
      return children.toArray();
    } else if ( Array.isArray( children ) ) {
      return children.slice();
    } else {
      return [ children ];
    }
  }

  function flatten( children ) {
    return makeArray( children ).reduce( ( list, child ) => {
      if ( Immutable.List.isList( child ) || Array.isArray( child ) ) {
        return list.concat( flatten( child ) );
      } else {
        return list.concat([ child ]);
      }
    }, [] );
  }
}];
