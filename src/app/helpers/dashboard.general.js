var _ = require('lodash');
var handler = require('../common/responseHandler');
var Worktime = require('../models/worktime.model');
var Payment = require('../models/payment.model');
var Employee = require('../models/employee.model');
var Project = require('../models/project.model');
var Worktype = require('../models/worktype.model');

publicApi = {};

publicApi.getProjectGeneral = function() {
  return Project.distinct('name').count().exec()
  .then(function() {
    return function(entity) {
      var result = {};
      result.totalProjects = entity;
      return result;
    }
  }())
}

publicApi.getPaymentsGeneral = function(req, res) {
  return function(entity) {
    return Payment.aggregate([
      { $group: { _id: null, total:{ $sum: '$paid' }}}
    ])
    .then(function() {
      return function(internalEntity) {
        entity.totalPayments = internalEntity[0].total;
        return entity;
      }
    }());
  }
}

publicApi.getEmployeeGeneral = function(req, res) {
  return function(entity) {
    return Employee.distinct('name').count().exec()
    .then(function() {
      return function(entity1) {
        entity.totalEmployee = entity1;
        return entity;
      }
    }())
    .then(function() {
      return function(entity) {
        return Employee.where('gender', '男').count().exec()
        .then(function() {
          return function(entity1) {
            entity.totalMales = entity1;
            return entity;
          }
        }())
      }
    }())
    .then(function() {
      return function(entity) {
        return Employee.where('gender', '女').count().exec()
        .then(function() {
          return function(entity1) {
            entity.totalFemales = entity1;
            return entity;
          }
        }())
      }
    }())
  };
}

publicApi.getWorktypesGeneral = function(req, res) {
  return function(entity) {
    return Worktype.distinct('worktype').count().exec()
    .then(function() {
      return function(entity1) {
        entity.totalWorktypes = entity1;
        return entity;
      }
    }());
  }
};

module.exports = publicApi;