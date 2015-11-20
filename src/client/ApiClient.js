export default [
  'urijs', 'HttpClient', 'lodash.assign', 'lodash.merge',
  'JsonRequestTransform', 'JsonResponseTransform',
function(
  URI, HttpClient, assign, merge, JsonRequestTransform, JsonResponseTransform
) {

  /**
   * @typedef TokenProvider
   * @property {TokenProvider.tokenAsync} tokenAsync
   */

  /**
   * @name TokenProvider.tokenAsync
   * @function
   * @returns {Promise.<auth/AccessToken>}
   */

  return class ApiClient {
    /**
     * @param {String} baseUrl
     * @param {TokenProvider} tokenProvider
     */
    constructor( baseUrl, tokenProvider ) {
      this._baseUrl = baseUrl;
      this._tokenProvider = tokenProvider;
      this._client = new HttpClient();
      this._client.requestTransforms.push( new JsonRequestTransform() );
      this._client.responseTransforms.push( new JsonResponseTransform() );
    }

    getAsync( url, params, options ) {
      url = URI( url ).query( params || {} ).toString();
      return this.fetchAsync( assign({
        url: url,
        method: 'GET'
      }, options ));
    }

    postAsync( url, data, options ) {
      return this.fetchAsync( assign({
        url: url,
        method: 'POST',
        body: data
      }, options ));
    }

    putAsync( url, data, options ) {
      return this.fetchAsync( assign({
        url: url,
        method: 'PUT',
        body: data
      }, options ));
    }

    deleteAsync( url, options ) {
      return this.fetchAsync( assign({
        url: url,
        method: 'DELETE'
      }, options ));
    }

    fetchAsync( request ) {
      request.url = this._baseUrl + request.url;
      if ( request.authorize === false ) {
        return this._client.fetchAsync( request );
      } else if ( request.token ) {
        return this._client.fetchAsync(
          merge( request, {
            headers: {
              'Authorization': 'Bearer ' + request.token
            }
          })
        );
      } else {
        return this._client.fetchAsync( () => {
          return this._tokenProvider.tokenAsync().then( token => {
            return merge( request, {
              headers: {
                'Authorization': 'Bearer ' + token.value
              }
            });
          });
        });
      }
    }
  };
}];
