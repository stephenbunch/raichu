export default [
  'celebi', 'schemas/list', '$tracker', 'formatObject', 'isEqual',
function( Celebi, list, $tracker, formatObject, isEqual ) {
  return function vm( schema ) {
    if ( Celebi.isSchema( schema ) ) {
      if ( schema.attributes.type !== 'shape' ) {
        throw new Error( 'Schema must be an shape.' );
      }
    } else {
      schema = Celebi.transformObject( schema, Celebi.shape );
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
        paths: schema.attributes.paths.map( path => {
          return new Celebi.Path( path.selector, path.value );
        })
      },

      cast( source, options ) {
        if ( source === null || typeof source !== 'object' ) {
          source = {};
        }
        var model = {};
        for ( let path of this.attributes.paths ) {
          let pathValue;
          let set = ( value, isFirstRun ) => {
            value = path.value.cast( value );
            if ( !isEqual( value, pathValue ) ) {
              pathValue = value;
              if ( !isFirstRun ) {
                $tracker.changed( model, path.selector );
              }
            }
          };
          path.override( model, {
            initialize: false,
            persist: true,
            get: () => {
              $tracker.depend( model, path.selector );
              return pathValue;
            },
            set: value => set( value, false )
          });
          $tracker.attach( comp => {
            set( path.get( source ), comp && comp.isFirstRun );
          });
        }
        model.toObject = () => {
          var obj = {};
          for ( let path of this.attributes.paths ) {
            let value = formatObject( path.get( model ) );
            if ( value !== undefined ) {
              path.set( obj, value );
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
