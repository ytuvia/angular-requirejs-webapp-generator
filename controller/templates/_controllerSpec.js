define(['angularMocks', 'controllers/<%=_.slugify(name)%>'], function() {
    describe('Controller: <%=_.classify(name)%>Ctrl', function () {

        // load the controller's module
        beforeEach(module('<%=appName%>'));

        var ctrl,
            scope;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller("<%=_.classify(name)%>Ctrl", {
                $scope: scope
            });
        }));

        it('should have the name of the controller in scope', function () {
            expect(scope.ctrlName).toBe("<%=_.classify(name)%>Ctrl");
        });
    });
});