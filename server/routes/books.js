var express = require('express');
var pg = require('pg');
var router = express.Router();
var config = {
  database: 'phi', //name of the database it should look for
  host: 'localhost', //where is your database?
  port: 5432, //the port number for your database
  max: 10, //how many connections allowed at one time? A pool of connections(10)
  idleTimeoutMillis: 30000 //30 seconds to try to connect
};

var pool  = new pg.Pool(config);


// var bookList = [
//   { title: 'Rogue Lawyer', author: 'John Grisham'},
//   { title: 'The Girl on the Train', author: 'Paula Hawkins'},
//   { title: 'Scandalous Behavior', author: 'Stuart Woods'},
//   { title: 'Blue', author: 'Danielle Steel'},
//   { title: 'NYPD Red 4', author: 'James Patterson and Marshall Karp'},
//   { title: 'Brotherhood In Death', author: 'J. D. Robb'},
//   { title: 'Morning Star', author: 'Pierce Brown'},
// ];



router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase){ //error connecting to the database
      console.log('error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500); // if error, let the client know
      //400 level error is client error
      //500 level error is server side error
    } else{
      //We connected to the database!!!
      //Now, we need to get stuff!
      client.query('SELECT * ' +
      'FROM "books";', function(errorMakingQuery, result){
        done();//put the connection back in the pool (10queries only) we already have database info at this point
        if(errorMakingQuery){
          console.log('error making the query: ', errorMakingQuery);
          res.sendStatus(500);
        } else{
          // console.log('success: ', result.rows);
          res.send(result.rows);
        }
      }); //runs the query
    }
  });
  //This will be replaced with a SELECT statement to SQL above
  // res.send(bookList);//booklist needs to be replaced is doen above!
});

router.post('/new', function(req, res){
  //This will be replaced with an INSERT statement to SQL
  var newBook = req.body;
  // bookList.push(newBook);//this line will need to be replaced, booklist does not exist
  // res.sendStatus(200);

  //not adding things to the database
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase){ //error connecting to the database
      console.log('error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500); // if error, let the client know
      //400 level error is client error
      //500 level error is server side error
    } else{
      //We connected to the database!!!
      //Now, we need to get stuff!
      client.query('INSERT INTO books (title, author, edition, publisher) VALUES ($1, $2, $3, $4);', [newBook.title, newBook.author, newBook.edition, newBook.publisher], function(errorMakingQuery, result){
        done();//put the connection back in the pool (10queries only) we already have database info at this point
        if(errorMakingQuery){
          console.log('error making the query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          // console.log('success: ', result.rows);
          res.sendStatus(201); //200 generic sucess, 201 is special success
        }
      }); //runs the query
    }
  });
});

module.exports = router;
