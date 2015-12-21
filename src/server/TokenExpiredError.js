export default [ function() {
  return class TokenExpiredError extends Error {
    constructor() {
      super();
      this.name = 'TokenExpiredError';
      this.message = 'Token is expired.';
    }
  }
}];
