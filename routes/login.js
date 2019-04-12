var express = require('express'),
router = express.Router(),
MongoClient = require('mongodb').MongoClient,
url = 'mongodb://localhost:27017/proxiSport';

MongoClient.connect(url, {useNewUrlParser:true}, function(err, client) {
  if (err) throw err;

  var DB = client.db('proxiSport');
  console.log('Je suis connecté !');





  router.post('/', function(req, res, next) {

    //vérifier les données reçus en post
    var requiredProps = ['password','email'];
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