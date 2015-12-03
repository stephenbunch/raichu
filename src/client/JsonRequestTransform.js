export default [ 'lodash.isplainobject', function( isPlainObject ) {
  return class JsonRequestTransform {
    transformRequest( request ) {
      if ( request.body !== undefined ) {
        request.body = JSON.stringify( request.body );
        request.headers[ 'Content-Type' ] = 'application/json';
      }
      request.headers[ 'Accept' ] = 'application/json';
      return request;
    }
  };
}];
