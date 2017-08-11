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
