export default [ 'JsonWebToken', function( JsonWebToken ) {
  return class AccessToken extends JsonWebToken {
    get claims() {
      return this.body;
    }
  };
}];
