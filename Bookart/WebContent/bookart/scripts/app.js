var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);

myApp.config(function($routeProvider) {
	
	$routeProvider
		.when("/books", {
			templateUrl: "partials/book-list.html",
			controller: "BookListCtrl"
		})
		.when("/kart", {
			templateUrl: "partials/kart-list.html",
			controller: "KartListCtrl"
		})
		.when("/order", {
			templateUrl: "partials/order-list.html",
			controller: "KartListCtrl"
		})
		.otherwise({
			redirectTo: "/books"
	});
});
myApp.service('client', function (esFactory) {
    return esFactory({
      host: 'https://a442f01b9dbc90ae72f6d0b9d84ac226.us-east-1.aws.found.io:9243',
      apiVersion: '5.0',
      log: 'trace'
    });
  });
myApp.factory("kartService", function(bookService) {
	var kart = [];
	var orderList = [];
	var bookList_length = bookService.getBooks().length;
	function width(value) {
		newValue = 600 + value*100;
		return newValue+"px";
	};
	return {
		getorderList : function() {
			return orderList;
		},
		updateOrder : function(book) {
			orderList.push(book);
		},
		getKart: function() {
			return kart;
		},
		addToKart: function(book) {
			kart.push(book);			
		},
		buy: function(book) {
			kart.splice(kart.indexOf(book),1);			
		},
		update: function($scope) {	
			var available_books = bookList_length-orderList.length;
			var av = d3.select(".chart").select("#available");
			av.transition().duration(3000).style("width",width(available_books)).text("Available = "+available_books);
			d3.select(".chart").select("#inKart").transition().duration(3000).style("width",width(kart.length)).text("Kart = "+kart.length);
			d3.select(".chart").select("#sold").transition().duration(3000).style("width",width(orderList.length)).text("Sold = "+orderList.length);
			console.log("available: "+available_books);
		}
	}
});

myApp.controller("KartListCtrl", function($scope, bookService, kartService) {
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

myApp.controller("BookListCtrl", function($scope, bookService, kartService) {
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

myApp.controller("HeaderCtrl", function($scope, $location) {
	$scope.appDetails = {};
	$scope.appDetails.title = "BooKart";
	$scope.appDetails.tagline = "We have collection of 1 Million books";
	
	$scope.nav = {};
	$scope.nav.isActive = function(path) {
		if (path === $location.path()) {
			return true;
		}
		return false;
	}
});



myApp.factory("bookService", function() {
	var index_val = 0;
	var books = [
		{
			imgUrl: "adultery.jpeg",
			index: index_val++,
			Added: "Add to Kart",
			name: "Adultery",
			price: 205,
			rating: 4,
			binding: "Paperback",
			publisher: "Random House India",
			releaseDate: "12-08-2014",
			details: "Linda, in her thirties, begins to question the routine and predictability of her days. In everybodys eyes, she has a perfect life-happy marriage, children and a career. Yet what she feels is an eno... <a href='#'>View More<a>"
		},
		{
			imgUrl: "geronimo.jpeg",
			index: index_val++,
			Added: "Add to Kart",
			name: "Geronimo Stilton Spacemice#2 : You're Mine, Captain!",
			price: 168,
			rating: 5,
			binding: "Paperback",
			publisher: "Scholastic",
			releaseDate: "01-07-2014",
			details: "Geronimo Stilton meets outer space in this cosmically fun spin-off series!Meet Geronimo StiltonixHe is a spacemouse - the Geronimo Stilton of a parallel universe! He is captain of the spaceship Mou... View More"
		},
		{
			imgUrl: "life-or-death.jpeg",
			index: index_val++,
			Added: "Add to Kart",
			name: "Life or Death",
			price: 339,
			rating: 4,
			binding: "Paperback",
			publisher: "Hachette India",
			releaseDate: "01-04-2014",
			details: "Why would a man escape from prison the day before he's due to be released? Audie Palmer has spent a decade in prison for an armed robbery in which four people died, including two of his gang. Five... View More"
		},
		{
			imgUrl: "playing.jpeg",
			index: index_val++,
			Added: "Add to Kart",
			name: "Playing It My Way : My Autobiography",
			price: 599,
			rating: 5,
			binding: "Hardcover",
			publisher: "Hodder & Stoughton",
			releaseDate: "01-08-2014",
			details: "I knew that if I agreed to write my story, I would have to be completely honest, as thats the way I have always played the game and that would mean talking about a number of things I have not addr... View More"
		},
		{
			imgUrl: "the-fault.jpeg",
			index: index_val++,
			Added: "Add to Kart",
			name: "The Fault in Our Stars",
			price: 227,
			rating: 4.5,
			binding: "Paperback",
			publisher: "Penguin Books Ltd",
			releaseDate: "25-01-2013",
			details: "Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist n... View More"
		},
		{
			imgUrl: "wings-of-fire.jpeg",
			index: index_val++,
			Added: "Add to Kart",
			name: "Wings of Fire: An Autobiography",
			price: 124,
			rating: 5,
			binding: "Paperback",
			publisher: "Universities Press",
			releaseDate: "25-08-2000",
			details: "Wings of Fire traces the life and times of India's former president A.P.J. Abdul Kalam. It gives a glimpse of his childhood as well as his growth as India's Missile Man. Summary of the Book Wings... View More"
		}
	];
	return {
		getBooks: function() {
			return books;
		},
		addToKart: function(book) {
			
		}
	}
});



