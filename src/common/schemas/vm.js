export default [
  'celebi', 'schemas/list', '$tracker', 'formatObject', 'VM_DEBUG',
function( Celebi, list, $tracker, formatObject, VM_DEBUG ) {
  var uid = 0;
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
        var model = VM_DEBUG ? {
          __id: ++uid
        } : {};
        for ( let key in this.attributes.keys ) {
          let _value;
          let set = ( value, isFirstRun ) => {
            value = this.attributes.keys[ key ].cast( value );
            if ( value !== _value ) {
              _value = value;
              if ( !isFirstRun ) {
                if ( VM_DEBUG ) {
                  console.log( 'change', 'model', model.__id, key );
                }
                $tracker.changed( model, key );
              }
            }
          };
          Object.defineProperty( model, key, {
            enumerable: true,
            configurable: true,
            get: () => {
              if ( VM_DEBUG ) {
                if ( $tracker.currentComputation ) {
                  console.log( 'comp', $tracker.currentComputation.__id, 'depend', 'model', model.__id, key );
                } else {
                  console.log( 'read', 'model', model.__id, key );
                }
              }
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
