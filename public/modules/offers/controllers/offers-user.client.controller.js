'use strict';

angular.module('offers').controller('OffersUserController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {

		$scope.authentication = Authentication;

		if(!$scope.authentication.user || $scope.authentication.user.roles[0] !== 'user') $location.path('/');

		$scope.offers = [];
		$http.get('/offers/search').success(function(response){
			$scope.offers = response;
		}).error(function(response){
			console.log(response.message);
		});

		$scope.sort = function(key){
			$scope.sortKey = key;
			$scope.reverse = !$scope.reverse;
		}; 

		
	}
]);