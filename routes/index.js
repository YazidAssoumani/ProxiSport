var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ProxiSport' });
});

/* GET CGU. */
router.get('/cgu', function(req, res, next) {
  res.render('cgu', {});
});

module.exports = router;
