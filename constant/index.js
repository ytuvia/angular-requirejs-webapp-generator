'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');

var ConstantGenerator = module.exports = function ConstantGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  if (this.name && this.name.toLowerCase() !== 'cnst' && this.name.substr(-4).toLowerCase() === 'cnst') {
    this.name = this.name.slice(0, -4);
  }

  this.appName = require(path.join(process.cwd(), 'bower.json')).name;

  console.log('You called the constant subgenerator with the argument ' + this.name + '.');
};

util.inherits(ConstantGenerator, yeoman.generators.NamedBase);

ConstantGenerator.prototype.files = function files() {
  this.template('_constant.js', 'app/scripts/services/'+ this._.slugify(this.name) + '.js');
  this.template('_constantSpec.js', 'test/spec/services/'+ this._.slugify(this.name) + '.js');
};
