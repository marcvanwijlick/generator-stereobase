/* jshint -W097, -W117 */
'use strict';
var yeoman = require('yeoman-generator');
// to log a coloured message with Yeoman
var chalk = require('chalk');
// for injecting Bower components to HTML/SCSS files
var wiredep = require('wiredep');
// tell Yeoman what to say in the console
 var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  initializing: function() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the laudable ' + chalk.blue('stereosuper') + ' generator!'));
  },

  prompting: function () {
    var done = this.async();
    this.prompt([{
        type: 'input',
        name: 'name',
        message: 'What is you\'re project name?',
        default: 'test',
        required: true
      }]).then(function(answers) {
        this.name = answers.name;
        done();
      }.bind(this));
  },

  writing: {
    html: function () {
      console.log(this.name);
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('index.html'),
        { name: this.name }
      );
    },
    script: function () {
      this.fs.copyTpl(
        this.templatePath('js/script.js'),
        this.destinationPath('js/script.js')
      );
    },
    bower: function () {
      this.fs.copyTpl(
        this.templatePath('bower.json'),
        this.destinationPath('bower.json')
      );
      this.fs.copyTpl(
        this.templatePath('.bowerrc'),
        this.destinationPath('.bowerrc')
      );
    },
    sass: function () {
      this.fs.copyTpl(
        this.templatePath('scss/**/*'),
        this.destinationPath('scss/')
      );
    }
  },

  install: function () {
    this.bowerInstall(['jquery'], { 'saveDev': true });
    this.installDependencies();
  }
});
