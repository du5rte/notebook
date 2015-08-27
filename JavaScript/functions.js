////	JavaScript Functions	////
	//
	//	Functions
	//	Returning a value from a function
	//	Multiple Returns
	//	Passing an Argument
	//	Passing Multiple Arguments

//// Functions
	// Set of instructions we can use over and over again
	// javascript is fothen called a functional programing languages as functions are at the heart of javascript works
	function goToCoffeeShop() {
		alert('Go to coffee shop.')
	}
	// Then we can call the function, follow by parenthesis 
	goToCoffeeShop();

//// Anonymous Functions (function expression)
	// Stores a function into a variabble
	// ! need a semi-column ; !
	var goToCoffeeShop = function () {
		alert('Go to coffee shop.')
	};

//// Returning a value from a function
	// functions can also return a value, we can then display it or save it in a variable
	// ! Anything writen after return won't be run !
	// ! returns can only return ONE value (string number or variable) !
	function goToCoffeeShop() {
		var value1 = 'Go to coffee shop.';
		return coffee;
	}
	alert( goToCoffeeShop() );
	console.log( goToCoffeeShop() );
	document.write( goToCoffeeShop() );
	var toDo = goToCoffeeShop();

//// Multiple Returns
	// Uses multiple returns with if statements, only one return can pass
	function isEmailEmpty() {
		var field =  document.getElementById('email');
		if (field.value === '') {
			return true;
		} else {
			return false;
		}
	}
	var fieldTest = isEmailEmpty();
	if (fieldTest === true) {
		alert('Please prodivde your email address.');
	}

//// Passing an Argument
	// Uses a parameter (a variable that stores information passed to it) that pass an argument in the function
	function goToCoffeeShop(drink) {
		alert( drink " is on the way!");
	}
	goToCoffeeShop("Espresso")

//// Passing Multiple Arguments
	// Uses a parameter (a variable that stores information passed to it) to pass arguments in the function
	function goToCoffeeShop(drink, pastry) {
		alert( drink + "an " + pastry + " are on the way!");
	}
	goToCoffeeShop("Espresso", "Croissant");
	// Example: Area calculation function
	function getArea(width, length, unit) {
		var area = width * length;
		return area + " " + unit;
	}
	document.write( getArea(10, 20, 'sq ft') );