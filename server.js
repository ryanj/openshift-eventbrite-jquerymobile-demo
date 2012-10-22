#!/bin/env node
// Openshift environment hooks:

// init dependencies:
var debug = false;

var express = require('express')
  , routes = require('./routes')
  , index = require('./routes/index')
  , path = require('path')
  , fs = require('fs')
//  , reports = require('./routes/reports')
//  , dashboard = require('./routes/dashboard')
//  , form = require('./routes/form')
//  , geo = require('./routes/geo')
  , mongoose = require('mongoose')
var ipaddr  = process.env.OPENSHIFT_INTERNAL_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_INTERNAL_PORT || process.env.PORT || 8080;

var app = express()
  , http = require('http');

app.configure(function(){
  app.set('port', port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var server = http.createServer(app).listen(port, ipaddr, function(){
  console.log("Server running! (http://" + ipaddr + ":" + port + "/)" + Date(Date.now() ));
});
var io = require('socket.io').listen(server);

// MongoDB
//mongoose.connect('mongodb://localhost:27017/test');

//Schema = mongoose.Schema;

// DB Schema  
//EBEventObj = new Schema({
//    title: String,
//    description: String,
//    organizer_name: String,
//    start_date: Date,
//    timezone: String,
//    logo: String,
//    url: String,
//    address: String,
//    coords: {long: Number, lat: Number}
//});

//RatingObj.statics.findNearStatic = function(coords, cb) {
//  this.find({coords: {$nearSphere: coords, $maxDistance: 5}}, cb);
//}

//EBEvent = mongoose.model('EBEvent', EBEventObj);

app.get('/', index.display);
//app.get('/api/reports', reports.list);
//app.get('/dashboard', dashboard.display);
//app.get('/form', form.form);
//app.post('/form', form.submit);
//app.post('/geo', geo.findNearby);
