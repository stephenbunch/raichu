export default [ 'moment', 'atob', function( moment, atob ) {
  return class JsonWebToken {
    /**
     * @param {String} value
     */
    constructor( value ) {
      this.body = JSON.parse( atob( value.split( '.' )[1] ) );
      this.value = value;
      this.expiresAt = this.body.exp && moment.unix( this.body.exp ) || null;
    }

    doesExpire( asOf ) {
      if ( this.expiresAt ) {
        asOf = asOf || new Date();
        return asOf >= this.expiresAt;
      } else {
        return false;
      }
    }
  };
}];
