var _ = require('lodash');
var url = require('url');
var handler = require('../common/responseHandler');
var Worktime = require('../models/worktime.model');
var Payment = require('../models/payment.model');

var worktime = {};
var payment = {};
var publicApi = {
  'worktime': worktime,
  'payment': payment
};

function getWorktimeAggregate(sortKey, groupKey, start, size, pl, res) {
  return Worktime.aggregate([
    { $project: { _id:0, project:1, employee:1, worktype:1, year:1, month:1, worktime:1} },
    { $group: { _id: groupKey, 'totalWorktime': {$sum: '$worktime'}}},
    { $sort: sortKey },
    { $skip: start },
    { $limit: size }
  ])
  .then(handler.respondWithResultMapping(res, pl))
  .catch(handler.handleError(res));
}

function getWorktimeTotal(groupKey, res) {
  return Worktime.aggregate([
    { $project: { _id:0, project:1, employee:1, worktype:1, year:1, month:1, worktime:1} },
    { $group: { _id: groupKey, 'totalWorktime': {$sum: '$worktime'}}},
    { $group: { _id: null, count: {$sum: 1}}}
  ])
  .then(handler.respondWithResult(res))
  .catch(handler.handleError(res));
}

function getPaymentAggregate(sortKey, groupKey, start, size, pl, res) {
  return Payment.aggregate([
    { $project: { _id:0, project:1, employee:1, worktype:1, year:1, month:1, paid:1} },
    { $sort: sortKey },
    { $group: { _id: groupKey, 'totalPaid': {$sum: '$paid'}}},
    { $skip: start },
    { $limit: size },
    { $sort: { _id: 1}},
  ])
  .then(handler.respondWithResultMapping(res, pl))
  .catch(handler.handleError(res));
}

function getPaymentTotal(groupKey, res) {
  return Payment.aggregate([
    { $project: { _id:0, project:1, employee:1, worktype:1, year:1, month:1, paid:1} },
    { $group: { _id: groupKey, 'totalPaid': {$sum: '$paid'}}},
    { $group: { _id: null, count: {$sum: 1}}},
  ])
  .then(handler.respondWithResult(res))
  .catch(handler.handleError(res));
}

function getStaticsData(req, res, model, action) {
  var urlParts = url.parse(req.url, true);
  var query = urlParts.query;
  const index = parseInt(query.page) || 1;
  const size = parseInt(query.size) || 10;
  const start = (index - 1) * size;
  const params = query.params || undefined;

  var pl = _.split(params, ';');

  var groupKey = {};
  var sortKey = {};
  var idx = 1;
  _.forOwn(pl, (value) => {
    groupKey['key' + idx] = '$' + value;
    sortKey[value] = 1;
    idx++;
  });
  idx = 1;
  switch(model) {
    case 'worktime': {
      if (action === 'aggregate') {
        getWorktimeAggregate(sortKey, groupKey, start, size, pl, res);
      } else if (action === 'total') {
        getWorktimeTotal(groupKey, res);
      }
    }
    break;
    case 'payment': {
      if (action === 'aggregate') {
        getPaymentAggregate(sortKey, groupKey, start, size, pl, res);
      } else if (action === 'total') {
        getPaymentTotal(groupKey, res);
      }
    }
    break;
  }
}

/**
 * Worktime Statics API
 * possible aggregate parameters
 * project
 * employee
 * worktime
 * month
 * year
 * the order of aggregation are not determined, it was random passed.
 */

// Interface #1 - Get worktime statics data based on passed parameter
// passed parameter - 
// P1 - page/size (this part of paramter is through query string)
// P2 - aggregate parameters, this is through request body like 
// '{ params: 'project;employee;worktype;month;year' }'
// Respone should be like below
// { page: 1, total: 3, data: { [all responed objects] } }

worktime.statics = function (req, res) {
  return getStaticsData(req, res, 'worktime', 'aggregate');
};

worktime.total = function (req, res) {
  return getStaticsData(req, res, 'worktime', 'total');
};

payment.statics = function (req, res) {
  return getStaticsData(req, res, 'payment', 'aggregate');
};

payment.total = function(req, res) {
  return getStaticsData(req, res, 'payment', 'total');
};

module.exports = publicApi;