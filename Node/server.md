## Node - Server

resources:
- [Express](http://expressjs.com/)
- [Connect](https://github.com/senchalabs/connect/)
- [HTTP Wiki](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)
- [HTTP Status Codes Wiki](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

## Creating a Server
A server will listen to any request from port 3000 and respond `'Hello World'`, it will stay in memory waiting for request until the process is exited with `CTRL+C` Twice or killed e.g. `$ kill -9 479`

*Open browser on `http://localhost:3000` or `$curl http://localhost:3000`*

```js
var http = require('http')

http.createServer(function (request, response) {
	response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
	response.write('Hello World\n')
	response.end()
}).listen(3000)
```

## Express
A small framework inspired by `Sinatra` with a lot `methods` inherited from node's `http` ready out the box to start building Web Apps.

```js
app.get('/', function(req, res) {
  res.send('Hello World')
})
```
Source code
```js
http.ServerResponse(request, response) {
  if(request.url == "/") {
    response.writeHead(200, {
      'Content-type': 'text/html'
    })
    response.write('Hello World')
    response.end()
  }
})
```

## Installing

```sh
$ npm install --save express
# or it's generator
$ npm install -g express-generator
$ express # appName (optional)
```

## Getting Started
Calling `express()` creates an application instance, giving us access to it's methods one of which `listen()` creates a connection

```js
var express = require('express')
var app = express()

// no routes configured yet, will send a `Cannot GET /` error

app.listen(3000)
```

It can take a `callback` as 2nd parameter, which runs when it's ready
```js
app.listen(3000, function() {
  console.log('Server is running on port 3000')
})
```

## Middleware
Connections are passed from one `middleware` to the next until it reaches an endpoint. `use()` allows us to mount middleware with an optional path that matches the beginning of the url e.g. `/users`

```js
app.use(function(req, res, next) {
  // middleware 1
  next();
})

app.use(function(req, res, next) {
  // middleware 2.1
  next();
}, function(req, res, next) {
  // middleware 2.2
  next();
})

app.use('/', function(req, res) {
  // middleware 3 ends with a message
  res.send('Hello World')
})
```

## Routing
Uses http methods `get`, `post`, `all` to match `requests`. see more on [routing guide](http://expressjs.com/en/guide/routing.html)

```js
app.all('/old_api', function(req, res) {
  res.redirect(301, 'api')
})

app.get('/api', function(req, res) {
  res.json({data: ''})
})
```

## Responding
Terminate a connection with a [response method](http://expressjs.com/en/guide/routing.html#response-methods), e.g. `send`, `render`, `json`, if no response is given or `next()` is called the user will be left hanging.

```js
app.get('/', function(req, res) {
  res.sendFile(`${__dirname}/public/index.html`)
})
```


## Static Server
Serves files found on the given `path`

```js
app.use(express.static(__dirname + '/public'))
// <img src="img-01">
app.use('/static', express.static(__dirname + '/public'))
// <img src="static/img-01">
```


## View Engine
Uses [templating languages](https://strongloop.com/strongblog/compare-javascript-templates-jade-mustache-dust/) to template views used in `responde.render()`

```js
app.set('view engine', 'jade');
// by default looks for views in ./views
// app.set('views', path.join(__dirname, 'views'))
```


## User Parameters
Uses [router paths](http://expressjs.com/en/guide/routing.html#route-paths) to create dynamic routes e.g. `/posts/cake-recipe`.

```js
var posts = require('posts.json')

app.get('/posts', function(req, res) {
  res.json( posts ) // sends all posts
})

app.get('/posts:title', function(req, res) {
  res.json( posts[req.params.title] ) // send specific post
})
```
the `?` at the end of a route parameter indicates that it is optional
```js
app.get('/posts:title?', function(req, res) {
  if (req.params.title) {
    res.json( posts[req.params.title] )
  } else {
    res.json( posts )
  }
})
```

Query parameters are available in the `req.query` object `someurl.com?raw=true`
```js
app.get('/posts', function(req, res) {
  if (req.query.raw) {
    res.sendFile(posts)
  } else {
    res.json(posts)
  }
})
```
Create custom Parameters
```js
app.param('title', function(req, res, next) {
  var title = req.params.title
  var block = title[0].toUpperCase() + title.slice(1).toLowerCase()
  // blockTitle will be available to other middleware
  req.blockTitle - block
  next()
})
app.get('/posts:title', function(req, res) {
  res.json( posts[req.blockTitle] )
})
```

## Example Blog App

```js
import express from 'express'
import posts from './posts.json'

const app = express()

app.set('view engine', 'jade')
app.set('views', `${__dirname}/templates`)
app.use(express.static(`${__dirname}/public`))

app.get('/', function(req, res) {
  res.render('index'. { posts })
})

app.get('/blog/:title?', function(req, res) {
  let title = req.params.title
  if (title === undefined) {
    res.status(404) // Service Unavailable
    res.send("This page is under construction!")
  } else if (req.params.title) {
    res.render('post', { post: posts[title] })
  } else {
    res.render('post', { post: posts })
  }
})

app.listen(3000, function() {
  console.log('Blog is running on port 3000!')
})
```

## Multiple Servers
We can direct server APIs to another server using `request`

```js
var request = require('request').defaullts({
	json: true
})

app.get('/anotherserver', (req, res) => {
	request({uri: 'http://localhost:3001'}, (err, res, body) {
		if (!err && response.statusCode === 200) {
			res.json(body)
		} else {
			res.send(response.statusCode)
		}
	})
})
```
