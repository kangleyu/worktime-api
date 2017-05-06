module.exports = function() {
  /**
   * Variables
   */
  var root = './';
  var server = './src/';
  var build = './build/';
  var specRunnerFile = 'specs.html';

  var config = {
    /**
     * File Path
     */
    alljs: [
      server + '**/*.js',
      './*.js'
    ],
    allfiles: server + '**/*.*',
    servejs: server + '**/*.js',
    server: server,
    build: build,

    /**
     * Node Settings
     */
    defaultPort: 8010,
    nodeServer: server + 'server.js',

    /**
     * Spec settings
     */
    specRunner: root + specRunnerFile,
    specRunnerFile: specRunnerFile,
    testlibraries: [
      'node_modules/mocha/mocha.js',
      'node_modules/chai/chai.js',
      'node_modules/mocha-clean/index.js',
      'node_modules/simon-chai/sinon-chai.js',
    ],
    specs: [
      server + '**/*.spec.js'
    ],

    /**
     * Build server
     */
    buildServer: build + 'server.js'
  };

  return config;
};