export default [
  'react', 'common/$tracker', 'EventEmitter', 'react-dom', 'common/schemas/rxvm',
  'common/propTypesFromSchema',
function(
  React, $tracker, EventEmitter, ReactDOM, rxvm, propTypesFromSchema
) {
  return function( spec ) {
    var Component = function() {};
    Component.prototype = spec;

    var propsSchema = spec.propTypes && rxvm( spec.propTypes );
    var stateSchema = spec.stateTypes && rxvm( spec.stateTypes );
    var contextSchema = spec.contextTypes && rxvm( spec.contextTypes );

    return React.createClass({
      displayName: spec.displayName,

      statics: {
        ...spec.statics,
        setBinding( bindingClass ) {
          this._bindingClass = bindingClass;
        }
      },

      contextTypes: spec.contextTypes && propTypesFromSchema( spec.contextTypes ),
      childContextTypes: spec.childContextTypes && propTypesFromSchema( spec.childContextTypes ),

      getBinding() {
        return this._binding || null;
      },

      getDefaultProps() {
        if ( spec.getDefaultProps ) {
          let component = new Component();
          return component.getDefaultProps();
        } else {
          return null;
        }
      },

      getInitialState() {
        this._autoRender = $tracker.autorun();
        this._autoAction = $tracker.autorun();

        this._props = propsSchema && propsSchema.cast() || {};
        this._autoProps = $tracker.autorun( () => {
          for ( let key in this.props ) {
            $tracker.attach( () => {
              this._props[ key ] = this.props[ key ];
            });
          }
        });

        this._context = contextSchema && contextSchema.cast() || {};
        this._autoContext = $tracker.autorun( () => {
          for ( let key in this.context ) {
            $tracker.attach( () => {
              this._context[ key ] = this.context[ key ];
            });
          }
        });

        if ( stateSchema ) {
          this._state = stateSchema.cast();
          if ( spec.initialAction ) {
            this._autoAction.replace( () => {
              var component = new Component();
              component.context = this._context;
              component.props = this._props;
              component.state = this._state;
              component.dispatch = this._dispatch;
              component.suspendUpdates = this._suspendUpdates;
              component.resumeUpdates = this._resumeUpdates;
              component.initialAction();
            });
          }
        }

        this._eventQueue = [];
        this._updatesSuspended = 0;
        this._needsUpdate = false;

        return null;
      },

      componentWillReceiveProps( nextProps, nextContext ) {
        this._autoProps.replace( () => {
          for ( let key in nextProps ) {
            $tracker.attach( () => {
              this._props[ key ] = nextProps[ key ];
            });
          }
        });
        this._autoContext.replace( () => {
          for ( let key in nextContext ) {
            $tracker.attach( () => {
              this._context[ key ] = nextContext[ key ];
            });
          }
        });
      },

      componentDidMount() {
        this._events = new EventEmitter();
        if ( this.constructor._bindingClass ) {
          let Binding = this.constructor._bindingClass;
          this._updateCallbacks = [];
          this._binding = new Binding({
            state: this._state,
            events: this._events,
            getElement: () => ReactDOM.findDOMNode( this ),
            props: this._props,
            getRefs: () => this.refs,
            context: this._context,
            suspendUpdates: this._suspendUpdates,
            resumeUpdates: this._resumeUpdates,
            afterUpdate: callback => this._updateCallbacks.push(callback)
          });
          for ( let args of this._eventQueue ) {
            this._events.emit.apply( this._events, args );
          }
          this._eventQueue = [];
        }
      },

      componentWillUnmount() {
        if ( this._binding && typeof this._binding.dispose === 'function' ) {
          this._binding.dispose();
          this._binding = null;
        }
        this._autoRender.dispose();
        this._autoAction.dispose();
        this._autoProps.dispose();
        this._autoContext.dispose();
      },

      render() {
        var result;
        this._autoRender.replace( comp => {
          if ( comp.isFirstRun ) {
            let component = new Component();
            component.state = this._state;
            component.props = this._props;
            component.context = this._context;
            component.dispatch = this._dispatch;
            result = component.render();
          } else {
            $tracker.nonreactive( () => {
              if ( this._updatesSuspended > 0 ) {
                this._needsUpdate = true;
              } else {
                this.forceUpdate(this._afterUpdate);
              }
            });
          }
        });
        return result;
      },

      _dispatch( event, ...args ) {
        if ( !this._events ) {
          this._eventQueue.push([ event, args ]);
        } else {
          this._events.emit( event, args );
        }
      },

      _suspendUpdates() {
        this._suspendUpdates += 1;
      },

      _resumeUpdates() {
        this._suspendUpdates -= 1;
        if ( this._suspendUpdates < 0 ) {
          this._suspendUpdates = 0;
        } else if ( this._suspendUpdates === 0 ) {
          if ( this._needsUpdate ) {
            this._needsUpdate = false;
            $tracker.nonreactive( () => {
              this.forceUpdate(this._afterUpdate);
            });
          }
        }
      },

      _afterUpdate() {
        if (this._updateCallbacks) {
          let callbacks = this._updateCallbacks;
          this._updateCallbacks = [];
          for (let callback of callbacks) {
            callback();
          }
        }
      }
    });
  };
}];
