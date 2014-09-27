'use strict';

/* Controllers */

angular.module('diarioApp.controllers', [])
    .controller('AppCtrl', ['$scope', '$location', '$timeout', 'rssFeed', '$sce', 'RSS',
        function ($scope, $location, $timeout, rssFeed, $sce, RSS) {

            $scope.pages = RSS;
            $scope.page = RSS[0];

            $scope.scrollPos = {}; // scroll position of each view

            $(window).on('scroll', function () {
                if ($scope.okSaveScroll) { // false between $routeChangeStart and $routeChangeSuccess
                    $scope.scrollPos[$location.path()] = $(window).scrollTop();
                    //console.log($scope.scrollPos);
                }
            });

            $scope.setSource = function (page) {
                $scope.page = page;
                console.log($scope.page);
            };

            $scope.scrollClear = function (path) {
                $scope.scrollPos[path] = 0;
            };

            $scope.$on('$routeChangeStart', function () {
                $scope.okSaveScroll = false;
            });

            $scope.$on('$routeChangeSuccess', function () {
                $timeout(function () { // wait for DOM, then restore scroll position
                    $(window).scrollTop($scope.scrollPos[$location.path()] ? $scope.scrollPos[$location.path()] : 0);
                    $scope.okSaveScroll = true;
                }, 100);
            });

            $scope.setLoading = function (loading) {
                $scope.isLoading = loading;
            };

            $scope.loadFeed = function (url, addFeed) {
                $scope.setLoading(true);
                rssFeed.get(url).then(function (result) {
                    //console.log(result);
                    if (result.error) {
                        alert("ERROR " + result.error.code + ": " + result.error.message + "\nurl: " + url);
                        $scope.setLoading(false);
                    }
                    else {
                        var urlParser = document.createElement('a');
                        urlParser.href = result.feed.link;
                        result.feed.viewAt = urlParser.hostname;
                        $scope.feed_result = result.feed;
                        if ($scope.feed_result.entries === 0) {
                            $scope.setLoading(false);
                        }
                    }
                });
            };
            $scope.trustSrc = function (src) {
                return $sce.trustAsResourceUrl(src);
            };
            $scope.mediaOne = function (entry) { // return first media object for 'entry'
                return (entry && entry.mediaGroups) ? entry.mediaGroups[0].contents[0] : {url: ''};
            };

            $scope.hasVideo = function (entry) {
                var media = $scope.mediaOne(entry);
                return media.type ? (media.type == "video/mp4") : (media.url ? (media.url.indexOf(".mp4") != -1) : false);
            };

            $scope.ifPathNot = function (path) {
                return $location.path() != path;
            };

            $scope.setCurrEntry = function (entry) {
                $scope.currEntry = entry;
            };
            $scope.loadFeed($scope.page.link);
        }])
    .controller('RssCtrl', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {
            console.log($scope.page);
            $scope.loadFeed($scope.page.link);
            $scope.layoutDone = function () {
                $scope.setLoading(false);
            };

            $scope.viewDetail = function (entry) {
                $scope.setCurrEntry(entry);
                $location.path('/detalles');
            };
        }])

    .controller('DetailCtrl', ['$scope', '$location', function ($scope, $location) {
            $scope.scrollClear($location.path());

            $scope.vPlayer = $('#vPlayer')[0];
            $scope.videoPlay = $scope.hasVideo($scope.currEntry); // show errors only after "Play" video
            $($scope.vPlayer).on('error', function () {
                if ($scope.videoPlay) {
                    $scope.vidTagAlert.show();
                }
            });

            $scope.vidTagAlert = $('#vidTagAlert');
            $('#btnTagAlert').on('click', function () {
                $scope.vidTagAlert.hide();
            });

            $scope.videoStop = function () {
                $scope.vPlayer.pause();
            }
        }]);














