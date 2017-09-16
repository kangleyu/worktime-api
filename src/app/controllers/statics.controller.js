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
// "{ params: "project;employee;worktype;month;year" }"
// Respone should be like below
// { page: 1, total: 3, data: { [all responed objects] } }

worktime.statics = function (req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  const index = parseInt(query.page) || 1;
  const size = parseInt(query.size) || 10;
  const start = (index - 1) * size;
  const params = query.params || undefined;

  var pl = _.split(params, ';');

  var groupKey = {};
  var idx = 1;
  _.forOwn(pl, (value) => {
    groupKey["key" + idx] = "$" + value;
    idx++;
  })
  idx = 1;

  return Worktime.aggregate([
    { $project: { _id:0, project:1, employee:1, worktype:1, year:1, month:1, worktime:1} },
    { $group: { _id: groupKey, "total_worktime": {$sum: "$worktime"}}},
    { $skip: start },
    { $limit: size },
    { $sort: { _id: 1}},
  ])
  .then(handler.respondWithResult(res))
  .catch(handler.handleError(res));
}

payment.statics = function (req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  const index = parseInt(query.page) || 1;
  const size = parseInt(query.size) || 10;
  const start = (index - 1) * size;
  const params = query.params || undefined;

  var pl = _.split(params, ';');

  var groupKey = {};
  var idx = 1;
  _.forOwn(pl, (value) => {
    groupKey["key" + idx] = "$" + value;
    idx++;
  })
  idx = 1;

  return Payment.aggregate([
    { $project: { _id:0, project:1, employee:1, worktype:1, year:1, month:1, paid:1} },
    { $group: { _id: groupKey, "total_paid": {$sum: "$paid"}}},
    { $skip: start },
    { $limit: size },
    { $sort: { _id: 1}},
  ])
  .then(handler.respondWithResult(res))
  .catch(handler.handleError(res));
}

module.exports = publicApi;