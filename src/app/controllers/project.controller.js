var _ = require('lodash');
var handler = require('../common/responseHandler');
var Project = require('../models/project.model');

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
      return Project.create(entity);
    }
  };
};

// get total count of the entries
publicApi.total = function(req, res) {
  return Project.count().exec()
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// get page data based on index and size
publicApi.page = function(req, res) {
  const index = parseInt(req.params.index, 10) || 1;
  const size = parseInt(req.params.size, 10) || 10;
  const start = (index - 1) * size;

  return Project.find().sort({createdAt: -1}).limit(size).skip(start).exec()
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

publicApi.search = function(req, res) {
  const term = req.params.term;
  const index = parseInt(req.params.index, 10) || 1;
  const size = parseInt(req.params.size, 10) || 10;
  const start = (index - 1) * size;

  return Project.find(
        { $text : { $search : term } }
    ).sort({createdAt: -1}).limit(size).skip(start).exec()
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Gets a list of Project
publicApi.index = function(req, res) {
  return Project.find().sort({createdAt: -1}).exec()
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Gets a single Project from the DB
publicApi.show = function(req, res) {
  return Project.findById(req.params.id).exec()
    .then(handler.handleEntityNotFound(res))
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Creates a new Project in the DB
publicApi.create = function(req, res) {
  return Project.find({ name: req.body.name }).exec()
    .then(handler.handleEntityExists(req, res))
    .then(createNew())
    .then(handler.respondWithResult(res, 201))
    .catch(handler.handleError(res));
};

// Updates an existing Project in the DB
publicApi.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Project.findById(req.params.id).exec()
    .then(handler.handleEntityNotFound(res))
    .then(handler.saveUpdates(req.body))
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Deletes a Thing from the DB
publicApi.destroy = function(req, res) {
  return Project.findById(req.params.id).exec()
    .then(handler.handleEntityNotFound(res))
    .then(handler.removeEntity(res))
    .catch(handler.handleError(res));
};

module.exports = publicApi;

