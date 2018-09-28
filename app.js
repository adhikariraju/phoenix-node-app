var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

//routes
var login=require("./routes/login")
var message=require("./routes/message")
var decrypt=require("./routes/decrpt")
var question=require("./routes/question")
var signup=require('./routes/signup')
var v2signup=require('./routes/v2.signup')
var answer=require('./routes/answer')
var sugPress=require('./routes/sugarPressure')
var doctor=require("./routes/doctor")
var app = express();

//db setting and connection.
var {mongoose}=require('./db');
//-------- session module

//var session=require("express-session")
// var mongoStore=require("connect-mongo")(session);

// view engine setup


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.xml());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//session logic

// app.use(require('express-session')({
//   secret: 'SUPER SECRET SECRET',
//   resave: false,
//   saveUninitialized: true,
//   store: new mongoStore({mongooseConnection:mongoose.connection})
// }));

app.use("/",express.static(path.join(__dirname, 'public')));

app.use("/login",login);
app.use("/message",message);
app.use("/question",question);
app.use("/signup",signup);
app.use("/answer",answer);
app.use("/sugpress",sugPress)
app.use("/doctor",doctor);
app.use("/signup/v2",v2signup);
// app.use("/decrypt",decrypt);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
