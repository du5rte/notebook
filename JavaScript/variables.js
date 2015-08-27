////	JavaScript Variables	////
	//
	//	Variables
	//	Naming Variables
	//	Variable Scope

//// Variables
	// Allows us store and keeping track of information
	// Create a empty variable
	var score;
	// Assign a value to the variable
	var score = 0;

	// Passing variables
	var message = "Hello!";
	// ! remove quotes so not to pass it as a String !
	alert(message);
	// Changing variable content
	// ! no need to write var as the variable already is defined !
	message = "Welcome to JavaScript Basics";
	alert(message);

//// Naming Variables
	// Cannot create variables reserved for javascript 
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords
	// ex: var function this if else ...
	// Cannot start with numbers 
	// ex: wrong(9lives) correct(live1)
	// Can contain letters numbers $ _
	// ex: wrong(pricePer# @home) correct(price$ price_per_unit PricePerUnit) 

//// Variable Scope
	// Each functions act as it's on scoop, variables created outside that scoop don't interact with each other
	// http://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/
	// ! it's bad pratice to use global scoopes with functions ! 
	function greeting() {
		var person = 'Lilah'; // this variable only exists inside greeting()
		alert(person);
	}
	var person = 'George'; // This is a global scoop variable
	greeting(); // Lilah
	alert(person); // George
	greeting(); // Lilah

	// Because the var keyword isn't used to declare a message variable inside the function, the function overwrites the value in the global variable message
	var message = "Welcome!";
	function setMessage() {
		message = "Go away!"; // no var before message, global scoop var
	}
	setMessage(); // overides message
	alert(message); // Go away!