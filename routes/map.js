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

var MongoClient = require('mongodb').MongoClient,
url="mongodb://localhost:27017/ProxiSport";

MongoClient.connect(url,
{userNewUrlParser:true},
function(err, client) {
  if(err) throw err;
  var DB =client.db('ProxiSport');
  console.log('Je suis connecté');

/////////route ajouter avis
  router.post('/:id', function(req, res, next) {
    console.log(req.body);
    console.log(req.params.id);

    var body = req.body;
    body.idlieu = req.params.id;
    var requiredProps = [ 'comment', 'note', 'idlieu' ];

    for(var i in requiredProps){
      if(typeof body[requiredProps[i]] == 'undefined'){
        console.log(requiredProps[i]+'empty');
        return res.send(requiredProps[i]+'empty');
      }
    }

     //ajouter la base de donnee
    DB.collection('comments').insertOne(body, function(err, result){
      //reponse au client
      if(err) throw err;
      console.log(result);
      res.json({
        result : 'OK',
        id : result.insertedId.toString()
      });
    })
  })

////////route supprimer avis   
  router.delete('/:id', function(req, res, next) {
    console.log(req.params.id)
      //reponse au client
    res.send('Avis supprimé'+req.params.id);
  });

////////route modifier avis 
  router.put('/:id/:idavis', function(req, res, next) { 
    console.log(req.params.idavis)
    console.log(req.body)

    ///manque la partie update
    res.send(' Avis changé' );  
  });

////////route affichage avis 
  router.get('/:id', function(req, res, next) {
    //appeler la base de donnee
    DB.collection('comments').find({idlieu:req.params.id}).toArray(function(err,comments) {
      if(err) throw err ;
      console.log(comments) ;
      //[ {}, {} ]
      //reponse au client
      res.json(comments) ;
    });
  });
});

module.exports = router;