'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location','Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			if($scope.repeatPassword !== $scope.credentials.password){
				$scope.error = 'Passwords do not match'
			} else{
				$http.post('/auth/signup', $scope.credentials).success(function(response) {
					// If successful we assign the response to the global user model
					$scope.authentication.user = response;
					// And redirect to the index page
					$location.path('/');
				}).error(function(response) {
					$scope.error = response.message;
				});
			}
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				$scope.image = null;

				if($scope.authentication.user.image){
					$scope.image = new Image();
					$scope.image.src = $scope.authentication.user.image;
					$scope.image.height = $scope.image.height/5;
					$scope.image.width = $scope.image.width/5;
					$scope.authentication.user.image = $scope.image;
				}


				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
