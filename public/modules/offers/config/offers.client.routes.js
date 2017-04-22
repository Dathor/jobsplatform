'use strict';

//Setting up route
angular.module('offers').config(['$stateProvider',
	function($stateProvider) {
		// Offers state routing
		$stateProvider.
		state('offers', {
			url: '/offers',
			templateUrl: 'modules/offers/views/offers-index.client.view.html'
		}).state('createOffer',{
			url:'/company/createOffer',
			templateUrl: 'modules/offers/views/offer-create.client.view.html'
		}).state('editOffer',{
			url:'/editOffer/:token',
			templateUrl: 'modules/offers/views/offer-edit.client.view.html'
		}).state('searchOffers',{
			url:'/user/search',
			templateUrl:'modules/offers/views/offers-search.client.view.html'
		}).state('offerDetails',{
			url:'/user/offer/:token',
			templateUrl:'modules/offers/views/offer-details.client.view.html'
		});
	}
]);