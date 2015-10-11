////	Node.js - Events	////
	//
	//	Why JavaScript?
	//	Events Loop
	//	EventEmitter
	//			Creating a Custom Event Emitter
	//	Refractoring http.createServer
	//	.on() 
	//	.emit()

//// Why JavaScript?
	// JavaScript make it easy write in a 'Evented Way' (based on events) helping it to be non-blocking
	"JavaScript has certain characteristics that make it very different than other dynamic languages, namely that it has no concept of threads. Its model of concurrency is completely based arround events. - Ryan Dahl"

//// The Event Loop
	// The first time we run through the code node it's gonna register events, one of those is the request event for when a request comes in.
	// Once it's read the script it goes into a event loop, it continuosly stays puts checking for events, in this case a request coming in.
	// When a request comes it it fire the callback
	// The callback it self can trigger more events and the application loops through the Event Queue where each event is processed one at the time

	// 1. Request comes in, triggers request event
	// 2. Request Callback executes
	// 3. Callback executed
	//
	// Blocking
	//
	//	 #1
	//	 	##2
	//	 		######################3
	//
	//														#1
	//														 ##2
	//															 ######################3
	//
	// Non-Blocking
	//
	//	 #1
	//	 	##2
	//	 		######################3
	//
	//			 #1
	//				##2
	//					######################3
	//
	//	|-------------------------|-----------------------------|
	//	0s											 0.5s							 						  1s


//// EventEmitter
	// just like in the DOM many object in Node emit events, and changes are if they do they inherit from the EventEmitter Constructer
	//
	//	EventEmitter >> net.Server >> request (Event)
	//	EventEmitter >> fs.readStream >> data (Event)
	//
	// Creating a Custom Event Emitter
	var EventEmitter = require('events').EventEmitter;
	// e.g. We want to emit error, warn and info events
	var logger = new EventEmitter();
	// e.g. Listen for error events
	logger.on('error', function(message) {
		console.log('ERR: ' + message);
	});
	// to call the event
	logger.emit('error', "Spilled Milk"); // ERR: Spilled Milk

//// Decoding http.createServer
	// So how is request linked to http.createServer?
	http.createServer(function(request, response) { /*run code*/ });
	//
	//	Documentation
	//	http.createServer([requestListener])
	//	Returns a new web server object (a new instance of http.Server)
	//	The requestListener is a function which is automatically added to the 'request' event.
	//
	//	Class: http.Server
	//		This is an EventEmitter with the following events:
	//				Event: 'request'
	//				function (request, response) { }
	//				Emitted each time there is a request.

//// Refractoring http.createServer
	// Same as:
	var server = http.createServer();
	server.on('request', function(request, response) { /*run code*/ });
	// e.g. Event emitter when the server closes
	server.on('close', function() { /*run code*/ });

//// .on() 
	// This is how we typically add Event Listeners in node, we can listen to multiple events on a object or we can have multiple functions that listen to the same event
	var events = require('events');
	var EventEmitter = events.EventEmitter;
	var chat = new EventEmitter();
	// Adds an event listener on the chat object that listens for message events
	chat.on('message', function(message) {
		console.log(message);
	});

//// .emit()
	// Emits an message Event
	chat.emit('message', "Muahahah");