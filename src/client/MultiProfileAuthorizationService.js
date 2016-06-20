export default [
  'LocalStorage', 'MultiProfileAuthenticationClient', 'AuthorizationClient',
  '@event', '@bind', 'immutable', 'AccessToken',
function(
  LocalStorage, MultiProfileAuthenticationClient, AuthorizationClient, event,
  bind, Immutable, AccessToken
) {
  return class MultiProfileAuthorizationService {
    constructor({
      loginUrl,
      logoutUrl,
      refreshUrl,
      autoRefresh = false,
      storageKey = 'authData'
    }) {
      this._store = new LocalStorage();
      this._storageKey = storageKey;
      var authData = this._store.get( this._storageKey ) || {
        profileData: null,
        lastProfile: null
      };
      this._authentication = new MultiProfileAuthenticationClient({
        loginUrl,
        logoutUrl,
        profileData: authData.profileData
      });
      this._authorization = new AuthorizationClient({
        refreshUrl,
        autoRefresh
      });
      this._authorization.didUpdate += this._authorization_didUpdate;
      this._authorization.didUnauthorize += this._authorization_didUnauthorize;
      this._profiles = new Immutable.List();
      this._currentProfile = authData.lastProfile;

      if ( this.isLoggedIn ) {
        this._update();
      }
    }

    @event didLogin
    @event didLogout
    @event didUpdate
    @event didUnauthorize
    @event didSwitchProfile

    get isLoggedIn() {
      return this._authentication.profiles.size > 0;
    }

    get claims() {
      return this._authorization.claims;
    }

    get profiles() {
      return this._profiles;
    }

    switchProfile( key ) {
      if ( !this._authentication.profiles.has( key ) ) {
        throw new Error( `Profile ${ key } does not exist.` );
      }
      if ( key !== this._currentProfile ) {
        this._currentProfile = key;
        this._authorization.authorize(
          this._authentication.profiles.get( key )
        );
        this._didUpdate.raise(
          new AccessToken( this._authentication.profiles.get( key ).access_token )
        );
        this._didSwitchProfile.raise();
      }
    }

    tokenAsync() {
      return this._authorization.tokenAsync();
    }

    setProfiles( profiles ) {
      this._authentication.setProfiles( profiles );
      this._update();
      this._didLogin.raise();
    }

    async loginAsync( credentials ) {
      await this._authentication.loginAsync( credentials );
      this._update();
      this._didLogin.raise();
    }

    logout() {
      if ( this.isLoggedIn ) {
        this._store.delete( this._storageKey );
        this._authorization.unauthorize();
        this._authentication.logout();
        this._update();
        this._didLogout.raise();
      }
    }

    @bind
    _authorization_didUpdate( accessToken ) {
      var profileData = JSON.parse( JSON.stringify( this._authentication.profiles ) );
      profileData[ this._currentProfile ].access_token = accessToken.value;
      this._store.set( this._storageKey, {
        profileData,
        lastProfile: this._currentProfile
      });
      this._didUpdate.raise( accessToken );
    }

    @bind
    _authorization_didUnauthorize() {
      this._didUnauthorize.raise();
    }

    _update() {
      // reset
      this._profiles = this._profiles.clear();

      if ( this.isLoggedIn ) {
        // update profiles
        this._authentication.profiles.forEach( ( value, key ) => {
          this._profiles = this._profiles.push(
            Object.freeze({
              key,
              claims: new AccessToken( value.access_token ).claims
            })
          );
        });

        // update authorization
        if ( !this._authentication.profiles.has( this._currentProfile ) ) {
          let keys = new Immutable.List( this._authentication.profiles.keys() );
          let initial = keys.filter( x =>
            this._authentication.profiles.get( x ).is_default
          ).first();
          if ( !initial ) {
            initial = keys.first();
          }
          this._currentProfile = initial;
        }
        this._authorization.authorize(
          this._authentication.profiles.get( this._currentProfile )
        );
      }
    }
  };
}];
