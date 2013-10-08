/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var s_ = require('underscore.string');
var localUtils = require('../app/scripts/util.js');
var assert  = require('better-assert');

describe('webapp service subgenerator', function () {
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
      var service = helpers.createGenerator('webapp:service', [
        '../../service'
      ],[testname]);
      service.run({}, function(){
        var expected_files = [
          'app/scripts/services/'+ s_.slugify(testname) + '.js',
          'test/spec/services/'+ s_.slugify(testname) + '.js'
        ];
        
        var srvUpdated = localUtils.validateFile(
        {
          file: 'app/scripts/services/'+ s_.slugify(testname) + '.js',
          splicable: [
            'this.srvName = \'' + s_.classify(testname) +'\'',
          ]
        });

        var testspecUpdated = localUtils.validateFile(
        {
          file: 'test/spec/services/'+ s_.slugify(testname) + '.js',
          splicable: [
            'service: ' + s_.classify(testname),
          ]
        });

        helpers.assertFiles(expected_files);
        assert(false !== srvUpdated);
        assert(false !== testspecUpdated);
        done();
      });
    });
  });
});
