# YEOMAN - Basics

Creates a scafolding of our webapp

## Installing
```sh
$ npm install -g yo bower gulp
```

## Using
```sh
$ yo
# ? 'Allo User! What would you like to do? (Use arrow keys)
#   Run a generator
# ❯ Generator
#   Gulp Webapp
#   ──────────────
#   Update your generators
#   Install a generator
#   Find some help
#   Get me out of here!
```

## Creating a Generator
- [yeoman.io](http://yeoman.io/authoring/)
- [stephenplusplus](http://stephenplusplus.github.io/yeoman.io/generators.html)
- [tuts+](https://code.tutsplus.com/tutorials/build-your-own-yeoman-generator--cms-20040)
- [tuts+ class](http://code.tutsplus.com/courses/create-a-custom-yeoman-generator)
- [tagtree](http://tagtree.tv/yeoman-generator)
- [youtube](https://www.youtube.com/watch?v=1OAfGm_cI6Y)

```sh
# we can extend `yeoman-generator`
$ npm install --save yeoman-generator
# or we can use a yeoman generator
$ npm install -g yo generator-generator
$ yo generator
# Adds a shortcut to node globals
$ npm link
```

Adds files in `package.json`
```json
{
  "files": [
    "app"
  ]
}
```


## Extending a Generator
Creates a new generator by extending `generators`

```js
// good pratice to use strict
'use strict';

// Require the generator module
var generators = require('yeoman-generator');

// Extend it using base.extend
module.exports = generators.Base.extend({
  method: function() {
    console.log('testing 1, 2, 3 ...');
  }
});
```

## Running Context
Private methods are added to default and run automatically, but
Helper Methods `_methods:` with underscore won't be run automatically
[Running Context](http://yeoman.io/authoring/running-context.html)
```js
_method: function() {
  console.log('generating...');
},
```

### The run loop
Uses a Queueing System is made of different default tasks that use [Grouped Queue](https://github.com/SBoudrias/grouped-queue) to prioritizing tasks.

1. initializing
2. prompting
3. configuring
4. default
5. writing
6. conflicts
7. install
7. end

## Initializing
Checking current project state, greeting, getting configs, etc. [Yosay](https://github.com/yeoman/yosay) is used to display the greeting Yeoman and [Chalk](https://github.com/chalk/chalk) is used to style text in the console.

```js
var yosay = require('yosay');
var chalk = require('chalk');
```
```js
Initializing: function() {
  // in a environment where it's not in the console it won't be displayed
  console.log('Initializing Generator... 123');
  // it's best practice to use `this.log()` than `console.log()`
  this.log('Initializing Generator... 456');
  // Yosay
  this.log(yosay('Welcome to Test!'));
  // Yosay + Chalk
  var message = chalk.yellow.bold('Welcome to Test!')
              + chalk.yellow(' A awesome generator to develop with.');
  // we can specify text bubble characters width
  this.log(yosay(message, {maxLength: 17}));
}
```

## Prompting
Prompt users for options
```js
prompting: function() {
  // pauses yo while it waits for the answers
  var done = this.async();

  this.prompt({
    name: 'name',
    message: 'What is the name of your project?',
    // refeers to the folder name its running in
    default: this.appname
    // we can pass a callback function with an answers object
  }, function (answers) {
    this.appname = answers.name;
    // finishes the async
    done();
    // we can then binding it to the prompt object with bind
  }.bind(this));
}
```
or we can cut it to sections by using a helper method `_getPrompts`
```js
_getPrompts: function() {
  var prompts = [
    {
      name: 'name',
      message: 'What is the name of your project?',
      default: this.appname
    },
    {
      name: 'description',
      message: 'What is the description of your project?',
      default: this.appname
    }
  ];
  return prompts;
}
```
Save Answers
```js
_saveAnswers: function(answers, callback) {
  this.appname = answers.name;
  this.appdescription = answers.description;
  callback();
}
```
Prompting
```js
prompting: function() {
  var done = this.async();
  this.prompt(this._getPrompts(), function (answers) {
    this._saveAnswers(answers, done);
  }.bind(this));
}
```

## Create Directories
Uses [mkdirp](https://www.npmjs.com/package/mkdirp) to creates directories
```js
var mkdirp = require('mkdirp');
```
```js
mkdirp(this.destinationRoot() + '/app' + '/scripts');
```

## Copying
Using [mem-fs-editor](https://github.com/SBoudrias/mem-fs-editor) we can copy files

`this.sourceRoot()` gets a reference to the source directory
```js
var sourceRoot = this.sourceRoot();
```

`this.destinationRoot()` gets a reference to the destination directory
```js
var destRoot = this.destinationRoot();
```

Uses `mem-fs-editor` methods e.g. `fs.copy()`
```js
this.fs.copy(sourceRoot + '/.bowerrc', destRoot + '/.bowerrc');
```

Yeoman has an in-memory file-system, file collisions need to be approved
```sh
conflict bower.json
# Yes, No, All, X(abort), Diff, Help
? Overwrite bower.json? (Ynaxdh)
```

## Templating
Using [Lodash Template](https://lodash.com/docs#template) we can make our files more dynamic.

Uses a different `mem-fs-editor` method to copy and template `fs.copyTpl(origin, destination, object)`
```js
var templateContext = {
  appname = this.appname;
  appdescription = this.appdescription;
  appversion = this.appversion;
  applicense = this.applicense;
  appauthor = this.appauthor;
  appemail = this.appemail;
}
```
```js
this.fs.copyTpl(sourceRoot + '/bower.json', destRoot + '/bower.json', templateContext);
```
Now we can template files
```json
{
  "name": "<%= appname %>",
  "version": "<%= appversion %>",
  "authors": [
    "<%= appauthor %> <<%= appemail %>>"
  ],
  "license": "<%= applicense %>",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ]
}
```
README.md
```markdown
## <%= appname %>
<% if (appdescription !== "") { %><%= appdescription %><% } %>

<% if (appauthor !== "") { %>## Author
This project was created by <%= appauthor %> <% if (appemail !== "") { %>(<%= appemail %>)<% } %>
<% } %>

## License
<%= applicense %>
```

## Options and Arguments

```js
// overwriting the contructor
constructor: function() {
  generators.Base.apply(this, arguments);

  // Argument are required by default
  this.argument('sass', {
    required: false,
    desc: 'Use classic Sass Indented Syntax or Scss'
  });

  // Argument are not required by default
  this.options('sass', {
    desc: 'Use classic Sass Indented Syntax or Scss'
  });

},
```
```js
var sassFileExtension = (this.options.sass) ? '.sass' : '.scss';
this.fs.copyTpl(sourceRoot + '/styles/main' + sassFileExtension, appDir + '/styles/main' + sassFileExtension, templateContext);
```

```sh
# argument
$ yo test sass
# option
$ yo test --sass

# desccription shows in helper
$ yo test --help
Arguments:
  sass  # Use classic Sass Indented Syntax or Scss  Type: String  Required: false
```
