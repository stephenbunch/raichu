export default [ '$tracker', function( $tracker ) {
  return class ReactiveValue {
    constructor( initialValue ) {
      this._value = initialValue;
    }

    get() {
      $tracker.depend( this );
      return this._value;
    }

    set( value ) {
      if ( value !== this._value ) {
        $tracker.changed( this );
        this._value = value;
      }
    }
  };
}];
