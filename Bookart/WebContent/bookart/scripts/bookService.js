angular.module("myApp")
 .factory("bookService", ['$http', function($http) {
	var books = [];
	var selected_book = {};
	var promise = $http({
		method:'POST', 
		url:'http://localhost:9200/books/_refresh'
		});
	return {
		getPromise: function() {
			return promise;
		},
		select_book: function() {
			return selected_book;
		},
		empty_select: function() {
			selected_book= {};
		},
		getBooks: function() {
			return books;
		},
		get_Book: function(id) {
			console.log("get_Book, id ="+ id);
			var promise = $http({
				 method:'GET', 
				 url:"http://localhost:9200/books/details/"+id,
				 headers:{'Content-type':'application/json', 'Accept':'application/json'}
				 }).success(function(data){
					 selected_book = data._source;
					 selected_book.id = data._id;
					 selected_book.Added = "Add to Kart";
					 console.log("getBook returned: "+selected_book.name);
					 window.location ="/Bookart/bookart/index.html#/library";
				}).error(function(){
					console.log("ERROR.. in get_Book() function");
				});
		}
	}
}]);
