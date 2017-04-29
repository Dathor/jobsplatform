'use strict';

angular.module('offers').controller('OfferDetailsController', ['$scope', '$http', '$location', 'Authentication', '$stateParams',
	function($scope, $http, $location, Authentication, $stateParams) {
		
		$scope.authentication = Authentication;

		if(!$scope.authentication.user || $scope.authentication.user.roles[0] !== 'user') $location.path('/');

		$scope.offer = {};
		$scope.image = null;
		$http.get('/offer/details/' + $stateParams.token).success(function(response){
			$scope.offer = response;
		}).error(function(response){
			console.log(response.message);
		});
	}
]);