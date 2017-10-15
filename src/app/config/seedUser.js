/**
 * Seed the User data for developement or testing purpose (NO production usage)
 */
'use strict';

var User = require('../models/user.model');

User.find({}).remove()
.then(() => {
  User.create(
    {
      displayName: '闻燕琴',
      username: 'wenyanqin',
      password: 'wyq2017'
    }
  );
  User.create(
    {
      displayName: '严叶利',
      username: 'yanyeli',
      password: 'yyl2017'
    }
  );
});