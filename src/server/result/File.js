export default [ 'mime', 'fs', 'checksum', function( mime, fs, checksum ) {
  return class File {
    /**
     * @param {String} path
     * @param {Object} [headers={}]
     */
    constructor( path, headers = {} ) {
      this._path = path;
      this._headers = headers;
    }

    get isResult() {
      return true;
    }

    get isFile() {
      return true;
    }

    /**
     * @param {HttpResponse} response
     * @returns {Promise}
     */
    async writeHeadAsync( response ) {
      var stat = await new Promise( ( resolve, reject ) => {
        fs.lstat( this._path, ( err, stat ) => {
          if ( err ) {
            reject( err );
          } else {
            resolve( stat );
          }
        });
      });
      if ( stat.isFile() ) {
        let etag = await new Promise( ( resolve, reject ) => {
          checksum.file( this._path, function( err, digest ) {
            if ( err ) {
              reject( err );
            } else {
              resolve( digest );
            }
          });
        });
        response.setHeader( 'Content-Type', mime.lookup( this._path ) );
        response.setHeader( 'Content-Length', stat.size );
        response.setHeader( 'ETag', etag );
        response.setHeader( 'Last-Modified', stat.mtime.toUTCString() );
        for ( let name in this._headers ) {
          resopnse.setHeader( name, this._headers[ name ] );
        }
      }
      return stat;
    }

    /**
     * @param {HttpResponse} response
     * @returns {Promise}
     */
    async writeBodyAsync( response, stat ) {
      if ( stat.isFile() ) {
        let readStream = fs.createReadStream( this._path );
        readStream.on( 'open', () => {
          readStream.pipe( response.stream );
        });
        await new Promise( ( resolve, reject ) => {
          readStream.on( 'error', err => {
            reject( err );
            response.stream.end();
          });
          response.stream.on( 'finish', () => {
            resolve();
            response.stream.end();
          });
          response.stream.on( 'error', err => {
            reject( err );
          });
        });
      } else {
        response.statusCode = 404;
        await response.endAsync();
      }
    }
  };
}];
