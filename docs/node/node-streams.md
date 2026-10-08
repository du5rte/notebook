---
title: "Node.js - Streams"
type: doc
created: 2018-06-18
updated: 2018-06-18
tags: [node]
---
# Node.js - Streams


## Streams
Node uses streams to handles and transfers data chunk by chunk, so we can start our processing Immediately as the data arrived and keep it from being held in memory all at once
Streams Are like channels where data can follow through, they can readable, writeable or both.

e.g. request is a readable stream, and response a writable stream


```js
http.createServer(function(request, response) {
	response.writeHead(200);
	response.write("<p>Stream is Running.</p>");

	setTimeout(function() { // As we have close response the stream is still open
		response.write("<p>Stream is done.</p>");
		response.end();
	}, 5000);

}).listen(8080);
```


## How to read from the Request?
The Request object is inherit form the event emitter, which means we can make other object fire through the request event

```js
EventEmitter (Readable Stream) >> emit >> readable / end
```

## readable
Fired when data is ready to be consumed

```js
request.on('end', function() { })
```

## end
Fired when the client is done sending it

```js
request.on('readable', function() { })
```

## Printing the Request
When all we need to do is writing from a writable string soon as you read from a readable string, like we are doing here:

```js
http.createServer(function(request, response) {
  response.writeHead(200)

  request.on('readable', function() {
    let chunk = null

    while (null !== (chunk = request.read())) {
    	// We have to convert to string as the chunks will be buffers (binary data).
			// console.log(chunk.toString())

      // Echos back what the the client request,
			// .write handles converting to a string
      response.write(chunk)
    }
  })

  request.on('end', function() {
    response.end()
  })
})
.listen(8080)
```
```sh
$ curl -d 'hello' http://localhost:8080
hello
```

## pipe
Node offers a method to pipe `.on('readable', () => {})` and `.on('end', () => {})` handling the event listening and chunk reading behind the scenes.

Same as previous code example.
```js
http.createServer((request, response) => {
	response.writeHead(200)
	request.pipe(response)
}).listen(8080)
```

## Reading and Writing a file
Here's we're basically making a copy of a file

```js
const fs = require('fs')

const file = fs.createReadStream("readme.md")
const newfile = fs.createWriteStream("readme_copy.md")

file.pipe(newFile)
```

gulpjs is a good example of a system built on top of streams


## Uploading a file
Steams chuckes of the file into NodeJS which Reads and writes it on the storage as it comes in, not at one point the entire file is being hold on memory all at once and also non-blocking


```js
http.createServer(function(request, response) {
  const newFile = fs.createWriteStream('readme_copy.md')
  request.pipe(newFile)

  request.on('end', function() {
    response.end('uploaded!')
  })
})
.listen(8080)
```

```sh
$ curl --upload-file readme.md http://localhost:8080
$ ls

index.js
readme.md
readme_copy.md
```


## File Uploading Progress
One of the reasons NodeJS was to read file uploads

```js
const http = require('http')
const fs = require('fs')

http.createServer(function(request, response) {
  const newFile = fs.createWriteStream('readme_copy.md')

  // first we need to know the file size
  const fileBytes = request.headers['content-length']

  // and track how much bytes have been uploaded
  var uploadedBytes = 0

  // then listening to the readable request will loop through and read each chunk uploaded from the request
  request.on('readable', function() {
    var chunk = null
    while (null !== (chunk = request.read())) {
      // we increment 'uploadedBytes' with each 'chunk'
      uploadedBytes += chunk.length
      // we calculate progress
      var progress = uploadedBytes / fileBytes * 100
      // we use parseInt to round up the integer
      response.write('progress: ' + parseInt(progress, 10) + '%\n')
    }
  })

  // Pipe is still taking care of the 'on readable'
	// the only reason we use readable is to track the progress
  request.pipe(newFile)
})
.listen(8080)
```

```sh
$ curl --upload-file file.jpg http://localhost:8080

progress: 3%
progress: 12%
progress: 24%
...
```

## Composing Streams
Node.js has a handy interface for shuffling data around called streams. With streams:
- we can compose streaming abstractions
- we can operate on data chunk by chunk

Lets us pick apart chunk by chunk instead of dealing with the whole object at once (e.g. large video files)

we can pipe abstraction together with stream using `.pipe()`
```js
fs.createReadStream('mobydick.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(reaplce(/\s+/g, '\n'))
  .pipe(filter(/whale/i))
  pipe(linecount(console.log))
```

## Chunk by Chunk
With streams, we can operate on data chunk by chunk, without buffering everything into memory.

This means we can write programs that operate on very large files or lazily evaluate network data as it arrives

It also means we can have hundreds or thousands of concurrent streams without using much memory.

```js
const fs = require('fs')

fs.createReadStream('greetz.txt')
  .pipe(process.stdout)
```

```js
const fs = require('fs')

fs.createReadStream(process.argv[2])
  .pipe(process.stdout)
```
streams the content of the file to the console
```sh
$ node print.js print.js
```

## Stream Transform

You can chain `.pipe()` calls together just like the `|` operator in bash:

```js
const fs = require('fs')

// first part is read the stream
fs.createReadStream(process.argv[2])
  // anything in between
  .pipe(toUpper())
  // final destination
  .pipe(process.stdout)
```

```js
// const through = require('through2')
// 
// function toUpper() {
//   return through((buf, enc, next) => {
//     next(null, buf.toString().toUpperCase())
//   })
// }

const { Transform } = require('stream')

function toUpper() {
  return new Transform({
    transform(chunk, encoding, callback) {
      callback(null, chunk.toString().toUpperCase());
    }
  });
}
```

Because streams handle data in a standard way it can handle various inputs the same way, doesn't have to be a file read

Here we use `process.stdin` to repat back in uppercase what we write to the console.

```js
const fs = require('fs')
const { Transform } = require('stream')

process.stdin
  .pipe(toUpper())
  .pipe(process.stdout)

function toUpper() {
  return new Transform({
    transform(chunk, encoding, callback) {
      callback(null, chunk.toString().toUpperCase())
    }
  })
}
```

## Concat-Stream
Buffers up all the data in the stream.
```
npm install concat-stream
```

You can only write to a `concat-stream`, You can't read from a `concat-stream`. Keep in mind that all the data will be in memory.

Now if we write to the console then hit `CTRL` + `D` it will log the data length.
```js
const concat = require('concat-stream')

process.stdin
  .pipe(concat((body) => {
    console.log(body.length)
  }))
```

## Related
- [[docs/node/node-basics|Node.js]]
