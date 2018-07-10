var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/travellers',function(req,res){
  var postData = req.body;
  connection.query('INSERT INTO Traveller SET ?', postData, function(error,results,fields){
    if(error) throw error;
    res.end(JSON.stringify(results));
  });
});

module.exports = router;
