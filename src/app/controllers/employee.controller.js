var _ = require('lodash');
var handler = require('../common/responseHandler');
var Employee = require('../models/employee.model');

var publicApi = {};

// Gets a list of Employee
publicApi.index = function(req, res) {
  return Employee.find().exec()
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Gets a single Employee from the DB
publicApi.show = function(req, res) {
  return Employee.findById(req.params.id).exec()
    .then(handler.handleEntityNotFound(res))
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Creates a new Employee in the DB
publicApi.create = function(req, res) {
  console.log(JSON.stringify(req.body));
  return Employee.create(req.body)
    .then(handler.respondWithResult(res, 201))
    .catch(handler.handleError(res));
};

// Updates an existing Employee in the DB
publicApi.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Employee.findById(req.params.id).exec()
    .then(handler.handleEntityNotFound(res))
    .then(handler.saveUpdates(req.body))
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Deletes a Thing from the DB
publicApi.destroy = function(req, res) {
  return Employee.findById(req.params.id).exec()
    .then(handler.handleEntityNotFound(res))
    .then(handler.removeEntity(res))
    .catch(handler.handleError(res));
};

module.exports = publicApi;