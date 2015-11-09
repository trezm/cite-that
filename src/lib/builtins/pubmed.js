'use strict';

const pubmedBaseUrl = 'http://www.ncbi.nlm.nih.gov/pubmed';

module.exports = {
  checkHash: checkHash
};

function checkHash(hash) {
  const regex = /\d{8}/;

  if (regex.test(hash)) {
    return [pubmedBaseUrl, hash].join('/');
  }

  return null;
}
