#!/bin/env node
// init dependencies:
var debug = false;
var express = require('express')
  , routes = require('./routes')
  , index = require('./routes/index')
  , path = require('path')
  , fs = require('fs')
  , mongoose = require('mongoose')
// Openshift environment hooks:
var ipaddr  = process.env.OPENSHIFT_INTERNAL_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_INTERNAL_PORT || process.env.PORT || 8080;

var app = express()
  , http = require('http');
var Eventbrite = require('eventbrite');

app.configure(function(){
  app.set('eb_client', Eventbrite({'app_key':"5PQ3R4VMEOOSWJL7YM"}));
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
app.get('/search/', function(req, res){
  var eb_client = app.get('eb_client');
  var params = {}; 
  if(req.query.latitude){ params.latitude = req.query.latitude; }
  if(req.query.longitude){ params.longitude = req.query.longitude; }
  if(req.query.max){ params.max = req.query.max; }
  if(req.query.within){ params.within = req.query.within; }
  if(req.query.page){ params.page = req.query.page; }
  if(req.query.count_only){ params.count_only = req.query.count_only; }
  if(req.query.keywords){ params.keywords = req.query.keywords; }
  return eb_client.event_search(params, function (err, events) {
    console.log(JSON.stringify(events.events[0].summary));
    if (!err) {
      return res.json(events);
    } else {
      return console.log(err);
    }   
  }); 
});
