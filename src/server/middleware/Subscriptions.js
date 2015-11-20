export default [
  'urijs', 'common/UrlPattern', 'HttpChannel', 'path', 'celebi',
function( URI, UrlPattern, HttpChannel, path, Celebi ) {
  return class Subscriptions {
    constructor() {
      this._channels = [];
    }

    channel( channel, ns ) {
      if ( ns ) {
        channel = new HttpChannel({
          path: path.join( ns, channel.path ),
          config: channel.config,
          handler: channel.handler
        });
      }
      this._channels.push( channel );
    }

    invokeAsync( claims, accept ) {
      var socket = accept();
      var subscriptions = {};

      socket.on( 'subscribe', async ( path ) => {
        try {
          if ( subscriptions[ path ] ) {
            return;
          }

          var cleanup = [];
          subscriptions[ path ] = {
            dispose: () => cleanup.forEach( x => x() )
          };

          var context = this._contextForPath( claims, path );
          if ( !context ) {
            return;
          }

          var schema = context.config.schema;

          var connection = {
            get claims() {
              return context.claims;
            },

            get params() {
              return context.params;
            },

            get query() {
              return context.query;
            },

            get path() {
              return path;
            },

            get schema() {
              return context.config.schema;
            },

            send: ( data ) => {
              if ( schema ) {
                let result = schema.validate( data );
                if ( result.error ) {
                  console.log( `${ result.error.name }: ${ result.error.message }` );
                  return;
                }
              }
              socket.send( path, data );
            },

            listen: ( callback ) => {
              var listener = async ( data ) => {
                if ( schema ) {
                  data = schema.cast( data );
                  let result = schema.validate( data );
                  if ( result.error ) {
                    console.log( `${ result.error.name }: ${ result.error.message }` );
                    return;
                  }
                }
                try {
                  await Promise.resolve().then( () => callback( data ) );
                } catch ( err ) {
                  console.log( err.stack || `${ err.name }: ${ err.message }` );
                }
              };
              socket.on( path, listener );
              cleanup.push( () => socket.off( path, listener ) );
            }
          };

          var session = await Promise.resolve().then(
            () => context.channel.handler( connection )
          );
          if ( session && typeof session.dispose === 'function' ) {
            cleanup.push( () => session.dispose() );
          }

        } catch ( err ) {
          console.log( err.stack || `${ err.name }: ${ err.message }` );
        }
      });

      socket.on( 'unsubscribe', path => {
        if ( subscriptions[ path ] ) {
          subscriptions[ path ].dispose();
          delete subscriptions[ path ];
        }
      });

      socket.didClose += () => {
        Object.values( subscriptions ).forEach( x => x.dispose() );
        subscriptions = {};
      };
    }

    _contextForPath( claims, path ) {
      for ( let channel of this._channels ) {
        let match = channel.pattern.match( path );
        if ( match ) {
          let context = {
            channel,
            params: match,
            claims,
            query: URI.parseQuery( new URI( path ).query() ),
            config: channel.config
          };
          if ( channel.config.auth ) {
            let result = Celebi.shape( channel.config.auth ).unknown().validate( context.claims );
            if ( result.error ) {
              return;
            } else {
              context.claims = result.value;
            }
          }
          if ( channel.config.validate ) {
            for ( let prop in channel.config.validate ) {
              let result = Celebi.shape( channel.config.validate[ prop ] ).validate( context[ prop ] );
              if ( result.error ) {
                return;
              } else {
                context[ prop ] = result.value;
              }
            }
          }
          return context;
        }
      }
    }
  };
}];
