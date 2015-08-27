////	JavaScript Strings	////
	//
	//	Strings
	//	Quotes
	//	Combining Strings
	//		Concatenation
	//	String Properties
	//		.length
	//	String Methods
	//		.toLowerCase()
	//		.toUpperCase()


//// Strings
	// Used for words, sentences, and other text.
	// Quotes '' "" let javaScript know it's just text without meaning
	var message = ("Hello from TeamTreehouse");

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

//// Combining Strings //

//// Concatenation 
	// Combining strings with a + operator is called "concatenation"
	// 'one string ' + ' another string' + variable
	var name = "Dave";
	var message = "Hello " + name;
	// We can access variables and update them  using concatenation
	var message = "Hello " + visitor + ". Welcome to Treehouse.";
	message = message + "We are so glad that you came by to visit";
	// Updating variables popular there's a shorthand for it +=
	// += meaning: old variable (add(+)) PLUS new content (equals(=))
	message += "We are so glad that you came by to visit";

//// String Properties
	// Objects have properties, such as the length of a string
	// We can access objects properties using a dot (Object.Property)

//// .length
	// Returns the number of characters inside a string (9)
	var str = '9 letters';
	console.log( str.length ); 
	// opens an alert dialog with the number 9

//// String Methods
	// Object have meathods, which are actions the object can perfrom

//// .toLowerCase()
	// Returns a copy of a string with all lowercase letters (lower)
	var str = 'LOWER';
	console.log( str.toLowerCase() ); 

//// .toUpperCase()
	// Returns a copy of a string with all uppercase letters (UPPER)
	var str = 'upper';
	console.log( str.toUpperCase() ); 