'use strict';

/* Directives */


angular.module('diarioApp.directives', [])
    .directive('onEnter', function() {
		return function(scope, element, attrs) {
			element.on('keydown', function(event) {
				if (event.which === 13) {
					scope.$apply(attrs.onEnter);
				}
			});
		};
	})
    .directive('listDone', function() {
		return function(scope, element, attrs) {
			if (scope.$last) { // all are rendered
				scope.$eval(attrs.listDone);
			}
		};
	});
