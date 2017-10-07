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
      password: "passw@rd"
    }
  );
});