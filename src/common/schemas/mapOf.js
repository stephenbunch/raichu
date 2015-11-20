export default [ 'celebi', 'immutable', function( Celebi, Immutable ) {
  return function mapOf( keySchema, valueSchema ) {
    keySchema = Celebi.parse( keySchema );
    valueSchema = Celebi.parse( valueSchema );
    return Celebi.any.extend({
      attributes: {
        type: 'immutable.map'
      },

      pluck( selector, options ) {
        return valueSchema.pluck( selector, options );
      },

      cast( value, options ) {
        if ( !Immutable.Map.isMap( value ) ) {
          try {
            value = new Immutable.Map( value );
          } catch ( err ) {
            value = new Immutable.Map();
          }
        }
        var result = value;
        for ( let [ key, val ] of value ) {
          result = result.delete( key );
          result = result.set(
            keySchema.cast( key, options ),
            valueSchema.cast( val, options )
          );
        }
        return result;
      },

      validate( value, options = {} ) {
        if ( typeof value === 'object' && value !== null ) {
          try {
            value = new Immutable.Map( value );
          } catch ( err ) {}
        }
        if ( !Immutable.Map.isMap( value ) ) {
          return Celebi.fail( this, 'must be a map' );
        }
        let retval = new Immutable.Map();
        let errors = [];
        for ( let [ key, val ] of value ) {
          let itemLabel = `item ${ key }`;
          let keyResult = keySchema.label( keySchema.attributes.label || itemLabel ).validate( key, options );
          let valueResult = valueSchema.label( valueSchema.attributes.label || itemLabel ).validate( val, options );
          if ( keyResult.error ) {
            errors.push({
              key: key,
              message: keyResult.error.message
            });
            if ( options.abortEarly ) {
              break;
            } else {
              continue;
            }
          }
          if ( valueResult.error ) {
            errors.push({
              key: key,
              message: valueResult.error.message
            });
            if ( options.abortEarly ) {
              break;
            } else {
              continue;
            }
          }
          retval = retval.set( keyResult.value, valueResult.value );
        }
        return Celebi.pass( retval );
      },

      transform( transform ) {
        return mapOf( transform( keySchema ), transform( valueSchema ) );
      }
    });
  };
}];
