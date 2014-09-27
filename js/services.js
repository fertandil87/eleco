'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('diarioApp.services', [])
    .service('rssFeed', function($q, $rootScope) {
		this.get = function(url) {
			var d = $q.defer();
			var feed = new google.feeds.Feed(url);
			feed.setNumEntries(10);
			feed.load(function(result) {
				$rootScope.$apply(d.resolve(result));
			});
			return d.promise;
		}
	})
