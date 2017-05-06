var _ = require('lodash');
var option = require('./base.options')();

module.exports = require('./factory')('Employee', _.merge(option, {
  name: { require: true, type: String },
  phone: { type: String },
  email: { type: String },
  age: { type: Number },
  gender: { type: String }
}));