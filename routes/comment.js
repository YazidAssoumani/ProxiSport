var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;



var MongoClient = require('mongodb').MongoClient,
//  url="mongodb://localhost:27017/ProxiSport";
 url="mongodb://localhost:27017/proxiSport";

 MongoClient.connect(url,
   {userNewUrlParser:true},
   function(err, client) {
     if(err) throw err;

    //  var DB =client.db('ProxiSport');
     var DB =client.db('proxiSport');

     console.log('Je suis connecté');




     
/////////route ajouter avis
/////rajouter des avis sur l'endroit défini par l'idlieu
  router.post('/:id', function(req, res, next) {
    console.log(req.body)
    console.log(req.params.id)
     var body = req.body ;
     body.idlieu = req.params.id;
    var requiredProps = [ 'comment', 'note', 'idlieu' ]
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

      console.log("Document inserted"+result);
      res.json({
        result : 'OK',
        id : result.insertedId.toString()
      });
      })
    })

    ////////route supprimer avis   
    /////on supprime l'avis defini dans le lieu représenté par idlieu
router.delete('/:id', function(req, res, next) {
  console.log(req.params.id)
  var body = req.body ;
  body.idlieu = req.params.id;

  // DB.collection('comments').removeOne({_id: ObjectId(req.params.id)})
  DB.collection("comments").deleteOne(body, function(err, result) {
    if (err) throw err;
    // console.log("document deleted"+result); 
    //reponse au client
    res.send('Avis supprimé');
  });
   

});

  

router.put('/:idlieu/:idavis', function(req, res, next) {

    var var_idlieu= {_id : new ObjectId(req.params.idavis)};
     console.log(var_idlieu)

     var new_comment = req.body.comment,
        new_note = req.body.note;
       

        console.log(new_comment)
        console.log(new_note)

      console.log(req.params.idlieu)
      var new_val = {$set : {comment : new_comment, note : new_note}};
      console.log(new_val);

      //var body = {$set : {comment : "new_comment", note : "new_note", idlieu : "new_idlieu"}};

    DB.collection('comments').updateOne(var_idlieu, new_val, function(err, result){
        if (err) throw err;
        // console.log("avis maj");
         res.send('Le compte est MAJ');
       }
      );
    //récupérer les données du compte dans la BDD
    //Modif les données du compte dans la BDD et dans la page
    
  });

////////route affichage avis 
////On récupère tous les comments qui concerne le lieu defini par idlieu
router.get('/:id', function(req, res, next) {
  //appeler la base de donnee
    DB.collection('comments').find({idlieu:req.params.id}).toArray(function(err,comments) {
    if(err) throw err ;
    console.log(comments) ;
    //[ {}, {} ]
    //reponse au client
    res.json(comments) ;
  });
})
  



});

module.exports = router;

