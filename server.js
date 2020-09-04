var http = require('http');
var app = require('./app')
app.set('port',8012);

const server = http.createServer(app)
console.log('listening on port 8012')
server.listen(8012)