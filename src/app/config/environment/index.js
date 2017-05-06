var path = require('path');
var _ = require('lodash');

var base = {
  env: process.env.NODE_ENV || 'dev'
};

module.exports = _.merge(
  base,
  require('./shared'),
  require('./' + base.env + '.js' ) || {}
);