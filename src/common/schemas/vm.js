export default [
  'celebi', 'schemas/list', '$tracker', 'formatObject',
function( Celebi, list, $tracker, formatObject ) {
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
    return schema.extend({
      attributes: {
        type: 'vm',
        keys: schema.attributes.keys
      },

      cast( source, options ) {
        if ( source === null || typeof source !== 'object' ) {
          source = {};
        }
        var model = {};
        for ( let key in this.attributes.keys ) {
          let _value;
          let set = ( value, isFirstRun ) => {
            value = this.attributes.keys[ key ].cast( value );
            if ( value !== _value ) {
              _value = value;
              if ( !isFirstRun ) {
                $tracker.changed( model, key );
              }
            }
          };
          Object.defineProperty( model, key, {
            enumerable: true,
            configurable: true,
            get: () => {
              $tracker.depend( model, key );
              return _value;
            },
            set: value => set( value, false )
          });
          $tracker.attach( comp => {
            set( source[ key ], comp && comp.isFirstRun );
          });
        }
        model.toObject = () => {
          var obj = {};
          for ( let key in this.attributes.keys ) {
            let value = formatObject( model[ key ] );
            if ( value !== undefined ) {
              obj[ key ] = value;
            }
          }
          return obj;
        };
        model.toJSON = () => {
          return model.toObject();
        };
        return model;
      }
    });
  };
}];
