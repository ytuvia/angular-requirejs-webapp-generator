define(['app',], function(app){
    app.provider('<%= _.camelize(name)%>',[function(){

    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the <%= _.camelize(name) %> directive');
      }
    };

    }])
});