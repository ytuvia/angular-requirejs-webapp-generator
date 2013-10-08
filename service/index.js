'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');

var ServiceGenerator = module.exports = function ServiceGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  // if the controller name is suffixed with srv, remove the suffix
  // if the controller name is just "srv," don't append/remove "srv"
  if (this.name && this.name.toLowerCase() !== 'srv' && this.name.substr(-4).toLowerCase() === 'srv') {
    this.name = this.name.slice(0, -4);
  }

  this.appName = require(path.join(process.cwd(), 'bower.json')).name;

  console.log('You called the service subgenerator with the argument ' + this.name + '.');
};

util.inherits(ServiceGenerator, yeoman.generators.NamedBase);

ServiceGenerator.prototype.files = function files() {
  this.template('_service.js', 'app/scripts/services/'+ this._.slugify(this.name) + '.js');
  this.template('_serviceSpec.js', 'test/spec/services/'+ this._.slugify(this.name) + '.js');
};
