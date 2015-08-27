////	JavaScript Loops	////
	//
	//	While Loop
	//	While loop Conditions
	//	'Do While' Loops
	//	For Loops
	//	Exiting Loops

//// While Loop
	// Checks the condition at the very start and continues run over and over again until the condition is false and exists the loop
	// Example: loop that runs 10 times
	var counter = 1;
	while ( counter <= 10 ) {
		console.log(counter);
		counter += 1;
	}

//// While loop Conditions
	// Testing different conditions to run and exit a loop.
	var secret = prompt("What is the secret password?");
	while ( secret !== "sesame" ) {
		secret = prompt("Try again");
	}

//// 'Do While' Loops
	// The condition isn't checked until it runs once, if while equals true it runs it continues to run over and over again until while equals false and exists the loop through while
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while
	// secret not sesame = true | repeats the do loop
	// secret is sesame = false | exist the loop through while
	// ! Good pratice to add empty variables before the loop !
	var secret;
	do {
		secret = prompt("What is the secret password?");
	} while ( secret !== "sesame" )
	document.write("You know the secret password. Welcome.");


//// For Loops
	// Are more compact version of while loops
	//	for ( var counter = 0; counter < 10; counter += 1 ) {
	//		document.write( counter );
	//	}
	for (var i = 0; i < 10; i += 1) {
		 document.write( i );
	}

///// Exiting Loops
	// When while enconters break, it exists the loop
	// here we are giving a limite of 10 times
	var secret;
	var tries = 0;
	while ( true ) {
		secret = prompt("What is the secret password?");
		tries += 1;
		if ( secret === "sesame" ) {
			secret = true;
			break;
		}
	}
	if (secret) {
		document.write("You know the secret password. Welcome.");
	} else {
		document.write("<h1>Sorry. You did not guess the secret password.</h1>");
	}