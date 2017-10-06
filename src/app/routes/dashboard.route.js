var express = require('express');
var controller = require('../controllers/dashboard.controller');

var router = express.Router();

router.get('/general', controller.generalInfo)
router.get('/employee', controller.employeeInfo);
router.get('/projectsInfo', controller.projectsInfo);
router.get('/worktypesInfo', controller.worktypesInfo);
router.get('/worktimesInfo', controller.worktimesInfo);
router.get('/paymentsInfo', controller.paymentsInfo);
router.get('/worktimes/:year/:month', controller.worktimesPerYearMonth);
router.get('/payments/:year/:month', controller.paymentsPerYearMonth);

module.exports = router;

