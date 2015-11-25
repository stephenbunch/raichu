export default [ 'react', 'celebi', function( React, Celebi ) {
  return function( schema ) {
    var spec = transformShape( normalizeSchema( schema ) );
    for ( let key in spec ) {
      if ( typeof spec[ key ] === 'object' ) {
        spec[ key ] = Celebi.transformObject( spec[ key ], React.PropTypes.shape );
      }
    }
    return spec;
  };

  function normalizeSchema( schema ) {
    if ( Celebi.isSchema( schema ) ) {
      if ( schema.attributes.type !== 'shape' ) {
        throw new Error( 'Schema must be a plain object or a shape.' );
      }
    } else {
      if ( typeof schema !== 'object' || schema === null ) {
        throw new Error( 'Schema must be a plain object or a shape.' );
      }
      schema = Celebi.shape( schema );
    }
    return schema;
  }

  function transformShape( shape ) {
    var spec = {};
    for ( let path of shape.attributes.paths ) {
      let value;
      switch ( path.value.attributes.type ) {
        case 'shape':
          value = transformShape( path.value );
          break;
        case 'string':
          value = React.PropTypes.string;
          break;
        case 'number':
          value = React.PropTypes.number;
          break;
        case 'function':
          value = React.PropTypes.func;
          break;
        case 'object':
          value = React.PropTypes.object;
          break;
        case 'boolean':
          value = React.PropTypes.bool;
          break;
        default:
          value = React.PropTypes.any;
          break;
      }
      path.set( spec, value );
    }
    return spec;
  }
}];
