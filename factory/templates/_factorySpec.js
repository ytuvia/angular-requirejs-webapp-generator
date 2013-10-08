define(['angular', 'angularMocks', 'services/<%=_.slugify(name)%>'], function(angular) {
    describe('factory: <%=_.camelize(name)%>', function () {

        var factory;

        beforeEach(module('<%=appName%>'));

        beforeEach(inject(function($injector){
            factory = $injector.get('<%=_.camelize(name)%>');
        }));

        it('should have the name answer for the meaning of life', function () {
            expect(factory.someMethod()).toBe(42);
        });

    });
});