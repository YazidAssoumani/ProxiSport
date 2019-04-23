/*

  executer le script :
  > node import.js

*/
var fs = require('fs'),
  MongoClient = require('mongodb').MongoClient,
  url = 'mongodb://localhost:27017/proxiSport';

MongoClient.connect(url, {useNewUrlParser:true}, function(err, client) {
  if (err) throw err;
  
  var DB = client.db('proxiSport');
  // décommenter pour purger la collection avant import
  // DB.collection('maps').drop();
  
  
  function readLines(input, func) {
    var remaining = '';
    var h = [];
    
    input.on('data', function (data) {
      remaining += data;
      var index = remaining.indexOf('\r');
      while (index > -1) {
        var line = remaining.substring(0, index);
        remaining = remaining.substring(index + 2);
        var row = line.split(';');
        if (!h || !h[1]) {
          h = row;
        } else {
          var obj = {};
          for (var i in h) {
            obj[h[i]] = row[i];
          }
          obj.coords = {lat:obj.EquGpsY.replace("\r", ''), lng:obj.EquGpsX};
          delete obj.EquGpsX;
          delete obj.EquGpsY;
          //func(JSON.stringify(obj)) ;
          DB.collection('maps').insertOne(obj) ;
        }
        index = remaining.indexOf('\n');
      }
    });
    
    input.on('end', function () {
      console.log('-- importé -- ');
      process.exit() ;
    });
  }
  
  function func(data) {
    console.log('Line: ' + data);
  }
  
  var input = fs.createReadStream('proxisport.csv');
  readLines(input, func);
  
});