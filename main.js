var finalhandler = require('finalhandler');
var http = require('http');
var serveIndex = require('serve-index');
var serveStatic = require('serve-static');
const fs = require('fs');
const config = require('./config.json');

if(!fs.existsSync(config.public)){
  fs.mkdirSync(config.public);
}

var index = serveIndex(config.public, {'icons': true})

var serve = serveStatic(config.public)

var server = http.createServer(function onRequest(req, res){
  var done = finalhandler(req, res)
  serve(req, res, function onNext(err) {
    if (err) return done(err)
    index(req, res, done)
  })
})

server.listen(config.port)