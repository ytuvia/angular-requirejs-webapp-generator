define(['app',], function(app){
    app.service('<%= _.classify(name)%>',[function(){
    	// AngularJS will instantiate a singleton by calling "new" on this function
    	this.srvName = '<%= _.classify(name)%>';
        return this;
    }])
});