var express = require('express');
var controller = require('../controllers/auth.controller');

var router = express.Router();

router.post('/register', controller.register)
router.post('/authenticate', controller.authenticate);

module.exports = router;