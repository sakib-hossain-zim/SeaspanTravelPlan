var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');




var app = express();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');







// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

 app.use('/', indexRouter);
 app.use('/users', usersRouter);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(cookieParser());
/* Use cors and fileUpload*/
app.use(cors());
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));



app.post('/upload', (req, res, next) => {
  console.log(req);
  let imageFile = req.files.file;

  imageFile.mv(`${__dirname}/public/${req.body.filename}.pdf`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({file: `public/${req.body.filename}.pdf`});
  });

})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




//Connecting to the port
app.listen(4000, () => {
  console.log('Seaspan server listening on port 4000')
});


module.exports = app;
