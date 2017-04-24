angular.module('myApp')
 .controller("BookListCtrl",function($scope, bookService, kartService) {
	bookService.selected_book = {};
	kartService.update($scope);
	$scope.books = bookService.getBooks();
	$scope.addToKart = function(book) {
		if(book.Added == "Add to Kart") {
			kartService.addToKart(book);
			book.Added= "Added";
		}
		kartService.update($scope);
	};
	$scope.edit = function(id) {
		console.log("edit function, id ="+ id);
		bookService.get_Book(id);
	};
	
});