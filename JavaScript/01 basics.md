# JavaScript - Basics

Resources:
- [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [State of the art JavaScript 2016](https://medium.com/javascript-and-opinions/state-of-the-art-javascript-in-2016-ab67fc68eb0b#.7suptki37)
- [ES6 Features](https://github.com/lukehoban/es6features)
- [Babel Documentation](https://babeljs.io/docs/learn-es2015/)
- [Javascript ES6 Cheatsheet - LearnCode.academy](https://www.youtube.com/watch?v=AfWYO8t7ed4)
- [ES6 and ES7 the future of Javascript](https://youtu.be/6AytbSdWBKg)

## Syntax
A programming language's commands, special words and punctuation.

## Statements
Each new line is a `statement`, which usually ends with a semicolon `;`. Javascript run each statement one at the time, and can only read the next once one is finished.
```js
var animal = 'dog';
function() {
  return 'bad ' + animal;
}
```
In `ES6` semicolons are no longer required
```js
var animal = 'dog'
function() {
  return `bad ${animal}`
}
```

## Spaces, tabs and new lines
JavaScript like css and html doesn't care about spaces
```js
var daysInWeek = 7;
```
```js
var
          daysInWeek
                            =
                                      7
                                                  ;
```

## Comments
Allows us to document or add comments to code
```
// This is a single-line comment
/*
  This is a multiple-line comment.
  Everything here is ignored.
*/
```

## Run or Execute
When a browser follows the instructions in a program, it "runs" or "executes" that program.

## Event-Driven Environment
JavaScript run on events, it stays in memory doing nothing just listening for event triggers.

## Object Oriented
JavaScript is a object oriented language everything is powered by `objects`. `variables` and `functions` are no exceptions. When we define a variable we're really saying "attach an key value in the `global name space`" which in the browser is `window` or in node is `global`

```js
var name = "john"

function sayName() {
  console.log(name)
}
```
```js
window: {
  ..
  name: "john",
  sayName: function() {
    console.log(name)
  }
  ..
}
```

## Native Objects
These objects are native to javascript and will be available everywhere.
[Native Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)

```
String, Array, Date, Math, etc.
```

## Host Objects
Available depending where JavaScript is running, its called the `host environment`. e.g. In the `Browser` or in `Node.js`
[Host Objects](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

Browser Host Objects
```
Window, Document, History, XMLHttpRequest, etc.
```

Node.js Environment
```
http, https, fs, url, etc
```

## Custom Objects
Anything you create or import

Custom
```js
var myModule = {
  do: function() { /**/ }
};

myModule.do();
```
jQuery
```js
// use
$('div').click(function() {
  /**/
});
```

## Global Name Space
When working with bigger scale project a lot of libraries we risk colliding variables so it's important to name them accordantly

```js
function greet(val) {
  console.log(vale)
}
// window.greet = function greet(val) { console.log(vale) }


var greet = 'Hello'
// overwrites the function `greet()`
// window.greet = "greet"
```


## Adding JavaScript
Inserting a JavaScript file to a webpage:
```hmtl
<script src="name-of-file.js"></script>
```

Insert JavaScript directly into a web page:
```html
<body>
  <!-- Adding script files before <body> allows the html to load first -->
  <script>
    alert("Hello there.");
  </script>
  <!-- libaries should be load first -->
  <script src="//code.jquery.com/jquery-2.1.4.min.js"></script>
  <script src="app.js"></script>
</body>
```

## Development Tools
A testing area for Javascript, Open with `CMD` + `OPTION` + `J` on Chrome Mac OS.

##### `console.log( )`
Outputs a message to the console
```js
console.log('check 1 2 3');
```

##### `console.dir( )`
Outputs an interactive list of the properties of the object, useful for debugging, checking responses headers, checking .json files, etc.
```js
console.dir(object);
```

##### `console.error( )`
Outputs an error message console
```js
console.error(errorMessage);
```

##### `clear( )`
Clears the console
```js
clear();
```

##### `alert( )`
pops up an alert with a message
```js
alert('hi there!');
```

##### `prompt( )`
pops up an enquiry with a message
```js
alert('how are you?');
```


## Strict
A statement that causes JavaScript to run in a `strict mode`, when it strict mode JavaScript is extra picky and throw errors to common syntax bad pratices.

```js
"use strict";
```

#### Variables
Creating a variable without `var` sets it on the `Global Scope`.
```js
// var badVariable;
badVariable = 'bad';
var goodVariable = 'good';
```

#### Function
Not much of problem with variables but with functions can be dangerous
```js
var goodVariable = 'innocent';

function goodFunction() {
  var goodVariable = 'good';
}
goodVariable; // 'innocent'

// var badVariable;
function badFunction() {
  badVariable = 'bad';
  goodVariable = 'bad';
}
goodVariable; // 'bad'
```

#### Duplicated Objects Keys
In non-strict mode, duplicated `object.keys` overwrite each other good objects should not have duplicated keys
```js
var badObject = {
    name: 'Joan',
    job: 'Desk Assistant',
    hobby: 'Surfing',
    job: 'Free Spirit'
};
var goodObject = {
    name: 'Joan',
    job: 'Desk Assistant',
    hobby: 'Surfing',
    newLifePerspective: 'Free Spirit'
};
```

#### Duplicated Parameters
In non-strict mode, duplicated `parameters` overwrite each other, good functions should not have duplicated parameter
```js
function badFunction(a,b,c,a) {
  return a + b + c;
};

badFunction(1, 2, 3, 4); // 4 + 2 + 3 ; 9
```
#### Non-Writable Objects or Globals
In non-strict mode, writing on Non-Writable JavaScript properties will have no effect. But we should try do it anyway
```js
NaN.foobar = true;
```

#### Delete
In non-strict mode, deleting Non-Writable JavaScript properties will have no effect. But we should try do it anyway.
```js
delete Object.prototype;
```

In strict mode it can't delete plane variables, only properties of objects
```js
var innocentVariable = 'no, don\'t delete me!!!';
delete innocentVariable // error!

var obj = {
    notSoInnocentVariable: 'no, don\'t delete me!!!'
}
delete anObjectWithProps.someProperty // OK
```
