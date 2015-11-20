export default [
  'HttpClient', 'JsonRequestTransform', 'JsonResponseTransform',
function( HttpClient, JsonRequestTransform, JsonResponseTransform ) {
  return class SingleProfileAuthenticationClient {
    /**
     * @param {Object} params
     * @param {String} params.loginUrl
     * @param {String} params.logoutUrl
     * @param {Object} [params.tokenData=null]
     * @param {String} params.tokenData.access_token
     * @param {String} params.tokenData.refresh_token
     */
    constructor({ loginUrl, logoutUrl, tokenData = null }) {
      this._loginUrl = loginUrl;
      this._logoutUrl = logoutUrl;
      this._tokens = tokenData && Object.freeze( tokenData );
      this._client = new HttpClient();
      this._client.requestTransforms.push( new JsonRequestTransform() );
      this._client.responseTransforms.push( new JsonResponseTransform() );
    }

    get tokens() {
      return this._tokens;
    }

    async loginAsync( credentials ) {
      this._tokens = await this._client.fetchAsync({
        url: this._loginUrl,
        method: 'POST',
        body: credentials
      });
      this._tokens = Object.freeze( this._tokens );
    }

    async logoutAsync() {
      if ( this._tokens ) {
        await this._client.fetchAsync({
          url: this._logoutUrl,
          method: 'POST',
          body: {
            token: this._tokens.refresh_token
          }
        });
        this._tokens = null;
      }
    }
  };
}];
