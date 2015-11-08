// Settings
var settings = require('../settings');

// Logging
require('./lib/logger')();

// Express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser());

var server = require('http').createServer(app).listen(settings.PORT);

var routes = require('./routes/router');
routes.router(app);

module.exports = app;
