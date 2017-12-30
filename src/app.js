var opbeat = require('opbeat').start({
  appId: '3dfe776bcb',
  organizationId: '58b0618aa6334b3a99dd09a7ec422657',
  secretToken: 'b92b2643f9e45c8c01c8220d6dc0fbaef66c7e11'
});

// Settings
var settings = require('../settings');

// Logging
require('./lib/logger')();

// Express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var server = require('http').createServer(app).listen(settings.PORT);

var routes = require('./routes/router');
routes.router(app);

module.exports = app;
