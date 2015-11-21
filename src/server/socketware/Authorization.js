export default [
  'JsonWebTokenHandler', 'urijs', 'moment', 'lodash.isequal', 'common/formatError',
  'clearTimeout', 'setTimeout',
function(
  JsonWebTokenHandler, URI, moment, isEqual, formatError, clearTimeout,
  setTimeout
) {
  return class Authorization {
    constructor( secret ) {
      this._tokenHandler = new JsonWebTokenHandler( secret );
    }

    async invokeAsync( socket, next ) {
      socket.claims = this._parseClaims( socket );
      if ( !socket.claims ) {
        socket.close();
        return;
      }
      this._receiveSocket( socket );
      await next.invokeAsync( socket );
    }

    _receiveSocket( socket ) {
      var channel = socket.channel();
      var expireTimeout;

      channel.on( 'token', async token => {
        try {
          clearTimeout( expireTimeout );
          let current = socket.claims;
          socket.claims = this._parseClaims( socket, token );
          if ( !socket.claims ) {
            socket.close();
          } else {
            if ( !this._areClaimsEqual( socket.claims, current ) ) {
              socket.reset();
              this._receiveSocket( socket );
              await next.invokeAsync( socket );
            }
            expireTimeout = this._setExpireTimeout( socket );
          }
        } catch ( err ) {
          console.log( formatError( err ) );
        }
      });

      channel.onClose += () => {
        clearTimeout( expireTimeout );
      };

      expireTimeout = this._setExpireTimeout( socket );
    }

    _parseClaims( socket ) {
      var query = URI.parseQuery( new URI( socket.url ).query() );
      var claims = null;
      if ( query.token ) {
        try {
          claims = this._tokenHandler.decodeAndVerify( query.token );
        } catch ( err ) {}
      }
      return claims;
    }

    /**
     * Sets a timeout that closes the socket when the access token expires.
     * @param {Socket} socket
     * @returns {Number}
     */
    _setExpireTimeout( socket ) {
      var delay = ( socket.claims.exp - moment().unix() ) * 1000;
      if ( socket.claims && socket.claims.exp ) {
        return setTimeout( () => {
          socket.close();
        }, delay );
      }
    }

    /**
     * Compares two sets of claims for equality, ignoring the expiration date.
     * @returns {Boolean}
     */
    _areClaimsEqual( claims1, claims2 ) {
      var before = JSON.parse( JSON.stringify( claims1 ) );
      var after = JSON.parse( JSON.stringify( claims2 ) );
      if ( before ) {
        delete before.exp;
      }
      if ( after ) {
        delete after.exp;
      }
      return isEqual( before, after );
    }
  };
}];
