export default [ 'lodash.isplainobject', function( isPlainObject ) {
  return class JsonRequestTransform {
    transformRequest( request ) {
      request = { ...request };
      if (
        request.body !== undefined &&
        !( request.body instanceof File )
      ) {
        request.body = JSON.stringify( request.body );
        request.headers = {
          ...request.headers,
          'Content-Type': 'application/json'
        };
      }
      request.headers = {
        ...request.headers,
        'Accept': 'application/json'
      };
      return request;
    }
  };
}];
