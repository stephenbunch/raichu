export default [ 'celebi', 'immutable', function( Celebi, Immutable ) {
  return function list( array ) {
    return array.extend({
      attributes: {
        type: 'list'
      },

      cast( value, options ) {
        if ( Immutable.List.isList( value ) ) {
          value = value.toArray();
        }
        return new Immutable.List( array.cast( value, options ) );
      },

      validate( value, options ) {
        if ( Immutable.List.isList( value ) ) {
          value = value.toArray();
        } else if ( !Array.isArray( value ) ) {
          return Celebi.fail( this, 'must be a list' );
        }
        var result = array.validate( value, options );
        if ( result.error ) {
          return result;
        } else {
          result.value = new Immutable.List( result.value );
          return result;
        }
      },

      transform( transform ) {
        return list( array.transform( transform ) );
      }
    })
  }
}];
