////	JavaScript Basics ////
	//
	//	Documentation
	//	Syntax
	//		Statements
	//		Runs or Executes
	//		Adding JavaScript
	//		Quotes
	//		Spaces, tabs and new lines in JavaScript
	//		Comments
	//	The JavaScript Console
	//		Access
	//		clear()
	//		Erros


//// Documentation
	// Mozilla Developer Network provides the best JavaScript references
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript
	// ! The beaker icon are experimental functions, don't use them !

//// Syntax //
	// A programming language's commands, special words and punctuation

//// Statements
	// When you write a line, which ends in a semi-commas ;
	// We write programs by writing multiple statements
	// Javascript run each statement one at the time, and can only read the next once one is finished

//// Runs or Executes
	// When a browser follows the instructions in a program, it "runs" or "executes" that program

//// Adding JavaScript
	// Link a JavaScript file to a web page:
	<script src="scripts.js"></script>

	// Insert JavaScript directly into a web page:
	<script>
	alert("Hello there.");
	</script>

	// ! Never link to a file and include JavaScript inside the !
	<script src="file.js">
		 alert("Hello there.");
	</script>

	// Adding script files before <body> allows the html to load first
		<script src="file.js">
	</body>

//// Quotes
	// When using quotes within quotes we need to alternate '' and ""
	// Wrong Example
	message = 'She's a great person!';
	// Right Example
	message = "She's a great person!";
	// Another Example
	var htmlSnippet = '<h1 class="special">Important Headline</h1>';
	// Escape a character using backslash, will treat it as just text
	message = 'She\'s a great person!';
	htmlSnippet = "<h1 class=\"special\">Important Headline</h1>";

//// Spaces, tabs and new lines in JavaScript
	// JavaScript like css and html doesn't care about space
	// Examples
	var daysInWeek = 7;
	// The only required space is between var and daysInWeek
	var daysInWeek=7;
	var
						daysInWeek
															=
																				7
																										;

//// Comments
	// Allows us to document how our code programs work
	// This is a single-line comment
	/*
		This is a multiple-line comment.
		Everything here is ignored.
	*/

//// JavaScript Console
	// Great for testing things without saving
	CMD + OPTION + J on Mac OS
	// Allow us to clear the console when it gets too crowded
	clear()
	// Console Errors
	alert(hello there");
	document.write("No it works!");
