var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var lieux = req.param("lieux");
  var sports = req.param("sports");
  // console.log(lieux);
  // res.sendFile( __dirname + '/index');

  //récupérer les données sélectionner par l'utilisateur dans la BDD (API)

  
  //Afficher dans la map le lieu selectionner.
  res.json(lieux+" "+sports)
});

router.post('/', function(req, res, next) {
  //vérifier les données reçus en post
  //insérer les données reçu dans la BDD


  //répondre au client avec $id du compte
  res.send('Le point a été ajouté');
});

router.get('/', function(req, res, next) {

  //récupérer les données sélectionner par l'utilisateur dans la BDD (API)
  //Afficher dans la map le lieu selectionner.
  res.send('Voici le détail du lieu');
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

////////route ajout avis (comment+note)
router.post('/:id', function(req, res, next) {
  console.log(req.params.id)
  console.log(req.body)

  var avisInserer = 
  {
    "comment" : req.body.comment,
    "note" : req.body.note,
    idlieu : req.params.id,
  }

  //ajouter la base de donnee


  //reponse au client
  res.json(avisInserer);
  });

  ////////route modifier avis 
  router.put('/:id/:idavis', function(req, res, next) { 
    console.log(req.params.idavis)
    console.log(req.body)
    var filter = {
      idlieu : req.params.id,
      idavis : req.params.idavis
    }
    var avisModifier= 
    {
      "comment" : req.body.comment,
      "note" : req.body.note
    }
  
    //modifier la base de donnee


    //reponse au client
    res.json(avisModifier);
  });

////////route affichage avis 
router.get('/', function(req, res, next) {
  //appeler la base de donnee


  //reponse au client
  res.json([ ]);
  });

////////route supprimer avis 
router.delete('/:id', function(req, res, next) {
  console.log(req.params.id)

  //appeler la base de donnee


  //reponse au client
  res.send('Avis supprimé');
});

module.exports = router;
