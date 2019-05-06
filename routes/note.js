var express = require('express'),
router = express.Router(),
ObjectId = require('mongodb').ObjectId,
MongoClient = require('mongodb').MongoClient,
url = 'mongodb://localhost:27017/Mohamed';

var d = new Date();
d = new Date(d.getTime() - 3000000);
var date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
console.log(date_format_str);
//2015-03-31 13:35:00

MongoClient.connect(url, {useNewUrlParser:true}, function(err, client) {
  if (err) throw err;

  var DB = client.db('Mohamed');
  console.log('BDD connecté !');

  /* GET users listing. */
  router.get('/', function(req, res, next) {

    DB.collection('agenda').find({}).toArray(function(err, notes){
      if (err) throw err;

      console.log(notes);
      res.json(notes);
    })
    //récupérer les données du compte dans la BDD
  });

  router.post('/', function(req, res, next) {

    //vérifier les données reçus en post
    var Champs = ['titre', 'description'];
    for(var i in Champs) {
      if(req.body[Champs[i]] == 'undefined' || req.body[Champs[i]] == null || req.body[Champs[i]] == '' ){
        console.log(Champs[i] + ' empty');
        return res.json({message : Champs[i] + ' empty'});
      }
    }

      var newNote = req.body ;
      newNote.dateCreation = date_format_str;
      console.log(date_format_str);

        DB.collection('agenda').insertOne(newNote, function(err, result){
        if (err) throw err;
        console.log(result);

        res.json({
          message : 'ok',
          id : result.insertedId.toString()
        });
      });
    
  });

  router.put('/:id', function(req, res, next) {

    var Champs = ['titre', 'description'];
    for(var i in Champs) {
      if(req.body[Champs[i]] == 'undefined' || req.body[Champs[i]] == null || req.body[Champs[i]] == '' ){
        console.log(Champs[i] + ' empty');
        return res.json({message : Champs[i] + ' empty'});
      }
    }

    // if(req.params.id != user._id.toString()) {
    //   return res.json({ message : "vous ne pouvez changer les données d'un autre compte que le votre"});
    // }
    if( req.params.id == '' || req.params.id == null){
      return res.json({ message : "Identifiant incorrect"});
    }
    var new_titre = req.body.Titre,
    new_description = req.body.Description,
    dateModification = date_format_str;

    var repere = {_id : new ObjectId(req.params.id)};
    var new_values = {$set : {titre : new_titre, description : new_description, dateModification : dateModification}};

    DB.collection('agenda').updateOne(repere, new_values, function(err, result){
      if (err) throw err;

      console.log("MAJ ok");
      res.json({message : 'ok'});
    });
    
  });
  
  router.delete('/:id', function(req, res, next) {

    if( req.params.id == '' || req.params.id == null){
      return res.json({ message : "Identifiant incorrect"});
    }
    DB.collection('agenda').deleteOne({_id: new ObjectId(req.params.id)})
      res.json({message : 'ok'});
    
  });

});


 module.exports = router;
 
