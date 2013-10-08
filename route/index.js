'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var localUtils = require('../app/scripts/util.js');


var RouteGenerator = module.exports = function RouteGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  this.hookFor('webapp:controller');
  this.hookFor('webapp:view');
  
  console.log('You called the route subgenerator with the argument ' + this.name + '.');
};

util.inherits(RouteGenerator, yeoman.generators.NamedBase);

RouteGenerator.prototype.files = function files() {
  
  localUtils.rewriteFile({
      file: 'app/scripts/config/routes.js',
      needle: '.otherwise',
      splicable: [
        '.when(\'/' + this.name + '\', {',
        '  templateUrl: \'views/' + this.name + '.html\',',
        '  controller: \'' + this._.classify(this.name) + 'Ctrl\'',
        '})'
      ]
    });
  
  localUtils.rewriteFile({
      file: 'app/scripts/config/controllers.js',
      needle: ']);',
      splicable: [
        '\t,\'controllers/' + this._.slugify(this.name) + '\''
      ]
    });

};
