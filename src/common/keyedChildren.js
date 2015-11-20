export default [ 'react', function( React ) {
  return function( children ) {
    children = Array.isArray( children ) ? children : [ children ];
    return children.map( ( node, index ) => {
      if ( React.isValidElement( node ) ) {
        return React.cloneElement( node, {
          key: node.props.key || index.toString()
        });
      } else if ( node && node.isMutableReactElement ) {
        node.props.key = node.props.key || index.toString();
      }
      return node;
    });
  };
}];
