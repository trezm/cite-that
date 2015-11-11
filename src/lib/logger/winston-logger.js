'use strict';

var RedisLogger = require('./winston-redis-logger');
var MongoLogger = require('./winston-mongo-logger');
var settings = require('../../../settings');
var winston = require('winston');

winston.level = settings.LOG_LEVEL;
winston.add(MongoLogger, {
	level: 'debug'
});

module.exports = function() {
	GLOBAL.logger = winston;
};
