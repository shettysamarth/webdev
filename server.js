var express = require('express');
var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var mongoose = require('mongoose');
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var  url = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/formMaker';
var multer=require('multer');
var passport      = require('passport');





if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    url = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
var db = mongoose.connect(url);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var cookieParser=require('cookie-parser');
var session=require('express-session');

var secretKey=process.env.SESSION_SECRET;
app.use(session({resave: true,
    saveUninitialized: true,
    secret: secretKey}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public/assignment/client'));

app.listen(port, ipaddress);

require("./public/assignment/server/app.js")(app, db);

console.log("Up");
console.log(secretKey);

