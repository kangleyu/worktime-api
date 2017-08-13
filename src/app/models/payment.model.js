var _ = require('lodash');
var option = require('./base.options')();

module.exports = require('./factory')('Payment', _.merge(option, {
  employee: { require: true, type: String },
  project: { require: true, type: String },
  isUpperHalf: { type: Boolean, default: true },
  worktype: String,
  year: Number,
  month: Number,
  paid: { type: Number, default: 0 }
}), {
  employee: 'text', 
  project: 'text', 
  worktype: 'text', 
  paid: 'text'
});