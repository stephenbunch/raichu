export default [
  'ValidationError', 'zxcvbn', 'bcrypt',
function( ValidationError, zxcvbn, bcrypt ) {
  return class PasswordAuthentication {
    hashAsync( passphrase, minimumScore = 0, userInputs = [] ) {
      var result = zxcvbn( passphrase, userInputs );
      if ( result.score < minimumScore ) {
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
