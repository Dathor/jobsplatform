'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Offer Schema
 */
var OfferSchema = new Schema({
	refNo:{
		type:Number,
		required:'Please fill in a Ref. No.'
	},
	position:{
		type:String,
		required:'Please fill in a position'
	},
	description:{
		type:String,
		required:'Please fill in a description'
	},
	// TODO: Make 2 list for choosing and chosen. Hardcode defined technologies.
	// requiredTechnologies:{
	// 	type:[{
	// 		type:String
	// 	}],
	// 	required:'Please choose required technologies'
	// },
	jobType:{
		type:String,
		enum:['Team lead', 'Manager', 'Senior developer', 'Developer', 'Junior Developer', 'Trainee'],
		required:'Please choose a job type'
	},
	workTime:{
		type:String,
		enum:['Full-time', 'Part-time'],
		required:'Please choose a work time'
	},
	country:{
		type:String,
		required:'Please fill in the country'
	},
	city:{
		type:String,
		required:'Please fill in the city'
	},
	payment:{
		type:Number,
		required:'Please fill in the payment'
	},
	 company:{
	 	type: Schema.Types.ObjectId,
		 ref: 'User'
	 }
	
});

module.exports = mongoose.model('Offer', OfferSchema);