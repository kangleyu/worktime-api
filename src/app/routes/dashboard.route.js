var express = require('express');
var controller = require('../controllers/dashboard.controller');
var authenticator = require('../helpers/authenticator');

var router = express.Router();

router.get('/general', authenticator.ensureAuthorized, controller.generalInfo);
router.get('/employee', authenticator.ensureAuthorized, controller.employeeInfo);
router.get('/projectsInfo', authenticator.ensureAuthorized, controller.projectsInfo);
router.get('/worktypesInfo', authenticator.ensureAuthorized, controller.worktypesInfo);
router.get('/worktimesInfo', authenticator.ensureAuthorized, controller.worktimesInfo);
router.get('/paymentsInfo', authenticator.ensureAuthorized, controller.paymentsInfo);
router.get('/worktimes/:year/:month', authenticator.ensureAuthorized, controller.worktimesPerYearMonth);
router.get('/payments/:year/:month', authenticator.ensureAuthorized, controller.paymentsPerYearMonth);

module.exports = router;

