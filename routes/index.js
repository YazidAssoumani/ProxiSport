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

router.get('/connexion_user', function(req, res, next) {
  res.render('connexion_user', {});
});

router.get('/create_user', function(req, res, next) {
  res.render('create_user', {});
});

router.get('/update_user', function(req, res, next) {
  res.render('update_user', {});
});

module.exports = router;
