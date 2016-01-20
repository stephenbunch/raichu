export default [
  'immutable', '@event', 'VM_DEBUG', 'log',
function( Immutable, event, VM_DEBUG, log ) {
  var uid = 0;

  return class ReactiveComputation {
    constructor( callback ) {
      this.__id = ++uid;
      this._data = new Map();
      this._callback = callback || () => {};
      this._deps = new Immutable.Map();
      this._isFirstRun = false;
      this._isRunning = false;

      this.isPending = false;
      this._children = new Immutable.Set();

      this._result = undefined;
      this._init();
    }

    @event onDispose

    get data() {
      return this._data;
    }

    get result() {
      return this._result;
    }

    get isFirstRun() {
      return this._isFirstRun;
    }

    get isDisposed() {
      return !this._deps;
    }

    dispose() {
      this._deps = null;
      this._children.forEach( x => x.dispose() );
      this._children = null;
      this._onDispose.raise();
      if ( VM_DEBUG ) {
        log( 'dispose', 'comp', this.__id );
      }
    }

    addChild( comp ) {
      if ( !this.isDisposed ) {
        Object.defineProperty( comp, 'parent', {
          enumerable: true,
          configurable: true,
          get: () => this
        });
        this._children = this._children.add( comp );
      }
    }

    replace( callback ) {
      if ( this.isDisposed ) {
        throw new Error( 'Computation has been disposed.' );
      }
      this._callback = callback || () => {};
      this._init();
    }

    addDependency( instance, path ) {
      if ( this.isDisposed ) {
        throw new Error( 'Computation has been disposed.' );
      }
      if ( !this._isRunning ) {
        throw new Error( 'Dependencies must be added from within a computation.' );
      }
      if ( !this._deps.has( instance ) ) {
        this._deps = this._deps.set( instance, new Immutable.Set() );
      }
      var paths = this._deps.get( instance );
      if ( path && !paths.has( path ) ) {
        paths = paths.add( path );
        this._deps = this._deps.set( instance, paths );
      }
    }

    invalidate( instance, path ) {
      if ( this.isDisposed ) {
        throw new Error( 'Computation has been disposed.' );
      }
      if ( !this._isRunning ) {
        if ( instance ) {
          if ( this._deps.has( instance ) ) {
            if ( path ) {
              if ( this._deps.get( instance ).has( path ) ) {
                this._run();
              } else {
                // Don't run if a path was specified, but wasn't depended on.
              }
            } else {
              this._run();
            }
          } else {
            // Don't run if the instance wasn't depended on.
          }
        } else {
          this._run();
        }
      }
    }

    _init() {
      this._isFirstRun = true;
      this._run();
      this._isFirstRun = false;
    }

    _run() {
      this._deps = this._deps.clear();

      this.isPending = false;
      this._children.forEach( x => x.dispose() );
      this._children = this._children.clear();

      this._isRunning = true;
      this._result = this._callback.call( undefined, this );
      this._isRunning = false;
    }
  };
}];
