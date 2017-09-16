var express = require('express');
var controller = require('../controllers/statics.controller');

var router = express.Router();

// pagination api
router.get('/worktime', controller.worktime.statics);
router.get('/payment', controller.payment.statics);

module.exports = router;

