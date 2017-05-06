module.exports = function() {
  /**
   * Variables
   */
  var server = './src/';

  var config = {
    /**
     * File Path
     */
    alljs: [
      server + '**/*.js',
      './*.js'
    ],

    /**
     * Node Settings
     */
    defaultPort: 8010,
    nodeServer: server + 'server.js'
  };

  return config;
};