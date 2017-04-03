angular.module('myApp')
 .controller("BookListCtrl", function($scope, bookService, kartService) {
	kartService.update($scope);
	$scope.books = bookService.getBooks();
	$scope.addToKart = function(book) {
		if(book.Added == "Add to Kart") {
			kartService.addToKart(book);
			book.Added= "Added";
		}
		kartService.update($scope);
	};
	
});