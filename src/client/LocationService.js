export default [
  'immutable', 'window', '@bind', '@event', 'common/ReactiveValue',
  'Modernizr', 'urijs',
function(
  Immutable, window, bind, event, ReactiveValue, Modernizr, URI
) {
  return class Location {
    constructor() {
      this._state = new ReactiveValue( {} );
      this._update();
      if ( Modernizr.history ) {
        window.addEventListener( 'popstate', this._window_onPopState );
        window.addEventListener( 'click', this._window_onClick );
      }
      this._is404ing = false;
    }

    @event didNavigate

    get url() {
      return this._state.get().url;
    }

    get path() {
      return this._state.get().path;
    }

    get query() {
      return this._state.get().query;
    }

    dispose() {
      if ( Modernizr.history ) {
        window.removeEventListener( 'popstate', this._window_onPopState );
        window.removeEventListener( 'click', this._window_onClick );
      }
    }

    go( url ) {
      // Support relative urls.
      if ( !/^\//.test( url ) ) {
        var base = this.path;
        if ( !/\/$/.test( base ) ) {
          base += '/';
        }
        url = base + url;
      }
      if ( url !== this.url ) {
        if ( Modernizr.history ) {
          window.history.pushState( null, null, url );
          this._update();
        } else {
          window.location.href =
            window.location.protocol + '//' +
            window.location.host +
            url;
        }
      }
    }

    _update() {
      var url = window.location.pathname + window.location.search;
      var path = window.location.pathname;
      var query = URI.parseQuery( window.location.search );
      this._state.set({ url, path, query });
      this._didNavigate.raise();
    }

    @bind _window_onPopState() {
      this._update();
    }

    @bind _window_onClick( e ) {
      var element = e.target;
      while (
        element &&
        element.nodeName &&
        element.nodeName.toLowerCase() !== 'a'
      ) {
        element = element.parentNode;
      }
      if ( element && element.nodeName ) {
        let href = element.href;
        let uri = new URI( href );
        let target = element.getAttribute('target');
        if (
          uri.host() === window.location.host &&
          uri.protocol() + ':' === window.location.protocol &&
          !element.hasAttribute( 'data-external' ) &&
          (!target || target === '_self')
        ) {
          e.preventDefault();
          this.go( element.getAttribute( 'href' ) );
        }
      }
    }
  };
}];
