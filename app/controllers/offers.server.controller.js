'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller.js'),
    mongoose = require('mongoose'),
	Offer = mongoose.model('Offer'),
	passport = require('passport'),
    multiparty = require('multiparty'),
	fs = require('fs'),
    _ = require('lodash'),
    User = mongoose.model('User');

/**
 * Create a Offer
 */
exports.create = function(req, res) {
    
    var offer = new Offer(req.body);
    var message = null;

    offer.save(function(err){
        if(err){
            return res.status(400).send({
                message:errorHandler.getErrorMessage(err)
            });
        } else{
            return res.send({
                message:'Success'
            });
        }
    });
};

/**
 * Show the current Offer
 */
exports.read = function(req, res) {
    Offer.findById(req.params.token, function(err, offer){
        if(err){
            res.status(400).send({
                message: err
            });
        } else{
            res.json(offer);
        }
    });
};

/**
 * Update a Offer
 */
exports.update = function(req, res) {

    Offer.findById(req.params.token, function(err, offer){
        if(err){
            res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else{
            _.extend(offer, req.body);

            offer.save(function(err){
                if(err){
                    return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                } else{
                    res.send({
                        message: req.body
                    });
                }
            });
        }   
    });
};

/**
 * Delete an Offer
 */
exports.delete = function(req, res) {
    
    Offer.findByIdAndRemove(req.params.offerId, function(err){
        if(err){
            res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else{
            res.send({
                message:'Success',
            });
        }
    });
};

/**
 * List of Offers
 */
exports.list = function(req, res) {
    Offer.find({company: req.params.token}, function(err, offers){
        if(err){
            return res.status(400).send({
                message:errorHandler.getErrorMessage(err)
            });
        } else{
            res.send(offers);
        }
    });
};

/**
 * Splits all of the offers into pages
 */
exports.pagedRead = function(req, res){
    var page = req.params.page;
    var perPage = 10;
    Offer.find({}).skip((page-1)*10).limit(perPage).populate('company', 'companyUser.companyName image').exec(function(err,offers){
        if(err){
            return res.status(400).send({
                message:errorHandler.getErrorMessage(err)
            });
        } else{
            res.send(offers);
        }
    });
};

exports.all = function(req, res){
    var page = req.params.page;
    var perPage = 10;
    Offer.find({}).populate('company', 'companyUser.companyName image').exec(function(err,offers){
        if(err){
            return res.status(400).send({
                message:errorHandler.getErrorMessage(err)
            });
        } else{
            res.send(offers);
        }
    });
};

/**
 * Get an offer for detailed reading
 */

exports.offerDetails = function(req, res){
    Offer.findById(req.params.token).populate('company', 'companyUser image').exec(function(err, offer){
        if(err){
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else{
            res.send(offer);
        }
    })
};

/**
 * Counts all of the offers
 */

exports.count = function(req,res){
    Offer.count(function(err,count){
        if(err){
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else{
            res.send({count: count});
        }
    })
};
