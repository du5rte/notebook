////	Node.js - Server	/////
	//


//// HTTP 
	// The way Browsers and web servers agree to communicate is called a Protocol, the protocol most used is HTTP (HyperText Transfer Protocol). We can refer to the software on the server as an HTTP Server and Web browsers as HTTP Browsers.

//// HTTP Client (Web Browser)
	// An application used to download and render HTML and CSS and execute client side JavaScript.
	// When we type and address on the browser it sends a request for information to a server or a computer on the internet that has that domain name assigned to it.
	'example.com'

//// HTTP Servers
	// Part of the information the server receives in the request is the address or URL that the client has entered, which will have a path to a file.
	'http://example.com/index.html'
	//
	// The Software running on the server like Apache or NGINX, will be configured to look for a certain directory on the server, look for the file and read its content and sends it back to the browser.

//// local IP
	// local IP address assigned to all computers 
	127.0.0.1
	
//// Dynamic Sites
	// To run PHP Script on the server, we would need a PHP Interpreter to run the code to generate dynamic content on the page and sent it.
	
//// Node.js Server
	// Has awesome APIs that allow you to build all types of applications. Traditionally you'd need to install a server like Apache or NGINX if you wanted to run a static or dynamic website – but Node.js allows you to write your own web server with a simple API call.
	// With NodeJs we can create our own HTTP server programmatically, handling URLs and requests, and responding however we want. We can serve static files or generate dynamic content.
	
//// http API
	// http://nodejs.org/api/modules.html#modules_module_require_id
	// The http API is not available until we say we require it with the require function
	// http could be called anything but it's sensable to call it so
	var http = require('http');

//// Creating a Server
	// This server will listen to any request from port 3000 and response with Hello World
	// An example server can be found on https://nodejs.org home page
	// Open browser on localhost:8080
	// Or $curl http://localhost:8080
	http.createServer(function (request, response) {
		response.writeHead(200); // Status code in header
		response.write("Hello World!\n"); // Response Body
		response.end(); // Close the connection
	}).listen(8080); // Listen for connections on this port

//// Killing a Server
	// Even if we close the console, the server will continue to run on the background
	// First find the process.
	$ ps -aux
	// Second kill the process. Using -9 sends a signal to the process to kill immediately. It can't be ignored by the process and the process can't do any clean up.
	$ kill -9 479
	// or we can use 
	CTRL+C twice

	