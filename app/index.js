'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');



var fedpGenerator = module.exports = function fedpGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(fedpGenerator, yeoman.generators.Base);

fedpGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  // var prompts = [{
  //   type: 'confirm',
  //   name: 'someOption',
  //   message: 'Would you like to enable this option?',
  //   default: true
  // }];

  // this.prompt(prompts, function (props) {
  //   this.someOption = props.someOption;

  //   cb();
  // }.bind(this));
  cb();
};

fedpGenerator.prototype.app = function app() {
  var _base = this.src._base;
  var _dest = this.src._destBase;

  this.mkdir('bower_components');
  this.directory('demo', 'demo');
  this.directory('dist', 'dist');
  this.mkdir('doc');
  this.mkdir('node_modules');
  this.directory('src', 'src');
  this.directory('test', 'test');
  console.log('Directories initialization done!');
  
};

fedpGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('_jshintrc', '.jshintrc');
  this.copy('_bower.json', 'bower.json');
  this.copy('_Gruntfile.js', 'Gruntfile.js');
  this.copy('_package.json', 'package.json');
  this.copy('README.md', 'README.md');
};
