'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', '$http','$window',
	function($scope, Authentication, $http, $window) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		
		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

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