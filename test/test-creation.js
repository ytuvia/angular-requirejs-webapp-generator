/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('arWebapp generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('arWebapp:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'Gruntfile.js',
      'karma.conf.js',
      'package.json',
      'bower.json',
      'app/index.html',
      'app/scripts/app.js',
      'test/test-main.js',
      'app/scripts/config',
      'app/scripts/config/config.js',
      'app/scripts/config/routes.js',
      'app/scripts/config/controllers.js',
      'app/scripts/controllers',
      'app/scripts/controllers',
      'app/scripts/controllers/main.js',
      'app/scripts/services',
      'app/scripts/directives',
      'app/styles',
      'app/views',
      'app/views/main.html',
      'test',
      'test/spec',
      'test/spec/controllers',
      'test/spec/controllers/main.js',
      'test/spec/services',
      'test/spec/directives',
      '.bowerrc',
      '.gitignore',
      '.jshintrc',
      '.editorconfig'
    ];

    helpers.mockPrompt(this.app, {
      'someOption': true
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
