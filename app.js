var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors')
require('body-parser-xml')(bodyParser);

//routes
var login=require("@routes/login")
var message=require("@routes/message")
var question=require("@routes/question")
var signup=require('@routes/signup')
var v2signup=require('@routes/v2.signup')
var answer=require('@routes/answer')
var sugPress=require('@routes/sugarPressure');
var doctor=require("@routes/doctor");
var assignment=require("@routes/assign");
var userList=require("@routes/userList");
var mtechAuth = require("@routes/mtech/auth")
var qrlog=require("@routes/mtech/qrlog")

var expressValidator = require('express-validator');


var app = express();

//db setting and connection.
var {mongoose}=require('@root/db');
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

// app.all("*",function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(cors());

app.use(expressValidator());



// client route
app.use("/assignment",assignment);
app.use("/login",login);
app.use("/message",message);
app.use("/question",question);
app.use("/signup",signup);
app.use("/answer",answer);
app.use("/sugpress",sugPress)
app.use("/doctor",doctor);
app.use("/v2/signup",v2signup);
app.use("/userlist",userList);
app.use("/mtech/auth",mtechAuth);
app.use("/mtech/qrlog",qrlog);

// admin routes

// app.use("/admin",adminQuestion);






// app.use("/decrypt",decrypt);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page.
  res.status(err.status || 500).send({
    success:false,
    message:err.message,
    errors:err.errors
  });
});
module.exports = app;