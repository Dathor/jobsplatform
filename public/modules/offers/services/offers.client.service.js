'use strict';

angular.module('offers').factory('Offers', ['$resource',
	function($resource) {
		return $resource('offers/:id',{},{
			read:{
				method:'GET'
			},
			update:{
				method:'PUT'
			}
		});
	}
]);