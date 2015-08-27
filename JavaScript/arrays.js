////	JavaScript Arrays	////
	//
	//	Arrays
	//	Accessing Items
	//	Adding Items
	//		.length
	//		.push()
	//		.unshift()
	//	Removing Items
	//		.pop()
	//		.shift()
	//	For Loops with Arrays
	//		Print Array as list function
	//	Array Methods
	//		.join()
	//		.concat()
	//		.indexOf()
	//	Two-Dimensional Arrays

//// Arrays
	// Stores multiple values inside on container
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
	// I can contain, strings, numbers or booleans
	var scores = [100, 99, 99, 72, 60];
	var names = ['Joan', 'Amit', 'Sarah', 'Ricardo', 'Piers'];
	var values = [1, -100, true, false, 'JavaScript'];

//// Accessing Items
	// Accesses a single item in the array
	// ! first item is zero !
	document.write( myShopping[0] );

//// Adding Items ////

//// .length
	// Contains the number of items in a array
	var numbers = [ 1, 2, 3, 4, 5, 6 ];
	numbers.length
	// One way we can add a value to the end of the array
	// index number for next item = numbers.length = 6 
	// numbers[6] = 7 = numbers array 6th position equals 7
	numbers[ numbers.length ] = 7;

//// .push()
	// adds one or more elements to the end of an array
	numbers.push(8, 9, 10);
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push

//// .unshift()
	// adds one or more elements to the begining of an array
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift
	numbers.unshift(-2, -1, 0);

//// Removing Items ////

//// .pop()
	// Removes (and can store in a variable) the last item of an array
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop
	var lastItem = numbers.pop(); // 10


//// .shift()
	// Removes (and can store in a variable) the first item of an array
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift
	var firstItem = numbers.shift(); // -2

//// For Loops with Arrays
	//
	//  instead of calculating the index of the array i < 4 | students[1] 
	//	we can use .length and index i < students.length  | students[i]
	var students = ['Sascha', 'Lynn', 'Jennifer', 'Paul'];
	for (var i = 0; i < students.length; i += 1) {
		console.log(students[i]);
	}
	// Print Array as list function
	function printList( list ) {
		var listHTML = '<ol>';
		for (var i = 0; i < list.length; i += 1) {
			listHTML += '<li>' + list[i] + '</li>';
		}
		listHTML += '</ol>';
		print(listHTML);
	}
	printList( list );

//// Array Methods //

//// .join()
	// Returns a array in a string seperated by a supply of characters
	var daysInWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thurdsay', 'Friday', 'Saturday', 'Sunday'];
	var daysString = daysInWeek.join(',');
	console.log( daysInWeek );

//// .concat()
	// Joins one array to another, without changing the inicial arrays
	var currentStudents = ['Joan', 'John', 'Joaquin'];
	var newStudents = ['Samantha', 'Traci', 'Tiago'];
	// we can switch the order: newStudents.concat( currentStudents );
	var allStudents = currentStudents.concat( newStudents );

//// .indexOf()
	// Searches the array for a perticular value
	var fruit = ['Apple', 'Orange', 'Grapefruit'];
	var position = fruit.indexOf('Apple'); // position = 0
	var position = fruit.indexOf('Lemon'); // position = -1 Doesn't Exist

//// Two-Dimensional Arrays
	// Create a spreadsheet-like data structure by storing arrays in arrays 
	// index 0 | value [80, 90, 100, 95]
	// index 1 | value [75, 95, 85, 100]
	// index 2 | value [60, 80, 77, 90]
	var grades = [
		[80, 90, 100, 95], 
		[75, 95, 85, 100], 
		[60, 80, 77, 90] 
	];
	// To access the third value of the first array, we access the index 0 of grades and then the index 2 of grades[0]
	grades[0][3] // 100
	grades[1][0] // 75
	grades[2][2] // 75