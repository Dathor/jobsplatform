'use strict'; 

angular.module('offers').controller('OffersUserController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {

		$scope.authentication = Authentication;

		if(!$scope.authentication.user || $scope.authentication.user.roles[0] !== 'user') $location.path('/');

		$scope.offers = [];
		// $scope.totalOffers = 0;
		// $scope.offersPerPage = 10;

		// $http.get('/offers/count').success(function(response){
		// 	$scope.totalOffers = response.count;
		// }).error(function(response){
		// 	console.log(response.message);
		// });

		// $scope.pagination = {
		// 	current: 1
		// }

		// function getPage(pageNumber){
		// 	$http.get('/offers/search/page=' + pageNumber).success(function(response){
		// 		$scope.offers = response;
		// 	}).error(function(response){
		// 		console.log(response.message);
		// 	});
		// }

		// $scope.changePage = function(pageNumber){
		// 	getPage(pageNumber);
		// };

		$http.get('/offers/search').success(function(response){
			$scope.offers = response;
			var i = 0;
			for(i; i<$scope.offers.length; ++i){
				var image = new Image();
				image.src = $scope.offers[i].company.image;
				image.width = image.width / 5;
				image.height = image.height / 5;
				$scope.offers[i].company.image = image;
			}
		}).error(function(response){
			console.log(response.message);
		});

		$scope.sort = function(key){
			$scope.sortKey = key;
			$scope.reverse = !$scope.reverse;
		}; 

		$scope.offerDetails = function(offer){
			$location.path('/user/offer/' + offer._id);
		};
		
	}
]);