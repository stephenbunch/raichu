export default [ function() {
  return class HttpError extends Error {
    /**
     * @param {Number} statusCode
     * @param {Error|String} error
     */
    constructor( statusCode, error ) {
      super();

      if ( error instanceof Error ) {
        this.message = error.message;
      } else {
        this.message = error;
      }

      this.output = {
        statusCode: statusCode,
        body: {
          errors: [{
            message: this.message
          }]
        }
      };
    }
  };
}];
