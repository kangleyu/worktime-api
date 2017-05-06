
module.exports = require('./factory')('Employee', {
  name: { require: true, type: String },
  phone: { require: false, type: String },
  email: { require: false, type: String },
  age: { required: false, type: Number }
});