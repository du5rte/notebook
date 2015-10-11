# JavaScript - Object-Oriented JS

## Object Definition
An object is a container for values in the form of properties and functionality in the form of methods. They have state and behavior.

Objects are mostly use for encapsulationg, to organise and hide the complexity of code away.

- Encapsulated functions by an object are known as 'methods'
- Provides data storage in `properties`
- The contents of a property is known as a `value`
- Methods may or may not `return` values
- The name of the property is a `key`
- Properties can `Get` or `Set`
- State

e.g.
```js
// `getElementById()` finds and returns `header`
var h1 = document.getElementById("header");
// `log()` prints to the console but doesn't return anything
console.log(h1.innerHTML);
// `innerHTML()` is assigning a new string value to the `h1`
h1.innerHTML = "JavaScript is Awesome";
```

## Types of Objects

### Native Objects
These objects are native to javascript and will be available everywhere.
[Native Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)

- Number
- String
- Array
- Boolean
- Object

### Host Objects
Available depending where JavaScript is running, its called the `host environment`.
[Host Objects](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

#### In the Browser
- document
- console
- Element

#### Node.js
- module

### Custom Objects
Anything you create or import

## Object Literals
Hold data or information about a perticular thing at given time, holds a `state` of a thing. [Object Literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types?redirectlocale=en-US&redirectslug=JavaScript%2FGuide%2FValues%2C_variables%2C_and_literals#Object_literals)

```js
var person = {
  // each key is actually a String
  // JS accepts any valid variable name as a key

  name: "Lauren", // same as "name": "Lauren"

  // or special characters wrapped in quotes
  // not a good pratice!
  "full name": "Lauren Chalkley",

  treehouseStudent: true
}

person.name;                // Lauren
person["name"];             // Lauren
person.treehouseStudent;    // true
person["treehouseStudent"]; // true
person["full name"];        // Lauren Chalkley
```

## Adding a method to an Object
To add a method we simply copy or create a `function` inside a `key`.

```js
// named function (is not need we we can make it a annonymous)
roll: function diceRoll() {}
// annonymous function
roll: function() {}
```

Before
```js
function diceRoll() {
  var sides = 6;
  // generates a number between 1 and the number of `sides`
  var randomNumber = Math.floor(Math.random() * sides) + 1;
  console.log(randomNumber);
}

var dice = {

}
```
After
```js
var dice = {
  roll: function diceRoll() {
    // sides `property` is locked inside the `roll` scope
    var sides = 6;
    // generates a number between 1 and the number of `sides`
    var randomNumber = Math.floor(Math.random() * sides) + 1;
    console.log(randomNumber);
  }
}
```

## Understanding this
`this` refered to the parent name of the function

A little Better
```js
var dice = {
  sides: 6,
  roll: function diceRoll() {
    // now sides is referenced to the `dice` Object
    // but what if it want to change it's name?
    var randomNumber = Math.floor(Math.random() * dice.sides) + 1;
    console.log(randomNumber);
  }
}
```

Even Better
```js
var dice = {
  sides: 6,
  roll: function diceRoll() {
    // now sides is referenced to `this` Object
    var randomNumber = Math.floor(Math.random() * this.sides) + 1;
    console.log(randomNumber);
  }
}
```

## Returning Values
`dice.roll()` only outputs to the console, but we can make it `return` a values so it can be reused by other functions. [return (DMN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return)

```js
var dice = {
  sides: 6,
  roll: function diceRoll() {
    var randomNumber = Math.floor(Math.random() * this.sides) + 1;
    console.log(randomNumber);
    // simply return the value
    return randomNumber;
  }
}
```
