'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	passport = require('passport'),
	uuid = require('node-uuid'),
	multiparty = require('multiparty'),
	fs = require('fs');

/**
 * Update user details
 */
exports.update = function(req, res){
	var user = req.user;
	user = _.extend(user,req.body);
	user.updated = Date.now();
	user.displayName = user.firstName + ' ' + user.lastName;

	if(user.roles[0]!=='company'){
 			user.companyUser = undefined;
	}
	user.save(function(err){
		if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.json(user);
					}
				});
			}
	})
}
/**
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};

exports.deleteImage = function(req, res){
	var user = req.user;
	var message = null;
	
	if(user){
		user.updated = Date.now();
		user.image = undefined;
		user.save(function(err){
			if(err){
				return res.status(400).send({
					message:errorHandler.getErrorMessage(err)
				});
			} else{
				res.send({
					message:'Image removed successfully'
				});
			}
		});
	} else{
		res.status(400).send({
			message:'User is not signed in'
		});
	}
};

exports.getCompanyName = function(id){
	User.findById(id, function(err, user){
		if(err){
			return null;
		} else{
			return user.companyUser.companyName;
		}
	});
};