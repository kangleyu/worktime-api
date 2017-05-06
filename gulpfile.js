var gulp = require('gulp');
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({ lazy: true });
var del = require('del');
var config = require('./gulp.config')();

var port = process.env.PORT || config.defaultPort;

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

/**
 * Verify JavaScript code based on jscs and jshint
 */
gulp.task('vet', function() {
  log('Analyzing source with JHint and JSCS...');

  return gulp.src(config.alljs)
    .pipe($.plumber())
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

/**
 * Start server
 */
gulp.task('serve-dev', function() {
  var isDev = true;

  var nodeOptions = {
    script: config.nodeServer,
    delayTime: 1,
    env: {
      'PORT': port,
      'NODE_ENV': isDev ? 'dev' : 'prod'
    },
    watch: [config.server]
  };
  
  return $.nodemon(nodeOptions)
    .on('restart', function(evt) {
      log('*** nodemon restarted ***');
      log('files changed on restarted: \n' + evt);
    })
    .on('start', function() {
      log('*** nodemon started ***');
    })
    .on('crash', function() {
      log('*** nodemon crashed: script crashed for some reason ***');
    })
    .on('exit', function() {
      log('*** nodemon exited cleanly ***');
    });
});

/**
 * Optimize the js files
 */

gulp.task('build', ['vet'], function() {
  log('Optimizing the javascript files...');
  return gulp.src(config.servejs)
    .pipe($.uglify())
    .pipe(gulp.dest(config.build));
});

gulp.task('clean-build', function(done) {
  var delconfig = [config.build];
  log('Cleaning: ' + $.util.colors.blue(delconfig));
  del(delconfig, done);
});

// gulp.task('build', ['clean-build', 'optimize'], function(done) {
//   done();
// });

gulp.task('serve-build', ['build'], function() {
  serve(false);
});

gulp.task('serve-dev', function() {
  serve(true);
});

gulp.task('test', ['vet'], function(done) {
  startTests(true, done);
});

gulp.task('autotest', ['vet'], function(done) {
  startTests(false, done);
});

///////////
function startTests(singleRun, done) {
  var child;
  var fork = require('child_process').fork;

  var Server = require('karma').Server;
  var excludeFiles = [];
  var serverSpecs = config.serverIntegrationSpecs;

  if (args.startServers) {
    log('starting server');
    var savedEnv = process.env;
    savedEnv.NODE_ENV = 'dev';
    savedEnv.PORT = 8888;
    child = fork(config.nodeServer);
  } else {
    if (serverSpecs && serverSpecs.length) {
      excludeFiles = serverSpecs;
    }
  }

  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: !!singleRun,
    exclude: excludeFiles
  }, karmaCompleted).start();

  function karmaCompleted(karmaResults) {
    log('Karma completed!');
    if (child) {
      log('Shutting down the child process...');
      child.kill();
    }
    if (karmaResults === 1) {
      done('karma: tests failed with code ' + karmaResults);
    } else {
      done();
    }
  }
}

function serve(isDev, specRunner) {
  log('start server with dev: ' + isDev);
  var nodeOptions = {
    script: isDev? config.nodeServer : config.buildServer,
    delayTime: 1,
    env: {
      'PORT': port,
      'NODE_ENV': isDev ? 'dev' : 'build'
    },
    watch: [config.server]
  };

  return $.nodemon(nodeOptions)
    .on('restart', ['vet'], function(evt) {
      log('*** nodemon restarted ***');
      log('files changed on restarted: \n' + evt);
    })
    .on('start', function() {
      log('*** nodemon started ***');
    })
    .on('crash', function() {
      log('*** nodemon crashed: script crashed for some reason ***');
    })
    .on('exit', function() {
      log('*** nodemon exited cleanly ***');
    });
}

function clean(path, done) {
  log('Cleaning: ' + $.util.colors.blue(path));
  del(path).then(() => {
    done();
  });
}

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