'use strict';

angular.module('users').controller('CompanyController',['$scope','$http','$location', 'Users','Authentication',
    function ($scope, $http, $location, Users, Authentication) {
        $scope.user=Authentication.user;

        if(!$scope.user||$scope.user.roles[0]!=='company'){
            $location.path('/');
        }

        $scope.updateCompanyInfo = function (isValid) {
            if(isValid){
                $scope.success = $scope.error = null;
                var user = new Users($scope.user);

                user.$update(function (response) {
                    $scope.success = true;
                    Authentication.user = response;

                },function (response) {
                    $scope.error=response.data.message;
                });
            }
            else{
                $scope.submitted = true;
            }
        };
    }
]);
