export default [
  'celebi', 'schemas/list', '$tracker', 'formatObject', 'VM_DEBUG', 'log',
function( Celebi, list, $tracker, formatObject, VM_DEBUG, log ) {

  const VALUES = Symbol();
  const INIT = Symbol();
  const ID = Symbol();

  let uid = 0;

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
    const Model = createClass( schema.attributes.keys );
    return schema.extend({
      attributes: {
        type: 'vm',
        keys: schema.attributes.keys
      },

      cast( source, options ) {
        if ( source === null || typeof source !== 'object' ) {
          source = {};
        }
        if ( source[ ID ] === Model.id ) {
          return source;
        } else {
          return new Model( source );
        }
      }
    });
  };

  function createClass( KEYS ) {
    const Model = class {
      constructor( source ) {
        this[ INIT ] = true;
        if ( VM_DEBUG ) {
          this.__id = ++uid;
        }
        this[ VALUES ] = new Map();
        for ( let key in KEYS ) {
          $tracker.attach( () => {
            this[ key ] = source[ key ];
          });
        }
        this[ INIT ] = false;
        this[ ID ] = this.constructor.id;
      }

      toObject() {
        let obj = {};
        for ( let key in KEYS ) {
          let value = formatObject( this[ key ] );
          if ( value !== undefined ) {
            obj[ key ] = value;
          }
        }
        return obj;
      }

      toJSON() {
        return this.toObject();
      }
    };

    Model.id = ++uid;

    for ( let key in KEYS ) {
      Object.defineProperty( Model.prototype, key, {
        enumerable: true,
        configurable: true,
        get() {
          if ( VM_DEBUG ) {
            if ( $tracker.currentComputation ) {
              log( 'comp', $tracker.currentComputation.__id, 'depend', 'model', this.__id, key );
            } else {
              log( 'read', 'model', this.__id, key );
            }
          }
          $tracker.depend( this, key );
          return this[ VALUES ].get( key );
        },
        set( value ) {
          value = KEYS[ key ].cast( value );
          if ( value !== this[ VALUES ].get( key ) ) {
            this[ VALUES ].set( key, value );
            if ( !this[ INIT ] ) {
              if ( VM_DEBUG ) {
                log( 'change', 'model', this.__id, key );
              }
              $tracker.changed( this, key );
            }
          }
        }
      });
    }
    return Model;
  }
}];
