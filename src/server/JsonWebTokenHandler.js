export default [ 'jws', 'jsonwebtoken', function( jws, jwt ) {
  return class JsonWebTokenHandler {
    constructor( secret ) {
      this._secret = secret;
    }

    create( payload ) {
      return jws.sign({
        header: {
          typ: 'JWT',
          alg: 'HS256'
        },
        payload: payload,
        secret: this._secret
      });
    }

    decode( tokenString ) {
      return jwt.decode( tokenString );
    }

    decodeAndVerify( tokenString, opts ) {
      return jwt.verify( tokenString, this._secret, opts );
    }
  };
}];
