'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ace ' + chalk.red('generator-gorila-app') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'modname',
      message: 'Would you like to change module name?',
      default: this.appname
    }, {
      type: 'input',
      name: 'title',
      message: 'Would you like to change sample title?',
      default: 'Gorila-App ' + this.appname + ' Sample'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.props.classmodname = getClassModName(this.props.modname);

      this.log('app name', this.props.appname);
      this.log('module name', this.props.modname);
      this.log('module class name', this.props.classmodname);
    });
  }

  writing() {
    var props = this.props;
    var procReplacer = {
      process: function(content) {
        var newContent = content.toString().split('${modname}').join(props.modname);
        newContent = newContent.toString().split('${title}').join(props.title);
        newContent = newContent.toString().split('${classmodname}').join(props.classmodname);
        return newContent;
      }
    };

    this.fs.copy(this.templatePath('sample/data/dummyfile.txt'), this.destinationPath('sample/data/dummyfile.txt'), procReplacer);
    this.fs.copy(this.templatePath('sample/bootstrap.component.html'), this.destinationPath('sample/'+props.modname+'-bootstrap.component.html'), procReplacer);
    this.fs.copy(this.templatePath('sample/bootstrap.component.scss'), this.destinationPath('sample/'+props.modname+'-bootstrap.component.scss'), procReplacer);
    this.fs.copy(this.templatePath('sample/bootstrap.component.ts'), this.destinationPath('sample/'+props.modname+'-bootstrap.component.ts'), procReplacer);
    this.fs.copy(this.templatePath('sample/bootstrap.module.ts'), this.destinationPath('sample/'+props.modname+'-bootstrap.module.ts'), procReplacer);
    this.fs.copy(this.templatePath('sample/index.html'), this.destinationPath('sample/index.html'), procReplacer);
    this.fs.copy(this.templatePath('sample/main.ts'), this.destinationPath('sample/main.ts'), procReplacer);
  }

  install() {
    var cliconfig = {
      "name": this.props.modname,
      "root": "src/app/"+this.props.modname+"/sample",
      "outDir": "src/app/"+this.props.modname+"/dist",
      "assets": [
        "../../../assets",
        "../../../favicon.ico",
        "data"
      ],
      "index": "index.html",
      "main": "main.ts",
      "polyfills": "../../../polyfills.ts",
      "test": "../../../test.ts",
      "tsconfig": "../../../tsconfig.app.json",
      "testTsconfig": "../../../tsconfig.spec.json",
      "styles": [
        "../../../styles.scss",
      ],
      "environmentSource": "../../../environments/environment.ts",
      "environments": {
        "dev": "../../../environments/environment.ts",
        "prod": "../../../environments/environment.prod.ts"
      }
    };

    this.log('Add these config to your .angular-cli file:');
    this.log(cliconfig);
  }
};

function getClassModName(string) {
  var names = string.split('-');
  var i = 0;
  var classmodname = names[i].charAt(0).toUpperCase() + names[i].slice(1);
  while (++i < names.length) classmodname += names[i].charAt(0).toUpperCase() + names[i].slice(1);
  return classmodname;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
