/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var s_ = require('underscore.string');
var localUtils = require('../app/scripts/util.js');
var assert  = require('better-assert');

describe('webapp constant subgenerator', function () {
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
    var testname = 'testconstant';

    helpers.mockPrompt(this.app, {
      'someOption': true
    });

    this.app.options['skip-install'] = true;
    
    this.app.run({}, function () {
      var constant = helpers.createGenerator('webapp:constant', [
        '../../constant'
      ],[testname]);
      constant.run({}, function(){
        var expected_files = [
          'app/scripts/services/'+ s_.slugify(testname) + '.js',
          'test/spec/services/'+ s_.slugify(testname) + '.js'
        ];
        
        var cnstUpdated = localUtils.validateFile(
        {
          file: 'app/scripts/services/'+ s_.slugify(testname) + '.js',
          splicable: [
            'TEST_CONST = \''+ s_.camelize(testname)+ '\'',
          ]
        });

        var testspecUpdated = localUtils.validateFile(
        {
          file: 'test/spec/services/'+ s_.slugify(testname) + '.js',
          splicable: [
            'Constant: '+ s_.camelize(testname)
          ]
        });

        helpers.assertFiles(expected_files);
        assert(false !== cnstUpdated);
        assert(false !== testspecUpdated);
        done();
      });
    });
  });
});
