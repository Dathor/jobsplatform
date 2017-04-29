'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication', '$q',
	function($scope, $http, $location, Users, Authentication, $q) {

		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		 $scope.resizeImage = function ( file, base64Object ) {
			var deferred = $q.defer();
			var url = URL.createObjectURL(file);
			Jimp.read(url)
			.then(function (item) {
				if($scope.user.roles[0]==='company'){
					item.resize(Jimp.AUTO, 100)
					.getBase64(file.type, function (err, newBase64) {
						if (err) {throw err;}
						var bytes = Math.round((3/4)*newBase64.length);
						base64Object.filetype = file.type;
						base64Object.filesize = bytes;
						base64Object.base64 = newBase64;
						deferred.resolve(base64Object);
					});
				} else{
					item.resize(133, Jimp.AUTO)
					.getBase64(file.type, function (err, newBase64) {
						if (err) {throw err;}
						var bytes = Math.round((3/4)*newBase64.length);
						base64Object.filetype = file.type;
						base64Object.filesize = bytes;
						base64Object.base64 = newBase64;
						deferred.resolve(base64Object);
					});
				}
			})
			.catch(function (err) {
				return console.log(err);
			});
			return deferred.promise;
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);
				if(user.image){
					user.image = user.image.base64;
				}
				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

	}
]);