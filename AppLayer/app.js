var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

//Lets define a port we want to listen to
const PORT = 3000;
const ADDRESS = 'localhost';

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// GET example
app.get('/listUsers', function(req, res) {
  fs.readFile(__dirname + "/" + "test.json", 'utf8', function(err, data) {
    console.log(data);
    res.end(data);
  });
});

// POST example
app.post('/addUser', function(req, res) {

  // First read existing users.
  fs.readFile(__dirname + "/" + "test.json", 'utf8', function(err, data) {
    data = JSON.parse(data);

    // Append the body parameters to the data object and send it back.
    // This example shows how to read body parameters.
    data["user4"] = req.body;
    console.log(data);
    res.end(JSON.stringify(data));
  });
});

// Register and listen on a specifc port
var server = app.listen(PORT, ADDRESS, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('running at http://' + host + ':' + port);
});