var _ = require('lodash');
var option = require('./base.options')();

module.exports = require('./factory')('Project', _.merge(option, {
  name: { require: true, type: String },
  address: { type: String },
  manager: { type: String },
  state: { type: String, default: '未开工' },
  start: { type: Date },
  end: { type: Date }
}), {
  name: 'text', 
  address: 'text', 
  manager: 'text', 
  state: 'text' 
});