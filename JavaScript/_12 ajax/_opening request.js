////	AJAX Opening Request	////
	//
	//	GET
	//	POST
	//	Query String
	//	GET vs POST
	//	Security Limitations 
	//	Same-origin Policy
	//	Web Proxy
	//	JSONP
	//	CORS
		
//// GET
	// Used for most requests. Browser uses the GET method whenever it requests a new web page, CSS file, image, and so on. 
	// Use GET when you want to "get" something from the server.
	//
	// All it's needed for a GET is a url, but for dynamic data we need to send some information in the url, like a Query String
	xhr.open('GET', 'sidebar.html');

//// POST
	// Used frequently with web forms to send data to store in a database. // Use POST when sending data that will store, delete or update information from a database.
	xhr.open('POST', /*'sidebar.html'*/);

//// Query String
	// Provides a way to send additional information that a web server can use to control the output of its response. Appears at the end of a url, after the question mark. 
	//
	// e.g. http://website.com/employees.php?lastName=Jones
	//
	// 'employees.php' is a program that does something and it requires information so it knows what to do, for example a name property
	//
	// e.g. firstName=Rita&lastName=Jones
	//
	// Characters like '&', 'space' and '+' have special meaning in a url to send information containing them we need to encode them
	//
	//		& 		 = 	%26
	// 		space	 = 	+
	// 		+			 = 	%2B
	//
	// To validate urls we can use http://www.url-encode-decode.com/
	website.com/employees.php?lastName=Jones

//// GET vs POST
	// Although we can use GET to send sensative information, it shows up in the browser history and server log files.
	// There's a limite of how much we can send, IE can only handle url's up to 2083 characters long
	//
	// POST send data differently, instead of sending in the url it's send throught what's called 'the body of the request' not only more secure it allows to send more information to the server
	// Requires special encoding and a header instruction, sent to the server telling what kind of data should it expect


//// Security Limitations ////

					 
//// Same-origin Policy
	// we can use AJAX to communicate from one page to another, to a php file on the same server and even files in sub-folders
	// https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
	//
	// X talking to another website (e.g. https://anotherserver.com)
	// X Changing the default port number (e.g. https://myserver.com:8888)
	// X Switching from http to https (e.g. https://www.myserver.com:8888)
	// X Switching hosts (e.g. https://db.myserver.com)

//// Web Proxy
	// We can creata a server script to ask information from one server to another web server, then use ajax to talk to the script

//// JSONP (JSON with Padding)
	// Instead of using ajax to contact another web server, we load a javascript file from the another site. (e.g. links to img, css files, js files such as CDNs [Content Deliverying Networks])

//// CORS (Cross-Origin Resource Sharing)
	// A new method of making ajax requests across domains, it requires setup on the server part but allows a server to accepts request from other domains and even more complex types of authentication, that requiere the web browser to supply credentials before the server providing information
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS