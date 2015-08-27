////	JavaScript Numbers	////
	//
	//	Numbers
	//		Integers
	//		Floats
	//		Scientifc Notation
	//	Doing Math
	//		Math Shorthands
	//	Numbers and Strings
	//		parseInt()
	//		parseFloat()
	//	The Math Object
	//		Math.round()
	//		Math.floor()
	//		Math.ceil()
	//		Math.random()

//// Numbers
	// Used for making calculations: adding, subtracting, computing total costs, keeping track of a game score, etc.
	// Unlike strings we don't put quotes around numbers


//// Integers
	// Whole numbers ex: 5 0 -100 9999
	var score = 0;

//// Floating Point Numbers
	// Decimal number ex: 3.14 -9.888888 .000009
	var pi = 3.14159265359;

//// Scientifc Notation
	// ex: 9e-6 (same as .000009), 9e+6 (same as 900000)
	var numberOfAtomsonEarth = 1.33e+105;

//// Doing Math
	// Addiction
	2 + 7
	// Substraction
	4 - 3
	// Multiplication
	10 * 9
	// Division
	// ! Divided the number on the left by the number on the right !
	6 / 3
	// Using Variables
	var score = 0;
	score = score + 100;

//// Math Shorthands
	// Addiction
	score += 10;
	// Substraction
	score -= 20;
	// Multiplication
	score *= 5;
	// Division
	score /= 2;

//// Numbers and Strings
	// Returned inputs by prompt or forms come as a string
	var value1 = prompt("What's your first value?");
	var value2 = prompt("What's your second value?");
	// If we try to sum the prompts it will result in 10' + '5' = '105'

//// parseInt()
	// Converts a string to a Integer
	var totalBadges = parseInt(value1) + parseInt(value2);
	// If the number is not on the begining of the string it will return NaN, It will also cut decimal numbers 202.99 = 202
	parseInt("That's so 2014!");

//// parseFloat()
	// Converts a string to a Float (decimal number)
	parseFloat('1.89 light years away');

//// The Math Object //
	// Math is a JavaScript object that we can use to pass methods
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
	// ! Used Capital Math !

//// Math.round()
	// Returns the value of a number rounded to the nearest integer
	Math.round(2.2) = 2 | Math.round(4.9) = 5

//// Math.floor()
	// returns the largest integer less than or equal to a given number
	 Math.floor(1.2) = 1 | Math.floor(0.00012) = 0 | Math.floor(2) = 2

//// Math.ceil()
	// returns the smallest integer less than or equal to a given number
	Math.ceil(1.2) = 2 | Math.ceil(0.00012) = 1 | Math.ceil(5.028) = 6

//// Math.random()
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	// Returns a floating, pseudo-random number in the range [0, 1) that is, from 0 (inclusive) up to but not including 1
	Math.random( 0.5876477009151131 )
	// We can then scale to our desired range, we want to create dice rolls
	Math.random()*6
		// Dice Rolls
		// ! Math.ceil( Math.random()*6 ) seems the perfect soluction it can return a value of 0 !
		Math.floor( Math.random()*6 ) + 1;