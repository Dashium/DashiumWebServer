var finalhandler = require('finalhandler');
var http = require('http');
var serveIndex = require('serve-index');
var serveStatic = require('serve-static');
const fs = require('fs');
const socketio = require('socket.io');

const config = require('./config.json');

if (!fs.existsSync(config.public)) {
  fs.mkdirSync(config.public);
}

var index = serveIndex(config.public, { 'icons': true });

var serve = serveStatic(config.public);

const server = http.createServer(function onRequest(req, res) {
  var done = finalhandler(req, res)
  serve(req, res, function onNext(err) {
    if (err) return done(err)
    index(req, res, done)
  })
})

const io = socketio(server);

io.on('connection', (socket) => {
  console.log(`Connecté au client ${socket.id}`);
})

server.listen(config.port, function () {
  console.log(`Votre app est disponible sur localhost:${config.port} !`);
});