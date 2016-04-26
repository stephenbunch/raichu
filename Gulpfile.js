require('babel-polyfill');

var gulp = require( 'gulp' );
var arceus = require( 'arceus' );

gulp.task( 'make', function() {
  return arceus.js.babelify({
    source: 'src/**/*',
    outdir: 'dist'
  });
});

gulp.task( 'clean', function() {
  return arceus.util.deleteAsync( 'dist' );
});

gulp.task( 'watch', function() {
  arceus.js.babelifyWatch({
    source: 'src/**/*',
    outdir: 'dist',
    callback() {
      arceus.util.log( 'build succeeded' );
    }
  });
});

gulp.task( 'bundle', function() {
  return arceus.js.bundle({
    entry: 'src/client/index.js',
    outfile: 'bundle/raichu.js',
    config: {
      browserify: {
        standalone: 'Raichu'
      }
    }
  });
});

gulp.task( 'default', function() {
  return arceus.util.gulpAsync( gulp, 'clean', 'make', 'bundle' );
});
