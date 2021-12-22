var finalhandler = require('finalhandler');
var http = require('http');
var serveIndex = require('serve-index');
var serveStatic = require('serve-static');
const fs = require('fs');

if(!fs.existsSync('www')){
  fs.mkdirSync('www');
}

var index = serveIndex('www', {'icons': true})

var serve = serveStatic('www')

var server = http.createServer(function onRequest(req, res){
  var done = finalhandler(req, res)
  serve(req, res, function onNext(err) {
    if (err) return done(err)
    index(req, res, done)
  })
})

server.listen(3000)