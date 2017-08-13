var mongoose = require('mongoose');

function createModel(name, options, indexes) {
  var modelSchema = new mongoose.Schema(options,  { collection: '' + name.toLowerCase() });
  modelSchema.index(indexes);
  return mongoose.model(name, modelSchema);
}

module.exports = createModel;