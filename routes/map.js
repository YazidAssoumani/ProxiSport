var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //récupérer les données sélectionner par l'utilisateur dans la BDD (API)
  //Afficher dans la map le lieu selectionner.
  res.send('Voici le lieu choisi');
});

router.post('/', function(req, res, next) {
  //vérifier les données reçus en post
  //insérer les données reçu dans la BDD
  //répondre au client avec $id du compte
  res.send('Le point a été ajouté');
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
