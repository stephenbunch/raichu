export default [ function() {
  return class HttpError extends Error {
    constructor({ status, message, errors = [] }) {
      super();
      this.name = 'HttpError';
      this.statusCode = status;
      this.message = message;
      this.errors = errors;
    }
  };
}];
