var _ = require('lodash');
var option = require('./base.options')();

module.exports = require('./factory')('Worktime', _.merge(option, {
  employee: { require: true, type: String },
  project: { require: true, type: String },
  worktype: { require: true, type: String },
  year: { type: Number },
  month: { type: Number },
  worktime: { type: Number, default: 0 },
  verified: { type: Boolean, default: false }
}), {
  employee: 'text', 
  project: 'text', 
  worktime: 'text', 
  worktype: 'text' 
});