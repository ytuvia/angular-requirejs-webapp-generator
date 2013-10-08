/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var s_ = require('underscore.string');
var localUtils = require('../app/scripts/util.js');
var assert  = require('better-assert');

describe('webapp directive subgenerator', function () {
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
    var testname = 'testdirective';

    helpers.mockPrompt(this.app, {
      'someOption': true
    });

    this.app.options['skip-install'] = true;
    
    this.app.run({}, function () {
      var subgenerator = helpers.createGenerator('webapp:directive', [
        '../../directive'
      ],[testname]);
      subgenerator.run({}, function(){
        var expected_files = [
          'app/scripts/directives/'+ s_.slugify(testname) + '.js',
          'test/spec/directives/'+ s_.slugify(testname) + '.js'
        ];
        
        var objectUpdated = localUtils.validateFile(
        {
          file: 'app/scripts/directives/'+ s_.slugify(testname) + '.js',
          splicable: [
            'this is the '+ s_.camelize(testname)+' directive',
          ]
        });

        var testspecUpdated = localUtils.validateFile(
        {
          file: 'test/spec/directives/'+ s_.slugify(testname) + '.js',
          splicable: [
            'directive: ' + s_.camelize(testname),
          ]
        });

        helpers.assertFiles(expected_files);
        assert(false !== objectUpdated);
        assert(false !== testspecUpdated);
        done();
      });
    });
  });
});
