'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', '$http','$window',
	function($scope, Authentication, $http, $window) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		
		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		$scope.image = null;

		if($scope.authentication.user.image){
			$scope.image = new Image();
			$scope.image.src = $scope.authentication.user.image;
			$scope.image.height = $scope.image.height/5;
			$scope.image.width = $scope.image.width/5;
			$scope.authentication.user.image = $scope.image;
		}


		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		$scope.deleteImage = function(){
			var check = confirm('Are you sure?');

			if(check){
				$http.post('/users/deleteImage', $scope.authentication.user).success(function(response){
					$window.alert(response.message);
					$window.location.reload();
				}).error(function(response){
					$window.alert(response.message);
				});
			}
		};
	}
]);