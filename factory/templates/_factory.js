define(['app',], function(app){
    app.factory('<%= _.camelize(name)%>',[function(){

    	// Service logic
    	// ...

    	var meaningOfLife = 42;

	    // Public API here
	    return {
	      someMethod: function () {
	        return meaningOfLife;
	      }
	    };
	    return this;
    }])
});