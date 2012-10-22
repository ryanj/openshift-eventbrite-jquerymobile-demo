#!/bin/env node
// Openshift environment hooks:

// init dependencies:
var debug = false;

var express = require('express')
  , routes = require('./routes')
  , index = require('./routes/index')
//  , reports = require('./routes/reports')
//  , dashboard = require('./routes/dashboard')
//  , form = require('./routes/form')
//  , geo = require('./routes/geo')
  , path = require('path')
//  , mongoose = require('mongoose')
  , fs = require('fs')

var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

// MongoDB
// //mongoose.connect('mongodb://localhost:27017/test');
//
// //Schema = mongoose.Schema;
//
// // DB Schema  
// //RatingObj = new Schema({
// //    badge: String,
// //    rating: String,
// //    comment: String,
// //    location: {},
// //    coords: {long: Number, lat: Number}
// //});
//
// //RatingObj.statics.findNearStatic = function(coords, cb) {
// //  this.find({coords: {$nearSphere: coords, $maxDistance: 5}}, cb);
// //}
//
// //Rating = mongoose.model('Rating', RatingObj);
//
var ipaddr  = process.env.OPENSHIFT_INTERNAL_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_INTERNAL_PORT || process.env.PORT || 8080;

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

app.get('/', index.display);
//app.get('/api/reports', reports.list);
//app.get('/dashboard', dashboard.display);
//app.get('/form', form.form);
//app.post('/form', form.submit);
//app.post('/geo', geo.findNearby);

//if (debug) {
//var request = require('request');
//request.post({
//  url: 'http://localhost:3000/form',
//  headers: {
//    'Content-Type': 'application/json'
//  },
//  body: JSON.stringify({
//    badge: 419,
//    rating: 5,
//    comment: "Cop directed traffic at broken spotlight for 6 straight hours.",
//    coords: {long: -122.2719461 , lat: 37.8052615}
//  })
//}, function(error, response, body){
//  console.log(body);
//});
//};
http.createServer(app).listen(port, ipaddr, function(){
  console.log("Server running! (http://" + ipaddr + ":" + port + "/)" + Date(Date.now() ));
  //console.log("Express server listening on port " + app.get('port'));
});

//http.createServer(function (req, res) {
//	var addr = "unknown";
//	var out = "";
//	if (req.headers.hasOwnProperty('x-forwarded-for')) {
//		addr = req.headers['x-forwarded-for'];
//	} else if (req.headers.hasOwnProperty('remote-addr')){
//		addr = req.headers['remote-addr'];
//	}
//
//	if (req.headers.hasOwnProperty('accept')) {
//		if (req.headers['accept'].toLowerCase() == "application/json") {
//			  res.writeHead(200, {'Content-Type': 'application/json'});
//			  res.end(JSON.stringify({'ip': addr}, null, 4) + "\n");			
//			  return ;
//		}
//	}
//	
//  res.writeHead(200, {'Content-Type': 'text/plain'});
//  res.write("Welcome to Node.js on OpenShift!\n\n");
//  res.end("Your IP address seems to be this: " + addr + "\n");
//}).listen(port, ipaddr);
//
//
//=======
//
//var express = require('express');
//var fs      = require('fs');
//
////  Local cache for static content [fixed and loaded at startup]
//var zcache = { 'index.html': '' };
//zcache['index.html'] = fs.readFileSync('./index.html'); //  Cache index.html
//
//// Create "express" server.
//var app  = express.createServer();
//
//
///*  =====================================================================  */
///*  Setup route handlers.  */
///*  =====================================================================  */
//
//// Handler for GET /health
//app.get('/health', function(req, res){
//    res.send('1');
//});
//
//// Handler for GET /asciimo
//app.get('/asciimo', function(req, res){
//    var link="https://a248.e.akamai.net/assets.github.com/img/d84f00f173afcf3bc81b4fad855e39838b23d8ff/687474703a2f2f696d6775722e636f6d2f6b6d626a422e706e67";
//    res.send("<html><body><img src='" + link + "'></body></html>");
//});
//
//// Handler for GET /
//app.get('/', function(req, res){
//    res.send(zcache['index.html'], {'Content-Type': 'text/html'});
//});
//
////  terminator === the termination handler.
//function terminator(sig) {
//   if (typeof sig === "string") {
//      console.log('%s: Received %s - terminating Node server ...',
//                  Date(Date.now()), sig);
//      process.exit(1);
//   }
//   console.log('%s: Node server stopped.', Date(Date.now()) );
//}
//
////  Process on exit and signals.
//process.on('exit', function() { terminator(); });
//
//// Removed 'SIGPIPE' from the list - bugz 852598.
//['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS',
// 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
//].forEach(function(element, index, array) {
//    process.on(element, function() { terminator(element); });
//});
//
////  And start the app on that interface (and port).
//app.listen(port, ipaddr, function() {
//   console.log('%s: Node server started on %s:%d ...', Date(Date.now() ),
//               ipaddr, port);
//});
