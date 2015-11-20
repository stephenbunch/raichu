export default [ 'window', function( window ) {
  return class LocalStorage {
    constructor() {
      try {
        window.localStorage.setItem( 'test', '1' );
        window.localStorage.removeItem( 'test' );
        this._isLocalStorageSupported = true;
      } catch ( err ) {
        this._isLocalStorageSupported = false;
      }
    }

    get( key ) {
      if ( window.localStorage[ key ] !== undefined ) {
        return JSON.parse( window.localStorage[ key ] );
      }
    }

    set( key, value ) {
      if ( !this._isLocalStorageSupported ) {
        throw new Error( 'Private browsing mode is not supported.' );
      }
      if ( value === undefined ) {
        delete window.localStorage[ key ];
      } else {
        window.localStorage[ key ] = JSON.stringify( value );
      }
    }

    delete( key ) {
      delete window.localStorage[ key ];
    }
  };
}];
