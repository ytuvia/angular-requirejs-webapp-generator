define(['angular', 'angularMocks', 'services/<%=_.slugify(name)%>'], function(angular) {
    describe('provider: <%=_.camelize(name)%>', function () {

        var provider;

        beforeEach(module('<%=appName%>'));

        beforeEach(inject(function($injector){
            provider = $injector.get('<%=_.camelize(name)%>');
        }));

        it('should have great with hellp', function () {
            expect(provider.great()).toBe('hello');
        });

    });
});