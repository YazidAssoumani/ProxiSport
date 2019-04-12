var express = require('express'),
router = express.Router(),
ObjectId = require('mongodb').ObjectId,
MongoClient = require('mongodb').MongoClient,
url = 'mongodb://localhost:27017/proxiSport';

MongoClient.connect(url, {useNewUrlParser:true}, function(err, client) {
  if (err) throw err;

  var DB = client.db('proxiSport');
  console.log('Je suis connecté !');

  /* GET users listing. */
  router.get('/', function(req, res, next) {

    DB.collection('users').find({}).toArray(function(err, users){
      if (err) throw err;

      console.log(users);
      res.json(users);
    })
    //récupérer les données du compte dans la BDD
  });





  router.post('/', function(req, res, next) {

    //vérifier les données reçus en post
    var requiredProps = ['nom', 'prenom', 'email', 'birth'];
    for(var i in requiredProps) {
      if(typeof req.body[requiredProps[i]] == 'undefined'){
        console.log(requiredProps[i] + ' empty');
        return res.send(requiredProps[i] + ' empty');
      } 
    }
    //insérer les données reçu dans la BDD
    DB.collection('users').insertOne(req.body, function(err, result){
      if (err) throw err;
      console.log(result);
      //répondre au client avec $id du compte
      res.json({
        result : 'ok',
        id : result.insertedId.toString()
      });
    });
    
  });




  router.put('/:id', function(req, res, next) {
    console.log(req.body);
    var new_nom = req.body.nom2,
      new_prenom = req.body.prenom2,
      new_email = req.body.email2,
      new_birth = req.body.birth2;
      console.log(new_nom, new_prenom, new_email);
      console.log(req.params.id) ;
      console.log(new ObjectId(req.params.id))

    DB.collection('users').updateOne({ 
      _id : new ObjectId(req.params.id)}, 
      {$set : {nom : new_nom, prenom : new_prenom, email : new_email, birth : new_birth}}, function(err, result){
        if (err) throw err;

        res.html('Le compte est MAJ');
      }
      );
    //récupérer les données du compte dans la BDD
    //Modif les données du compte dans la BDD et dans la page
    
  });
  
  router.delete('/:id', function(req, res, next) {
    DB.collection('users').remove({_id: new ObjectId(req.params.id)})
      res.html('Le compte est supprimer');
    
  });



});

// router.get('/:id', function(req, res, next) {
//   console.log(req.params.id)

//   //recuperer en bdd l'utilisateur dont l'id est en parametre

//   DB.collection('users').find({_id : ObjectId(req.params.id)}, (function(err, users){
//     if (err) throw err;

//     console.log(users);
//     res.json(users);
//   }))
//   //récupérer les données du compte dans la BDD
// });

module.exports = router;