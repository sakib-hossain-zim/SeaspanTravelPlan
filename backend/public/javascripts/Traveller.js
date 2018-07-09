var http = require('http');
var express = require('express');
var router = express.Router();
var mysql = require('mssql');
var bodyParser = require('body-parser');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//start my sql connection
var connection = mysql.createConnection({
  host : 'travelplansqlserver.database.windows.net',
  user : 'sakib',
  password: 'Topoftheworld10!',
  database: 'TravelPlanSQLDatabase'
});

connection.connect(function(err) {
  if(err) throw console.error('Couldnt establish connection');
  console.log('You are now connected ....')
})
//end mysql createConnection


//start body-parser config
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true;
}));



//rest api to get all the results from Traveller table

router.get('/travellers', function(req,res){
  connection.query('select * from Traveller', function(error,results,fields){
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});


//rest api to insert a Traveller in the table

router.post('/travellers',function(req,res){
  var postData = req.body;
  connection.query('INSERT INTO Traveller SET ?', postData, function(error,results,fields){
    if(error) throw error;
    res.end(JSON.stringify(results));
  });
});


//rest api to update record into mysql TravelPlanSQLDatabase

router.put('/travellers',function(req,res){
  connection.query('UPDATE 'Traveller' SET 'Name'=?, 'Company'=?, 'Loc'=?, 'LaborCategory'=?,'LaborRate'=?',[req.body.Name,req.body.Company,req.body.Loc,req.body.LaborCategory,req.body.LaborRate],function(error,results,fields){
    if(error) throw error;
    res.end(JSON.stringify(results));
  });
});


//rest api to delete record from mysql TravelPlanSQLDatabase

router.delete('/travellers',function(req,res){
  console.log(req.body);
  connection.query('DELETE FROM 'employee' WHERE 'traveller_id'=?',[req.body.traveller_id],function(error,results,fields){
    if(error) throw error;
    res.end('Record has been deleted');
  });

});











module.exports = router;
