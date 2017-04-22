'use strict';

angular.module('offers').controller('OffersCompanyController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		if(!$scope.authentication.user || $scope.authentication.user.roles[0] !== 'company') $location.path('/');


		$scope.submitOffer = function(){
			if($scope.offer){
				$scope.offer.company = $scope.authentication.user._id;
			}
			$http.post('/offers/create', $scope.offer).success(function(response){
				$location.path('/');
			}).error(function(response){
				$scope.error = response.message;
			});
		};

		$scope.offers = [];
		$http.get('/offers/index/' + $scope.authentication.user._id).success(function(response){
			$scope.offers = response;
		}).error(function(response){
			console.log(response.message);
		});

		$scope.deleteOffer = function(offer){
			var confirm = window.confirm('Are you sure?');
			if(confirm){
				$http.delete('/offers/delete' + offer._id).success(function(response){
					window.alert(response.message);
					location.reload();
				}).error(function(response){
					window.alert(response.message);
				});
			}
		};

		$scope.updateOffer = function(offer){
			$location.path('/editOffer/' + offer._id);
		};

		$scope.sort = function(key){
			$scope.sortKey = key;
			$scope.reverse = !$scope.reverse;
		};
	}
]);