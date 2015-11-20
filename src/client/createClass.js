export default [
  'react', 'common/$tracker', 'EventEmitter', 'react-dom', 'common/schemas/vm',
  'lodash.assign',
function( React, $tracker, EventEmitter, ReactDOM, vm, assign ) {
  return function( name, spec ) {
    var Component = function() {};
    Component.prototype = spec;
    return React.createClass({
      displayName: name,

      statics: {
        setBinding( bindingClass ) {
          this._bindingClass = bindingClass;
        }
      },

      contextTypes: spec.contextTypes,

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
        this._propSchema = vm( spec.propTypes || {} );
        this._props = this._propSchema.cast();
        assign( this._props, this.props );

        this._autoRender = $tracker.autorun();
        this._autoAction = $tracker.autorun();

        if ( spec.stateTypes ) {
          this._state = vm( spec.stateTypes ).cast();
          if ( spec.initialAction ) {
            this._autoAction.replace( () => {
              var component = new Component();
              component.context = this.context;
              component.props = this._props;
              component.state = this._state;
              component.initialAction();
            });
          }
        }

        return null;
      },

      componentWillReceiveProps( nextProps ) {
        assign( this._props, nextProps );
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
            context: this.context
          });
        }
      },

      componentWillUnmount() {
        if ( this._binding && typeof this._binding.dispose === 'function' ) {
          this._binding.dispose();
          this._binding = null;
        }
        this._autoRender.dispose();
        this._autoAction.dispose();
      },

      render() {
        var element;
        this._autoRender.replace( comp => {
          if ( comp.isFirstRun ) {
            let component = new Component();
            component.state = this._state;
            component.props = this._props;
            component.context = this.context;
            component.dispatch = this._dispatch;
            element = component.render();
          } else {
            $tracker.nonreactive( () => {
              this.forceUpdate();
            });
          }
        });
        return element;
      },

      _dispatch( event, ...args ) {
        this._events.emit( event, args );
      }
    });
  };
}];
