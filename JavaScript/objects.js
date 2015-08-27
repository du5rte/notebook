////	JavaScript Objects	////
	//
	//	Accessing Object Properties
	//	`for in` Loops
	//	Mixing and Matching Arrays and Objects
	//	for and 'for in' Loops
	//	JSON JavaScript Object Notation

//// Objects
	// Most everything in JavaScript is an object or can be treat as an object that's why its often refered to as an object oriented languange
	// Example: 
	// [1,2,3] 		| An array is a object
	// arr.length | Property of an array
	// arr.push() | Method of an array

	// Has properties (a variable that belong to the object) and methods (something the object can do or we can done with the object)
	// ! Curly brackets create an objects { } !
	// We can add keys (property names, acts like a variables) and a value
	var person = {
		name: 'Sarah',
		age: 14,
		treehouseStudent: true,
		skills: ['JavaScript', 'HTML', 'CSS']
	};

//// Accessing Object Properties
	// Objects use a key to access their properties instead of a index
	person['name']; // Sarah
	// A more common way is to use a dot '.'
	person.name; // Sarah
	// Assign a new value the same way
	person.name = 'Boddy'; // Boddy
	// Or even add new properties
	person.country = 'Brazil'
	// we access properties of values
	person.skills.length // 3
	// we can access methods of properties
	person.skills.join(', ') // 'JavaScript, 'HTML, 'CSS


//// `for in` Loops
	// Loops through each key in the object property
	// ! only work for objects !
	// ! key can be named anything (ex: prop) !
	for (var key in person ) {
		console.log( key ); // "name" "age" "treehouse" "skills"
		console.log( person[key] ); // "name: sarah" "country: US" ...etc
	}

//// Mixing and Matching Arrays and Objects
	// combines arrays indexing with objects
	// Accessing: tasks[1].name; // "Go to gym"
	var tasks = [
		{
				name: "Do homework",
				due: "01/27/2016",
				complete: false,
				assignedTo: "Dave"
		},
	 {
				name: "Go to gym",
				due: "01/27/2015",
				complete: true,
				assignedTo: "Cecilia"
		},
	 {
				name: "Complete JavaScript course",
				due: "05/27/2015",
				complete: false,
				assignedTo: "You"
		}
	];

//// for and 'for in' Loops
	// Reads through a Object Array
	for (var i = 0; i < arrayObjects.length; i += 1) {
		for (var key in arrayObjects) {
			object = arrayObjects[i];
			key; // // will list all keys ('name', 'due'...)
			object[key]; // will list all keys values
			object.name; // will list all names inside objects
		}
	}

