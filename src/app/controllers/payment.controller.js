var _ = require('lodash');
var handler = require('../common/responseHandler');
var Payment = require('../models/payment.model');

var publicApi = {};

// get total count of the entries
publicApi.total = function(req, res) {
  return Project.count().exec()
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
}

// get page data based on index and size
publicApi.page = function(req, res) {
  const index = req.params.index | 1;
  const size = req.params.size || 10;
  const start = (index - 1) * size;

  return Project.find().limit(size).skip(start).exec()
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

publicApi.search = function(req, res) {
  const term = req.params.term;
  const index = req.params.index | 1;
  const size = req.params.size | 10;
  const start = (index - 1) * size;

  return Project.find(
        { $text : { $search : term } }
    ).limit(size).skip(start).exec()
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Gets a list of Payment
publicApi.index = function(req, res) {
  return Payment.find().exec()
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Gets a single Payment from the DB
publicApi.show = function(req, res) {
  return Payment.findById(req.params.id).exec()
    .then(handler.handleEntityNotFound(res))
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

// Creates a new Payment in the DB
publicApi.create = function(req, res) {
  return Payment.create(req.body)
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
