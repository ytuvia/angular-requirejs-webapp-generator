define(['app'], function(app){
    return app.controller('MainCtrl',['$scope', function($scope){
        $scope.appName = '<%= appName %>';
        $scope.awesomeThings = [
            'AngularJS',
            'Karma',
            'RequireJS'
        ];
    }]);
});
