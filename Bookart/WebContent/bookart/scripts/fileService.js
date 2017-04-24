angular.module("myApp")
.factory("fileService", ['$http', function ($http) {
	
	var book_this = {};
	return {
	    uploadFileToUrl : function(file, uploadUrl){
	        var fd = new FormData();
	        fd.append('file', file);
	        console.log("File name: "+uploadUrl);
	        $http.post(uploadUrl, fd, {
	            transformRequest: angular.identity,
	            headers: {'Content-Type': undefined}
	        })
	        .success(function(){
	        })
	        .error(function(){
	        });
	    },
	    get_book_this : function() {
	    	return book_this;
	    }
	}
}]);
