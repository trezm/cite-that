'use strict';

var plugins = [
  require('./pubmed')
]

module.exports.plugins = plugins;
module.exports.checkHash = checkHash;

function checkHash(hash) {
  for (var i = 0; i < plugins.length; i++) {
    let plugin = plugins[i];
    let results = plugin.checkHash(hash);

    if (results) {
      return results;
    }
  }
}
