define(['angular' , 'angularResource',] , function (angular) {
    return angular.module('<%= _.camelize(appName) %>App' , ['ngResource']);
});