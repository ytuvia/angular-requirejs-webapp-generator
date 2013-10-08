'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');

var DirectiveGenerator = module.exports = function DirectiveGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  this.appName = require(path.join(process.cwd(), 'bower.json')).name;

  console.log('You called the directive subgenerator with the argument ' + this.name + '.');
};

util.inherits(DirectiveGenerator, yeoman.generators.NamedBase);

DirectiveGenerator.prototype.files = function files() {
  this.template('_directive.js', 'app/scripts/directives/'+ this._.slugify(this.name) + '.js');
  this.template('_directiveSpec.js', 'test/spec/directives/'+ this._.slugify(this.name) + '.js');
};
