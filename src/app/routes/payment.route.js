var express = require('express');
var controller = require('../controllers/payment.controller');

var router = express.Router();

// searching and pagination api
router.get('/page/:index', controller.page);
router.get('/page/:index/size/:size', controller.page);
router.get('/total', controller.total);
router.get('/search/:term', controller.search);
router.get('/search/:term/page/:index', controller.search);
router.get('/search/:term/page/:index/size/:size', controller.search)

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;

