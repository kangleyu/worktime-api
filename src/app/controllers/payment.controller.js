var _ = require('lodash');
var handler = require('../common/responseHandler');
var Payment = require('../models/payment.model');

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
      return Payment.create(entity);
    }
  };
};

// get total count of the entries
publicApi.total = function(req, res) {
  return Payment.count().exec()
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// get page data based on index and size
publicApi.page = function(req, res) {
  const index = parseInt(req.params.index, 10) || 1;
  const size = parseInt(req.params.size, 10) || 10;
  const start = (index - 1) * size;

  return Payment.find().sort({createdAt: -1}).limit(size).skip(start).exec()
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

publicApi.search = function(req, res) {
  const term = req.params.term;
  const index = parseInt(req.params.index, 10) || 1;
  const size = parseInt(req.params.size, 10) || 10;
  const start = (index - 1) * size;

  return Payment.find(
        { $text : { $search : term } }
    ).sort({createdAt: -1}).limit(size).skip(start).exec()
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Gets a list of Payment
publicApi.index = function(req, res) {
  return Payment.find().sort({createdAt: -1}).exec()
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Gets a single Payment from the DB
publicApi.show = function(req, res) {
  return Payment.findById(req.params.id).exec()
    .then(handler.handleEntityNotFound(req, res))
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Creates a new Payment in the DB
publicApi.create = function(req, res) {
  return Payment.find({ 
    employee: req.body.employee,
    project: req.body.project,
    worktype: req.body.worktype,
    year: req.body.year,
    month: req.body.month,
    isUpperHalf: req.body.isUpperHalf
   }).exec()
    .then(handler.handleEntityExists(req, res))
    .then(createNew())
    .then(handler.respondWithResult(res, 201))
    .catch(handler.handleError(res));
};

// Updates an existing Payment in the DB
publicApi.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Payment.findById(req.params.id).exec()
    .then(handler.handleEntityNotFound(res))
    .then(handler.saveUpdates(req.body))
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Deletes a Payment from the DB
publicApi.destroy = function(req, res) {
  return Payment.findById(req.params.id).exec()
    .then(handler.handleEntityNotFound(res))
    .then(handler.removeEntity(res))
    .catch(handler.handleError(res));
};

module.exports = publicApi;
