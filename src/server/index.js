export default [ 'NodeBundle', 'upstream', function( NodeBundle, upstream ) {
  var bundle = new NodeBundle( 'raichu/server' );
  var common = new NodeBundle( 'raichu/common' );

  bundle.registerDirectory( __dirname, {
    ignore: [ 'index' ]
  });

  common.registerDirectory( `${ __dirname }/../common` );
  common.delegate( '@event', bundle );
  common.register( 'celebi', require( 'celebi' ) );
  common.register( 'immutable', require( 'immutable' ) );
  common.register( 'lodash.assign', require( 'lodash.assign' ) );
  common.register( 'lodash.find', require( 'lodash.find' ) );
  common.register( 'path-to-regexp', require( 'path-to-regexp' ) );
  common.delegate( 'react', upstream );
  common.register( 'urijs', require( 'urijs' ) );
  common.delegate( 'VM_DEBUG', bundle );
  bundle.registerLink( 'common/', common );

  bundle.register( '@bind', require( '@stephenbunch/bind' ) );
  bundle.register( '@event', require( '@stephenbunch/event') );
  bundle.register( 'accepts', require( 'accepts' ) );
  bundle.register( 'bcrypt', require( 'bcrypt' ) );
  bundle.register( 'celebi', require( 'celebi' ) );
  bundle.register( 'clearTimeout', clearTimeout );
  bundle.register( 'checksum', require( 'checksum' ) );
  bundle.register( 'compressible', require( 'compressible' ) );
  bundle.register( 'content-type', require( 'content-type' ) );
  bundle.register( 'events', require( 'events' ) );
  bundle.register( 'fs', require( 'fs' ) );
  bundle.register( 'http', require( 'http' ) );
  bundle.register( 'immutable', require( 'immutable' ) );
  bundle.register( 'jsonwebtoken', require( 'jsonwebtoken' ) );
  bundle.register( 'jws', require( 'jws' ) );
  bundle.register( 'lodash.isequal', require( 'lodash.isequal' ) );
  bundle.register( 'mime', require( 'mime' ) );
  bundle.register( 'moment', require( 'moment' ) );
  bundle.register( 'path', require( 'path' ) );
  bundle.register( 'path-to-regexp', require( 'path-to-regexp' ) );
  bundle.register( 'raw-body', require( 'raw-body' ) );
  bundle.delegate( 'react', upstream );
  bundle.register( 'setTimeout', setTimeout );
  bundle.register( 'type-is', require( 'type-is' ) );
  bundle.register( 'urijs', require( 'urijs' ) );
  bundle.register( 'WebSocket', require( 'ws' ) );
  bundle.register( 'WebSocketServer', require( 'ws' ).Server );
  bundle.register( 'zlib', require( 'zlib' ) );
  bundle.register( 'zxcvbn', require( 'zxcvbn' ) );
  bundle.register( 'VM_DEBUG', false );

  return bundle;
}];
