var express = require('express');
var controller = require('../controllers/statics.controller');

var router = express.Router();

// pagination api
router.get('/worktime', controller.worktime.statics);
router.get('/worktime/total', controller.worktime.total);
router.get('/payment', controller.payment.statics);
router.get('/payment/total', controller.payment.total);

module.exports = router;

