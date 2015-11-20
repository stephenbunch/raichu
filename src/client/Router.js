export default [
  'immutable', '@event', 'common/ReactiveValue',
function( Immutable, event, ReactiveValue ) {
  return class Router {
    constructor() {
      this.routes = new Immutable.List();
      this._state = new ReactiveValue( {} );
      this._is404ing = false;
    }

    @event didNavigate
    @event did404

    get route() {
      return this._state.get().route;
    }

    get url() {
      return this._state.get().url;
    }

    get path() {
      return this._state.get().path;
    }

    get query() {
      return this._state.get().query;
    }

    get params() {
      return this._state.get().params;
    }

    update({ url, query, path }) {
      var route = null;
      var params = null;
      for ( let r of this.routes.slice() ) {
        let match = r.match( url );
        if ( match ) {
          route = r;
          params = match;
          break;
        }
      }
      if ( route ) {
        this._state.set({ url, path, route, params, query });
        this._didNavigate.raise();
      } else {
        if ( this._is404ing ) {
          throw new Error( `No routes exist for ${ path }` );
        }
        this._is404ing = true;
        this._did404.raise();
        this._is404ing = false;
      }
    }
  };
}];
