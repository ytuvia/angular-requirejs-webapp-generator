define(['angularMocks', 'services/<%=_.slugify(name)%>'], function() {
    describe('Constant: <%=_.camelize(name)%>', function () {

        beforeEach(module('<%=appName%>'));

        var constant;
        beforeEach(inject(function($injector){
            constant = $injector.get('<%=_.camelize(name)%>');
        }));

        it('should have test property', function(){
            expect(mobliConstants.TEST_CONST).toEqual('<%=_.camelize(name)%>');
        });
    });
});