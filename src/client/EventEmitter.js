export default [ function() {
  return class EventEmitter {
    constructor() {
      this._listeners = {};
    }

    on( ...args ) {
      return this.addListener.apply( this, args );
    }

    off( ...args ) {
      return this.removeListener.apply( this, args );
    }

    /**
     * @param {String} event
     * @param {Function} listener
     */
    addListener( event, listener ) {
      if ( !this._listeners[ event ] ) {
        this._listeners[ event ] = [];
      }
      this._listeners[ event ].push( listener );
    }

    /**
     * @param {String} event
     * @param {Function} listener
     */
    removeListener( event, listener ) {
      if ( this._listeners[ event ] ) {
        let index = this._listeners[ event ].indexOf( listener );
        if ( index > -1 ) {
          this._listeners[ event ].splice( index, 1 );
          if ( this._listeners[ event ].length === 0 ) {
            delete this._listeners[ event ];
          }
        }
      }
    }

    /**
     * @param {String} event
     * @param {Array} [args=[]]
     */
    emit( event, args = [] ) {
      if ( this._listeners[ event ] ) {
        for ( let listener of this._listeners[ event ].slice() ) {
          listener.apply( undefined, args );
        }
      }
    }
  };
}];
