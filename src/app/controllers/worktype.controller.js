var _ = require('lodash');
var handler = require('../common/responseHandler');
var Worktype = require('../models/worktype.model');

var publicApi = {};

// Gets a list of Worktype
publicApi.index = function(req, res) {
  return Worktype.find().exec()
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Gets a single Worktype from the DB
publicApi.show = function(req, res) {
  return Worktype.findById(req.params.id).exec()
    .then(handler.handleEntityNotFound(res))
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Creates a new Worktype in the DB
publicApi.create = function(req, res) {
  return Worktype.create(req.body)
    .then(handler.respondWithResult(res, 201))
    .catch(handler.handleError(res));
};

// Updates an existing Worktype in the DB
publicApi.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Worktype.findById(req.params.id).exec()
    .then(handler.handleEntityNotFound(res))
    .then(handler.saveUpdates(req.body))
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Deletes a Worktype from the DB
publicApi.destroy = function(req, res) {
  return Worktype.findById(req.params.id).exec()
    .then(handler.handleEntityNotFound(res))
    .then(handler.removeEntity(res))
    .catch(handler.handleError(res));
};

module.exports = publicApi;