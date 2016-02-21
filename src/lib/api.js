'use strict';

var crypto = require('crypto');
var redis = require('./redis');

module.exports = {
  verify: verify,
  generatePair: generatePair
};


function _hash(input) {
  let shasum = crypto.createHash('sha256');
  shasum.update(input);
  return shasum.digest('hex');
}

function generatePair() {
  const apiKey = crypto.randomBytes(Math.ceil(8)).toString('hex');
  const secret = crypto.randomBytes(Math.ceil(16)).toString('hex');

  return new Promise((resolve, reject) => {
    redis.set(apiKey, secret, function(err) {
      if (err) {
        throw err;
      }

      resolve({
        apiKey: apiKey,
        secret: secret
      });
    });
  });
}

function verify(apiKey, hash) {
  return new Promise((resolve, reject) => {
    redis.get(apiKey, function(err, secret) {
      if (err) {
        throw err;
      }

      if (hash != _hash(apiKey + secret)) {
        throw new Error('Incorrect signature');
      }

      resolve();
    })
  });
}
