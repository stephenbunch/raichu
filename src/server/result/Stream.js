export default [ function() {
  return class Stream {
    constructor( statusCode, stream, headers = {} ) {
      this._statusCode = statusCode;
      this._stream = stream;
      this._headers = headers;
    }

    get isResult() {
      return true;
    }

    writeHeadAsync( response ) {
      response.statusCode = this._statusCode;
      for ( let name in this._headers ) {
        response.setHeader( name, this._headers[ name ] );
      }
    }

    writeBodyAsync( response ) {
      return new Promise( ( resolve, reject ) => {
        this._stream.on( 'error', err => {
          reject( err );
          response.stream.end();
        });
        this._stream.pipe( response.stream );
        response.stream.on( 'finish', () => {
          resolve();
          response.stream.end();
        });
        response.stream.on( 'error', err => {
          reject( err );
        });
      });
    }
  };
}];
