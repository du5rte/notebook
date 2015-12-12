## Node - Express.js

resources:
- [Express.js](http://expressjs.com/)
- [HTTP Status Codes - Wiki](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
- [HTTP - Wiki](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)

## Express
A small framework inspired by `Sinatra` that sits on top of `Node,js`, with a lot of `APIs` ready out the box to start building big Web Apps.

## Getting Started

#### Installing

```sh
$ npm install --save express
# or it's generator
$ npm install -g express-generator
$ express # appName (optional)
```

#### Starting a Server

```js
var express = require('express');
var app = express();

// There's no routes yet configured, so it will through a `Cannot GET /` error
app.listen(3000)
```

It can take a function as a `2nd parameter`
```js
app.listen(3000, function() {
  console.log('The frontend Server is running on port: 3000')
})
```

## Get
The `get` method registers a route that will listen for HTTP `GET` requests at a given route, which in this case `/` is the root/home route.

```js
app.get('/', function(request, response) {
  response.send('I love Treehouse!')
})

app.listen(3000, function() {
  console.log('The frontend Server is running on port 3000')
})
```

## Request Object
The JavaScript bundle of the HTTP request from a client

```js
req.route // Route: {methods: Object, path: "/blog"}
req.method // "GET"
req.params // {}
```

## Parameters
route `/blog` parameter `/:title`. the `?` at the end of a route parameter indicates that it is optional.
```js

```

res.status
bots status code

res.send
The response object’s `send` method can be used to send a string or JSON.

## Templating

- Handlebars
- EJS (Embeded JavaScript)
- JADE

A comparison of JavaScript Template Engines: https://strongloop.com/strongblog/compare-javascript-templates-jade-mustache-dust/


response.render


## Static Server
Express has a built in middleware for serving static files.
use can define middleware

```js
// <img src="img-01">
app.use(express.static(__dirname + '/public'))
// <img src="static/img-01">
app.use('/static', express.static(__dirname + '/public'))
```

## Rest API Server
The most common data format for Node.js servers to serve and consume is `json`


#### `res.json(  )`
Same as `send()` but can coerce null and undefined values into valid json
```js
app.get('/posts', function(req, res) {
  res.json(postsList);
})
```



## Path
```js
__dirname // the path to the current file
```


#### Query
Parameters passed to a get request are available in the `req.query` object `someurl.com?raw=true`
```js
app.get('/posts', function(req, res) {
  if (req.query.raw) {
    res.json(posts)
  } else {
    res.json(postList)
  }
})
```

```js
'use strict'

import express from 'express'
import posts from './mock/posts.json'

const app = express()

app.set('view engine', 'jade')
app.set('views', `${__dirname}/templates`)
app.use(express.static(`${__dirname}/public`))

app.get('/', function(req, res) {
  res.render('index')
})


app.get('/blog/:title?', function(req, res) {
  let title = req.params.title // blog/Crossfit%20is%20Cool
  if (title === undefined) {
    res.status(503) // Service Unavailable
    res.send("This page is under construction!")
  } else {
    let post = posts[title] || {} // "Cross Fit is Cool"

    // res.local.post = post // res.locals variables that will be accesible in the template
    res.render('post', { post }) // "Cross Fit is Cool": { "title": "", "description": ""}

  }
})

app.listen(3000, function() {
  console.log('The frontend Server is running on port 3000!')
})
```
