myApp.factory("kartService", function(bookService) {
	var kart = [];
	var orderList = [];
	var bookList_length = bookService.getBooks().length;
	function width(value) {
		newValue = value*100;
		return newValue+"%";
	};

	function myFunction($scope) {
		 var popup = document.getElementById("myPopup");
		 popup.classList.toggle("show");
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
			bookList_length = bookService.getBooks().length;
			var available_books = bookList_length-orderList.length;
			var available_books = bookList_length-orderList.length;
			var av = d3.select(".chart");
//			av.select("#available").text("Available = "+available_books).transition().duration(1500).style("width",width(available_books));
			av.select("#inKart").text("Kart = "+kart.length).transition().duration(1500).style("width",width(kart.length));
			av.select("#sold").text("Sold = "+orderList.length).transition().duration(1500).style("width",width(orderList.length));
		}
	}
});