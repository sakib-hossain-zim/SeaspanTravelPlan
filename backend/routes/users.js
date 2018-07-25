var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var sqlquery = 'SELECT * FROM event';
var sqlquery_travelPlan = 'SELECT * FROM travelplan';
var sqlquery_addTraveller = 'SELECT traveller_event.VSY_IndexNo, traveller_event.Event_id, event.TravelPlan_id from ((traveller_event INNER JOIN event ON event.Event_id = traveller_event.Event_id) INNER JOIN travelplan ON event.TravelPlan_id = travelplan.TravelPlan_id)';

var bodyParser = require('body-parser');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Topoftheworld10!',
  database: 'travelplanmysqlserverdatabase',
  port: 3308
});

connection.connect(err => {
  if(err){
    return err;  }
});

console.log(connection);


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

router.post('/event/new', function(req, res, next) {
    var postData = req.body;
    connection.query('INSERT INTO event SET ?',postData, function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});


router.get('/travelplan/view',(req,res) => {
  connection.query(sqlquery_travelPlan,(err,results) => {
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


router.post('/travelplan/new', function(req, res, next) {
    var postData = req.body;
    connection.query('INSERT INTO travelplan SET ?',postData, function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});




router.post('/addTraveller/new', function(req, res, next) {
    var postData = req.body;
    connection.query('INSERT INTO traveller_event SET ?',postData, function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});



router.get('/addTraveller/view',(req,res) => {
  connection.query(sqlquery_addTraveller,(err,results) => {
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
