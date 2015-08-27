//// JavaScript Working with the DOM ////
	//
	//	The 'Window' Object
	//			Document
	//			DOM Document Object Model
	//			Node
	//	Selectors
	//			document.getElementById
	//			document.getElementsByTagName
	//	Events Handlers
	//			.onclick
	//			.onchange
	//			.addEventListener
	//	Traversing and Manipulating
	//			.parentNode
	//					.children
	//					.firstElementChild
	//					.lastElementChild
	//					.childElementCount
	//			.appendChild
	//			.removeChild()
	//	document.createElement()
	//	HTMLInputElement 
	//			.type
	//			.value
	//	.textContent
	//	.className
	//	.classList

//// The 'Window' Object
	// Is the Global Scope of JavaScript everything happens inside it
	// Gives us access to information about the current browser window
	// Including it's document, location and the global scope.
	// When checking 'window' on developer tools ignore anything in a light shade of purple
	window
	window.location
	window.location.host
		// Any Variables we create become part of the window
		name = "Eddie";
		window.name // "Eddie"
		// things like alert(), is actually an method on the window
		alert("Hi" + name)
		window.alert("Hi" + name)

//// Document
	// Gives us access to all HTML nodes
	// 
	window.document // <html>
	window.document.head // <head>
	window.document.body // <body>
		// (e.g.)
		window.document.images // an array of all <img>
		window.document.forms // an array of all <forms>
		window.document.scripts // an array of all <scripts>
		
//// DOM Document Object Model
	// When a browser reads a html file it creates a treelike structure of 'nodes'
	// There's 3 types of actions we can do with the DOM
		// manipulation - where we manipulate the elements
		// Traversal - selecting an element based on the relationship with another element (For example, we could select a child element of a known parent element like a list item child of an unordered list.)
		// Events - listening to a specific event, like a mouse click or a key press, and having something execute.

//// Node
	// A branch and point that revels more notes, each node is an html element or a javaScript object that has properties and methods that can be accessed and used
	window
		|
		 -- document
					|
					 -- head	
					|
					 -- body
								|
								 -- h1
								|
								 -- p
	
//// Selectors ////
	
//// document.getElementById
	// Returns a reference to the element by its ID.
	var myID = document.getElementById("exampleID");

//// document.getElementsByTagName
	// Returns an HTMLCollection of elements with the given tag name
	//  The returned HTMLCollection is live, it updates itself automatically to stay in sync with the DOM tree
	var myButton = document.getElementsByTagName("button")[0];

//// .querySelector()
	// Returns the first element that is a descendant of the element that matches the specified group of selectors.
	document.body.querySelector("input[type=checkbox]");
	document.body.querySelector("button.myClass");

//// Events Handlers ////

// https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers

//// .onclick
	// Returns the click event handler code on the current element.
	// Don't use callFunction() or it will run there and then 
	myButton.onclick = useFunction;

//// .onchange
	// Sets and returns the event handler for the change event.
	myCheckbox.onchange = useFunction;

//// .addEventListener
	// ! A better pratice to add events to handlers !
	// Registers the specified listener on the EventTarget it's called on. The event target may be an Element in a document, the Document itself, a Window, or any other object that supports events (such as XMLHttpRequest)
	myButton.addEventListener("click", useFunction);
	myButton.addEventListener("click", ajaxRequest);

//// Traversing and Manipulating  ////

//// .parentNode
	// Returns the parent of the specified node in the DOM tree 
	var myLi = this.parentNode;
	myContainer.appendChild( myLi );

	// Contains methods that are particular to Node objects that can have children  
	// e.g.
	ParentNode.children
	ParentNode.firstElementChild
	ParentNode.lastElementChild
	ParentNode.childElementCount

	//// .children
		// Returns a live HTMLCollection of child elements of the object
		// https://developer.mozilla.org/en-US/docs/Web/API/ParentNode
		myLi.children[0];
		// e.g. for each loop
		for (var i = 1; i < myLi.children.length; i++) {
			//insert code $myLi.children[i];
		}

//// .appendChild
	// Adds a node to the end of the list of children of a specified parent. If the given child is a reference to an existing node in the document, appendChild() moves it from its current position to the new position 
	myLi.append( myButton );

//// .removeChild()
	// Removes a child node from the DOM. Returns removed node.
	myContainer.removeChild( myLi );

//// document.createElement()
	// creates the specified HTML element 
	var newInput = document.createElement("input");

//// HTMLInputElement 
	// provides special properties and methods for manipulating the layout and presentation of input elements
	// https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
	
	//// .type
		// Indicates the HTML attribute, the type of control to display
		myCheckbox.type = "checkbox";

	//// .value
		// Indicates the current value in the control
		myInput.value

//// .textContent  or .innerText
	// Represents the text content of a node and its descendants 
	deleteButton.textContent = "Delete";

//// .className
	// Gets and sets the value of the class attribute of the element 
	deleteButton.className = "delete";

//// .classList
	// Returns a token list of the class attribute of the element.
	myLi.classList.contains("exampleClass")
	myLi.classList.add("exampleClass")
	myLi.classList.add("class1", "class2") //multiple classes
	myLi.classList.remove("exampleClass")
	myLi.classList.toggle("exampleClass")

//// .innerHTML
	// Sets or gets the HTML inside the element's descendants.
	ajax.innerHTML = xhr.responseText;
	