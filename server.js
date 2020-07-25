var http = require('http');
var app = require('./app')
app.set('port',800);

const server = http.createServer(app)
console.log('listening on port800')
server.listen(800)