'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto'),
	errorHandler = require('../controllers/errors.server.controller');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};

var validateStringCompanyFields = function (property) {
	return (this.roles[0] !== 'company' || property.length);
};

var validateNumberCompanyFields = function(property){
	return (this.roles[0] !== 'company' || property !== 0);
};

/**
 * User Schema
 */

var UserSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your first name']
	},
	lastName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your last name']
	},
	displayName: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true,
		index: true,
		unique: true,
		default: '',
		required: 'Please fill in your email',
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	username: {
		type: String,
		index: true,
		unique: true,
		required: 'Please fill in a username',
		trim: true
	},
	password: {
		type: String,
		default: '',
		validate: [validateLocalStrategyPassword, 'Password should be longer']
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerData: {},
	additionalProvidersData: {},
	roles: {
		type: [{
			type: String,
			enum: ['user', 'company']
		}]
	},
	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
	companyUser:{
		country: {
			type: String,
			default:'',
			validate:[validateStringCompanyFields, 'Country is required.']
		},
		EIK: {
			type: Number,
			default:0,
			validate:[validateNumberCompanyFields, 'EIK is required.']
		},
		companyName: {
			type: String,
			default:'',
			validate:[validateStringCompanyFields, 'Company name is required.']
		},
		companyAddress: {
			type: String,
			default:'',
			validate:[validateStringCompanyFields, 'Company address is required.']
		},
		numberOfEmployees: {
			type: String,
			default:0,
			validate:[validateNumberCompanyFields, 'Number of employees is required.']
		},
		website: {
			type: String,
			default:'',
			validate:[validateStringCompanyFields, 'Website is required.']
		},
		phoneNumber: {
			type: Number,
			default:0,
			validate:[validateNumberCompanyFields, 'Phone number is required.']
		}
	},
	empolyeeUser:{
		bookmarkedOffers: {
			type: [{
				type: mongoose.Schema.Types.ObjectId,
				ref:'Offer'
		}]
	}
	},
	/* For reset password */
	resetPasswordToken: {
		type: String
	},
	resetPasswordExpires: {
		type: Date
	},
	image:{
		type:String
	}
});


/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});
/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};
/**
 * Find possible not used username
 */
// UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
// 	var _this = this;
// 	var possibleUsername = username + (suffix || '');

// 	_this.findOne({
// 		username: possibleUsername
// 	}, function(err, user) {
// 		if (!err) {
// 			if (!user) {
// 				callback(possibleUsername);
// 			} else {
// 				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
// 			}
// 		} else {
// 			callback(null);
// 		}
// 	});
// };


module.exports = mongoose.model('User', UserSchema);

