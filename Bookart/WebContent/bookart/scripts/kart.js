angular.module('myApp')
 .controller("KartListCtrl", function($scope, bookService, kartService) {
	kartService.update($scope);
	$scope.kart = kartService.getKart();
	$scope.orderList = kartService.getorderList();
	$scope.buy = function(book) {
		if(book.Added == "Added") {
			kartService.updateOrder(book);
			kartService.buy(book);
			book.Added = "Sold";
		}
		kartService.update($scope);
	};
	$scope.remove = function(book) {
		if(book.Added == "Added") {
			kartService.buy(book);
			book.Added = "Add to Kart";
		}
		kartService.update($scope);
	};
	
});