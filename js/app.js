'use strict';

google.load("feeds", "1");
// Declare app level module which depends on filters, and services
angular.module('diarioApp', [
    'ngRoute',
    'diarioApp.filters',
    'diarioApp.services',
    'diarioApp.directives',
    'diarioApp.controllers',
    'ngSanitize',
    'mm.foundation'
]).
    config(['$routeProvider', 'RSS', function($routeProvider, RSS) {
            $routeProvider.when('/', {templateUrl: "partials/rss.html", controller: 'RssCtrl'});
            $routeProvider.when('/detalles', {templateUrl: "partials/detail_view.html", controller: 'DetailCtrl'});
            angular.forEach(RSS, function(value, key) {
                $routeProvider.when(value.url, {templateUrl: value.template, controller: value.controller});
            });
            $routeProvider.otherwise({redirectTo: '/'});
        }]);
