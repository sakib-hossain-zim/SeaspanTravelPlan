var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var sqlquery = 'SELECT * FROM event';
var sqlquery_travelPlan = 'SELECT * FROM travelplan';
var sqlquery_addTraveller = 'SELECT traveller_event.VSY_IndexNo, traveller_event.Event_id, event.TravelPlan_id from ((traveller_event INNER JOIN event ON event.Event_id = traveller_event.Event_id) INNER JOIN travelplan ON event.TravelPlan_id = travelplan.TravelPlan_id)';
var sqlquery_selectTraveller = 'SELECT VSY_IndexNo from traveller';
var sqlquery_budget_viewer = 'SELECT * FROM budget';
var sqlquery_traveller_viewer = 'SELECT * FROM traveller';
var items_query = 'SELECT * FROM items';
var items_onlinetravelrequest_query = 'SELECT onlinetravelrequest.Request_Form_No, items.VSY_IndexNo, items.Event_id, items.TravelPlan_id, items.Budget_id, items.Item_id, items.item_name, items.amount, items.requested_amount, items.status, items.comment, items.reasoning from items Inner Join onlinetravelrequest on items.VSY_IndexNo = onlinetravelrequest.VSY_IndexNo and items.TravelPlan_id = onlinetravelrequest.TravelPlan_id';
var travel_auth_query = 'SELECT * from authorizationplan'
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

router.put('/event/edit', function(req, res, next) {
    connection.query('UPDATE event SET `TravelPlan_id`=?,`event_name`=?,`event_type`=?,`description`=?,`event_location`=?,`month_reported_in_table1`=?,`duration`=?,`event_status`=?,`travel_group`=?,`p6_uniqueid`=?,`weekNo`=?,`meeting_date`=?,`expected_meeting_date`=? where`Event_id`=?',[req.body.TravelPlan_id,req.body.event_name,req.body.event_type,req.body.description,req.body.event_location,req.body.month_reported_in_table1,req.body.duration,req.body.event_status,req.body.travel_group,req.body.p6_uniqueid,req.body.weekNo,req.body.meeting_date,req.body.expected_meeting_date,req.body.Event_id], function (error, results, fields) {
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

router.put('/travelplan/edit', function(req, res, next) {
    connection.query('UPDATE travelplan SET `start_date`=?,`end_date`=?,`source`=?,`destination`=?,`travel_status_bool`=?,`approval_status`=?,`travel_period`=?,`contract`=?,`phase`=?,`nss_program`=?,`planned_budget`=?,`e1_business_unit`=? where `TravelPlan_id`=?',[req.body.start_date,req.body.end_date,req.body.source,req.body.destination,req.body.travel_status_bool,req.body.approval_status,req.body.travel_period,req.body.contract,req.body.phase,req.body.nss_program,req.body.planned_budget,req.body.e1_business_unit,req.body.TravelPlan_id], function (error, results, fields) {
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



router.get('/budget/view',(req,res) => {
  connection.query(sqlquery_budget_viewer,(err,results) => {
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


router.post('/budget/new', function(req, res, next) {
    var postData = req.body;
    connection.query('INSERT INTO budget SET ?',postData, function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

router.put('/budget/edit', function(req, res, next) {
    connection.query('UPDATE budget SET `TravelPlan_id`=?,`VSY_IndexNo`=?,`traveller_company`=?,`travel_status_days`=?,`traveller_labor_category`=?,`estimated_labor_travel_time`=?,`comments`=?,`accomodation_cost`=?,`car_rental_cost`=?,`per_diem_cost`=?,`flight_or_car_cost`=?,`taxi_mileage_gas`=?,`total`=? where `Budget_id`=?',[req.body.TravelPlan_id,req.body.VSY_IndexNo,req.body.traveller_company,req.body.travel_status_days,req.body.traveller_labor_category,req.body.estimated_labor_travel_time,req.body.comments,req.body.accomodation_cost,req.body.car_rental_cost,req.body.per_diem_cost,req.body.flight_or_car_cost,req.body.taxi_mileage_gas,req.body.total,req.body.Budget_id], function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});


router.get('/traveller/view',(req,res) => {
  connection.query(sqlquery_traveller_viewer,(err,results) => {
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


router.put('/traveller/edit', function(req, res, next) {
    connection.query('UPDATE traveller SET `name`=?,`company`=?,`location`=?,`labor_category`=?,`labor_rate`=? where `VSY_IndexNo`=?',[req.body.name,req.body.company,req.body.location,req.body.labor_category,req.body.labor_rate,req.body.VSY_IndexNo], function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});



router.post('/traveller/new', function(req, res, next) {
    var postData = req.body;
    connection.query('INSERT INTO traveller SET ?',postData, function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});





router.get('/traveller/travelplan/:VSY_IndexNo',(req,res) => {
  console.log(req)
  connection.query('SELECT travelplan.TravelPlan_id, traveller_event.Event_id, traveller_event.VSY_IndexNo, travelplan.start_date,travelplan.end_date,travelplan.source,travelplan.destination,travelplan.travel_status_bool,travelplan.approval_status,travelplan.travel_period,travelplan.contract,travelplan.phase,travelplan.nss_program,travelplan.e1_business_unit from ((traveller_event INNER JOIN event ON event.Event_id = traveller_event.Event_id) INNER JOIN travelplan ON event.TravelPlan_id = travelplan.TravelPlan_id) where VSY_IndexNo=?', [req.params.VSY_IndexNo], (err,results) => {
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


router.post('/onlinetravelrequest/new', function(req, res, next) {
    var postData = req.body;
    connection.query('INSERT INTO onlinetravelrequest SET ?',postData, function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});



router.post('/items/new', function(req, res, next) {
    var postData = req.body;
    connection.query('INSERT INTO items SET ?',postData, function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

router.get('/items/view',(req,res) => {
  connection.query(items_query,(err,results) => {
    if(err){
      return res.send(err);
      console.log(err)
    } else {
      return res.json({
        items_data: results
    })
    }
  });
});

router.get('/items/view/:VSY_IndexNo',(req,res) => {
  console.log(req)
  connection.query('SELECT * from items where VSY_IndexNo=?', [req.params.VSY_IndexNo], (err,results) => {
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


router.put('/items/edit', function(req, res, next) {
    connection.query('UPDATE items SET `requested_amount`=? where `Item_id`=?',[req.body.requested_amount,req.body.Item_id], function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});


router.put('/items/editStatus', function(req, res, next) {
    connection.query('UPDATE items SET `status`=? where `Item_id`=?',[req.body.status,req.body.Item_id], function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});





router.get('/itemsotr/view',(req,res) => {
  connection.query(items_onlinetravelrequest_query,(err,results) => {
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


router.post('/travel_auth/new', function(req, res, next) {
    var postData = req.body;
    connection.query('INSERT INTO authorizationplan SET ?',postData, function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});


router.post('/login/auth/',function(req,res){
  var VSY_IndexNo = req.body.VSY_IndexNo;
  var password = req.body.password;
  connection.query('SELECT * from traveller WHERE `VSY_IndexNo` =?', [VSY_IndexNo,password], function(error,results,fields){
    if(error) {
      res.send({
        "code": 400,
        "failed": "error occurred"
      })
    }else {
      if(results.length > 0){
        if(results[0].password == password){
          res.send({
            "code": 200,
            "success": "login successful"
          });
        } else {
          res.send({
            "code": 204,
            "success": "Email and password does not match"
          });
        }
      }
        else {
          res.send({
            "code": 204,
            "success": "VSY_IndexNo does not exist"
          });
        }
      }
    })
  });






router.get('/authorizationplan/view/:VSY_IndexNo',(req,res) => {
  console.log(req)
  connection.query('SELECT * from authorizationplan where VSY_IndexNo=?', [req.params.VSY_IndexNo], (err,results) => {
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
