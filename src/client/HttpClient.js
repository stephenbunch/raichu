export default [
  'window', 'setTimeout', 'fetch', 'moment',
function( window, setTimeout, fetch, moment ) {
  return class HttpClient {
    constructor() {
      this._maxDelay = moment.duration( 10, 'seconds' ).asMilliseconds();
      this.requestTransforms = [];
      this.responseTransforms = [];

      this.requestTransforms.push({
        transformRequest( request ) {
          if ( !request.headers ) {
            request.headers = {};
          }
          return request;
        }
      });
    }

    /**
     * @param {String} [url]
     * @param {Object|Function} options
     */
    async fetchAsync( url, options ) {
      var requestFactory = this._createRequestFactory( url, options );
      var retries = 0;
      while ( true ) {
        let request = await requestFactory();
        for ( let transform of this.requestTransforms ) {
          request = transform.transformRequest( request );
        }

        let response;
        try {
          response = await fetch.call( window, request.url, request );
        } catch ( err ) {
          // Assume lost internet connection?
          retries += 1;
          var delay = Math.pow( 2, retries ) * 100;
          if ( delay > this._maxDelay ) {
            delay = this._maxDelay
          }
          await this._waitAsync( delay );
          continue;
        }

        for ( let transform of this.responseTransforms ) {
          response = await transform.transformResponseAsync( response );
        }
        return response;
      }
    }

    /**
     * @param {String} [url]
     * @param {Object|Function} options
     * @returns {Function}
     */
    _createRequestFactory( url, options ) {
      var requestFactory;
      if ( typeof url === 'string' ) {
        if ( typeof options === 'function' ) {
          requestFactory = () => {
            return {
              url,
              ...options()
            };
          };
        } else {
          requestFactory = () => {
            return {
              url,
              ...options
            };
          };
        }
      } else if ( typeof url === 'function' ) {
        requestFactory = url;
      } else {
        requestFactory = () => url;
      }
      return requestFactory;
    }

    _waitAsync( duration ) {
      return new Promise( resolve => {
        setTimeout( () => resolve(), duration );
      });
    }
  };
}];
