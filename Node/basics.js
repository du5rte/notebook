////	Node.js - Basics	////
	//
	//	Installation 
	//	Documentation
	//	
	//	JavaScript Engine
	//			JavaScript in the Browser
	//			V8 Engine
	//
	//	node
	//			REPL
	//			.js
	//
	//	Non-Blocking
	//			Blocking
	//			Workers
	//			Non-Blocking


//// Installation 
	// Node.js Installation Guide
	// http://treehouse.github.io/installation-guides/
	node -v
	npm -v

//// Documentation
	// https://nodejs.org/api/documentation.html
	// https://nodejs.org/api/console.html
	// Stability Index
	// http://nodejs.org/api/documentation.html#documentation_stability_index
	//
	// 		0 - Deprecated			3 - Stable
	//		1 - Experimental		4 - API Frozen
	//		2 - Unstable				5 - Locked

//// JavaScript Engine
	// Ryan Dahl ripped Chrome's V8 JavaScript engine out of the browser, leaving only the host objects behind adding new ones to allow new types of applications to be written.
	// One of the reasons V8 Engine is so fast it's because it's written in C code which is really fast
	//
	//	JavaScript in the Browser
	//
	// 	Native Objects 	//	Host Objects
	//		String 				//		Window
	//		Array 				//		Document
	//		Date 					//		History
	//		Math 					//		XMLHttpRequest
	//		... 					//		..
	//
	//	V8 Engine (Node.js Environment)
	//
	// 	Native Objects 	//	Host Objects
	//		String 				//		http
	//		Array 				//		https
	//		Date 					//		fs
	//		Math 					//		url
	//		... 					//		..
	
//// node
	//
	// REPL
	// Allows us to type JavaScript code and experiment
	// Brings back a REPL (read evaluate print loop)
	// to exit Press CTRL+C twice
	node 
	1+2 // 3
	var name = "Eddie"
	name // 'Eddie'
	// There's not a window(root) in node but there is global(root) object
	global.name // 'Eddie'
	// There's also no Document object but there is process
	process

	// .js
	// We can create a app.js file and call it on the console
	console.log("Hello World");
	// Then runs the created .js file
	node app.js // Hello World
	// Does not require a .js
	node app
	
//// Non-Blocking
	//
	// Blocking
	// Most web servers, languages and frameworks handle one set of tasks from beginning to end before repeating the procress again, doing the same set of steps for another task, this can be most problematic when accessing a database or uploading files, as it blocks the handling of other requests as the application can't do anything until it finishes executing the first task.
	
	// First it reads "/etc/hosts" then print content then does something else, depending on the file size it might take a while before doing something else
	var content = fs.readFileSync('/etc/file1');
	console.log(contents);
	console.log("Doing something else");
	
	// Typical Blocking Things
	// Calling out to web services
	// Reading/Writing on the Database
	// Calling out to extensions

	// Workers
	// One way developers scale these types of applications is by running more than once instance of their application server, known as workers.

	// Non-Blocking
	// Node.js works by doing what it an do now, responding to requests while it waits for other tasks to finish. It's fast and efficient not consuming as much resources (like power and memory).

	// We pass a function as the second parameter that console logs the content whenever it's done reading
	fs.readFileSync('/etc/file1', function(err, contents) {
		console.log(contents);
	});
	console.log("Doing something else");
	// or if we using this function frequently
	var callback = function(err, contents) {
		console.log(contents);
	});
	fs.readFileSync('/etc/file1', callback);
	fs.readFileSync('/etc/file2', callback);

	//	Blocking
	//
	//		File1############## File2##############
	//
	//	Non-blocking
	//
	//		File1##############
	//		File2##############
	//
	//	|-------------------------|-----------------------------|
	//	0s											 0.5s							 						  1s





