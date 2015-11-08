'use strict';

var _ = require('underscore');
var async = require('async');
var redisLib = require('redis');
var settings = require('../../../settings');
var util = require('util');
var uuid = require('uuid');
var winston = require('winston');

var RedisLogger = winston.transports.RedisLogger = function(options) {
	this.name = 'redisLogger';
	this.level = options.level || 'info';

  // Set up redis connection
  this.redis = redisLib.createClient(
    settings.REDIS.port,
    settings.REDIS.host,
    {
      max_attempts: settings.REDIS.max_attempts
    }
  );
  this.redis.on('error', function(err) {
    console.error('[ERROR] An error occured with redis:', err);
  });
};

util.inherits(RedisLogger, winston.Transport);

var flattenObject = function(ob) {
  var toReturn = {};
  var flatObject;
  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) {
      continue;
    }
    if ((typeof ob[i]) === 'object') {
      flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) {
          continue;
        }
        toReturn[i + (!!isNaN(x) ? '.' + x : '')] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};

RedisLogger.prototype.log = function(level, message, meta, callback) {
  var eventId = uuid.v4();

  var self = this;
  async.parallel([
    function addEventIdToSet(done) {
      self.redis.zadd(level, Date.now(), eventId, done);
    },
    function setMetaAndMessageForEventId(done) {
      self.redis.hmset(eventId, _.extend({
        message: message
      }, flattenObject(meta)), done);
    }
  ], callback);
}

module.exports = RedisLogger;