var settings = require('../../settings');
var services = require('../services');

module.exports.router = function(app) {
	function log(req, res, next) {
    logger.log('info', '[' + new Date() + '] ' + req.path, {
			method: req.method,
			query: req.query,
      ip: req.ip,
      body: req.body
		});

		next();
	};

	app.get('/ping', function(req, res) {
		res.send('pong');
	});

  app.use(function(req, res, next) {
    // This needs to be tightened up
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, sessionhash');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');

    next();
  });

  /**
   * These are the shortener links
   */
  app.post('/shorten', log, services.shortener.shorten);
  app.get('/:hash', log, services.shortener.redirect);
  app.get('/stats/:hash', log, services.stats.getStats);
}