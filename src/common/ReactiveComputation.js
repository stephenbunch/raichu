export default [ 'immutable', function( Immutable ) {
  return class ReactiveComputation {
    constructor( callback ) {
      this._callback = callback || () => {};
      this._deps = new Immutable.Map();
      this._isFirstRun = false;
      this._isRunning = false;

      this.isPending = false;
      this._children = new Immutable.Set();

      this._result = undefined;
      this._init();
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
              for ( let dependencyPath of this._deps.get( instance ) ) {
                if (
                  path === dependencyPath || (
                    typeof dependencyPath === 'string' &&
                    typeof path === 'string' &&
                    dependencyPath.startsWith( path + '.' )
                  )
                ) {
                  this._run();
                  break;
                }
              }
              // Else, don't run.
            } else {
              this._run();
            }
          } else {
            // Don't run.
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
