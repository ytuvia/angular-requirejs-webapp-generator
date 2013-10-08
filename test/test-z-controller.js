/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var s_ = require('underscore.string');
var localUtils = require('../app/scripts/util.js');
var assert  = require('better-assert');

describe('webapp controller subgenerator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('webapp:app', [
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
    
    this.app.run({}, function () {
      var controller = helpers.createGenerator('webapp:controller', [
        '../../controller'
      ],[testname]);
      controller.run({}, function(){
        var expected_files = [
          'app/scripts/controllers/'+ s_.slugify(testname) + '.js',
          'test/spec/controllers/'+ s_.slugify(testname) + '.js'
        ];
        
        var ctrlUpdated = localUtils.validateFile(
        {
          file: 'app/scripts/controllers/'+ s_.slugify(testname) + '.js',
          splicable: [
            '$scope.ctrlName = \'' + s_.classify(testname) +'Ctrl\'',
          ]
        });

        var testspecUpdated = localUtils.validateFile(
        {
          file: 'test/spec/controllers/'+ s_.slugify(testname) + '.js',
          splicable: [
            '\'Controller: ' + s_.classify(testname) + 'Ctrl\'',
          ]
        });

        helpers.assertFiles(expected_files);
        assert(false !== ctrlUpdated);
        assert(false !== testspecUpdated);
        done();
      });
    });
  });
});
