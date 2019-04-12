var express = require('express'),
router = express.Router(),
ObjectId = require('mongodb').ObjectId,
MongoClient = require('mongodb').MongoClient,
url = 'mongodb://localhost:27017/ProxiSport';

MongoClient.connect(url, {useNewUrlParser:true}, function(err, client) {
  if (err) throw err;

  var DB = client.db('ProxiSport');
  console.log('Je suis connecté !');

  /* GET users listing. */
  router.get('/users', function(req, res, next) {

    DB.collection('users').find({}).toArray(function(err, users){
      if (err) throw err;

      console.log(users);
      res.json(users);
    })
    //récupérer les données du compte dans la BDD
  });





  router.post('/users', function(req, res, next) {

    //vérifier les données reçus en post
    var requiredProps = ['nom', 'prenom', 'email', 'birth'];
    for(var i in requiredProps) {
      if(typeof req.body[requiredProps[i]] == 'undefined'){
        console.log(requiredProps[i] + ' empty');
        return res.send(requiredProps[i] + ' empty');
      } 
    }
    //insérer les données reçu dans la BDD
    db.users.insertOne(req.body, (function(err, result){
      if (err) throw err;
      console.log(result);
      //répondre au client avec $id du compte
      res.json({
        result : 'ok',
        id : result.insertedID.toString()
      });
    }) );
    
  });






router.put('/:id', function(req, res, next) {

  db.produits.update({ id : uid} , {$set : {suspicieux:true}})
  //récupérer les données du compte dans la BDD
  //Modif les données du compte dans la BDD et dans la page
  res.send('Le compte est MAJ');
});

router.delete('/:uid', function(req, res, next) {
  //Supprimer les données du compte dans la BDD
  res.send('Le compte est supprimer');
});

});
module.exports = router;