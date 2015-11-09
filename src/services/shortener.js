'use strict';

var async = require('async');
var crypto = require('crypto');
var redis = require('../lib/redis');

module.exports = {
  redirect: redirect,
  shorten: shorten
}

function _hash(url) {
  let shasum = crypto.createHash('sha1');
  shasum.update(url);
  return '0' + shasum.digest('hex').substring(0, 6);
}

function redirect(req, res) {
  let hash;

  if (!req.params.hash) {
    return res.status(400).json({
      error: 'could not find url'
    });
  }

  hash = req.params.hash;

  async.parallel({
    increaseCount: function increaseCount(done) {
      redis.incr(hash + ':count', done);
    },
    redirectUrl: function redirectUrl(done) {
      redis.get(hash, done);
    }
  }, function finished(err, results) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    if (!results.redirectUrl) {
      return res.status(404).json({
        error: 'No such url!'
      });
    }

    res.redirect(results.redirectUrl);
  });
}

function shorten(req, res) {
  let hex;

  if (!req.body.url) {
    return res.status(400).json({
      error: 'url required'
    });
  }

  hex = _hash(req.body.url);

  async.parallel({
    redirectUrl: function redirectUrl(done) {
      redis.set(hex, req.body.url, done);
    }
  }, function finished(err, results) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    res.json({
      hash: hex
    });
  });
}
