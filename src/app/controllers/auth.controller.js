var jwt = require('jsonwebtoken');
var config = require('../config/environment');
var User = require('../models/user.model');

var publicApi = {};

publicApi.register = function(req, res) {
  var username = req.body.username || undefined;
  var password = req.body.password || undefined;
  if (username !== undefined && password !== undefined) {
    User.findOne( {'username': username }, function(err, user) {
      if (err) {
        res.json({ status: false, msg: 'Cannot register the user now, pleast try later.'});
      } else {
        if (user) {
          res.json({ status: false, msg: 'Username already exists, please use a different one.'});
        } else {
          var newUser = new User();
          newUser.username = username;
          newUser.password = password;
          newUser.save(function(err) {
            if (err) {
              res.json({ status: false, msg: 'Failed to create new user.'});
            } else {
              res.json({ status: true, msg: 'Create user successfully.'});
            }
          });
        }
      }
    });
  } else {
    res.json({ status: false, msg: 'Failed to create new user, please make sure you provide valid request.'});
  }
};

publicApi.authenticate = function(req, res) {
  var username = req.body.username || undefined;
  var password = req.body.password || undefined;
  if (username !== undefined && password !== undefined) {
    User.findOne({ 'username': username }, function(err, user) {
      if (err) {
        res.json({ status: false, msg: 'Failed to authenticate user.'});
      } else {
        if (user) {
          user.comparePassword(password, function(err, isMatched) {
            if (err) {
              res.json({ status: false, msg: 'Failed to authenticate user.'});
            } else {
              if (isMatched) {
                var token = jwt.sign(user, config.secret);
                res.json({ status: true, token: token });
              } else {
                res.json({ status: false, msg: 'Invalid password' });
              }
            }
          });
        } else {
          res.json({ status: false, msg: 'This user does not exist' });
        }
      }
    });
  } else {
    res.json({ status: false, msg: 'Failed to authenticate user, please make sure you provided valid request.'});
  }
};

module.exports = publicApi;