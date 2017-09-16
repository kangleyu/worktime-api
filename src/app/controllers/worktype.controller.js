var _ = require('lodash');
var handler = require('../common/responseHandler');
var Worktype = require('../models/worktype.model');

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
      return Worktype.create(entity);
    }
  };
};

// get total count of the entries
publicApi.total = function(req, res) {
  return Worktype.count().exec()
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
}

// get page data based on index and size
publicApi.page = function(req, res) {
  const index = req.params.index || 1;
  const size = req.params.size || 10;
  const start = (index - 1) * size;

  return Worktype.find().sort({createdAt: -1}).limit(size).skip(start).exec()
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

publicApi.search = function(req, res) {
  const term = req.params.term;
  const index = req.params.index || 1;
  const size = req.params.size || 10;
  const start = (index - 1) * size;

  return Worktype.find(
        { $text : { $search : term } }
    ).sort({createdAt: -1}).limit(size).skip(start).exec()
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Gets a list of Worktype
publicApi.index = function(req, res) {
  return Worktype.find().sort({createdAt: -1}).exec()
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
  return Worktype.find({ worktype: req.body.worktype }).exec()
    .then(handler.handleEntityExists(req, res))
    .then(createNew())
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