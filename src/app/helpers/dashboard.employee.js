var _ = require('lodash');
var Employee = require('../models/employee.model');

var publicApi = {};

/// Private Methods

function fill(source) {
  var template = [
    {
      "_id": "<10",
      "count": 0
    },
    {
      "_id": "10-20",
      "count": 0
    },
    {
      "_id": "20-30",
      "count": 0
    },
    {
      "_id": "30-40",
      "count": 0
    },
    {
      "_id": "40-50",
      "count": 0
    },
    {
      "_id": "50-60",
      "count": 0
    },
    {
      "_id": ">60",
      "count": 0
    }
  ];

  _.forEach(template, (item) => {
    var index = _.findIndex(source, (it) => it._id == item._id);
    if (index != -1) {
      item.count = source[index].count;
    }
  });
  return template;
}

function mergeEmployee(first) {
  return function(entity) {
    first.push({ data: entity.map(item => item.count), label: "女"});
    return first;
  }
}

function fillZeroForOthers(entity) {
  return fill(entity);
}

/// Public API
publicApi.getAggregateCondition = function(isMale) {
  var matchCondition = isMale ? "男" : "女";
  return [
    {
      $match: {
        gender: { $eq: matchCondition }
      }
    },
    {
      $project:
      {
        item: 1,
        age:
        {
          $cond: {
            if: { $gt: ["$age", 60] }, then: ">60", else: {
              $cond: {
                if: { $gt: ["$age", 50] }, then: "50-60", else: {
                  $cond: {
                    if: { $gt: ["$age", 40] }, then: "40-50", else: {
                      $cond: {
                        if: { $gt: ["$age", 30] }, then: "30-40", else: {
                          $cond: {
                            if: { $gt: ["$age", 20] }, then: "20-30", else: {
                              $cond: {
                                if: { $gt: ["$age", 10] }, then: "10-20", else: "<10"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }, {
      $group: { _id: '$age', count: { $sum: 1 } }
    }]
}

publicApi.aggregateFemale = function() {
  return function(entity) {
    var ret = [];
    ret.push({ labels: entity.map(item => item._id)});
    ret.push({ data: entity.map(item => item.count), label: "男" });
    return Employee.aggregate(publicApi.getAggregateCondition(false))
    .then(publicApi.fillDefatuls())
    .then(mergeEmployee(ret))
  }
}

publicApi.fillDefatuls = function() {
  return function(entity) {
    return fillZeroForOthers(entity);
  }
}

module.exports = publicApi;