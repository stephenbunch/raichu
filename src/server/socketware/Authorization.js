export default [
  'urijs', 'moment', 'lodash.isequal', 'common/formatError', 'clearTimeout',
  'setTimeout',
function(
  URI, moment, isEqual, formatError, clearTimeout, setTimeout
) {
  return class Authorization {
    constructor( tokenParser ) {
      this._tokenParser = tokenParser;
    }

    async invokeAsync( socket, next ) {
      socket.claims = await this._claimsFromSocketAsync( socket );
      if ( !socket.claims ) {
        socket.close();
        return;
      }
      this._receiveSocketAsync( socket, next );
    }

    async _receiveSocketAsync( socket, next ) {
      var channel = socket.channel();
      var expireTimeout;

      channel.on( 'token', async token => {
        try {
          clearTimeout( expireTimeout );
          let current = socket.claims;
          socket.claims = await this._claimsFromTokenAsync( token );
          if ( !socket.claims ) {
            socket.close();
          } else {
            if ( !this._areClaimsEqual( socket.claims, current ) ) {
              socket.reset();
              this._receiveSocketAsync( socket, next );
            }
          }
        } catch ( err ) {
          console.log( formatError( err ) );
        }
      });

      channel.onClose += () => {
        clearTimeout( expireTimeout );
      };

      expireTimeout = this._setExpireTimeout( socket );
      await next.invokeAsync( socket );
    }

    async _claimsFromSocketAsync( socket ) {
      var query = URI.parseQuery( new URI( socket.url ).query() );
      var claims;
      if ( query.token ) {
        claims = await this._claimsFromTokenAsync( query.token );
      }
      return claims;
    }

    async _claimsFromTokenAsync( token ) {
      var claims;
      try {
        claims = await this._tokenParser.parseAsync( token );
      } catch ( err ) {}
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
