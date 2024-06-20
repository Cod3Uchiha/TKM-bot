const http = require('http');
const fs = require('fs');
const path = require("path");

const page = path.join(__dirname, "media", "site", "assets")


function server(req,res) {
  if (req.url === '/') {
    fs.readFile(path.join(page, 'index.html'), (err,data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  } else if (req.url === '/style.css'){
    fs.readFile(path.join(page, "style.css"), (err,data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
      } else {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(data);
      }
    });
  }
}

function start(port) {
  http.createServer(server).listen(port, () => {
    console.log(`server started at port ${port}`)
  });
}

module.exports = {
  start : start
}
