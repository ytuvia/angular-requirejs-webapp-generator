define(['app', 'controllers/controllers'] , function (app) {
    return app.config(['$routeProvider' , function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
});