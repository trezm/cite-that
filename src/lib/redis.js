'use strict';

var settings = require('../../settings');
var redis = require('redis');
var client = redis.createClient(settings.REDIS);

module.exports = client;
