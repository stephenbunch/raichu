export default [ 'JsonWebTokenHandler', function( JsonWebTokenHandler ) {
  return class DefaultTokenParser {
    constructor( secret ) {
      this._tokenHandler = new JsonWebTokenHandler( secret );
    }

    async parseAsync( token ) {
      return this._tokenHandler.decodeAndVerify( token );
    }
  };
}];
