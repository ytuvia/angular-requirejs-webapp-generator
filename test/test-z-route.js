/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var s_ = require('underscore.string');
var localUtils = require('../app/scripts/util.js');
var assert  = require('better-assert');

describe('arWebapp route subgenerator', function () {
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
    var testname = 'test';

    helpers.mockPrompt(this.app, {
      'someOption': true
    });

    this.app.options['skip-install'] = true;
    this.app.run({},function(){
      var view = helpers.createGenerator('arWebapp:route', [
        '../../route',
        '../../controller',
        '../../view'
      ],[testname]);

      view.run({}, function(){
        var expected_files = [
          'app/scripts/controllers/'+ s_.slugify(testname) + '.js',
          'test/spec/controllers/'+ s_.slugify(testname) + '.js',
          'app/views/'+ s_.slugify(testname) + '.html'
        ];
        console.log(expected_files);
        
        var ctrlUpdated = localUtils.validateFile(
        {
          file: 'app/scripts/controllers/'+ s_.slugify(testname) + '.js',
          splicable: [
            '$scope.ctrlName = \'' + s_.classify(testname) +'Ctrl\'',
          ]
        });
        console.log(ctrlUpdated);

        var testspecUpdated = localUtils.validateFile(
        {
          file: 'test/spec/controllers/'+ s_.slugify(testname) + '.js',
          splicable: [
            '\'Controller: ' + s_.classify(testname) + 'Ctrl\'',
          ]
        });

        var viewUpdated = localUtils.validateFile(
        {
          file: 'app/views/'+ s_.slugify(testname) + '.html',
          splicable: [
            '<p>This is the '+ testname +' view.</p>',
          ]
        });

        var routeUpdated = localUtils.validateFile(
        {
          file: 'app/scripts/config/controllers.js',
          splicable: [
            '\t,\'controllers/' + s_.slugify(testname) + '\''
          ]
        });

        helpers.assertFiles(expected_files);
        assert(false !== ctrlUpdated);
        assert(false !== testspecUpdated);
        assert(false !== testspecUpdated);
        
        done();
      });
    });
  });
});
