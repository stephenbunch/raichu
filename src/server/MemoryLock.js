export default [ function() {
  return class MemoryLock {
    constructor() {
      this._locks = new Map();
    }

    takeAsync( key ) {
      return new Promise( resolve => {
        if ( this._locks.has( key ) ) {
          this._locks.get( key ).push( resolve );
        } else {
          this._locks.set( key, [] );
          resolve( this._createLock( key ) );
        }
      });
    }

    _release( key ) {
      if ( this._locks.get( key ).length > 0 ) {
        let next = this._locks.get( key ).shift();
        next( this._createLock( key ) );
      } else {
        this._locks.delete( key );
      }
    }

    _createLock( key ) {
      var disposed = false;
      return {
        dispose: () => {
          if ( !disposed ) {
            disposed = true;
            this._release( key );
          }
        }
      };
    }
  };
}];
