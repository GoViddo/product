const express = require('express');
const bodyParser = require('body-parser');
const cassandra = require('cassandra-driver');
const path = require('path');
const config = require('./config').config;
const app = express();

const { login, register, test } = require('./routes/index');

const port = config.port;

// create connection to database
const client = new cassandra.Client({ contactPoints: [config.host], keyspace: config.database });

// connect to database
client.connect()
    .then(function () {
        console.log('Connected to database with %d host(s): %j', client.hosts.length, client.hosts.keys());
        console.log('Keyspaces: %j', Object.keys(client.metadata.keyspaces));
        global.db = client;
    })
    .catch(function (err) {
        console.error('There was an error connecting to database', err);
        return client.shutdown();
    });


// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client

// routes for the app
app.get('/test', test);
app.post('/register', register);
app.post('/login', login);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});