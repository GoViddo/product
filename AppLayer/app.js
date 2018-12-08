const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const config = require('./config').config;
const app = express();

const { login, register, getConfig } = require('./routes/index');

const port = config.port;

// create connection to database
const db = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

// connect to database
db.connect((err) => {
    if (err) {
        console.error('There was an error connecting to database', err);
        throw err;
    }
    global.db = db;
    console.log('Connected to database');
});

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client

// routes for the app
app.get('/config', getConfig);
app.post('/register', register);
app.post('/login', login);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});