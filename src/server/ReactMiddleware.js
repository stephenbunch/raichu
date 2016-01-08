export default [ 'react', 'common/$tracker', function( React, $tracker ) {
  return class ReactMiddleware {
    /**
     * @param {ReactMiddlewareDelegate} delegate
     */
    constructor( delegate ) {
      this._delegate = delegate;
    }

    /**
     * @param {HttpRequest} request
     * @param {HttpServerMiddleware} next
     */
    async invokeAsync( request, next ) {
      var result = await next.invokeAsync( request );
      if ( React.isValidElement( result ) ) {
        return this._renderAsync( request, result );
      }
      return result;
    }

    async _renderAsync( request, element ) {
      var context = {
        store: new Map(),
        request
      };
      return await new Promise( ( resolve, reject ) => {
        $tracker.autorun( comp => {
          try {
            let result = this._delegate.renderToResult(
              this._createElement( element, context )
            );
            if ( !comp.isPending ) {
              comp.dispose();
              resolve( result );
            }
          } catch ( err ) {
            comp.dispose();
            reject( err );
          }
        });
      });
    }

    _createElement( element, context ) {
      return React.createElement(
        React.createClass({
          childContextTypes: {
            _state: React.PropTypes.object.isRequired
          },

          getChildContext() {
            return {
              _state: {
                store: context.store,
                uid: 0
              }
            };
          },

          render() {
            return element;
          }
        })
      );
    }
  };
}];
