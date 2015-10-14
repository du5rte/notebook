////	AJAX Using JSON ////
	//
	//	.responseText
	//	XML
	//	JSON
	//			Valid JSON
	//			Formating
	//			Array Notation
	//			Object Notation
	// 			Array Object Notation
	// 	Parsing JSON Data
	//	Processing JSON Data


//// .responseText
	// Web servers commonly respondes to ajax request with a text response, pain text or html for example. 
	// Two other common text formates are XML and JSON
	xhr.responseText;


//// XML 
	// eXtensible Markup Language is very similar to html,
	// Like HTML it uses tags to organise data
	// We can create our on custom (tags xml has not official tasgs) 
	// XML and JavaScript don't go too well, takes alot of analyzing and parsing, going through each node, it's just not good pratice.
	<contacts>
		<contact>
			<name>Andrew</name>
			<phone>503-555-1212</phone>
		</contact>
		<contact>
			<name>Jim</name>
			<phone>615-555-1212</phone>
		</contact>
	</contacts>


//// JSON (JavaScript Object Notation)
	// A more JavaScript-like data formate, which has become the most popular way to exchange data using ajax
	// Uses basic JavaScript arrays and objects to pass information around
	//
	// Valid JSON
	// !! Property name must be "DOUBLE" quoted, strings also require double quotes !!
	// An online JSON validator http://jsonlint.com/
	//
	// Formating
	// There's two ways to format a JSON, Array notation or Object notation and it's commonly used both.
	//
	// Array Notation
	// A basic array starts with opening and ending braces and list of values, but it's hard to know what the data means
	["string", 3, true, false, [1, 2, 3] ]
	
	// Object Notation
	// A basic object starts with opening and ending braces, then we create 'name value' pairs by providing a 'key or property' and a 'value' seperated by a colon ':' 
	{
		"name" : "Jim"
	}
	
	// All name value pairs are seperated by commas ',' except the last
 	{
		"name" : "Jim",
		"phone" : "503-555-1212"
	}

	// Array Object Notation
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

//// Parsing JSON Data
	// To the browser the server response are just a big plain text string, parsing is converting that string into JavaScript
	console.log( typeof xhr.responseText ); // string
	//
	// JSON.parse()
	// Takes a string and tries to convert it into a JavaScript Object
	var employees = JSON.parse( xhr.responseText );
	console.log( typeof employees ); // object

//// Processing JSON Data
	// Example HTML design, here we want to create a <li> for each employee with his name inside, and give it a class of "in" if or "out"
	<div id="employeeList">
		<ul class="bulleted">
			<li class="in">Aimme</li>
			<li class="out">Amit</li>
			<li class="in">Ben</li>
		</ul>
	</div>
	//
	//		1. Create a new HTML list item
	//		2. Check the "inoffice" property
	//		3. Get the value for the "name" property,
	//			 3.1 Insert it inside the <li> tag
	//		3. close the <li> tag
	/*
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {	*/
			var employees = JSON.parse(xhr.responseText);
			var statusHMTL = '<ul class="bulleted">';
				//we loop through each object and check the .inoffice property
				for (var i=0; i<employees.length; i+=1) {
					if (employees[i].inoffice === true) {
						statusHMTL += '<li class="in">';
					} else {
						statusHMTL += '<li class="out">';
					}
					statusHMTL += employees[i].name;
					statusHMTL += '</li>';
				}
			
			statusHMTL += '</ul>';
			document.getElementById('employeeList').innerHTML = statusHMTL;
	 /*}
	};
	xhr.open('GET', 'data/employees.json');
	xhr.send();*/





