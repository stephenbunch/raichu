export default [ 'urijs', 'path-to-regexp', function( URI, pathToRegexp ) {
  return class UrlPattern {
    /**
     * @param {String} path
     */
    constructor( path ) {
      if ( !path.startsWith( '/' ) ) {
        throw new Error( 'Path must begin with forward slash (/).' );
      }
      this._path = path;
      this._keys = [];
      this._pattern = pathToRegexp( this._path, this._keys );
    }

    match( url ) {
      var match = this._pattern.exec( new URI( url ).path() );
      if ( match !== null ) {
        let params = {};
        let i = 0, len = this._keys.length;
        for ( ; i < len; i++ ) {
          params[ this._keys[ i ].name ] = match[ i + 1 ];
        }
        return params;
      }
    }
  };
}];
