export default [ 'celebi', 'immutable', function( Celebi, Immutable ) {
  return function listOf( t ) {
    return Celebi.arrayOf( t ).extend({
      attributes: {
        type: 'immutable.list'
      },

      pluck( selector, options ) {
        return t.pluck( selector, options );
      },

      cast( value, options ) {
        if ( Array.isArray( value ) ) {
          value = new Immutable.List( value );
        }
        if ( Immutable.List.isList( value ) ) {
          return value.map( item => {
            return t.cast( item, options );
          });
        } else {
          return new Immutable.List();
        }
      },

      validate( value, options = {} ) {
        if ( Array.isArray( value ) ) {
          value = new Immutable.List( value );
        }
        if ( !Immutable.List.isList( value ) ) {
          return Celebi.fail( this, 'must be a list' );
        }
        let retval = new Immutable.List();
        let errors = [];
        for ( let i = 0; i < value.size; i++ ) {
          let item = value.get( i );
          let result = t.label( t.attributes.label || `item ${ i }` ).validate( item, options );
          if ( result.error ) {
            errors.push({
              key: i,
              message: result.error.message
            });
            if ( options.abortEarly ) {
              break;
            }
          } else {
            retval = retval.push( result.value );
          }
        }
        if ( errors.length > 0 ) {
          return Celebi.fail( this, errors );
        } else {
          return pass( retval );
        }
      },

      transform( transform ) {
        return listOf( transform( t ) );
      }
    });
  };
}];
