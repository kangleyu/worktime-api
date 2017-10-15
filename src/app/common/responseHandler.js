'use strict';
var _ = require('lodash');

var publicApi = {};

publicApi.respondWithResult = function(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
};

publicApi.respondWithResultMapping = function(res, params, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      var ret = [];
      _.forEach(entity, (data) => {
        var ent = {};
        _.forEach(params, (value, index) => {
          ent[value] = data._id['key' + (index + 1)];
        });
        ent['totalWorktime'] = parseFloat(data['totalWorktime']).toFixed(2);
        ent['totalPaid'] = parseFloat(data['totalPaid']).toFixed(2);
        ret.push(ent);     
      });
      
      res.status(statusCode).json(ret);
    }
  };
};

publicApi.saveUpdates = function(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
};

publicApi.removeEntity = function(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
};

publicApi.handleEntityNotFound = function(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
};

publicApi.handleEntityExists = function(req, res) {
  return function(entity) {
    if (entity.length > 0) {
      res.status(302).send({
        'ErrorCode': '302',
        'Message': 'Entity already exists.' 
      }).end();
      return null;
    }
    return req.body;
  };
};

publicApi.handleError = function(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
};

module.exports = publicApi;