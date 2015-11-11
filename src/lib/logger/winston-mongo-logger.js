'use strict';

var _ = require('underscore');
var async = require('async');
var mongoLib = require('../mongo');
var settings = require('../../../settings');
var util = require('util');
var uuid = require('uuid');
var winston = require('winston');

var MongoLogger = winston.transports.MongoLogger = function(options) {
	var self = this;
  this.name = 'mongoLogger';
	this.level = options.level || 'info';

  // Set up redis connection
  mongoLib.createClient(
    settings.MONGO.host,
    settings.MONGO.port,
    settings.MONGO.db,
    function(err, db) {
      self.mongo = db;
    });
};

util.inherits(MongoLogger, winston.Transport);

MongoLogger.prototype.log = function(level, message, meta, callback) {
  let collection;

  if (!this.mongo) {
    console.log('[' + Date.now() + '] could not connect to mongo');
    return callback();
  }

  collection = this.mongo.collection('logs');

  collection.insert(_.extend({
    message: message
  }, meta), callback);
}

module.exports = MongoLogger;
