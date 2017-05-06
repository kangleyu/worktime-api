var mongoose = require('mongoose');

function createModel(name, options) {
  var modelSchema = new mongoose.Schema(options,  { collection: '' + name.toLowerCase() });
  return mongoose.model(name, modelSchema);
}

module.exports = createModel;