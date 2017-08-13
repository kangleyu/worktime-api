var _ = require('lodash');
var option = require('./base.options')();

module.exports = require('./factory')('Worktype', _.merge(option, {
  worktype: { require: true, type: String },
  lead: { require: true, type: String }
}), {
  worktype: 'text', 
  lead: 'text'
});