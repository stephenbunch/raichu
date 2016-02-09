export default [
  'react', 'common/$tracker', 'common/schemas/vm', 'common/propTypesFromSchema',
function( React, $tracker, vm, propTypesFromSchema ) {
  return function( name, spec ) {
    var Component = function() {};
    Component.prototype = spec;

    var propsSchema = spec.propTypes && vm( spec.propTypes );
    var stateSchema = spec.stateTypes && vm( spec.stateTypes );
    var contextSchema = spec.contextTypes && vm( spec.contextTypes );

    return React.createClass({
      displayName: name,

      statics: spec.statics,

      childContextTypes: {
        ...propTypesFromSchema( spec.childContextTypes || {} ),
        _state: React.PropTypes.object.isRequired
      },

      contextTypes: {
        ...propTypesFromSchema( spec.contextTypes || {} ),
        _state: React.PropTypes.object.isRequired
      },

      _init() {
        if ( !this._storeId ) {
          this._storeId = this.context._state.uid++;
          if ( !this.context._state.store.has( this._storeId ) ) {
            this.context._state.store.set( this._storeId, {
              state: null,
              store: new Map(),
              uid: 0,
              init: false,
              pending: false,
              error: null,
              result: null
            });
          } else {
            this.context._state.store.get( this._storeId ).uid = 0;
          }
          this._store = this.context._state.store.get( this._storeId );
          this._context = contextSchema && contextSchema.cast( this.context );
          this._props = propsSchema && propsSchema.cast() || {};
          Object.assign( this._props, this.props );
        }
        return this;
      },

      getChildContext() {
        var childContext;
        if ( spec.getChildContext ) {
          let component = new Component();
          component.context = this._context;
          childContext = component.getChildContext();
        }
        return {
          ...childContext,
          _state: {
            ...this.context._state,
            ...this._init()._store
          }
        };
      },

      getDefaultProps() {
        if ( spec.getDefaultProps ) {
          let component = new Component();
          return component.getDefaultProps();
        } else {
          return null;
        }
      },

      render() {
        var store = this._init()._store;
        var component = new Component();
        component.context = this._context;
        component.props = this._props;

        if ( !store.init ) {
          store.init = true;

          if ( stateSchema ) {
            store.state = stateSchema.cast();
          }

          if ( component.initialAction ) {
            component.state = store.state;
            try {
              let result = component.initialAction();
              if ( result && typeof result.then === 'function' ) {
                store.pending = true;
                result.then( () => {
                  store.pending = false;
                  $tracker.changed( store, 'pending' );
                }, err => {
                  store.error = err;
                  store.pending = false;
                  $tracker.changed( store, 'pending' );
                });
              }
            } catch ( err ) {
              store.error = err;
            }
          }
        }

        if ( store.pending ) {
          $tracker.depend( store, 'pending' );
          $tracker.flagPending();
          return null;
        }

        if ( store.error ) {
          throw store.error;
        }

        component.state = store.state;

        if ( !store.result ) {
          store.result = component.render();
        }
        return store.result;
      }
    });
  };
}];
