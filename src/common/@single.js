export default [ 'lodash.find', function( find ) {
  function sequenceEquals( a, b ) {
    if ( a.length !== b.length ) {
      return false;
    }
    for ( let i = 0; i < a.length; i++ ) {
      if ( a[ i ] !== b[ i ] ) {
        return false;
      }
    }
    return true;
  }

  return function( prototype, name, descriptor ) {
    var func = descriptor.value;
    return {
      configurable: true,
      enumerable: false,
      get: function() {
        if ( !this.__CACHE ) {
          this.__CACHE = {};
        }
        var cache = this.__CACHE;
        if ( !cache[ name ] ) {
          let tasks = [];
          cache[ name ] = ( ...args ) => {
            // Allow a method to be called multiple times concurrently if
            // the arguments are different.
            var task = find( tasks, task => {
              return sequenceEquals( task.args, args );
            });
            if ( !task ) {
              task = {
                args: args,
                promise: func.apply( this, args ).then( result => {
                  tasks.splice( tasks.indexOf( task ), 1 );
                  return result;
                }, err => {
                  tasks.splice( tasks.indexOf( task ), 1 );
                  throw err;
                })
              };
              tasks.push( task );
            }
            return task.promise;
          };
        }
        return cache[ name ];
      }
    };
  };
}];
