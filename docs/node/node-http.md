---
title: "Node - HTTP"
type: doc
created: 2015-08-27
updated: 2017-08-12
tags: [node]
status: draft
---
# Node - HTTP

## Routes
When we type in a web address a request is sent to a server. After a domain name, there's a forward slash and then a path to a resource on the server. Sometimes, this is called a route. In this stage, we'll take a look at how to programmatically handle routes in Node.js.

`app.js`
```js
var http = require("http");
var routes = require("./routes.js");

http.createServer(function(request, response){
		routes.root(request, response);
		routes.contact(request, response);
		routes.about(request, response);
```

`routes.js`
```js
function root(request, response) {
		if(request.url == "/") {
				response.writeHead(200, {'Content-type': "text/plain"});
				response.end("Home\n");
		}
}
function contact(request, response) {
		if(request.url == "/contact") {
				response.writeHead(200, {'Content-type': "text/plain"});
				response.end("Contact\n");
		}
}
function about(request, response) {
	if(request.url == "/about") {
		response.writeHead(200, {'Content-type': "text/plain"});
		response.end("About\n");
	}
}
module.exports.root = root;
module.exports.contact = contact;
module.exports.about = about;
```

## http API
[modules_module_require_id](http://nodejs.org/api/modules.html#modules_module_require_id)

The http API is not available until we say we require it with the require function. `http` could be called anything but it's sensible to call it so

```js
var http = require('http');
```

### http.get
Creates a web request. Optionally we can set it inside a named variable `var request = http.get ...`

```js
var request = http.get('http://www.google.com/index.html', function(response) {
	console.dir(response);
});
```

### .on('data')
Reads the body from the response. [stream_event_data](http://nodejs.org/api/stream.html#stream_event_data)

response is a stream of data which is not just sent in one go but in packets of information. Node.js uses streams to implements it's non-blocking features, allowing the application to do other things while the data is being transferred.

Due to it the function will run several times for each fragment received

```js
// BODY: $%@ | BODY: *^$@ | BODY: !@^?
response.on('data', function (chunk) {
	console.log('BODY: ' + chunk);
});
```

Instead we can concatenate each chunk together as it arrives

```js
// var body = $%@ + *^$@ + !@^?
var body = '';
response.on('data', function (chunk) {
	body += chunk;
});
```

### .on('end')
Once all the data has arrived. [stream_event_end](http://nodejs.org/api/stream.html#stream_event_end)

```js
// BODY: $%@*^$@!@^?
response.on('end', function{
	console.log('BODY: ' + body);
});
```

## Dealing with errors

### .on('error')
Used to respond to an object event, often seen in nodeJs

```js
request.on('error', function(error) {
	console.error(error.message);
});
```

We can also attach a error message at the end

```js
http.get('http://www.google.com/index.html', function(response) {
	console.dir(response);
}).on('error', function(error) {
	console.log(error.message);
});
```

### .statusCode
Status code of response (e.g. 200 = OK, 404 = Not Found)

```js
console.log(response.statusCode);
response('end', function() {
	if (response.statusCode === 200) {
		//run code
	} else {
		//do something with error
	}
});
```

### try...catch
Tries a statement, if an error occurs, it throws an error object that we can catch. [try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)

```js
var jsonString = 'This is not a JSON String';
try {
	var jsonObject = JSON.parse(jsonString);
} catch(error) {
	console.error(error.message);
}
```

### http.STATUS_CODES
A collection of all the standard HTTP response status codes, and the short description of each. [http_http_status_codes](http://nodejs.org/api/http.html#http_http_status_codes)

```js
http.STATUS_CODES[response.statusCode]
http.STATUS_CODES[404] === 'Not Found'
```

## typeof
Check what 'typeof' object we have

```js
console.log(typeof body); // string
```

## JSON.parse()
Converts json a string into a json data structure. [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)

```js
JSON.parse(body)
```

## require
Requests a file. A direction is mandatory even if on the same directory `'./'`. [modules_file_modules](http://nodejs.org/api/modules.html#modules_file_modules)

```js
var profile = require('./profile.js');
// .js is optional
var profile = require('./profile');
```

## module.exports
Export a function with the name get which is called get(in this file). [modules_module_exports](http://nodejs.org/api/modules.html#modules_module_exports)

```js
module.exports.get = get;
// Optionally we could name it differently
module.exports.getProfile = get;
```

## .forEach()
We normally avoid forEach method as its not supported by all browsers but since nodeJS uses the V8 engine from the modern Chrome browser we can use it without worry

```js
var users = ['chalkers', 'joykesten2'];
users.forEach(function (username) {
	profile.getProfile(username);
});
// or even better
users.forEach(profile.getProfile);
```

## process
Just like in JavaScript there's 'window' object on nodeJS there's a process object

```js
console.dir(process);
```
```sh
$ node app.js chalker davemcfarland
```

### process.argv
Accesses the command line arguments on the `process` object, the parameters we pass can be found inside `.argv`

```js
console.dir(process.argv);
```
```sh
$ node app.js chalker davemcfarland
```

We don't need the first 2 items in the array, we can use slice to remove them

```js
[ 'node',
	'/home/treehouse/workspace/app.js',
	'chalker',
	'davemcfarland' ]
```

## .slice()
Will slice and array from the index upwards, e.g. 2 (3rd index)

```js
var users = process.argv.slice(2);
```

## Notes

- http.createServer
- response.write
- request.url

- require
- module.exports
- response.write
- request.url

File System
- fs.readFile
- fs.readFileSync
- response.write
- require
- module.exports

Treehouse Videos
- Using for in to Loop Through an Object's Properties

Node.js APIs Used

File System
- fs.readFileSync

JavaScript Documentation
- for...in
- String.prototype.replace

Further Reading
- Internet Media Types

Node.js APIs Used
- response.writeHead()
- message.method
- Stream "data" event
- Stream "error" event
- buffer.toString()
- querystring.parse()

Node.js APIs Used
- response.writeHead()

Further Reading
- HTTP Headers
- Redirection status codes
- [3xx Redirection](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#3xx_Redirection)

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

## Related
- [[docs/node/node-server|Node - Server]]
- [[docs/http|Networking - HTTP]]
