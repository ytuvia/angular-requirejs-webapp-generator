define(['app'], function(app){
    return app.controller('<%= _.classify(name) %>Ctrl',['$scope', function($scope){
    	$scope.ctrlName = '<%= _.classify(name) %>Ctrl';
    }]);
});