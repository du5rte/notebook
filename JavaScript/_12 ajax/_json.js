////	JavaScript Object Notation	////
	//
	//	JSON
	//		Valid JSON
	//		Formating
	//	Array Notation
	//	bject Notation
	//	Array Object Notation


//// JSON (JavaScript Object Notation)
	// Used to transfer information between browsers, servers, databases and other online services.
	// JSON is a string that's formatted LIKE JavaScript, but isn't actual JavaScript code.
	// https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en
	//
	// Valid JSON
	// !! Property name must be "DOUBLE" quoted, strings also require double quotes !!
	// An online JSON validator http://jsonlint.com/
	//
	// Formating
	// There's two ways to format a JSON, Array notation or Object notation and it's commonly used both.


//// Array Notation
	// A basic array starts with opening and ending braces and list of values, but it's hard to know what the data means
	["string", 3, true, false, [1, 2, 3] ]
	
	
//// Object Notation
	// A basic object starts with opening and ending braces, then we create 'name value' pairs by providing a 'key or property' and a 'value' seperated by a colon ':' 
	{
		"name" : "Jim"
	}

	// All name value pairs are seperated by commas ',' except the last
 	{
		"name" : "Jim",
		"phone" : "503-555-1212"
	}


//// Array Object Notation
	// We can fill an array by adding values seperated by commas ','
	// Each object inside this array is an employ
	[
		{
			"name": "Aime",
			"inoffice": false
		},
		{
			"name": "Ben",
			"inoffice": true
		}
	]
