export default [ function() {
  return class Content {
    constructor( statusCode, body, headers = {} ) {
      this.statusCode = statusCode;
      this.body = body;
      this.headers = headers;
    }

    static created( location, entity ) {
      return new Content( 201, entity, {
        'Location': location
      });
    }

    get isContent() {
      return true;
    }

    get hasBody() {
      return this.body !== undefined;
    }
  };
}];
