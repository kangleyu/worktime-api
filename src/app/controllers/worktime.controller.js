var _ = require('lodash');
var handler = require('../common/responseHandler');
var Worktime = require('../models/worktime.model');

var publicApi = {};

// Gets a list of Worktime
publicApi.index = function(req, res) {
  return Worktime.find().exec()
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Gets a single Worktime from the DB
publicApi.show = function(req, res) {
  return Worktime.findById(req.params.id).exec()
    .then(handler.handleEntityNotFound(res))
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Creates a new Worktime in the DB
publicApi.create = function(req, res) {
  return Worktime.create(req.body)
    .then(handler.respondWithResult(res, 201))
    .catch(handler.handleError(res));
};

// Updates an existing Worktime in the DB
publicApi.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Worktime.findById(req.params.id).exec()
    .then(handler.handleEntityNotFound(res))
    .then(handler.saveUpdates(req.body))
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Deletes a Worktime from the DB
publicApi.destroy = function(req, res) {
  return Worktime.findById(req.params.id).exec()
    .then(handler.handleEntityNotFound(res))
    .then(handler.removeEntity(res))
    .catch(handler.handleError(res));
};

module.exports = publicApi;