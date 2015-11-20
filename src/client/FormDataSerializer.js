export default [ function() {
  return class FormDataSerializer {
    serialize( obj ) {
      var form = new FormData();
      var stack = Object.keys( obj ).map( function( key ) {
        return {
          path: key,
          value: obj[ key ]
        };
      });
      while ( stack.length ) {
        var field = stack.shift();
        if (
          typeof field.value === 'string' ||
          typeof field.value === 'number' ||
          typeof field.value === 'boolean' ||
          field.value instanceof File
        ) {
          form.append( field.path, field.value );
        } else if ( typeof field.value === 'object' && field.value !== null ) {
          stack.push.apply(
            stack,
            Object.keys( field.value ).map( function( key ) {
              return {
                path: field.path + '[' + key + ']',
                value: field.value[ key ]
              };
            })
          );
        }
      }
      return form;
    }
  };
}];
