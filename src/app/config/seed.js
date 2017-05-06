/**
 * Seed the database for developement or testing purpose (NO production usage)
 */
'use strict';

var Employee = require('../models/employee.model');
var Project = require('../models/project.model');
var Worktype = require('../models/worktype.model');
var Worktime = require('../models/worktime.model');
var Payment = require('../models/payment.model');

Employee.find({}).remove()
.then(() => {
  console.log('### Cleaned Employee Data');
});

Project.find({}).remove()
.then(() => {
  console.log('### Cleaned Project Data');
});

Worktype.find({}).remove()
.then(() => {
  console.log('### Cleaned Worktype Data');
});

Worktime.find({}).remove()
.then(() => {
  console.log('### Cleaned Worktime Data');
});

Payment.find({}).remove()
.then(() => {
  console.log('### Cleaned Payment Data');
});