define(['angular', 'angularMocks', 'services/<%=_.slugify(name)%>'], function(angular) {
    describe('directive: <%=_.camelize(name)%>', function () {

        var scope, element;

        beforeEach(module('<%=appName%>'));

        beforeEach(function($rootScope){
            scope = $rootScope.$new();
        });

        it('should make hidden element visible', inject(function ($compile) {
            element = angular.element('<<%= _.dasherize(name) %>></<%= _.dasherize(name) %>>');
            element = $compile(element)(scope);
            expect(element.text()).toBe('this is the <%= _.camelize(name) %> directive');
          }));

    });
});