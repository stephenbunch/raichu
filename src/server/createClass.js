export default [
  'react', 'common/$tracker', 'common/schemas/vm',
function( React, $tracker, vm ) {
  return function( name, spec ) {
    var Component = function() {};
    Component.prototype = spec;
    return React.createClass({
      displayName: name,

      childContextTypes: {
        ...spec.childContextTypes,
        _state: React.PropTypes.object.isRequired
      },

      contextTypes: {
        ...spec.contextTypes,
        _state: React.PropTypes.object.isRequired
      },

      _getStore() {
        if ( !this._storeId ) {
          this._storeId = this.context._state.uid++;
          if ( !this.context._state.store.has( this._storeId ) ) {
            this.context._state.store.set( this._storeId, {
              state: null,
              store: new Map(),
              uid: 0,
              init: false,
              pending: false,
              error: null
            });
          } else {
            this.context._state.store.get( this._storeId ).uid = 0;
          }
        }
        return this.context._state.store.get( this._storeId );
      },

      getChildContext() {
        var childContext;
        if ( spec.getChildContext ) {
          let component = new Component();
          component.context = this.context;
          childContext = component.getChildContext();
        }
        return {
          ...childContext,
          _state: {
            ...this.context._state,
            ...this._getStore()
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
        var store = this._getStore();
        var component = new Component();
        component.context = this.context;
        component.props = vm( spec.propTypes || {} ).cast();
        Object.assign( component.props, this.props );

        if ( !store.init ) {
          store.init = true;

          if ( spec.stateTypes ) {
            store.state = vm( spec.stateTypes ).cast();
          }

          if ( component.initialAction ) {
            store.pending = true;
            component.state = store.state;
            Promise.resolve().then( () => component.initialAction() ).then( () => {
              store.pending = false;
              $tracker.changed( store );
            }, err => {
              store.error = err;
              store.pending = false;
              $tracker.changed( store );
            });
          }
        }

        if ( store.pending ) {
          $tracker.depend( store );
          $tracker.flagPending();
          return null;
        }

        if ( store.error ) {
          throw store.error;
        }

        component.state = store.state;
        return component.render();
      }
    });
  };
}];
