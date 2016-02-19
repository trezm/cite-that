'use strict';

var crypto = require('crypto');
var redis = require('./redis');

module.exports = {
  verify: verify
};


function _hash(input) {
  let shasum = crypto.createHash('sha256');
  shasum.update(input);
  return shasum.digest('hex');
}

function verify(apiKey, hash) {
  return new Promise((resolve, reject) => {
    redis.get(apiKey, function(err, secret) {
      if (err) {
        return reject(err);
      }

      if (hash != _hash(apiKey + secret)) {
        throw new Error('Incorrect signature');
      }

      resolve();
    })
  });
}
