var jwt = require('jsonwebtoken');
var config = require('../config/environment');
var User = require('../models/user.model');

publicApi = {};

publicApi.ensureAuthorized = function(req, res, next) {
  var token = req.headers.authorization;
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      username: decoded._doc.username
    }, function(err, user) {
      if (err) throw err;
      if (!user) {
        return res.status(403).send({ status: false, msg: 'User not found.' });
      } else {
        req.body.username = user._doc.username;
        next();
      }
    });
  } else {
    return res.status(403).send({ status: false, msg: 'Please provide valid token.'})
  }
}

module.exports = publicApi;