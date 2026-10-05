#	Node.js - Steams


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
