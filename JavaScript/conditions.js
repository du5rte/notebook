////	JavaScript Conditional Statements	////
	//
	//	Boolean Values
	//	if () {}
	//	else {}
	//	Comparison Operators
	//	Comparing Strings
	//	Equality Operators
	//	Strict Comparison operator
	//	Strict Not operator
	//	Combining Multiple Outcomes
	//	&& And Operator
	//	|| Or Operator
	//	! Not Operator

//// Boolean Values
	// Along with strings and number booleans are a type of value
	// A boolean value can only be true or false
	if (false) {
		document.write('The condition is true');
	} else {
			document.write('The condition is false');
	}

//// if () {}
	// Allows to create run code according to specific conditions
	// Inside parenthese we put the condition
	// Inside the braces we put the code we want to run

	// When we type ruby it returns false, we need to fixe letter casing
	// if ( answer === 'Ruby' ) {
	// It's good pratice to make the input and condition uppercase

//// else {}
	// else allow us to target false statements
	// only if or else can run not both at the same time
	var answer = prompt('What programming language is the name of a gem?');

	if ( answer.toUpperCase() === 'RUBY' ) {
		document.write("<p>That's right!</p>");
	} else {
		document.write("<p>That's wrong.</p>");
	}

//// Comparison Operators
	// lets us compare two values to determine a true, false or equal value 
	> 		// Greater Than
	>= 		// Greater Than or Equal To
	< 		// Less than
	<= 		// Less Than Or Equal To
	== 		// Equal To
	=== 	// Strict Equal To
	!= 		// Not Equal To
	!== 	// Strict Not Equal to
	&&		// And

//// Comparing Strings
	// When comparing strings, the first letter of the first string is compared to the first letter of the second string. Since 'l' comes before 'z' in the alphabet, 'lion' is not greater than 'zebra.'
	( 'lion' > 'zebra' )	// False

//// Equality Operators
	// Determines if 2 values are the same, it allows for different values
	("3"==3) = True 		// Actually convertes the string into a number
	// ! Not good pratice to use !
	('' == 0) = True 		// ! This can make for some messy situation !

//// Strict Comparison operator
	// Compare the value as well as the TYPE
	("3"===3) = False		// One value is a string the other is a number
	('' == 0) = False

//// Strict Not operator
	// Compare the if the value and TYPE are different
	('JavaScript!' !== 'javascript') = True

//// Combining Multiple Outcomes
	// Allows to use multiple program paths with multiple conditions
	if (isAdmin) {
			alert('Welcome administrator')
	} else if (isStudent) {
			alert('Welcome student')
	} else {
			alert('Who are you?')
	}

//// && And Operator
	// Allows us to check if multiple conditions are true
	// ex: age = 25 | 20 < age = True  | age < 30 = True  | = True
	// ex: age = 35 | 20 < age = True	 | age < 30 = False | = False
	// ex: age = 15 | 20 < age = False | age < 30 = True  | = False
	( 20 < age && age < 30 )

//// || Or Operator
	// Allows us to pass if one of the multiple condition is true
	// ex: agree = 'yes' | 'yes' = True  | 'y' = False | = True
	// ex: agree = 'y'	 | 'yes' = False | 'y' = True  | = True
	// ex: agree = 'n'	 | 'yes' = False | 'y' = False | = False
	// NOT! ( agree === 'yes' || 'y' ) 
	// ! Needs to have complete conditions on both sides !
	( agree === 'yes' || agree === 'y' )

//// Multiple Condition Into a Single Line
	// We can combine multiple conditions without limite
	( score === 0 && ships <= 0 && time === 0 )
	( password === '' || email '' || phoneNumber === '' )

//// Not operator
	// Inverts a boolean value by puting a ! before the value
	// !true == NOT true
	// !false == NOT false
	!true  == false
	!false == true
