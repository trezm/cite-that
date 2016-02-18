'use strict';

var MongoClient = require('mongodb').MongoClient;
var settings = require('../../settings');

function createClient(host, port, db, callback) {
  let mongoUrl = 'mongodb://' + host + ':' + port + '/' + db;

  mongoUrl = mongoUrl.replace('mongo:tcp://', '');

  MongoClient.connect(mongoUrl, callback);
}

module.exports.createClient = createClient;
