export default [ function() {
  return class ConflictError extends Error {
    constructor( message ) {
      super();
      this.message = message;
      this.output = {
        statusCode: 409,
        body: {
          errors: [{
            message
          }]
        }
      };
    }
  };
}];
