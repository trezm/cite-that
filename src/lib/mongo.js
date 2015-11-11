'use strict';

var MongoClient = require('mongodb').MongoClient;
var settings = require('../../settings');

function createClient(host, port, db, callback) {
  host = host.replace(/mongo:tcp:\/\//, '');
  let mongoUrl = 'mongodb://' + host + ':' + port + '/' + db;

  console.log('mongoUrl:', mongoUrl);

  MongoClient.connect(mongoUrl, callback);
}

module.exports.createClient = createClient;
