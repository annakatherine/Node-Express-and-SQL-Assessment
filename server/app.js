var express=require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var pg=require('pg');
var connectionString='postgres://localhost:5432/zoo';

// spin up server
app.listen(3000, 'localhost', function(req, res){
  console.log('3000 is listening');
});

// static route for public folder
app.use(express.static('public'));

// base url, resolve path to index.html
app.get('/', function(req, res){
  console.log('in base url');
  res.sendFile(path.resolve('views/index.html'));
}); // end base url

// creates a new animal from the req.body object that is received
app.post('/addAnimal', urlencodedParser, function(req, res){
  console.log('in addAnimal: ' + req.body.type + " " + req.body.count);
  pg.connect( connectionString, function( err, client, done ){
    client.query('INSERT INTO animals (type, count) VAlUES ($1, $2)', [req.body.type, req.body.count]);
  });
}); // end addAnimal

// send back all records in animals
app.get( '/getAnimals', function( req, res ){
  console.log( 'in get animals' );
// this wil hold our results
  var results =[];
  pg.connect( connectionString, function( err, client, done ){
    // get all user records and store in "query" variable
    var callDB = client.query( 'SELECT * FROM animals;' );
    console.log( "query: " + callDB );
    // push each row in query into our results array
    callDB.on( 'row', function ( row ){
      results.push( row );
    }); // end query push
    callDB.on( 'end', function (){
      return res.json( results );
    }); // end onEnd
    if(err){
      console.log(err);
    } // end error
  }); // end connect
}); // end animals get
