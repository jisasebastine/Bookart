angular.module('myApp')
 .controller("HeaderCtrl", function($scope, $location) {
	$scope.appDetails = {};
	$scope.appDetails.title = "BooKart";
	$scope.appDetails.tagline = "We have a collection of 6 books";
	
	$scope.nav = {};
	$scope.nav.isActive = function(path) {
		if (path === $location.path()) {
			return true;
		}
		return false;
	}
});