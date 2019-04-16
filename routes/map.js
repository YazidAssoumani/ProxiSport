var express = require('express');
var router = express.Router();
ObjectId = require('mongodb').objectId,


//---------Connexion BDD---------------
MongoClient= require('mongodb').MongoClient,
url = "mongodb://localhost:27017/ProxiSport";
MongoClient.connect(url, {useNewUrlParser:true}, function(err, client) {
    if(err) throw err;

    var DB = client.db('ProxiSport') ;
    console.log('Connecté');

// plus paranthéses fin des routes
// ------ BDD ------------------------
// GET Maps listing.
  //récupérer les données sélectionner par l'utilisateur dans la BDD (API)
  //Afficher dans la map le lieu selectionner.
  router.get('/', function(req, res, next) {

  //  var [lat,lng] = req.query.coords.split(',');
  //  var sports_choisi = req.query.sports;
  console.log(req.query)
    DB.collection('maps').find(req.query).toArray(function(err, maps){
      if(err) throw err ;

    // Tableau objets toute les maps

  res.json(maps);
  

  })

});




//////////////////// INSERER LIEUX BDD


router.post('/', function(req, res, next) {

  var body = req.body ;
  // body.idmap = req.params.id ;

if(!body.type){
  return res.send('Indiquez le type');
}
if(!body.coords){
  return res.send('Indiquez coordonnées');
}
if(!body.coords.lng){
  return res.send('Indiquez coordonnées lng');
}
if(!body.coords.lat){
  return res.send('Indiquez coordonnées lat');
}


  DB.collection('maps').insertOne(body, (function(err, result){
    if (err) throw err;
    console.log(result);
    //répondre au client avec $id du compte
    res.json({
      result : 'ok',
      id : result.insertedId.toString()
    });
  }) );
})

  

/////////////AFFICHER DETAILS DU LIEUX 


router.get('/id', function(req, res, next) {
  DB.collection('maps').find({idlieu:req.params.id}).toArray(function(err,maps) {
    if(err) throw err ;
    console.log(maps) ;
    //[ {}, {} ]
    //reponse au client
    res.json(maps) ;
  res.send('Voici le détail du lieu');
});


/////////////MISE A JOUR LIEUX


router.put('/maps/:id', function(req, res, next) {
  //récupérer les données du compte dans la BDD
  //Modif les données du compte dans la BDD et dans la page
  console.log(req.params.idmaps)
  console.log(req.body)
  
  res.send('Le compte est MAJ');
});

/////////////SUPPRIMER LIEUX

router.delete('/', function(req, res, next) {
    console.log(req.params.id);
    res.send('Lieux supprimée');
  });





/////////////////// AVIS/////////////////////////



/////////route ajouter avis
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
})

////////route modifier avis 
router.put('/:id/:idavis', function(req, res, next) { 
  console.log(req.params.idavis)
  console.log(req.body)

          ///manque la partie update
  res.send(' Avis changé' );

})

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
})


})

});

module.exports = router;
