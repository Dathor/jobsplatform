'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller'),
	mongoose = require('mongoose'),
	model = require('../../models/user.server.model'),
	User = mongoose.model('User'),
	passport = require('passport');

/**
 * Signup
 */
exports.signup = function(req, res) {

	// Init Variables
	var user = new User(req.body);
	var message = null;

	// Add missing user fields
	user.provider = 'local';
	user.displayName = user.firstName + ' ' + user.lastName;
	if(user.roles[0]!=='company'){
	 	user.companyUser=undefined;
	 }
	// Then save the user
	user.save(function (err) {
		if (err) {
			if(err.code === 11000){
				return res.status(400).send({
					message: 'Username or email already exists'
				});
			}
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}

		else {
			user.password = undefined;
			user.salt = undefined;

			req.login(user, function (err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.json(user);
				}
			});
		}
	});
};

/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			res.status(400).send(info);
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;

			req.login(user, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.json(user);
				}
			});
		}
	})(req, res, next);
};

/**
 * Signout
 */
exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};
