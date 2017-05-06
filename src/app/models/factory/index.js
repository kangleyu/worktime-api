var mongoose = require('mongoose');

function createModel(name, options) {
  var modelSchema = new mongoose.Schema(options);
  return mongoose.model(name, modelSchema);
}

module.exports = createModel;