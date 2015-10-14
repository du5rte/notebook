# JavaScript - Variables

## Variables
Stores and keeps track of information, created with the keyword `var` or in ES6 `let` or `const`

Create a empty variable
```js
// Creates a empty variable
var score;
// creates and assign a value to the variable
var score = 0;
```

Passing Variables
```js
// Create variable
var message = "Hello!";
// Pass variable inside alert function
alert(message);
```

Changing variable content
```js
var message = "hello";
console.log(message); // hello
// This time without `var`
message = "hi there!"
console.log(message); // hi there!
```

## Naming Variables
There's some rules to naming variables, [Lexical grammar](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords)

- Can contain letters and numbers `$` and `_`
- Cannot start with numbers
- Cannot create variables **reserved** for JavaScript. (e.g. var, function, if, etc)

## Variable Scope
Each functions act as it's on `scoop`, variables created outside that scoop don't interact with each other.

```js
// This is a global scoop variable
var person = 'George';

function greeting() {
	// This is a `greeting()` variable only
	var person = 'Lilah';
	console.log('hello ' + person);
}

greeting(); // hello Lilah
```
It's bad practice to use `global scopes` with functions
```js
var message = "Welcome!";

function setMessage() {
	// No `var` before message, overwrites global scoop variable
	message = "Go away!";
}

setMessage();
alert(message); // Go away!
```

## Let
Uses Block Scoping, in ES6 `let` is the new `var`.
```js
var counter = 2;

for (var i=0; i<=10; i++) {
	// Even though we create it here
	// it will overwrite or generate a global variable
  var counter = i;
}
console.log(counter); // 10
```
```js
let counter = 2

for (var i=0; i<=10; i++) {
	// It's created and destroyed inside this scope
  let counter = i;
}

console.log(counter); // 2
```

## Const
Also uses block scoping, `const` can't be overwriten, although `keys` can.

```js
const fruit = 'apple'
fruit = 'strawberry' // error: "fruit" is read-only
```
```js
const fruits = {
  sweet: 'banana',
  sour: 'lemon'
}

fruits.sour = 'limes'; // OK
```
```js
const fruits = ['orange', 'peach'];

fruits[1] = 'pineapple' // OK
```
