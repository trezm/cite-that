'use strict';

var async = require('async');
var api = require('../lib/api');
var builtins = require('../lib/builtins');
var redis = require('../lib/redis');

module.exports = {
  getStats: getStats
}

function getStats(req, res) {
  const hash = req.params.hash;
  const apiKey = req.headers.apikey;
  const signature = req.headers.signature;
  let count;

  if (!hash) {
    return res.status(400).json({
      error: 'could not find url'
    });
  }

  if (!apiKey) {
    return res.status(400).json({
      error: 'Api key required'
    });
  }

  if (!signature) {
    return res.status(400).json({
      error: 'Signature required'
    });
  }

  async.series({
    verifyApiKey: function verifyApiKey(done) {
      api.verify(apiKey, signature).then(() => done(), (err) => done(err));
    },
    getStats: function getStats(done) {
      redis.get(hash + ':count', (err, _count) => {
        if (err) {
          return done(err);
        }

        count = _count;
        done();
      });
    }
  }, function finished(err) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    res.json({
      count: count
    });
  });
}
