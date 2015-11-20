export default [ function() {
  return class ValidationError extends Error {
    constructor( message ) {
      super();
      this.message = message;
      this.output = {
        statusCode: 400,
        body: {
          errors: [{
            message
          }]
        }
      };
    }
  };
}];
