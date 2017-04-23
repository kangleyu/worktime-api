var gulp = require('gulp');
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('./gulp.config')();

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('vet', function() {
  log('Analyzing source with JHint and JSCS...');

  return gulp.src(config.alljs)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

///////////
function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}