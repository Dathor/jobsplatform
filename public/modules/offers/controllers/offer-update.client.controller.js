'use strict';

angular.module('offers').controller('OfferUpdateController', ['$scope', '$http', '$location', 'Authentication', '$stateParams',
	function($scope, $http, $location, Authentication, $stateParams) {
		
		$scope.authentication = Authentication;

		if(!$scope.authentication.user || $scope.authentication.user.roles[0]!=='company') $location.path('/');

		$scope.offer = {};
		$http.get('/offers:' + $stateParams.token).success(function(response){
			$scope.offer = response;
		}).error(function(response){
			console.log(response.message);
		});

		$scope.updateOffer = function() {
			$http.put('/offers/update' + $stateParams.token, $scope.offer).success(function(response){
				window.alert('Successfuly updated offer');
				$location.path('/');
			}).error(function(response){
				$scope.error = response.message;
			});
		};
	}
]);