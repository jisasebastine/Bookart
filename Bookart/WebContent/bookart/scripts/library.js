angular.module('myApp')
 .controller('LibCtrl', ['$scope','$http','bookService', function ($scope,$http,bookService) {
	 $scope.book = bookService.select_book(); 
	 console.log("Edited book: "+$scope.book.name);
	 $scope.cancel = function() {
		 console.log("cancelled editing "+bookService.select_book().name);
		 bookService.empty_select();
		 window.location = "/Bookart/bookart/index.html#/books";
		 console.log("cancelled editing "+bookService.select_book().name);
	 };
	 $scope.send = function(book) {		 
		 //index book
		 var id = bookService.select_book().id;
		 console.log("id: "+id);
		 $scope.book.imgUrl = $scope.myFile.name;
		 console.log("imgurl: "+book.imgUrl); 
//		 var delete_promise = $http({
//			 method:'DELETE', 
//			 url:'http://localhost:9200/books/details/'+id
//			 }).success(function(){
//				 console.log("Deleted book "+id);
//			}).error(function() {
//				console.log(id+": Deletion failed");
//			});
		 var promise = $http({
			 method:'PUT', 
			 url:'http://localhost:9200/books/details/'+id,
			 data:book
			 }).success(function(){
				 console.log("Indexed book "+book.name);
			});
		 console.log("Indexed book "+id+" - "+book.name);
		 alert("Success!")
		 bookService.selected_book = {};
		 window.location = "/Bookart/bookart/index.html#/books";
	 	};
	 }]);

