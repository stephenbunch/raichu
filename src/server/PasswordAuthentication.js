export default [
  'ValidationError', 'zxcvbn', 'bcrypt',
function( ValidationError, zxcvbn, bcrypt ) {
  return class PasswordAuthentication {
    hashAsync( passphrase, email ) {
      var result = zxcvbn( passphrase, [ email ] );
      if ( result.score === 0 ) {
        throw new ValidationError( 'Password is too weak.' );
      }
      return new Promise( ( resolve, reject ) => {
        bcrypt.hash( passphrase, 10, ( err, hash ) => {
          if ( err ) {
            reject( err );
          } else {
            resolve( hash );
          }
        });
      });
    }

    compareAsync( passphrase, hash ) {
      return new Promise( ( resolve, reject ) => {
        bcrypt.compare( passphrase, hash, ( err, result ) => {
          if ( err ) {
            reject( err );
          } else {
            resolve( result );
          }
        });
      });
    }
  };
}];
