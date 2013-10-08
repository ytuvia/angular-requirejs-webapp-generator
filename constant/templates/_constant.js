define(['app'], function(app){
    return app.constant('<%= _.camelize(name) %>',
        {
            TEST_CONST = '<%= _.camelize(name)%>';
        });
});