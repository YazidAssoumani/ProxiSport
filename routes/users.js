var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST user accounts created */
router.post('/', function(req, res, next) {
  // Vérifier les données reçues en POST
  // Insérer les données dans la BDD
  // Répondre aux clients avec l'id du compte
  res.send('Le compte est créé.');
});

module.exports = router;
