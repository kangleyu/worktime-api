var _ = require('lodash');
var handler = require('../common/responseHandler');
var Worktime = require('../models/worktime.model');

var publicApi = {};

/**
 * Private methods
 */
var createNew = function() {
  return function(entity) {
    // entity is the param passed down from up chain, 
    // here if it already exists, it will pass down null.
    // otherwise, it pass down req.body
    if(entity) { 
      return Worktime.create(entity);
    }
  };
};

// get total count of the entries
publicApi.total = function(req, res) {
  return Worktime.count().exec()
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
}

// get page data based on index and size
publicApi.page = function(req, res) {
  const index = req.params.index || 1;
  const size = req.params.size || 10;
  const start = (index - 1) * size;

  return Worktime.find().sort({createdAt: -1}).limit(size).skip(start).exec()
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

publicApi.search = function(req, res) {
  const term = req.params.term;
  const index = req.params.index || 1;
  const size = req.params.size || 10;
  const start = (index - 1) * size;

  return Worktime.find(
        { $text : { $search : term } }
    ).sort({createdAt: -1}).limit(size).skip(start).exec()
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Gets a list of Worktime
publicApi.index = function(req, res) {
  return Worktime.find().sort({createdAt: -1}).exec()
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
  return Worktime.find({ 
    employee: req.body.employee, 
    project: req.body.project,
    worktype: req.body.worktype,
    year: req.body.year,
    month: req.body.month
   }).exec()
    .then(handler.handleEntityExists(req, res))
    .then(createNew())
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