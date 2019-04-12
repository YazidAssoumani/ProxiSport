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
<<<<<<< ecf95f7f81baec72ca848c4ebf49d6e0c9f4161a
    var Champs = ['nom', 'prenom', 'email', 'birth', 'password'];
    for(var i in Champs) {
      if(typeof req.body[Champs[i]] == 'undefined' || req.body[Champs[i]] == null ){
        console.log(Champs[i] + ' empty');
        return res.send(Champs[i] + ' empty');
      }
=======
    var requiredProps = ['nom', 'prenom', 'email', 'birth', 'password'];
    for(var i in requiredProps) {
      if(typeof req.body[requiredProps[i]] == 'undefined'){
        console.log(requiredProps[i] + ' empty');
        return res.send(requiredProps[i] + ' empty');
      } 
>>>>>>> Debut Login
    }
    //insérer les données reçu dans la BDD
    DB.collection('users').insertOne(req.body, function(err, result){
      if (err) throw err;
      // console.log(result);
      //répondre au client avec $id du compte
      res.json({
        result : 'ok',
        id : result.insertedId.toString()
      });
    });
    
  });




  router.put('/:id', function(req, res, next) {

    var new_nom = req.body.nom,
        new_prenom = req.body.prenom,
        new_email = req.body.email,
        new_birth = req.body.birth;

      var repere = {_id : new ObjectId(req.params.id)};
      var new_values = {$set : {nom : new_nom, prenom : new_prenom, email : new_email, birth : new_birth}};

    DB.collection('users').updateOne(repere, new_values, function(err, result){
        if (err) throw err;

        console.log("MAJ ok");
        res.send('Le compte est MAJ');
<<<<<<< ecf95f7f81baec72ca848c4ebf49d6e0c9f4161a
      });
=======
      }
      );
>>>>>>> Debut Login
    //récupérer les données du compte dans la BDD
    //Modif les données du compte dans la BDD et dans la page
    
  });
  
  router.delete('/:id', function(req, res, next) {
    DB.collection('users').deleteOne({_id: new ObjectId(req.params.id)})
      res.send('Le compte est supprimer');
    
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
