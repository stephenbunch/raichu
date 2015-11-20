export default [ 'jquery?', function( $ ) {
  return class FormSerializer {
    serialize( form ) {
      var obj = {};
      var selector = 'input, textarea, select';
      var fields = $ ? $( selector, form ) : form.querySelectorAll( selector );
      for ( let field of fields ) {
        let segments = field.name.replace( /\]/g, '' ).split( '[' );
        let node = obj;
        for ( let i = 0; i < segments.length - 1; i++ ) {
          let seg = segments[ i ];
          let next = segments[ i + 1 ];
          if ( !node[ seg ] ) {
            if ( isNaN( Number( next ) ) ) {
              node[ seg ] = {};
            } else {
              node[ seg ] = [];
            }
          }
          node = node[ seg ];
        }
        node[ segments[ segments.length - 1 ] ] = field.value;
      }
      return obj;
    }
  };
}];
