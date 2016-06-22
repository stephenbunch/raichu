export default [ 'celebi', 'schemas/list', function( Celebi, list ) {
  return function vm( schema ) {
    if ( Celebi.isSchema( schema ) ) {
      if ( schema.attributes.type !== 'shape' ) {
        throw new Error( 'Schema must be an shape.' );
      }
    } else {
      schema = Celebi.shape( schema );
    }
    schema = schema.transform( function transform( node ) {
      if ( node.attributes.type === 'array' ) {
        return list( node.transform( transform ) );
      } else if ( node.attributes.type === 'shape' ) {
        return vm( node );
      } else {
        return node;
      }
    });
    let parent = Celebi.vm( schema );
    return parent.extend({
      cast( value, options ) {
        value = parent.cast.call( this, value, options );
        // Provide the same api as rxvm.
        value.toObject = function() { return this; };
        value.toJSON = function() { return this; };
        return value;
      }
    });
  };
}];
