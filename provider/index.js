'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');

var ProviderGenerator = module.exports = function ServiceGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  this.appName = require(path.join(process.cwd(), 'bower.json')).name;

  console.log('You called the provider subgenerator with the argument ' + this.name + '.');
};

util.inherits(ProviderGenerator, yeoman.generators.NamedBase);

ProviderGenerator.prototype.files = function files() {
  this.template('_provider.js', 'app/scripts/services/'+ this._.slugify(this.name) + '.js');
  this.template('_providerSpec.js', 'test/spec/services/'+ this._.slugify(this.name) + '.js');
};
