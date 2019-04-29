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
    var Champs = ['nom', 'prenom', 'email', 'birth', 'password'];
    for(var i in Champs) {
      if(req.body[Champs[i]] == 'undefined' || req.body[Champs[i]] == null || req.body[Champs[i]] == '' ){
        console.log(Champs[i] + ' empty');
        return res.json({message : Champs[i] + ' empty'});
      }
    }

    var birth = Number(req.body.birth),
        regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
        
    if(!regex.test(req.body.email)) {
      res.json({message : 'Renseignez une adresse mail correcte !!'});
    }
    else if(birth>2019 || birth<1920) {
      res.json({message : 'Vote date de naissance est incorrecte'});
    }
    else {
      //verfication existence email
      DB.collection('users').findOne({email : req.body.email}, function(err, result){
        if (err) throw err;
        
        //répondre au client avec $id du compte
        if (result != null && req.body.email == result.email){
          console.log('Email déjà prise');
          return res.json({message : 'Email déjà prise'});          
        }
        else {
          var newUser = req.body ;
            DB.collection('users').insertOne(newUser, function(err, result){
            if (err) throw err;
            // console.log(result);
            //répondre au client avec $id du compte
            newUser._id = result.insertedId ;
            connectedUsers.set(result.insertedId.toString(), newUser);
            res.cookie('token', result.insertedId.toString());
            res.json({
              message : 'ok',
              id : result.insertedId.toString()
            });
          });
        }
      });
      //insérer les données reçu dans la BDD
      
    }
  });

  router.put('/:id', function(req, res, next) {

    var Champs = ['nom', 'prenom', 'email', 'birth', 'password'];
    for(var i in Champs) {
      if(req.body[Champs[i]] == 'undefined' || req.body[Champs[i]] == null || req.body[Champs[i]] == '' ){
        console.log(Champs[i] + ' empty');
        return res.json({message : Champs[i] + ' empty'});
      }
    }

    var token = req.cookies.token ;
    var user = connectedUsers.get(token);
    if(req.params.id != user._id.toString()) {
      return res.json({ message : "vous ne pouvez changer les données d'un autre compte que le votre"});
    }
    if( req.params.id == '' || req.params.id == null){
      return res.json({ message : "Identifiant incorrect"});
    }

    var birth = Number(req.body.birth),
        regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
        
    if(!regex.test(req.body.email)) {
      res.json({message : 'Renseignez une adresse mail correcte !!'});
    }
    if(birth>2019 || birth<1920) {
      res.json({message : 'Vote date de naissance est incorrecte'});
    }

    else{

      DB.collection('users').findOne({email : req.body.email}, function(err, result){
        if (err) throw err;
        
        //répondre au client avec $id du compte
        if (result != null && req.body.email == result.email){
          console.log('Email déjà prise');
          return res.json({message : 'Email déjà prise'});          
        }

        else{

          var new_nom = req.body.nom,
            new_prenom = req.body.prenom,
            new_email = req.body.email,
            new_birth = req.body.birth,
            new_password = req.body.password;

          var repere = {_id : new ObjectId(req.params.id)};
          var new_values = {$set : {nom : new_nom, prenom : new_prenom, email : new_email, birth : new_birth, password : new_password}};

          DB.collection('users').updateOne(repere, new_values, function(err, result){
            if (err) throw err;

            console.log("MAJ ok");
            res.json({message : 'Le compte est MAJ'});
          });
        }
      });
    }
    
  });
  
  router.delete('/:id', function(req, res, next) {
    var token = req.cookies.token ;
    var user = connectedUsers.get(token);
    if(req.params.id != user._id.toString()) {
      return res.json({ message : "vous ne pouvez changer les données d'un autre compte que le votre"});
    }
    if( req.params.id == '' || req.params.id == null){
      return res.json({ message : "Identifiant incorrect"});
    }
    res.cookie('token', '');
    connectedUsers.set(req.params.id, '');
    DB.collection('users').deleteOne({_id: new ObjectId(req.params.id)})
      res.json({message : 'Le compte est supprimer'});
    
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
 
 
 // et dans les modules
 var connectedUsers = {} ;
 module.exports = function(users) {
  connectedUsers = users ;
  return router;
 }
