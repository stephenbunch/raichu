import 'browsernizr/test/history';

export default [ 'WebBundle', function( WebBundle ) {
  var bundle = new WebBundle( 'raichu/client' );
  var common = new WebBundle( 'raichu/common' );

  bundle.registerModules( require( './**/*', { mode: 'hash' } ), {
    ignore: [ 'index' ]
  });

  common.registerModules( require( '../common/**/*', { mode: 'hash' } ) );
  common.register( 'celebi', require( 'celebi' ) );
  common.delegate( 'immutable', bundle );
  common.register( 'lodash.assign', require( 'lodash.assign' ) );
  common.register( 'lodash.find', require( 'lodash.find' ) );
  common.register( 'path-to-regexp', require( 'path-to-regexp' ) );
  common.delegate( 'react', bundle );
  common.register( 'urijs', require( 'urijs' ) );
  bundle.registerLink( 'common/', common );

  bundle.register( '@bind', require( '@stephenbunch/bind' ) );
  bundle.register( '@event', require( '@stephenbunch/event') );
  bundle.register( 'lodash.assign', require( 'lodash.assign' ) );
  bundle.register( 'lodash.isplainobject', require( 'lodash.isplainobject' ) );
  bundle.register( 'lodash.merge', require( 'lodash.merge' ) );
  bundle.register( 'Modernizr', require( 'browsernizr' ) );
  bundle.register( 'path-to-regexp', require( 'path-to-regexp' ) );
  bundle.register( 'setTimeout', window.setTimeout );
  bundle.register( 'urijs', require( 'urijs' ) );
  bundle.register( 'window', window );

  return bundle;
}];
