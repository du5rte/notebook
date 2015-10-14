# Node.js - Modules

## How does 'require' return the libaries?

 How does 'find' these files?

```js
var http = require('http'); http.js
var fs = require('fs'); fs.js
```


## exports

Defines what require returns

```js
module.exports = hello;
```

## Creating Modules

There's different methods to import our on modules by using `mode.export` and `require`

### Method 1
We can only set one object equals to module.exports


In `custom_hello.js`
```js
var hello = function() {
console.log("hello");
}
module.exports = hello;
```
In `app.js`
```js
var hello = require('./custom_hello');
hello();
```

### Method 2
We can set multiple methods

In `custom_goodbye.js`
```js
exports.goodbye = function() {
  console.log("goodbye");
};
```
In `app.js`
```js
var gb = require('./custom_goodbye');
gb.goodbye();

// if we only need to call it one, We can require and call it in one line
require('./custom_goodbye').goodbye();
```

### Method 3


In `my_module.js`
```js
var foo = function () {
  /* some code */
}
var bar = function () {
  /* some other code */
}
var baz = function () { // Private function!
  /* yet other some code */
}
module.foo = foo;
module.bar = bar;
```
In `app.js`
```js
var myMod = require('./my_module');

myMod.foo();

myMod.bar();
```

## Making HTTP Requests
```js
var http = require('http');
var message = "Here's looking at you, kid.";
var options = {
  host: 'localhost',
  port: 8080,
  path: '/',
  method: 'POST'
}
var request = http.request(options, function(response) {
  response.on('data', function(data) {
    console.log(data); //logs response body
  });
});

request.write(message);
request.end();
```
Encapsulating the function
```js
var http = require('http');
var makeRequest = function(message) {
  var options = {
    host: 'localhost',
    port: 8080,
    path: '/',
    method: 'POST'
  }
  var request = http.request(options, function(response) {
    response.on('data', function(data) {
      console.log(data); logs response body
    });
  });
  request.write(message);
  request.end();
}
```

In `make_request.js`
```js
var http = require('http');
var makeRequest = function(message) {
  /* some code */
}
module.exports = makeRequest;
```
Creating & Using a module

```js

In app.js
var makeRequest = require('./make_request');
makeRequest("Here's looking at you, kid.");
```

## Require Search
Some of the modules don't require ./ so what's going on there?

Looks up in the same directory
var make_request = require('./make_request');
Looks up in a parent directory
var make_request = require('../make_request');
Looks up in a absolute path
var make_request = require('/Users/user/nodes/make_request');

If we pass it just as a name from /Home/user/my_app/app.js
Looks up in /Home/user/my_app/node_modules/make_request.js
Looks up in /Home/user/node_modules/make_request.js
Looks up in /Home/node_modules/make_request.js
Looks up in /node_modules/make_request.js
var make_request = require('make_request');

## NPM
Package Manager command line tool that come with NodeJS, as a Module Repository and Dependency Management, Easy to publish modules
http://npmjs.org

## Installing a NPM Module
Installs into local node_modules directory
$npm install request
Now we can use
var request = require('request'); loads from node_modules

## Installing Local vs Global
Some packages should be installed globally, like coffee-script, which comes with a console executable
$npm install -g coffee-script
$coffee app.coffee
Also Global npm modules can't be required
var coffee = require('coffee-script'); wrong work!

## Searcing Modules
We can search modules on the npm registry website, on github or the command line
$npm search request

## Creating a package.json
Create a package.json file in the directory of interest, if it does not exist already, with the npm init command.
$ npm init

## Defining Dependencies
It's best pratice to create a package.json file, where we can specify the name of the app, the version, but the most important, the dependencies, the modules our application needs to run
{
"name": "My App",
"version": "1",
"dependencies": {
"connect": "1.8.7" module: version number
}
}
Once we've defined them we might wanna check we have them installed
$npm install will check our dependencies and install them on /node_modules/
Not only it looks through our dependencies it looks through our dependencies package.json and installs theirs sub-dependencies too
$npm install

## Semantic Versioning
Is what npm uses to version all their modules
http://semver.org
Patch version won't change the API, the names of the functions we'll call, Minor probably won't too, but Majors probably will
//1 = Major Version
//8 = Minor Version
//7 = Patch Version
"connect": "1.8.7"

Ranges
We should be using the most recente technologies, we can specifiy ranges in the package.json file
"~1" =
"connect": "~1" >= 1.0.0 < 2.0.0 Dangerous!
"connect": "~1.8" >= 1.8.0 < 1.9.0 API could change
"connect": "~1.8.7" >= 1.8.7 < 1.9.0 Considered safe
