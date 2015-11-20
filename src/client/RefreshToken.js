export default [ 'JsonWebToken', function( JsonWebToken ) {
  return class RefreshToken extends JsonWebToken {
    constructor( value ) {
      super( value );
      this.refreshUrl = this.body.uri;
    }
  };
}];
