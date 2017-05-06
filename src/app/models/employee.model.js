
// var mongoose = require('mongoose');

// var EmployeeSchema = new mongoose.Schema({
//   name: { require: true, type: String },
//   phone: { require: false, type: String },
//   email: { require: false, type: String },
//   age: { required: false, type: Number }
// });

// module.exports = mongoose.model('Employee', EmployeeSchema);

module.exports = require('./factory')('Employee', {
  name: { require: true, type: String },
  phone: { require: false, type: String },
  email: { require: false, type: String },
  age: { required: false, type: Number }
});