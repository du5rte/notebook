////	Node.js - Steams	////
	//
	//	Streams
	//	How to read from the Request?
	//	readable
	//	end
	//	.pipe()
	//	Printing the Request
	//	Reading and Writing a file
	//	Uploading a file
	//	File Uploading Progress


//// Streams
	// Node uses streams to handles and transfers data chunk by chunk, so we can start our processing Immediately as the data arrived and keep it from being held in memory all at once 
	// Streams Are like channels where data can follow through, they can readable, writeable or both.
	// e.g. request is a readable stream, and response a writable stream
	http.createServer(function(request, response) {
		response.writeHead(200);
		response.write("<p>Stream is Running.</p>");
		
		setTimeout(function() { // As we have close response the stream is still open
			response.write("<p>Stream is done.</p>");
			response.end();
		}, 5000);
		
	}).listen(8080);

//// How to read from the Request?
	// The Request object is inherit form the event emitter, which means we can make other object fire through the request event 
	//
	//	EventEmitter (Readable Stream) >> emit >> readable / end

//// readable
	// Fired when data is ready to be consumed
	request.on('end', function() { });

//// end
	// Fired when the client is done sending it	
	request.on('readable', function() { });

//// .pipe()
	// Handles all the event listening and chunk reading behind the scenes
	request.pipe(response)
	
//// Printing the Request
	// When all we need to do is writing from a writable string soon as you read from a readable string, like we are doing here:
	http.createServer(function(request, response) {
		response.writeHead(200);
		request.on('readable', function() {
			var chunk = null;
			white ( null !== (chunk = request.read()) ) {
				/*// We have to convert to string as the chunks will be buffers (binary data).
				console.log(chunk.toString());*/
				// Echos back what the the client request, .write converts it to a string
				response.write(chunk);
			}
		});
		request.on('end', function() {
			response.end();
		});
	}).listen(8080);
	// Node offers a method to pipe .on('readable' ... ) and .on('end' ... )
	http.createServer(function(request, response) {
		response.writeHead(200);
		request.pipe(response);
	}).listen(8080);
	// $curl -d 'hello' http://localhost:8080 
	// hello

//// Reading and Writing a file
	// Here's we're basicly making a copy of a file
	// gulpjs.com is a good example of a system built on top of streams
	var fs = require('fs');
	var file = fs.createReadStream("readme.md");
	var newfile = fs.createWriteStream("readme_copy.md");
	file.pipe(newFile);

//// Uploading a file
	// Steams chuckes of the file into NodeJS which Reads and writes it on the storage as it comes in, not at one point the entire file is being hold on memory all at once and also non-blocking
	// $curl --upload-file readme.md http://localhost:8080
	http.createServer(function(request, response) {
		var newFile = fs.createWriteStream("readme_copy.md");
		request.pipe(newFile);
		request.on('end', function() {
			response.end('uploaded!');
		});
	}).listen(8080);

//// File Uploading Progress
	// One of the reasons NodeJS was to read file uploads
	// We'll need the HTTP and FS modules
	// $curl --upload-file file.jpg http://localhost:8080
	// progress: 3%
	// progress: 12%
	// progress: 24% ...
	http.createServer(function(request, response) {
		var newFile = fs.createWriteStream("readme_copy.md");
		// first we need to know the file size
		var fileBytes = request.headers['content-length'];
		// and track how much bytes have been uploaded
		var uploadedBytes = 0;
		// then listening to the readable request will loop through and read each chunk uploaded from the request
		request.on('readable', function () {
			var chunk = null;
			while(null !==(chunk = request.read())) {
				// we increament 'uploadedBytes' with each 'chunk'
				uploadedBytes += chunk.length;
				// we calculate progress
				var progress = (uploadedBytes / fileBytes) * 100;
				// we use parseInt to round up the integern
				response.write("progress: " + parseInt(progress, 10) + "%\n");
			}
		});
		// Pipe is still taking care of the upload, the only reason we use readable is to track the progress
		request.pipe(newFile);
	}).listen(8080);