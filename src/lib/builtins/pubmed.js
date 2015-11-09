'use strict';

const pubmedBaseUrl = 'http://www.ncbi.nlm.nih.gov/pubmed';

module.exports = {

}

function checkHash(hash) {
  const regex = /\d{8}/;

  if (regex.test(hash)) {
    return {
      redirectUrl: [pubmedBaseUrl, hash].join('/')
    };
  }

  return null;
}
