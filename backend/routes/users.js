var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var sqlquery = 'SELECT * FROM event';

// /* GET users listing. */
//  router.get('/', function(req, res, next) {
//    res.send('respond with a resource');
//  });

var printer;

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Topoftheworld10!',
  database: 'travelplanmysqlserverdatabase'
});

connection.connect(err => {
  if(err){
    return err;  }
});

console.log(connection);

console.log("Now here");
router.get('/event/view',(req,res) => {
  connection.query(sqlquery,(err,results) => {
    if(err){
      return res.send(err);
      console.log(err)
    } else {
      return res.json({
        data: results

      })


    }
  });
});


module.exports = router;
