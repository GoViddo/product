const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const config = require('./config').config;
const app = express();
const cmd = require('node-cmd');
var cors = require('cors')


// List globals
global.cmd = cmd

const { login, createEosMainNetWallet, register, shareUrl, updateApp, watchLaterList, transactionDetails, subscriptChannel, sahreUrlTokens, addComment, addToWatchList, getUserProfilePics, getUserHistory, getCommentList, getChannelList, getUserInfoForAccount, getVideoRelatedDetails, likeUnlikeSstore, getConfig , checkWalletName, saveViewInformation, getSubscriptionData, getVideoGenereId, bannerImages, getVideoData,getSubscriptionList, getSliderImageData, getPreviewData, generateVideoOtp} = require('./routes/index');

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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// routes for the app
app.get('/config', getConfig);
app.post('/register', register);
app.post('/login', login);
app.post('/checkWalletName', checkWalletName);
app.post('/getVideoGenereId', getVideoGenereId);
app.get('/bannerImages', bannerImages);
app.post('/getVideoData', getVideoData);
app.post('/getSliderImageData', getSliderImageData);
app.post('/getPreviewData', getPreviewData);
app.post('/getSubscriptionList', getSubscriptionList);
app.get('/generateVideoOtp', generateVideoOtp);
app.post('/getSubscriptionData', getSubscriptionData);
app.post('/saveViewInformation', saveViewInformation);
app.post('/likeUnlikeSstore', likeUnlikeSstore);
app.post('/subscriptChannel', subscriptChannel);
app.post('/getVideoRelatedDetails', getVideoRelatedDetails);
app.post('/getChannelList', getChannelList);
app.post('/getUserInfoForAccount', getUserInfoForAccount);
app.post('/addComment', addComment);
app.post('/getCommentList', getCommentList);
app.post('/watchLaterList',watchLaterList);
app.post('/getUserProfilePics', getUserProfilePics);
app.post('/getUserHistory', getUserHistory);
app.post('/addToWatchList', addToWatchList);
app.get('/shareUrl', shareUrl);
app.post('/sahreUrlTokens', sahreUrlTokens);
app.get('/updateApp', updateApp);
app.post('/transactionDetails', transactionDetails);
app.post('/createEosMainNetWallet', createEosMainNetWallet);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});