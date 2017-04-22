'use strict';

var authenticateUser = function ($q, Authentication){
    var user=Authentication.user;

    if(user&&user.roles[0]==='user'){
        return $q.when(user);
    }
    else{
        return $q.reject({authenticated:false});
    }
};
var authenticateCompany = function ($q, Authentication){
    var user=Authentication.user;

    if(user&&user.roles[0]==='company'){
        return $q.when(user);
    }
    else{
        return $q.reject({authenticated:false});
    }
};
var authenticateUnsigned = function ($q, Authentication) {
    var user=Authentication.user;

    if(user){
        return $q.reject({authenticated:true});
    }
    else{
        return $q.when(user);
    }
};
// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('companyProfile', {
			url: '/settings/profile/company',
			templateUrl: 'modules/users/views/settings/company.edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.view.html',
            resolve:{
                auth:['$q', 'Authentication', authenticateUnsigned]
            }
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'

		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		}).
		state('clientSignUp', {
			url:'/user/signup',
			templateUrl:'modules/users/views/authentication/signup.user.view.html'
		}).
		state('companySignUp', {
			url:'/company/signup',
			templateUrl:'modules/users/views/authentication/signup.company.view.html'
		}).
		state('logo', {
			url:'/settings/profile/logo',
			templateUrl:'modules/users/views/settings/image-upload.client.view.html'
		});
	}
]);
