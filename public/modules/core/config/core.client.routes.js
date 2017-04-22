'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');
		// Home state routing
	$stateProvider.
	state('home', {
		url: '/',
		templateUrl: 'modules/core/views/home.client.view.html'
        });
	}
]);
