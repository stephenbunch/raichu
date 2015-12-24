export default [
  'react', 'common/$tracker', 'EventEmitter', 'react-dom', 'common/schemas/vm',
  'common/propTypesFromSchema',
function(
  React, $tracker, EventEmitter, ReactDOM, vm, propTypesFromSchema
) {
  return function( name, spec ) {
    var Component = function() {};
    Component.prototype = spec;

    var propsSchema = spec.propTypes && vm( spec.propTypes );
    var stateSchema = spec.stateTypes && vm( spec.stateTypes );
    var contextSchema = spec.contextTypes && vm( spec.contextTypes );

    return React.createClass({
      displayName: name,

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

        this._context = contextSchema && contextSchema.cast( this.context );

        if ( stateSchema ) {
          this._state = stateSchema.cast();
          if ( spec.initialAction ) {
            this._autoAction.replace( () => {
              var component = new Component();
              component.context = this._context;
              component.props = this._props;
              component.state = this._state;
              component.initialAction();
            });
          }
        }

        this._eventQueue = [];
        this._updatesSuspended = 0;
        this._needsUpdate = false;

        return null;
      },

      componentWillReceiveProps( nextProps ) {
        this._autoProps.replace( () => {
          for ( let key in nextProps ) {
            $tracker.attach( () => {
              this._props[ key ] = nextProps[ key ];
            });
          }
        });
      },

      componentDidMount() {
        this._events = new EventEmitter();
        if ( this.constructor._bindingClass ) {
          let Binding = this.constructor._bindingClass;
          this._binding = new Binding({
            state: this._state,
            events: this._events,
            getElement: () => ReactDOM.findDOMNode( this ),
            props: this._props,
            getRefs: () => this.refs,
            context: this._context,
            suspendUpdates: this._suspendUpdates,
            resumeUpdates: this._resumeUpdates
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
      },

      render() {
        var element;
        this._autoRender.replace( comp => {
          if ( comp.isFirstRun ) {
            let component = new Component();
            component.state = this._state;
            component.props = this._props;
            component.context = this._context;
            component.dispatch = this._dispatch;
            element = component.render();
          } else {
            $tracker.nonreactive( () => {
              if ( this._updatesSuspended > 0 ) {
                this._needsUpdate = true;
              } else {
                this.forceUpdate();
              }
            });
          }
        });
        return element;
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
              this.forceUpdate();
            });
          }
        }
      }
    });
  };
}];
