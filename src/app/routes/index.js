var express = require('express');
var router = express.Router();

router.get('/employee', function (req, res) {
  res.json({
    'name': 'Tom',
    'phone': '1391000000'
  });
});

module.exports = router;