var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var cors = require('cors');



var sqlquery = 'SELECT * FROM event';
var sqlquery_travelPlan = 'SELECT * FROM travelplan';
var sqlquery_addTraveller = 'SELECT traveller_event.VSY_IndexNo, traveller_event.Event_id, event.TravelPlan_id from ((traveller_event INNER JOIN event ON event.Event_id = traveller_event.Event_id) INNER JOIN travelplan ON event.TravelPlan_id = travelplan.TravelPlan_id)';
var sqlquery_selectTraveller = 'SELECT VSY_IndexNo from traveller';
var sqlquery_budget_viewer = 'SELECT * FROM budget';
var sqlquery_traveller_viewer = 'SELECT * FROM traveller';
var items_query = 'SELECT * FROM items';
var items_onlinetravelrequest_query = 'SELECT onlinetravelrequest.Request_Form_No, items.VSY_IndexNo, items.Event_id, items.TravelPlan_id, items.Budget_id, items.Item_id, items.item_name, items.amount, items.requested_amount, items.status, items.comment, items.reasoning, items.note_from_coordinator from items Inner Join onlinetravelrequest on items.VSY_IndexNo = onlinetravelrequest.VSY_IndexNo and items.TravelPlan_id = onlinetravelrequest.TravelPlan_id';
var travel_auth_query = 'SELECT * from authorizationplan';
var otr_query = 'SELECT onlinetravelrequest.Request_Form_No, onlinetravelrequest.VSY_IndexNo,onlinetravelrequest.TravelPlan_id, onlinetravelrequest.Event_id, onlinetravelrequest.request_date, onlinetravelrequest.status, event.event_name, traveller.name, traveller_event.travel_start_date from  (((onlinetravelrequest inner join traveller_event on traveller_event.VSY_IndexNo = onlinetravelrequest.VSY_IndexNo and traveller_event.Event_id = onlinetravelrequest.Event_id) inner join traveller on onlinetravelrequest.VSY_IndexNo = traveller.VSY_IndexNo) inner join event on onlinetravelrequest.Event_id = event.Event_id) ';
var auth_otr_query = 'select authorizationplan.Travel_Auth_no, authorizationplan.Request_Form_No, authorizationplan.status1, authorizationplan.status2_bool, authorizationplan.status3, authorizationplan.notes, onlinetravelrequest.TravelPlan_id, onlinetravelrequest.Event_id,onlinetravelrequest.VSY_IndexNo from authorizationplan inner join onlinetravelrequest on authorizationplan.Request_Form_No = onlinetravelrequest.Request_Form_No'
var travelexpenseclaim_query = 'SELECT travelexpenseclaim.Invoice_No,travelexpenseclaim.Travel_Auth_No, travelexpenseclaim.VSY_IndexNo,travelexpenseclaim.TravelPlan_id, travelexpenseclaim.Event_id, travelexpenseclaim.claims_date, travelexpenseclaim.coordinator_approval, event.event_name, traveller.name, traveller_event.travel_end_date from  (((travelexpenseclaim inner join traveller_event on traveller_event.VSY_IndexNo = travelexpenseclaim.VSY_IndexNo and traveller_event.Event_id = travelexpenseclaim.Event_id) inner join traveller on travelexpenseclaim.VSY_IndexNo = traveller.VSY_IndexNo) inner join event on travelexpenseclaim.Event_id = event.Event_id)  ';
var bodyParser = require('body-parser');

var multer = require('multer');



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
    connection.query('UPDATE travelplan SET `start_date`=?,`end_date`=?,`source`=?,`destination`=?,`travel_status_bool`=?,`approval_status`=?,`travel_period`=?,`contract`=?,`phase`=?,`nss_program`=?,`e1_business_unit`=? where `TravelPlan_id`=?',[req.body.start_date,req.body.end_date,req.body.source,req.body.destination,req.body.travel_status_bool,req.body.approval_status,req.body.travel_period,req.body.contract,req.body.phase,req.body.nss_program,req.body.e1_business_unit,req.body.TravelPlan_id], function (error, results, fields) {
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
    connection.query('UPDATE traveller SET `password`=?,`name`=?,`company`=?,`location`=?,`labor_category`=?,`labor_rate`=? where `VSY_IndexNo`=?',[req.body.password,req.body.name,req.body.company,req.body.location,req.body.labor_category,req.body.labor_rate,req.body.VSY_IndexNo], function (error, results, fields) {
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
  connection.query('SELECT travelplan.TravelPlan_id, event.Event_id,event.event_name,event.event_type,event.description,event.event_location,event.month_reported_in_table1,event.duration,event.event_status,event.travel_group,event.p6_uniqueid,event.weekNo,event.meeting_date,event.expected_meeting_date,event.event_start_date,event.event_end_date, traveller_event.Event_id, traveller_event.VSY_IndexNo, travelplan.start_date,travelplan.end_date,travelplan.source,travelplan.destination,travelplan.travel_status_bool,travelplan.approval_status,travelplan.travel_period,travelplan.contract,travelplan.phase,travelplan.nss_program,travelplan.e1_business_unit from ((traveller_event INNER JOIN event ON event.Event_id = traveller_event.Event_id) INNER JOIN travelplan ON event.TravelPlan_id = travelplan.TravelPlan_id) where VSY_IndexNo=?', [req.params.VSY_IndexNo], (err,results) => {
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



router.get('/traveller/event/:VSY_IndexNo',(req,res) => {
  console.log(req)
  connection.query('SELECT event.Event_id, event.TravelPlan_id,traveller_event.VSY_IndexNo, event.event_name, event.event_type, event.description, event.event_location, event.month_reported_in_table1,event.duration,event.event_status,event.travel_group,event.p6_uniqueid,event.weekNo,event.meeting_date,event.expected_meeting_date, traveller_event.otr_request_status, travelplan.nss_program, traveller_event.dummy_status from ((traveller_event INNER JOIN event ON event.Event_id = traveller_event.Event_id) INNER JOIN travelplan ON event.TravelPlan_id = travelplan.TravelPlan_id) where VSY_IndexNo=?', [req.params.VSY_IndexNo], (err,results) => {
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

router.get('/items/viewer/:Budget_id',(req,res) => {
  console.log(req)
  connection.query('SELECT * from items where Budget_id=?', [req.params.Budget_id], (err,results) => {
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





router.get('/items/view/:VSY_IndexNo/:TravelPlan_id/:Event_id',(req,res) => {
  console.log(req)
  connection.query('SELECT * from items where VSY_IndexNo=? and TravelPlan_id=? and Event_id=?', [req.params.VSY_IndexNo,req.params.TravelPlan_id,req.params.Event_id], (err,results) => {
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
    connection.query('UPDATE items SET `requested_amount`=?, `check_posted`=? where `Item_id`=?',[req.body.requested_amount,req.body.check_posted,req.body.Item_id], function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});


router.put('/items/edit/expense_claimed_amount', function(req, res, next) {
    connection.query('UPDATE items SET `expense_claimed_amount`=? where `Item_id`=?',[req.body.expense_claimed_amount,req.body.Item_id], function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});


router.put('/items/edit_approved_amountandnotes', function(req, res, next) {
    connection.query('UPDATE items SET `approved_amount`=?, `note_from_coordinator`=? where `Item_id`=?',[req.body.approved_amount,req.body.note_from_coordinator,req.body.Item_id], function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});


router.put('/otr/otr_edit', function(req, res, next) {
    connection.query('UPDATE onlinetravelrequest SET `status`=? where `Request_Form_No`=?',[req.body.status,req.body.Request_Form_No], function (error, results, fields) {
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



router.get('/itemsotr/view/:VSY_IndexNo',(req,res) => {
  connection.query('SELECT onlinetravelrequest.Request_Form_No, items.VSY_IndexNo, items.Event_id, items.TravelPlan_id, items.Budget_id, items.Item_id, items.item_name, items.amount, items.requested_amount, items.status, items.comment, items.reasoning, items.note_from_coordinator from items Inner Join onlinetravelrequest on items.VSY_IndexNo = onlinetravelrequest.VSY_IndexNo and items.TravelPlan_id = onlinetravelrequest.TravelPlan_id where onlinetravelrequest.VSY_IndexNo=?',[req.params.VSY_IndexNo],(err,results) => {
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


router.get('/itemsotr/view/:VSY_IndexNo/:TravelPlan_id',(req,res) => {
  connection.query('SELECT onlinetravelrequest.Request_Form_No, items.VSY_IndexNo, items.Event_id, items.TravelPlan_id, items.Budget_id, items.Item_id, items.item_name, items.amount, items.requested_amount, items.status, items.comment, items.reasoning, items.note_from_coordinator from items Inner Join onlinetravelrequest on items.VSY_IndexNo = onlinetravelrequest.VSY_IndexNo and items.TravelPlan_id = onlinetravelrequest.TravelPlan_id where onlinetravelrequest.VSY_IndexNo=? and items.TravelPlan_id=?',[req.params.VSY_IndexNo,req.params.TravelPlan_id],(err,results) => {
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



router.get('/items_otr/view/:VSY_IndexNo/:Event_id/:TravelPlan_id',(req,res) => {
  connection.query('SELECT onlinetravelrequest.Request_Form_No, items.VSY_IndexNo, items.Event_id, items.TravelPlan_id, items.Budget_id, items.Item_id, items.item_name, items.amount, items.requested_amount, items.approved_amount , items.status, items.comment, items.reasoning, items.note_from_coordinator, event.event_name , traveller.name from (((items Inner Join onlinetravelrequest on items.VSY_IndexNo = onlinetravelrequest.VSY_IndexNo and items.TravelPlan_id = onlinetravelrequest.TravelPlan_id and items.Event_id = onlinetravelrequest.Event_id) inner join traveller on onlinetravelrequest.VSY_IndexNo = traveller.VSY_IndexNo) inner join event on onlinetravelrequest.Event_id = event.Event_id)  where onlinetravelrequest.VSY_IndexNo=? and items.Event_id=? and items.TravelPlan_id=?',[req.params.VSY_IndexNo,req.params.Event_id,req.params.TravelPlan_id],(err,results) => {
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


router.get('/budget_selection/view',(req,res) => {
  connection.query('SELECT traveller_event.Event_id, traveller_event.VSY_IndexNo, traveller_event.travel_start_date, traveller_event.travel_end_date,  event.event_name, event.event_start_date, event.event_end_date, event.TravelPlan_id, travelplan.nss_program, traveller.name from (((traveller_event Inner Join event on traveller_event.Event_id = event.Event_id) inner join traveller on traveller_event.VSY_IndexNo = traveller.VSY_IndexNo) inner join travelplan on event.TravelPlan_id = travelplan.TravelPlan_id)',(err,results) => {
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



  router.post('/login/coordinator/auth/',function(req,res){
    var VSY_IndexNo = req.body.VSY_IndexNo;
    var password = req.body.password;
    connection.query('SELECT * from coordinator WHERE `VSY_IndexNo` =?', [VSY_IndexNo,password], function(error,results,fields){
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


  router.get('/otr/view',(req,res) => {
    connection.query(otr_query,(err,results) => {
      if(err){
        return res.send(err);
        console.log(err)
      } else {
        return res.json({
          otr_data: results
      })
      }
    });
  });



router.post('/travelplan/delete', function(req, res, next) {
    connection.query('DELETE t,e,b,i from travelplan as t INNER JOIN event as e on t.TravelPlan_id = e.TravelPlan_id INNER JOIN budget as b on t.TravelPlan_id = b.TravelPlan_id INNER JOIN items as i on t.TravelPlan_id = i.TravelPlan_id where t.TravelPlan_id=?',[req.body.TravelPlan_id], function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});



router.post('/travelplan/delete/individual', function(req, res, next) {
    connection.query('DELETE from travelplan where `TravelPlan_id`=?',[req.body.TravelPlan_id], function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});



router.post('/event/delete', function(req, res, next) {
    connection.query('DELETE e,b,i from event as e INNER JOIN budget as b on e.Event_id = b.Event_id INNER JOIN items as i on e.Event_id = i.Event_id where e.Event_id=?',[req.body.Event_id], function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});



router.post('/event/delete/individual', function(req, res, next) {
    connection.query('DELETE from event where `Event_id`=?',[req.body.Event_id], function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});



router.post('/budget/delete', function(req, res, next) {
    connection.query('DELETE b,i from budget as b INNER JOIN items as i on b.Budget_id = i.Budget_id  where b.Budget_id=?',[req.body.Budget_id], function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});



router.post('/budget/delete/individual', function(req, res, next) {
    connection.query('DELETE from budget where `Budget_id`=?',[req.body.Budget_id], function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});


router.post('/items/delete', function(req, res, next) {
    connection.query('DELETE from items where `Item_id`=?',[req.body.Item_id], function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});



router.put('/items_all/edit', function(req, res, next) {
    connection.query('UPDATE items SET `Budget_id`=?, `TravelPlan_id`=?, `VSY_IndexNo`=?, `Event_id`=?, `item_name`=?, `amount`=?, `comment`=? where `Item_id`=?',[req.body.Budget_id,req.body.TravelPlan_id,req.body.VSY_IndexNo,req.body.Event_id,req.body.item_name,req.body.amount,req.body.comment,req.body.Item_id], function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});



router.get('/authorizationplan_otr/view/:VSY_IndexNo',(req,res) => {
  console.log(req)
  connection.query('select authorizationplan.Travel_Auth_no, authorizationplan.Request_Form_No, authorizationplan.status1, authorizationplan.status2_bool, authorizationplan.status3, authorizationplan.notes, onlinetravelrequest.TravelPlan_id, onlinetravelrequest.Event_id, event.event_name,event.event_start_date,travelplan.nss_program, onlinetravelrequest.VSY_IndexNo from (((authorizationplan inner join onlinetravelrequest on authorizationplan.Request_Form_No = onlinetravelrequest.Request_Form_No) INNER JOIN event ON event.Event_id = onlinetravelrequest.Event_id) INNER JOIN travelplan on onlinetravelrequest.TravelPlan_id = travelplan.TravelPlan_id) where onlinetravelrequest.VSY_IndexNo=?', [req.params.VSY_IndexNo], (err,results) => {
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


const multerConfig = multer.diskStorage({
    destination: function(req,file,next){
      next(null,'./public/images/uploads');
    },

    filename: function(req,file,next){
      next(null,file.fieldname + '-'+ Date.now() + '.'+ext);
    }
  });

  var upload = multer({multerConfig:multerConfig});


  router.post('/upload',multer(multerConfig).single('photo'),function(req,res){
      res.send('Complete!')
    })




    router.get('/travelexpenseclaim/view/:VSY_IndexNo',(req,res) => {
      console.log(req)
      connection.query('select * from travelexpenseclaim where VSY_IndexNo=?', [req.params.VSY_IndexNo], (err,results) => {
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


    router.post('/travelexpenseclaim/new', function(req, res, next) {
        var postData = req.body;
        connection.query('INSERT INTO travelexpenseclaim SET ?',postData, function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    });



    router.put('otr/edit/changeotrstatus', function(req, res, next) {
        connection.query('UPDATE onlinetravelrequest SET `submit_status`=? where `Request_Form_No`=?',[req.body.submit_status,req.body.Request_Form_No], function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    });


    router.get('/otr/check/view/:VSY_IndexNo/:TravelPlan_id/:Event_id',(req,res) => {
      connection.query('SELECT * from onlinetravelrequest where `VSY_IndexNo`=? and `TravelPlan_id`=? and `Event_id`=?',[req.params.VSY_IndexNo,req.params.TravelPlan_id,req.params.Event_id],(err,results) => {
        if(err){
          return res.send(err);
          console.log(err)
        } else {
          return res.json({
            otr_data: results
        })
        }
      });
    });


    router.put('/otr/edit_status/', function(req, res, next) {
        connection.query('UPDATE onlinetravelrequest SET `status`=? where `Request_Form_No`=?',[req.body.status,req.body.Request_Form_No], function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    });




    router.put('/auth_travelexpensestatus/change/edit', function(req, res, next) {
        connection.query('UPDATE authorizationplan SET `status3`=? where `Travel_Auth_No`=?',[req.body.status3,req.body.Travel_Auth_No], function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    });


    router.put('/traveller_event/change/edit', function(req, res, next) {
        connection.query('UPDATE traveller_event SET `otr_request_status`=? where `Event_id`=? and `VSY_IndexNo`=?',[req.body.otr_request_status,req.body.Event_id,req.body.VSY_IndexNo], function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    });


    router.get('/traveller_event/view/:VSY_IndexNo/:Event_id',(req,res) => {
      connection.query('SELECT * from traveller_event where `VSY_IndexNo`=? and `Event_id`=?',[req.params.VSY_IndexNo,req.params.Event_id],(err,results) => {
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


    router.get('/traveller_event_event/view/:VSY_IndexNo/:Event_id',(req,res) => {
      connection.query('SELECT traveller_event.Event_id, traveller_event.VSY_IndexNo, event.event_start_date, event.event_end_date from (traveller_event inner join event on event.Event_id = traveller_event.Event_id) where `VSY_IndexNo`=? and traveller_event.Event_id=?',[req.params.VSY_IndexNo,req.params.Event_id],(err,results) => {
        if(err){
          return res.send(err);
          console.log(err)
        } else {
          return res.json({
            event_data: results
        })
        }
      });
    });

    router.get('/travelprogram/view', (req,res) => {
      connection.query('SELECT * from travelprograms', (err,results) => {
        if(err){
          return res.send(err);
          console.log(err)
        }else {
          return res.json({
            data: results
          })
        }
      });
    });



    router.get('/budgetedit_selection/view/:nss_program',(req,res) => {
      connection.query('SELECT event.Event_id, event.event_name, event.event_start_date, event.event_end_date, event.TravelPlan_id, travelplan.nss_program from (event inner join travelplan on event.TravelPlan_id = travelplan.TravelPlan_id) where `nss_program`=?',[req.params.nss_program],(err,results) => {
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


    router.get('/budgetedit_traveller_selection/view/:Event_id',(req,res) => {
      connection.query('SELECT traveller_event.VSY_IndexNo,traveller_event.Event_id,traveller.name,traveller_event.travel_start_date,traveller_event.travel_end_date, event.event_name from  ((traveller_event inner join event on event.Event_id = traveller_event.Event_id) inner join traveller on traveller.VSY_IndexNo = traveller_event.VSY_IndexNo)  where traveller_event.Event_id=?',[req.params.Event_id],(err,results) => {
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


    router.get('/items/viewer_for_budgetedit/:VSY_IndexNo/:Event_id/:TravelPlan_id',(req,res) => {
      console.log(req)
      connection.query('SELECT * from items where `VSY_IndexNo`=? and `Event_id`=? and `TravelPlan_id`=?',[req.params.VSY_IndexNo,req.params.Event_id,req.params.TravelPlan_id],(err,results) => {
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


    router.get('/travel_status_update/view/:travel_end_date', (req,res) => {
      connection.query('SELECT authorizationplan.Travel_Auth_No, traveller_event.Event_id, traveller_event.VSY_IndexNo,traveller_event.travel_end_date, authorizationplan.status2_bool, traveller_event.Event_id, event.event_name, traveller.name, travelplan.nss_program from (((((traveller_event inner join event on event.Event_id = traveller_event.Event_id) inner join traveller on traveller_event.VSY_IndexNo = traveller.VSY_IndexNo) inner join travelplan on event.TravelPlan_id = travelplan.TravelPlan_id) inner join onlinetravelrequest on onlinetravelrequest.Event_id = event.Event_id and onlinetravelrequest.TravelPlan_id = travelplan.TravelPlan_id and traveller.VSY_IndexNo = onlinetravelrequest.VSY_IndexNo) inner join authorizationplan on onlinetravelrequest.Request_Form_No = authorizationplan.Request_Form_No) where authorizationplan.status1 = "APPROVED" and authorizationplan.status2_bool = "PENDING" and traveller_event.travel_end_date <= ?', [req.params.travel_end_date], (err,results) => {
        if(err){
          return res.send(err);
        } else {
          return res.json({
            data:results
          })
        }
      });
    });

    router.put('/edit_travel_status', function(req, res, next) {
        connection.query('UPDATE authorizationplan SET `status2_bool`=? where `Travel_Auth_No`=?',[req.body.status2_bool,req.body.Travel_Auth_No], function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    });

    router.put('/edit_travel_end_date', function(req, res, next) {
        connection.query('UPDATE traveller_event SET `travel_end_date`=? where `VSY_IndexNo`=? and `Event_id`=?',[req.body.travel_end_date,req.body.VSY_IndexNo, req.body.Event_id], function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    });


    router.get('/travelexpenseclaim_selectionpage/view/:VSY_IndexNo', (req,res) => {
      connection.query('SELECT authorizationplan.Travel_Auth_No, authorizationplan.Request_Form_No, traveller_event.Event_id, traveller_event.VSY_IndexNo,travelplan.TravelPlan_id,traveller_event.travel_end_date, authorizationplan.status2_bool, event.event_name, traveller.name, travelplan.nss_program,event.event_start_date, event.event_end_date,traveller_event.travel_start_date, traveller.category_GSTHST_treatment, traveller_event.travel_expense_claim_status from (((((traveller_event inner join event on event.Event_id = traveller_event.Event_id) inner join traveller on traveller_event.VSY_IndexNo = traveller.VSY_IndexNo) inner join travelplan on event.TravelPlan_id = travelplan.TravelPlan_id) inner join onlinetravelrequest on onlinetravelrequest.Event_id = event.Event_id and onlinetravelrequest.TravelPlan_id = travelplan.TravelPlan_id and traveller.VSY_IndexNo = onlinetravelrequest.VSY_IndexNo) inner join authorizationplan on onlinetravelrequest.Request_Form_No = authorizationplan.Request_Form_No) where authorizationplan.status1 = "APPROVED" and authorizationplan.status2_bool = "COMPLETED" and traveller.VSY_IndexNo=? ', [req.params.VSY_IndexNo], (err,results) => {
        if(err){
          return res.send(err);
        } else {
          return res.json({
            data:results
          })
        }
      });
    });

    router.get('/sub_items_data/:Item_id',(req,res) => {
      console.log(req)
      connection.query('SELECT * from subitems where `Item_id`=? and `coordinator_approval_status`="REJECTED"',[req.params.Item_id,req.params.coordinator_approval_status],(err,results) => {
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

    router.post('/submit_subItem/new', function(req, res, next) {
        var postData = req.body;
        connection.query('INSERT INTO subitems SET ?',postData, function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    });


    router.post('/uploadToSql', function(req, res, next) {
        var postData = req.body;
        connection.query('INSERT INTO data_test SET ?',postData, function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    });

    router.get('/data_test_view', (req,res) => {
      connection.query('SELECT * from data_test', (err,results) => {
        if(err){
          return res.send(err);
          console.log(err)
        }else {
          return res.json({
            data: results
          })
        }
      });
    });

    router.put('/traveller_event/expense_claim/change/edit', function(req, res, next) {
        connection.query('UPDATE traveller_event SET `travel_expense_claim_status`=? where `Event_id`=? and `VSY_IndexNo`=?',[req.body.travel_expense_claim_status,req.body.Event_id,req.body.VSY_IndexNo], function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    });


    router.get('/travelexpenseclaimselection_approval/view/:category_GSTHST_treatment/:nss_program', (req,res) => {
      connection.query('SELECT travelexpenseclaim.Invoice_No,travelexpenseclaim.Travel_Auth_No, travelexpenseclaim.VSY_IndexNo,travelexpenseclaim.TravelPlan_id, travelexpenseclaim.Event_id, travelexpenseclaim.claims_date, travelexpenseclaim.coordinator_approval, event.event_name, traveller.name, traveller_event.travel_end_date from  ((((travelexpenseclaim inner join traveller_event on traveller_event.VSY_IndexNo = travelexpenseclaim.VSY_IndexNo and traveller_event.Event_id = travelexpenseclaim.Event_id) inner join traveller on travelexpenseclaim.VSY_IndexNo = traveller.VSY_IndexNo) inner join event on travelexpenseclaim.Event_id = event.Event_id) inner join travelplan on travelexpenseclaim.TravelPlan_id = travelplan.TravelPlan_id) where traveller.category_GSTHST_treatment=? and travelplan.nss_program = ?  ', [req.params.category_GSTHST_treatment,req.params.nss_program], (err,results) => {
        if(err){
          return res.send(err);
        } else {
          return res.json({
            te_data:results
          })
        }
      });
    });

    router.get('/travellertype/view',(req,res) => {
      console.log(req)
      connection.query('SELECT * from traveller_type',(err,results) => {
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


    router.put('/subitem/edit_coordinator_approval_status/', function(req, res, next) {
        connection.query('UPDATE subitems SET `coordinator_approval_status`=? where `Sub_Item_id`=?',[req.body.coordinator_approval_status,req.body.Sub_Item_id], function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    });



    router.put('/item/expenseclaim_approval_status/', function(req, res, next) {
        connection.query('UPDATE items SET `expenseclaim_approval`=? where `Item_id`=?',[req.body.expenseclaim_approval,req.body.Item_id], function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    });

    router.get('/subitems/data', function(req,res,next) {
      connection.query('Select * from subitems', function(err, results, fields){
        if(err) {
          return res.send(err);
          console.log(err)
        } else {
          return res.json({
            data: results
          })
        }
      });
    });



    router.put('/travelexpenseclaim/status_update/', function(req, res, next) {
        connection.query('UPDATE travelexpenseclaim SET `coordinator_approval`=? where `Invoice_No`=?',[req.body.coordinator_approval,req.body.Invoice_No], function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    });


    router.get('/subitems/pending_data', function(req,res,next) {
      connection.query('Select * from subitems where `coordinator_approval_status`="PENDING"', function(err, results, fields){
        if(err) {
          return res.send(err);
          console.log(err)
        } else {
          return res.json({
            pending: results
          })
        }
      });
    });


    router.get('/travelexpenseclaimselection_items_subitems/view/pendingData/:VSY_IndexNo/:Event_id', (req,res) => {
      connection.query('SELECT travelexpenseclaim.Invoice_No,travelexpenseclaim.Travel_Auth_No, travelexpenseclaim.VSY_IndexNo,travelexpenseclaim.TravelPlan_id, travelexpenseclaim.Event_id, items.Item_id, items.item_name, subitems.Sub_Item_id, subitems.sub_item_name, subitems.subitem_description,subitems.receiptNo, subitems.receiptDate, subitems.amountTotal, subitems.currency, subitems.exchangeRate, subitems.amountGST, subitems.amountNet, subitems.amountPayable, subitems.coordinator_approval_status, subitems.rejection_reasoning from  ((travelexpenseclaim inner join items on items.VSY_IndexNo = travelexpenseclaim.VSY_IndexNo and items.Event_id = travelexpenseclaim.Event_id) inner join subitems on subitems.Item_id = items.Item_id) where items.VSY_IndexNo=? and items.Event_id = ? and subitems.coordinator_approval_status = "PENDING"  ', [req.params.VSY_IndexNo,req.params.Event_id, req.params.coordinator_approval_status], (err,results) => {
        if(err){
          return res.send(err);
        } else {
          return res.json({
            pendingData:results
          })
        }
      });
    });

    router.get('/travelexpenseclaimselection_items_subitems/view/data/:VSY_IndexNo/:Event_id', (req,res) => {
      connection.query('SELECT travelexpenseclaim.Invoice_No,travelexpenseclaim.Travel_Auth_No, travelexpenseclaim.VSY_IndexNo,travelexpenseclaim.TravelPlan_id, travelexpenseclaim.Event_id, items.Item_id, items.item_name, subitems.Sub_Item_id, subitems.sub_item_name, subitems.subitem_description, subitems.amountPayable, subitems.coordinator_approval_status, subitems.rejection_reasoning from  ((travelexpenseclaim inner join items on items.VSY_IndexNo = travelexpenseclaim.VSY_IndexNo and items.Event_id = travelexpenseclaim.Event_id) inner join subitems on subitems.Item_id = items.Item_id) where items.VSY_IndexNo=? and items.Event_id = ?', [req.params.VSY_IndexNo,req.params.Event_id], (err,results) => {
        if(err){
          return res.send(err);
        } else {
          return res.json({
            data:results
          })
        }
      });
    });

    router.get('/traveller/travelexpenseclaim/view/:VSY_IndexNo', function(req,res,next)  {
      connection.query('SELECT * from travelexpenseclaim where `VSY_IndexNo` = ? and `coordinator_approval` = "REJECTED" or `coordinator_approval`= "PENDING" ', [req.params.VSY_IndexNo,req.params.coordinator_approval], (err,results) => {
        if(err){
          return res.send(err);
        } else {
          return res.json({
            data: results
          })
        }
      });
    });


    router.put('/travelexpenseclaim/subItem/update/', function(req, res, next) {
        connection.query('UPDATE subitems SET `sub_item_name`=?, `subitem_description`=?,`receiptNo`=?, `receiptDate`=?, `amountTotal`=?, `currency`=?, `exchangeRate`=?, `amountGST`=?, `amountNet`=?, `amountPayable`=?, `coordinator_approval_status`=?  where `Sub_Item_id`=?',[req.body.sub_item_name,req.body.subitem_description,req.body.receiptNo,req.body.receiptDate,req.body.amountTotal,req.body.currency,req.body.exchangeRate,req.body.amountGST,req.body.amountNet,req.body.amountPayable,req.body.coordinator_approval_status,req.body.Sub_Item_id], function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    });


    router.get('/travelexpenseclaim/items/view/:VSY_IndexNo/:TravelPlan_id/:Event_id',(req,res) => {
      console.log(req)
      connection.query('SELECT * from items where VSY_IndexNo=? and TravelPlan_id=? and Event_id=? and `expenseclaim_approval`="REJECTED"', [req.params.VSY_IndexNo,req.params.TravelPlan_id,req.params.Event_id,req.params.expenseclaim_approval], (err,results) => {
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


    router.put('/travelexpenseclaim/status/update/', function(req, res, next) {
        connection.query('UPDATE travelexpenseclaim SET `coordinator_approval`=?  where `Invoice_No`=?',[req.body.coordinator_approval,req.body.Invoice_No], function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    });


    router.put('/travelexpenseclaim/items/status/update/', function(req, res, next) {
        connection.query('UPDATE items SET `expenseclaim_approval`=?  where `Item_id`=?',[req.body.expenseclaim_approval,req.body.Item_id], function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    });



    router.get('/subitems/data/:Item_id',(req,res) => {
      console.log(req)
      connection.query('SELECT * from subitems where `Item_id`=?',[req.params.Item_id,req.params.coordinator_approval_status],(err,results) => {
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


    router.put('/travelexpenseclaim/items/status/allupdate/', function(req, res, next) {
        connection.query('UPDATE items SET `expenseclaim_approval`=?     where `VSY_IndexNo`= ? and `Event_id`= ? and `TravelPlan_id`=? ',[req.body.expenseclaim_approval, req.body.VSY_IndexNo, req.body.Event_id,req.body.TravelPlan_id], function (error, results, fields) {
            if(error) throw error;
            res.send(JSON.stringify(results));
        });
    });


    router.get('/subitems/data/view/:VSY_IndexNo/:Event_id/:TravelPlan_id',(req,res) => {
      connection.query('SELECT * from subitems where `VSY_IndexNo`=? and `Event_id`= ? and `TravelPlan_id`= ?',[req.params.VSY_IndexNo,req.params.Event_id,req.params.TravelPlan_id],(err,results) => {
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
