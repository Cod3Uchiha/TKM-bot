const http = require('http');
const fs = require('fs');
const path = require("path");

const page = path.join(__dirname, "media", "site")


function server(req,res) {
  console.log(`server: GET '${req.url}'`);
  if (req.url === '/') {
    fs.readFile(path.join(page, 'index.html'), (err,data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
        console.log(`server: response 404 'Not Found'`);
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
        console.log(`server: response 200 'index.html'`);
      }
    });
  } else if (req.url === '/style.css'){
    fs.readFile(path.join(page,"assets", "style.css"), (err,data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
        console.log(`server: response 404 'Not Found'`);
      } else {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(data);
        console.log(`server: response 200 'style.css'`)
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
