export default [ function() {
  return class DataServer {
    constructor() {
      this._routes = [];
    }

    route( route ) {
      this._routes.push( route );
    }

    async invokeAsync( request ) {
      for ( let route of this._routes ) {
        let match = route.match( request.url );
        if ( match ) {
          request.params = match;
          return await route.invokeAsync( request );
        }
      }
      throw new Error( `Route ${ request.url } not found.` );
    }
  }
}];
