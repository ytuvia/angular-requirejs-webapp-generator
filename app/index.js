'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var arWebappGenerator = module.exports = function arWebappGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(arWebappGenerator, yeoman.generators.Base);

arWebappGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'appName',
    message: 'What do you want to call your app?'
  }];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;

    cb();
  }.bind(this));
};

arWebappGenerator.prototype.app = function app() {
  this.mkdir('app');

  this.mkdir('app/scripts');
  this.mkdir('app/scripts/config');
  this.mkdir('app/scripts/controllers');
  this.mkdir('app/scripts/services');
  this.mkdir('app/scripts/directives');

  this.mkdir('app/styles');
  this.mkdir('app/views');

  this.mkdir('test');
  this.mkdir('test/spec');
  this.mkdir('test/spec/controllers');
  this.mkdir('test/spec/services');
  this.mkdir('test/spec/directives');

  this.copy('Gruntfile.js','Gruntfile.js');
  this.copy('karma.conf.js', 'karma.conf.js');
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');

  this.template('_index.html', 'app/index.html');

  this.template('scripts/_app.js','app/scripts/app.js');
  this.copy('test/test-main.js','test/test-main.js');
  
  this.template('scripts/config/_config.js', 'app/scripts/config/config.js');
  this.copy('scripts/config/routes.js', 'app/scripts/config/routes.js');
  this.copy('scripts/config/controllers.js', 'app/scripts/config/controllers.js');

  this.template('scripts/controllers/_main.js', 'app/scripts/controllers/main.js');
  this.copy('views/main.html', 'app/views/main.html');
  this.copy('test/spec/controllers/_main.js', 'test/spec/controllers/main.js');
};

arWebappGenerator.prototype.runtime = function runtime() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore','.gitignore');
};

arWebappGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
