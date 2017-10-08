var express = require('express');
var controller = require('../controllers/project.controller');
var authenticator = require('../helpers/authenticator');

var router = express.Router();

// searching and pagination api
router.get('/page/:index', authenticator.ensureAuthorized, controller.page);
router.get('/page/:index/size/:size', authenticator.ensureAuthorized, controller.page);
router.get('/total', authenticator.ensureAuthorized, controller.total);
router.get('/search/:term', authenticator.ensureAuthorized, controller.search);
router.get('/search/:term/page/:index', authenticator.ensureAuthorized, controller.search);
router.get('/search/:term/page/:index/size/:size', authenticator.ensureAuthorized, controller.search);

router.get('/', authenticator.ensureAuthorized, controller.index);
router.get('/:id', authenticator.ensureAuthorized, controller.show);
router.post('/', authenticator.ensureAuthorized, controller.create);
router.put('/:id', authenticator.ensureAuthorized, controller.update);
router.patch('/:id', authenticator.ensureAuthorized, controller.update);
router.delete('/:id', authenticator.ensureAuthorized, controller.destroy);

module.exports = router;

