## jQuery - Basics

jQuery Documentation (What Does it Mean?)

- http://api.jquery.com

DOM Manipulation Methods - Add/Remove HTML elements - Update/Read HTML element attributes - Transform HTML elements
Traversing the DOM - Moving from a parent element to its children - Moving from a child element to its parent - Moving from a sibling element to another sibling element
Event Methods - Keyboard and Mouse Events - Keyboard Event example: keypress - Mouse Event example: mouse movement or a click
Attributes - Get and set DOM attributes of elements - (e.g. changing class="", href="", type="checkbox", etc)
CSS - Manipulate style properties of elements
Dimensions - Check the height, width properties of elements
Effects - Manipulation of time (animations)
Events - user, window, computer events (e.g. mouse events, click, etc)
Offset - Get the coordinates of a elements
Traversing - Move things around the document
Selectors - everything about selecting elements

## The Dom
The Document Object Model is how the browser interprets HTML files. Everything on the html hangs on the document object document. 

```js
// We can call objects within the documents.
Document.body.children;

// Calls the first array of the body children
Document.body.children[0];

// Calls an Array of all class="warning"
document.getElementsByClassName("myClass");

// Then we can select an elements
document.getElementsByClassName("myClass")[0];
```

## jQuery
Working with the DOM is very britle, alot of old browser don't support some of these selectors and there's where jQuery comes in handy. JQuery is a javascript library to write Unobtrusive JavaScript that works regardless of the user devise, browser or connection.

```js
jQuery();

// jQuery has a dollar sign short hand version $
$();

// Function, a set of instructions we can use over and over again
function myCode() {
  $(".myClass").hide().show("slow");
}

myCode();
```

Including jQuery in a Project using `CDN` (Content Delivery Download). It's faster to download, it supplies to everyone and if someone already download it before it will be cached in their browser.

If included in the header it will stop working before the document has not been loaded first.

```html
<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>;
```

```js
// To load only after it read the document we can use .ready()
$(document).ready(myCode);
//or
$(document).ready(function () {
  // run code here
});
// Or pass a function inside the jQuery handler $(  );
$(function () {
  $(".myClass").hide().show("slow");
});
// But including jQuery before </body> will save us all the hustle
$(".myClass").hide().show("slow");
```


### Anonymous Function
Stores a Anonymous function into a variabble

```js
var myCode = function () {
  $(".myClass").hide().show("slow");
};
myCode();
```

### Anonymous Function inside Function
Because we are not naming the function anymore we can pass it directly inside another function

```js
$(document).ready(function () {
  $(".myClass").hide().show("slow");
});
```

### Named Functions to Multiple Events
We use multiple jQuery functions in one line. Instead of repeating the code for `.foccus()` and `.keyup()`

```js
$egInput
  .focus(function () {
    // Insert Code
  })
  .keyup(function () {
    // Insert Code
  });

// We can create a named function and call it on multiple events
function myFunction() {
  // Insert Code
}

$egInput.focus(myFunction).keyup(myFunction);
```

## Prevent Default

Default actions of the event will not be triggered.

```js
$egAnchor.click(function (event) {
  event.preventDefault();
});
```

## On

Attach an event handler to the selected elements. When we bind an event handler jQuery only listens for those elements so when we add new new elements we need to use `.on()`

```js
$(".parent").on("click", "childen", function () {
  //insert code
});
```

## Selectors

Uses the same `css` selectors we use for styling documents

```js
// Returns the selected element
jQuery(".myClass");

// We can chain multiple methods to the same returned element
$(".myClass").hide();
$(".myClass").show("slow");

// Same as
$(".myClass").hide().show("slow");
```

#### this

A special jQuery variable that takes the place of the selected click function

```js
$("button").click(function () {
  $(this).hide(); // this = "button"
});
```

### Prev

Gets the immediately preceding sibling of a element on the document

```js
$egLi.prev();
```

### Next

Gets the immediately preceding sibling of a element on the document

```js
$egLi.next();
```

### Children

Get the children of a element optionally filtered by a selector.

```js
$egDiv.children("img");
```

### Parent

Get the parents of a element optionally filtered by a selector.

```js
$(this).parent("li");
```

### Has Class

Determine whether any of the elements are assigned the given class

```js
$egLi.hasClass("selected");

if ($egLi.hasClass("selected")) {
  $option.prop("selected", true);
}
```

### Siblings

Get the siblings of each element in the set of matched elements

```js
$("li").siblings();
```

## CSS
Gets or set the style property of elements

```js
// Get
$(".box").css( "background-color" ) || .css( "backgroundColor" ) // 'coral'
  
// Set
$(".box").css({ "background-color": "#ffe", "border-left": "5px solid #ccc" })
```
