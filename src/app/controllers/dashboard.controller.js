var _ = require('lodash');
var handler = require('../common/responseHandler');
var Worktime = require('../models/worktime.model');
var Payment = require('../models/payment.model');
var Employee = require('../models/employee.model');
var Project = require('../models/project.model');
var Worktype = require('../models/worktype.model');

// var helper = require('../helpers/dashboard.employee');
var helper = require('../helpers/index');

var publicApi = {};

publicApi.generalInfo = function (req, res) {
  // Project Total
  // Payments Total
  // Employee Total
  // Male Total
  // Femake Total
  // Worktypes Total
  helper.general.getProjectGeneral()
  .then(helper.general.getPaymentsGeneral(req, res))
  .then(helper.general.getEmployeeGeneral(req, res))
  .then(helper.general.getWorktypesGeneral(req, res))
  .then(handler.respondWithResult(res))
  .catch(handler.handleError(res));
};

publicApi.projectsInfo = function (req, res) {
};

publicApi.employeeInfo = function (req, res) {
  Employee.aggregate(helper.employee.getAggregateCondition(true))
    .then(helper.employee.fillDefatuls())
    .then(helper.employee.aggregateFemale())
    .then(handler.respondWithResult(res))
    .catch(handler.handleError(res));
};

publicApi.worktypesInfo = function (req, res) {
};

publicApi.worktimesInfo = function (req, res) {
};

publicApi.paymentsInfo = function (req, res) {
};

publicApi.worktimesPerYearMonth = function (req, res) {
};

publicApi.paymentsPerYearMonth = function (req, res) {
};

module.exports = publicApi;