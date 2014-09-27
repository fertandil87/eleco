'use strict';

/* Filters */

angular.module('diarioApp.filters', [])
    .filter('strip_http', function() {
		return function(str) {
			var http = "http://";
			return (str.indexOf(http) == 0) ? str.substr(http.length) : str;
		}
	});