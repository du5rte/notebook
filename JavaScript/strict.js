////	JavaScript - Strict	////
	//
	//	Use Strick
	//	Variables
	//	Functions
	//	Objects
	//	Duplicated Parameters
	//	Octal numbers
	//	Delete


//// Use Strick
	// This little statement causes the JavaScript interpreter to run in a strict variant
	// use strict should be defined at the top of the file
	"use strict";



//// Variables
	// Gets assigned to global scope normally but its bad code!
	badVariable = 10;
	// Gets assigned to global scope
	var goodVariable = 10;

//// Functions
	// x gets assigned to the global scope normally but it is bad code to initialize a variable from within a function without first declaring it in the global scope!
	function badFunction() {
		x = 10;
	}
	// Instantiate the variable in the global scope so that you can assign values to it from within functions
	var x;
	function goodFunction() {
			x = 10;
	}

//// Objects
	// In non strict mode, the second zoo ("keepers") would be returned on a look up
	var badObject = {
			zoo: "animals",
			internet: "trolls",
			zoo: "keepers"
	}
	// Good objects do not have duplicate keys
	var goodObject = {
			zoo: "animals",
			internet: "trolls",
			treehouse: "students"
	}

//// Duplicated Parameters
	// functions cannot have duplicate parameter names, as the last one will overwrite the first, Throws a syntax error.
	// we used debugger to check the parameters on the console
	// duplicateParameters(1,2,3,4)
	// > a = 4
	// > arguments [4,2,3,4]
	function duplicateParameters(a,b,c,a) {
		debugger;
		return a + b + c
	};
	// only use functions with unique parameter names
	function duplicateParameters(a,b,c) {
			return a + b + c
	};


//// Octal numbers
	// Octal numbers are not allowed! 
	// Throws a syntax error! yea, don't use octals unless on purpose!
	// Just know that you can't carelessly put a 0 in front of
// an integer and then add it to another integer
	var someOctal = 500 + 020;
	
//// Non-Writable Objects or Globals
	// e.g. NaN Is Non-Writable built in property of JavaScript
	// In normal mode it will have no effect
	// Fails in use strict, Just don't do this!
	NaN.foobar = true;


//// Delete
	// Non-Deletable Objects or Globals
	// e.g. Object.prototype is a native code property
	// In normal mode it will have no effect
	// Throws an error, yea, don't delete properties that are set to be unwritable!
	delete Object.prototype;

	// delete cannot delete plane variables in strict mode, can only delete properties
	var hahaha = "no, don't delete me!!!"
	delete hahaha
	
	// can only delete properties
	var anObjectWithProps = {
			someProperty: "no, don't delete me!!!"
	}
	delete anObjectWithProps.someProperty

