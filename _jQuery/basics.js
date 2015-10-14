////	jQuery Basics
	//
	//	jQuery Documentation
	//	The Dom
	//	jQuery()
	//	Including jQuery
	//	function()
	//	Anonymous Function
	//	Anonymous Function inside Function
	//	Named Functions to Multiple Events

/*// jQuery Documentation (What Does it Mean?)
		 - http://api.jquery.com

- DOM Manipulation Methods
		- Add/Remove HTML elements
		- Update/Read HTML element attributes
		- Transform HTML elements
- Traversing the DOM
		- Moving from a parent element to its children
		- Moving from a child element to its parent
		- Moving from a sibling element to another sibling element
- Event Methods
		- Keyboard and Mouse Events
				- Keyboard Event example: keypress
				- Mouse Event example: mouse movement or a click
- Attributes
		- Get and set DOM attributes of elements
		- (e.g. changing class="", href="", type="checkbox", etc)
- CSS
		- Manipulate style properties of elements
- Dimensions
		- Check the height, width properties of elements
- Effects
		- Manipulation of time (animations)
- Events
		- user, window, computer events (e.g. mouse events, click, etc)
- Offset
		- Get the coordinates of a elements
- Traversing
		- Move things around the document
- Selectors
		- everything about selecting elements
//*/

//// The Dom
	// The Document Object Model is how the browser interprets HTML files
	// Everything on the html hangs on the document object
	document
	// We can call objects within the documents
	Document.body.children
	// Calls the first array of the body children
	Document.body.children[0]
	// Calls an Array of all class="warning"
	document.getElementsByClassName("myClass"); 
	// Then we can select an elements
	document.getElementsByClassName("myClass")[0];
	// ! Very britle way to work, alot of old browser don't support some of these selectors and there's where jQuery comes in handy !

//// Including jQuery in a Project
	// CDN - Content Delivery Download
	// It's faster to download, it supplies to everyone and if someone already download it before it will be cached in their browser
	// If included in the header it will stop working before the document has not been loaded first
	<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
	// To load only after it read the document we can use .ready()
	$(document).ready(myCode);
	//or
	$(document).ready(function(){
		// run code here
	});
	// Or pass a function inside the jQuery handler $(  );
	$(function() {
		$(".myClass").hide().show("slow");
	});
	// But including jQuery before </body> will save us all the hustle 
	$(".myClass").hide().show("slow");

//// jQuery
	// Uses a javascript library to write Unobtrusive JavaScript that works regardless of the user devise, browser or connection.
	// We can use jQuery just like a function
	jQuery(); 
	// jQuery has a dollar sign short hand version $
	$();

//// Function
	// Set of instructions we can use over and over again
	function myCode() {
		$(".myClass").hide().show("slow");
	}
	myCode();

//// Anonymous Function
	// Stores a Anonymous function into a variabble
	var myCode = function() {
		$(".myClass").hide().show("slow");
	}
	myCode();

//// Anonymous Function inside Function
	// Because we are not naming the function anymore we can pass it directly inside another function
	$(document).ready( function() {
		$(".myClass").hide().show("slow");
	});

//// Named Functions to Multiple Events
	// We use multiple jQuery functions in one line
	// Instead of repeating the code for .foccus() and .keyup()
	$egInput.focus(function(){
		// Insert Code
	}).keyup(function() {
		// Insert Code
	});
	// We can create a named function and call it on multiple events
	function myFunction() {
	// Insert Code
	}
	$egInput.focus(myFunction).keyup(myFunction);




