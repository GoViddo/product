//Lets require/import the HTTP module

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

//Lets define a port we want to listen to
const PORT = 3000;

//We need a function which handles requests and send response
function handleRequest(request, response) {
  debugger;
  console.time('request ' + request.url);
  console.log('request ' + request.url);
  var uri = url.parse(request.url, true)
  var queryData = uri.query;

  var filePath = '.' + uri.pathname;

  var extname = path.extname(filePath);
  var contentType = 'text/html';
  switch (extname) {
    case '.html':
      contentType = 'text/html';
      break;
    case '.tpl':
      contentType = 'text/html';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.woff':
      contentType = 'application/font-woff';
      break;
    case '.woff2':
      contentType = 'application/font-woff2';
      break;
    case '.ico':
      contentType = 'image/ico';
      break;
    default:
      response.writeHead(500);
      response.end("Uknown file type " + extname);
      response.end();
      return;
      break;
  }

  // load file
  fs.readFile(filePath, function(error, content) {
    if (error) {
      response.writeHead(500);
      response.end(JSON.stringify(error));
      response.end();
      //throw error;
      return;
    }

    response.writeHead(200, {'Content-Type': contentType});
    response.end(content, 'utf-8');
    console.timeEnd('request ' + request.url);
  });

}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function() {
  //Callback triggered when server is successfully listening. Hurray!
  console.log("Server listening on: http://localhost:%s", PORT);
});