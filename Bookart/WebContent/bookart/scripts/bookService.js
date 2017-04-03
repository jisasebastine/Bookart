angular.module("myApp")
 .factory("bookService", ['$http', function($http) {
	var books = [];
	var promise = $http({method:'GET', url:'scripts/books.json'}).success(function(data){
		books = data;
	});
	return {
		getPromise: function() {
			return promise;
		},
		getBooks: function() {
			return books;
		}
	}
}]);