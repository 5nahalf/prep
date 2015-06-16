var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

var mongoose = require('mongoose');
var mongoURI = "mongodb://localhost:27017/prephoops";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('mongodb connection error', err);
});

MongoDB.once('open', function () {
    console.log('mongodb connection open');
});

// uncomment after placing your favicon in /public
app.use(favicon('./server/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var publicFolder = path.join(__dirname, 'public');
console.log(publicFolder);
app.use(express.static(publicFolder));

//app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});
//
//// error handlers
//
//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//  app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//      message: err.message,
//      error: err
//    });
//  });
//}
//
//// production error handler
//// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//  res.status(err.status || 500);
//  res.render('error', {
//    message: err.message,
//    error: {}
//  });
//});


//module.exports = app;
//var express = require("express");
//var bodyParser = require("body-parser");
//var app = express();
var index = require("./routes/index");
var tweets = require('./routes/tweet');
//
//app.use(bodyParser.json());
//
////app.set('port', (process.env.PORT || 5000));
//
//app.listen(app.get('port'), function() {
//  console.log('Node app is running on port', app.get('port'));
//});

app.use("/", index);
app.use("/tweets", tweets);
module.exports = app;