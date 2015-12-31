export default [
  'immutable', 'ReactiveComputation',
function( Immutable, ReactiveComputation ) {
  return class Tracker {
    constructor() {
      this._current = null;
      this._computations = new Immutable.Set();
    }

    get currentComputation() {
      return this._current;
    }

    /**
     * Creates a new autorun.
     * @param {Function} [callback]
     * @returns {Disposable}
     */
    autorun( callback ) {
      var comp = new ReactiveComputation( this._wrapCallback( callback || () => {} ) );
      this._computations = this._computations.add( comp );

      var _replace = comp.replace;
      comp.replace = callback => {
        _replace.call( comp, this._wrapCallback( callback || () => {} ) );
      };

      var _dispose = comp.dispose;
      comp.dispose = () => {
        _dispose.call( comp );
        this._computations = this._computations.delete( comp );
        if ( this._current === comp ) {
          this._current = null;
        }
      };

      return comp;
    }

    /**
     * If an autorun is being processed, a new autorun is created and its
     * lifecycle is managed by the current aurorun. Otherwise, the callback is
     * executed without creating an autorun.
     * @param {Function} [callback]
     */
    attach( comp, callback ) {
      if ( typeof comp === 'function' ) {
        callback = comp;
        comp = null;
      }
      if ( comp || this._current ) {
        let current = this._current;
        if ( comp ) {
          this._current = comp;
        }
        let child = this.autorun( callback );
        this._current.addChild( child );
        this._current = current;
        return child.result;
      } else {
        return callback();
      }
    }

    nonreactive( callback ) {
      var current = this._current;
      this._current = null;
      var result = callback();
      this._current = current;
      return result;
    }

    /**
     * @param {*} instance
     * @param {String|Symbol} [path]
     */
    depend( instance, path ) {
      if ( this._current ) {
        this._current.addDependency( instance, path );
      }
    }

    /**
     * @param {*} instance
     * @param {String|Symbol} [path]
     */
    changed( instance, path ) {
      this._computations.forEach( comp => {
        if ( !comp.isDisposed ) {
          comp.invalidate( instance, path );
        }
      });
    }

    flagPending() {
      if ( this._current ) {
        this._current.isPending = true;
      }
    }

    _wrapCallback( callback ) {
      return comp => {
        var current = this._current;
        this._current = comp;
        var result = callback.call( undefined, comp );
        if ( current && !current.isDisposed ) {
          this._current = current;
        } else {
          this._current = null;
        }
        return result;
      };
    }
  };
}];
