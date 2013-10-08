define(['angular', 'angularMocks', 'services/<%=_.slugify(name)%>'], function(angular) {
    describe('service: <%=_.classify(name)%>', function () {

        var httpBackend, srv;

        beforeEach(module('<%=appName%>'));

        beforeEach(inject(function($injector){
            srv = $injector.get('<%=_.classify(name)%>');
            httpBackend = $injector.get('$httpBackend');
        }));

        it('should have the name of the service as a srvName property', function () {
            expect(srv.srvName).toBe("<%=_.classify(name)%>");
        });

    });
});