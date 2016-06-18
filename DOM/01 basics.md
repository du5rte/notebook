# DOM - Basics

Resources:


# Window
Is the global scope of JavaScript in the browser, everything happens inside it

```js
var name = "Eddie";
window.name // "Eddie"
```

Methods like `alert()` are actually window methods
```js
alert("Hi")
window.alert("Hi")
```

Gives us access to information about the current browser window
```js
window
window.location
window.location.host
```

## Document
Accesses all HTML nodes

```js
// or
// window.document
document // <html>
document.head // <head>
document.body // <body>
document.getElementById("app") // <div id="app"> ... </div>
```

## Document Object Model
The browser reads html files as tree like structure of 'nodes' the

There's 3 types of actions we can do with the DOM:
- manipulation - where we manipulate the elements
- Traversal - selecting an element based on the relationship with another element (For example, we could select a child element of a known parent element like a list item child of an unordered list.)
- Events - listening to a specific event, like a mouse click or a key press, and having something execute.

## Node
A `branch` is a point that revels more `nodes`, each node is an html `element` or a JavaScript `object` that has `properties` and `methods` that can be accessed and used.
```
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
```

## Selectors


```js
// Returns a reference to the element by its ID.
let app = document.getElementById("app") // <div id="app"> ... </div>

// Returns an HTMLCollection of elements with the given tag name
let images = document.getElementsByTagName('img') // [<img>, <img>, <img> ...]

// Returns the first element that is a descendant of the element that matches the specified group of selectors
let myCheckbox = document.querySelector('input[type=checkbox].myCheckbox')
```


## Events Handlers
Events can be attached to nodes

```js
function sayHello(event) {
	console.log('Hello')
}

// Returns the click event handler code on the current element.
// Don't use callFunction() or it will run there and then
myCheckbox.onclick = myFunction

// or
// myButton.addEventListener("click", useFunction)
```
or in the DOM
```html
<input type="checkbox" onclick="sayHello" />
```

## Traversing and Manipulating

```js
// Returns the parent of the specified node in the DOM tree
myNode.getElementById("app").parentNode // <body>

// Returns the children of the specified node in the DOM tree
myNode.getElementById("app").children // [<div>, <div> ...]
// Contains methods that are particular to Node objects that can have children  
myNode.firstElementChild
myNode.lastElementChild
myNode.childElementCount

// Creates the specified HTML element
var newButton = document.createElement("button")

// Adds a node to the end of the list of children of a specified parent
myNode.appendChild( newButton )

// Removes a child node from the DOM. Returns removed node.
myNode.removeChild( newButton )
```


## HTML Elements
Html elements properties and methods

```js
// Represents the text content of a node and its descendants
myParagraph.innerText // "hello world"

// Sets or gets the HTML inside the element's descendants
myDiv.innerHTML // "<div class="my-div" >....</div>"

// Gets and sets the value of the class attribute of the element
myParagraph.className = "text-default"

// Returns a token list of the class attribute of the element
myParagraph.classList.contains("exampleClass")
myParagraph.classList.add("exampleClass")
myParagraph.classList.add("class1", "class2") //multiple classes
myParagraph.classList.remove("exampleClass")
myParagraph.classList.toggle("exampleClass")
```

## HTML Input Element
Input elements have special properties and methods for manipulating the layout and presentation of input elements

```js
// Indicates the HTML attribute, the type of control to display
newInput.type // 'checkbox'

// Indicates the current value in the control
newInput.value // true
```	
