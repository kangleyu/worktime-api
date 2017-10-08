var _ = require('lodash');
var handler = require('../common/responseHandler');
var Worktime = require('../models/worktime.model');
var Payment = require('../models/payment.model');
var Employee = require('../models/employee.model');
var Project = require('../models/project.model');
var Worktype = require('../models/worktype.model');

var publicApi = {};

publicApi.getProjectGeneral = function() {
  return Project.distinct('name').count().exec()
  .then(function() {
    return function(entity) {
      var result = {};
      result.totalProjects = entity;
      return result;
    };
  }());
};

publicApi.getPaymentsGeneral = function(req, res) {
  return function(entity) {
    return Payment.aggregate([
      { $group: { _id: null, total:{ $sum: '$paid' }}}
    ])
    .then(function() {
      return function(internalEntity) {
        if (internalEntity !== undefined && internalEntity[0] !== undefined) {
          entity.totalPayments = internalEntity[0].total;
        } else {
          entity.totalPayments = '0';
        }
        return entity;
      };
    }());
  };
};

publicApi.getEmployeeGeneral = function(req, res) {
  return function(entity) {
    return Employee.distinct('name').count().exec()
    .then(function() {
      return function(entity1) {
        if (entity1 !== undefined) {
          entity.totalEmployee = entity1;
        }
        return entity;
      };
    }())
    .then(function() {
      return function(entity) {
        return Employee.where('gender', '男').count().exec()
        .then(function() {
          return function(entity1) {
            if (entity1 !== undefined) {
              entity.totalMales = entity1;
            }
            return entity;
          };
        }());
      };
    }())
    .then(function() {
      return function(entity) {
        return Employee.where('gender', '女').count().exec()
        .then(function() {
          return function(entity1) {
            if (entity1 !== undefined) {
              entity.totalFemales = entity1;
            }
            return entity;
          };
        }());
      };
    }());
  };
};

publicApi.getWorktypesGeneral = function(req, res) {
  return function(entity) {
    return Worktype.distinct('worktype').count().exec()
    .then(function() {
      return function(entity1) {
        if (entity1 !== undefined) {
          entity.totalWorktypes = entity1;
        }
        return entity;
      };
    }());
  };
};

module.exports = publicApi;