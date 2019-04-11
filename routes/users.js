var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  //vérifier les données reçus en post
  //insérer les données reçu dans la BDD
  //répondre au client avec $id du compte
  res.send('Hello' + ' ' + req.body.name);
});

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  //récupérer les données du compte dans la BDD
  res.send('Voici vos infos :' + req.params.id);
});

router.put('/', function(req, res, next) {
  //récupérer les données du compte dans la BDD
  //Modif les données du compte dans la BDD et dans la page
  res.send('Le compte est MAJ');
});

router.delete('/', function(req, res, next) {
  //Supprimer les données du compte dans la BDD
  res.send('Le compte est supprimer');
});

module.exports = router;
