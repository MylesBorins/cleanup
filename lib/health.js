const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end('Healthy\n');
});

function health(port = 1337) {
  server.listen(port);
}

module.exports = health;
