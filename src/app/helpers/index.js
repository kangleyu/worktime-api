var employeeHelper = require('./dashboard.employee');
var generalHelper = require('./dashboard.general');

module.exports = { 
  general: generalHelper,
  employee: employeeHelper
};