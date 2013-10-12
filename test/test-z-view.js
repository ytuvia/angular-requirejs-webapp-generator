/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var s_ = require('underscore.string');
var localUtils = require('../app/scripts/util.js');
var assert  = require('better-assert');

describe('arWebapp view subgenerator', function () {
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
    
    this.app.run({}, function () {
      var view = helpers.createGenerator('arWebapp:view', [
        '../../view'
      ],[testname]);
      view.run({}, function(){
        var expected_files = [
          'app/views/'+ s_.slugify(testname) + '.html'
        ];
        
        var viewUpdated = localUtils.validateFile(
        {
          file: 'app/views/'+ s_.slugify(testname) + '.html',
          splicable: [
            '<p>This is the '+ testname +' view.</p>',
          ]
        });

        helpers.assertFiles(expected_files);
        assert(false !== viewUpdated);
        done();
      });
    });
  });
});
