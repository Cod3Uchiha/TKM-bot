const http = require('http');
const fs = require('fs');

const page = ".media/site/index.html"

function server(req,res) {
  fs.readFile(page, (err,data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not Found');
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    }
  });
}

function start(port) {
  http.createServer(server).listen(port, () => {
    console.log(`server started at port ${port}`)
  });
}

moudle.exports = {
  start : start
}
