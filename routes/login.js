var express = require('express'),
router = express.Router(),
MongoClient = require('mongodb').MongoClient,
url = 'mongodb://localhost:27017/proxiSport';

MongoClient.connect(url, {useNewUrlParser:true}, function(err, client) {
  if (err) throw err;

  var DB = client.db('proxiSport');
  console.log('Je suis connecté !');

  router.post('/', function(data, res, next) {

    //vérifier les données reçus en post
    
    //insérer les données reçu dans la BDD
    DB.collection('users').findOne({email : data.email}, function(err, result){
      if (err) throw err;
      
      //répondre au client avec $id du compte
      if (result == '' || result == null){
        res.send('Email non valide');
        
      }
      if (result.password != data.password || data.password == null){
        res.send('Identifiant/Mdp incorrect');
      }
      else{
        connectedUsers.set(result._id.toString(), result) ;
        res.cookie('token', result._id.toString());
      }
    });
    
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

var connectedUsers = {} ;
module.exports = function(users) {
 connectedUsers = users ;
 return router;
};