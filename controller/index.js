'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  // if the controller name is suffixed with ctrl, remove the suffix
  // if the controller name is just "ctrl," don't append/remove "ctrl"
  if (this.name && this.name.toLowerCase() !== 'ctrl' && this.name.substr(-4).toLowerCase() === 'ctrl') {
    this.name = this.name.slice(0, -4);
  }

  this.appName = require(path.join(process.cwd(), 'bower.json')).name;

  console.log('You called the controller subgenerator with the argument ' + this.name + '.');
};

util.inherits(ControllerGenerator, yeoman.generators.NamedBase);

ControllerGenerator.prototype.files = function files() {
  this.template('_controller.js', 'app/scripts/controllers/'+ this._.slugify(this.name) + '.js');
  this.template('_controllerSpec.js', 'test/spec/controllers/'+ this._.slugify(this.name) + '.js');
};
