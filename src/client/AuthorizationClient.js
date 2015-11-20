export default [
  '@event', 'HttpClient', 'JsonRequestTransform', 'JsonResponseTransform',
  'AccessToken', 'RefreshToken', 'moment', 'common/formatError',
function(
  event, HttpClient, JsonRequestTransform, JsonResponseTransform, AccessToken,
  RefreshToken, moment, formatError
) {
  return class AuthorizationClient {
    /**
     * @param {Object} params
     * @param {String} params.refreshUrl
     * @param {Boolean} [params.autoRefresh=false]
     */
    constructor({ refreshUrl, autoRefresh = false } = {}) {
      this._refreshUrl = refreshUrl;
      this._autoRefresh = autoRefresh;
      this._completionHandlers = [];
      this._refreshPending = false;
      this._refreshToken = null;
      this._accessToken = null;
      this._client = new HttpClient();
      this._client.requestTransforms.push( new JsonRequestTransform() );
      this._client.responseTransforms.push( new JsonResponseTransform() );
      this._refreshTimeoutId = null;
      this._claims = Object.freeze( {} );
    }

    @event didUpdate
    @event didUnauthorize

    get isAuthorized() {
      return !!this._refreshToken;
    }

    get claims() {
      return this._claims;
    }

    /**
     * @param {Object} tokens
     * @param {String} refresh_token
     * @param {String} [access_token]
     */
    authorize({ refresh_token, access_token = null }) {
      if ( !refresh_token ) {
        throw new Error( 'Refresh token is required.' );
      }
      this._refreshToken = new RefreshToken( refresh_token );
      this._accessToken = access_token && new AccessToken( access_token );
      if ( this._accessToken ) {
        this._onUpdate();
      } else if ( this._autoRefresh ) {
        this._refreshPending = false;
        this._refreshAsync();
      }
    }

    unauthorize() {
      if ( this._refreshToken ) {
        this._refreshToken = null;
        this._accessToken = null;
        this._claims = Object.freeze( {} );
        this._didUnauthorize.raise();
      }
    }

    async tokenAsync() {
      return new Promise( ( resolve, reject ) => {
        var tenSecondsFromNow = moment().add( 10, 'seconds' );
        if ( this._accessToken && !this._accessToken.doesExpire( tenSecondsFromNow ) ) {
          resolve( this._accessToken );
        } else {
          this._completionHandlers.push( resolve );
          this._refreshAsync();
        }
      });
    }

    async _refreshAsync() {
      if ( this._refreshPending || !this.isAuthorized ) {
        return;
      }
      this._refreshPending = true;
      if ( !this._refreshToken.doesExpire( moment().add( 10, 'seconds' ) ) ) {
        // Store a local copy of the refresh token so that we can compare
        // references after the fetch to make sure we don't update incorrectly
        // if the client configuration is updated during the fetch.
        let refreshToken = this._refreshToken;

        try {
          // Refresh the token.
          let result = await this._client.fetchAsync({
            url: this._refreshUrl,
            method: 'POST',
            body: {
              token: refreshToken.value
            }
          });

          let accessToken = new AccessToken( result.access_token );

          if ( this._refreshToken === refreshToken ) {
            this._accessToken = accessToken;
            this._refreshPending = false;
            this._onUpdate();
          }

        } catch ( err ) {
          if ( this._refreshToken === refreshToken ) {
            if ( err.statusCode === 403 ) {
              this.unauthorize();
            } else {
              console.log( formatError( err ) );
            }
          }
        }
      } else {
        this.unauthorize();
      }
    }

    _onUpdate() {
      this._claims = Object.freeze( this._accessToken.claims );
      var handlers = this._completionHandlers;
      this._completionHandlers = [];
      for ( let handler of handlers ) {
        handler( this._accessToken );
      }
      this._didUpdate.raise( this._accessToken );
      if ( this._autoRefresh ) {
        this._refreshBeforeExpire();
      }
    }

    _refreshBeforeExpire() {
      clearTimeout( this._refreshTimeoutId );
      if ( this._accessToken.expiresAt ) {
        var delay = moment.duration(
          this._accessToken.expiresAt - moment().add( 10, 'seconds' )
        ).asMilliseconds();
        this._refreshTimeoutId = setTimeout( () => {
          this._refreshAsync();
        }, Math.max( delay, 0 ) );
      }
    }
  };
}];
