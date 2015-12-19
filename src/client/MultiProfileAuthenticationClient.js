export default [
  'HttpClient', 'JsonRequestTransform', 'JsonResponseTransform', 'immutable',
function( HttpClient, JsonRequestTransform, JsonResponseTransform, Immutable ) {
  return class MultiProfileAuthenticationClient {
    /**
     * @param {Object} params
     * @param {String} params.loginUrl
     * @param {String} params.logoutUrl
     * @param {Object.<String, Object>} [params.profileData=null]
     * @param {String} params.profileData.access_token
     * @param {String} params.profileData.refresh_token
     */
    constructor({ loginUrl, logoutUrl, profileData = null }) {
      this._loginUrl = loginUrl;
      this._logoutUrl = logoutUrl;
      this._client = new HttpClient();
      this._client.requestTransforms.push( new JsonRequestTransform() );
      this._client.responseTransforms.push( new JsonResponseTransform() );
      this._profiles = this._profilesFromData( profileData );
    }

    get profiles() {
      return this._profiles;
    }

    async loginAsync( credentials ) {
      var data = await this._client.fetchAsync({
        url: this._loginUrl,
        method: 'POST',
        body: credentials
      });
      this._profiles = this._profilesFromData( data );
      if ( this._profiles.size === 0 ) {
        throw new Error( 'Authentication returned zero results.' );
      }
    }

    setProfiles( profiles ) {
      this._profiles = this._profilesFromData( profiles );
    }

    logout() {
      var profiles = this._profiles;
      this._profiles = this._profiles.clear();
      for ( let profile of profiles.values() ) {
        this._client.fetchAsync({
          url: this._logoutUrl,
          method: 'POST',
          body: {
            token: profile.refresh_token
          }
        }).catch( err => console.log( `${ err.name }: ${ err.message }` ) );
      }
    }

    _profilesFromData( data ) {
      var profiles = new Immutable.Map();
      for ( let key in data ) {
        profiles = profiles.set( key, data[ key ] );
      }
      return profiles;
    }
  };
}];
