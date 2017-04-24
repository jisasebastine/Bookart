angular.module('myApp')
.config(function($routeProvider) {
	$routeProvider
		.when("/books", {
			templateUrl: "partials/book-list.html",
			controller: "BookListCtrl",
			resolve: {
				BooksInit: function(bookService) {
					return bookService.getPromise();
				}
			}
		})
		.when("/kart", {
			templateUrl: "partials/kart-list.html",
			controller: "KartListCtrl"
		})
		.when("/order", {
			templateUrl: "partials/order-list.html",
			controller: "KartListCtrl"
		})
		.when("/visualize", {
			templateUrl: "partials/visualize.html",
			controller: "vizCtrl"
		})
		.when("/library", {
			templateUrl: "partials/library.html",
			controller: "LibCtrl"
		})
		.otherwise({
			redirectTo: "/kart"
	});
});