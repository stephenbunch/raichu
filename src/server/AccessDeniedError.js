export default [ function() {
  return class AccessDeniedError extends Error {
    constructor( resource ) {
      super();
      this.message = `Access to "${ resource }" is denied.`;
      this.output = {
        statusCode: 403,
        body: {
          errors: [{
            message: this.message
          }]
        }
      };
    }
  };
}];
