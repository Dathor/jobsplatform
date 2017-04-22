'use strict';

var passport = require('passport');

module.exports = function(app) {
	var offers = require('../../app/controllers/offers.server.controller');

	app.route('/offers/create').post(offers.create);
	app.route('/offers/index/:token').get(offers.list);
	app.route('/offers/delete:offerId').delete(offers.delete);
	app.route('/offers::token').get(offers.read);
	app.route('/offers/update:token').put(offers.update);
	app.route('/offers/search').get(offers.all);
};