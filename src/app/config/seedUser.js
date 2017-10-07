/**
 * Seed the User data for developement or testing purpose (NO production usage)
 */
'use strict';

var User = require('../models/user.model');

User.find({}).remove()
.then(() => {
  User.create(
    {
      username: "wenyanqin",
      password: "wyq2017"
    }
  );
  User.create(
    {
      username: "yanyeli",
      password: "yyl2017"
    }
  );
});