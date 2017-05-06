/**
 * Base option for mongodb Model Schema
 * createdAt - the time for creating record
 * updatedAt - the time for updating record
 */
module.exports = function() {
  return {
    createdAt: { required: true, type: Date, default: Date.now },
    updatedAt: { required: true, type: Date, default: Date.now }
  };
};