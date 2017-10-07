var express = require('express');
var controller = require('../controllers/statics.controller');
var authenticator = require('../helpers/authenticator');

var router = express.Router();

// pagination api
router.get('/worktime', authenticator.ensureAuthorized, controller.worktime.statics);
router.get('/worktime/total', authenticator.ensureAuthorized, controller.worktime.total);
router.get('/payment', authenticator.ensureAuthorized, controller.payment.statics);
router.get('/payment/total', authenticator.ensureAuthorized, controller.payment.total);

module.exports = router;

