const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const config = require('./config').config;
const app = express();

const {login, register, test} = require('./routes/index');

const port = config.port;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

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