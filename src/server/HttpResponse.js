export default [ function() {
  return class HttpResponse {
    /**
     * @param {http.ServerResponse} response
     */
    constructor( response ) {
      this._response = response;
      this.stream = response;
    }

    get statusCode() {
      return this._response.statusCode;
    }

    set statusCode( value ) {
      this._response.statusCode = value;
    }

    get statusMessage() {
      return this._response.statusMessage;
    }

    set statusMessage( value ) {
      this._response.statusMessage = value;
    }

    setHeader( name, value ) {
      this._response.setHeader( name, value );
    }

    removeHeader( name ) {
      this._response.removeHeader( name );
    }

    getHeader( name ) {
      return this._response.getHeader( name );
    }

    write( ...args ) {
      this.stream.write.apply( this.stream, args );
    }

    endAsync() {
      return new Promise( ( resolve, reject ) => {
        this.stream.end( err => {
          if ( err ) {
            reject( err );
          } else {
            resolve();
          }
        });
      });
    }
  };
}];
