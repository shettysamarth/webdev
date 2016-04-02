var express = require('express');
var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var mongoose = require('mongoose');
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var  url = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/molecule';
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    url = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
mongoose.connect(url);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public/assignment/client'));

app.listen(port, ipaddress);

require("./public/assignment/server/app.js")(app, mongoose);

console.log("Up");
