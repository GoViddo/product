const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const config = require('./config').config;
const app = express();

const { login, register, getConfig } = require('./routes/index');

const port = config.port;

const db_config = {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
};

// create connection to database
var db;

function handleDisconnect() {
    db = mysql.createConnection(db_config);

    db.connect(function (err) {
        if (err) {
            console.log('Error connecting DB:', err);
            setTimeout(handleDisconnect, 2000);
        }
        global.db = db;
        console.log('Re-connected to database');
    });

    db.on('error', function (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            console.log('Error connecting DB:', err);
            throw err;
        }
    });
}

handleDisconnect();

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