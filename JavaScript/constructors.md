# JavaScript - Constructor Functions and Prototypes

Object literal have limitations, they are great for one of use and for passing values to a function. To create similar objects of the same kind we should use a `contructer function`.

## Constructor Function
Creates similar structured objects by describing how a object should be created, each object is known as an `instance` of that object type.

```js
// Constructor functions are Capitalized for convention
function Contact(name, email) {

  // this now means a new instance of the object
  // this = new {};

  this.name = name;
  this.email = email;

  // methods can also be used
  // this.sendEmail = function() { /* do something */}

  // we can return this but it's not required
  // return this;
}

// `new` generates a new object instance
var contact = new Contact("qwe", "qwe@gmail.com");
// contact = {
//   email: "qwe@gmail.com",
//   name: "qwe"
// };
```

## Constructor Challenge

```js
var dice = {
  sides: 6,
  roll: function diceRoll() {
    var randomNumber = Math.floor(Math.random() * this.sides) + 1;
    return randomNumber;
  }
}

dice.roll(); // 1 ~ 6
```

```js
function Dice(sides) {
  this.sides = sides;
  this.roll = function() {
    var randomNumber = Math.floor(Math.random() * this.sides) + 1;
    return randomNumber;
  }
}

// Now we can dice various kinds of dices
var dice6 = new Dice(6); // dice6.roll() = 1 ~ 6
var dice8 = new Dice(8); // dice8.roll() = 1 ~ 8
```

## Methods with Prototypes

Although it seems `dice6` and `dice8` use the name `roll()` function, it's not. [Object Prototypes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)
```js
console.log( dice6.roll === dice8.roll ); // false
```
Every time the `Dice` constructor is called we are creating a new instance of all the keys, which is takes more RAM space.
```js
function dice6.roll() {/*same code */}
function dice8.roll() {/*same code */}
```

We could extract the function and reference it in the constructor. But having a function floating around isn't good pratice.

```js
function diceRoll() {
  var randomNumber = Math.floor(Math.random() * this.sides) + 1;
  return randomNumber;
}

function Dice(sides) {
  this.sides = sides;
  this.roll = diceRoll;
}

var dice6 = new Dice(6); // 1 ~ 6
var dice8 = new Dice(8); // 1 ~ 8

console.log( dice6.roll === dice8.roll ); // true
```

We can use `prototype` which works like an object literal. Prototypes work as templates for objects, to share values or behaviors across `instances` of Objects. When we call `roll()` first it will check inside instances and then it will check inside it's prototype.

```js
function Dice(sides) {
  this.sides = sides;
}

Dice.prototype.roll = function() {
  var randomNumber = Math.floor(Math.random() * this.sides) + 1;
  return randomNumber;
}

var dice6 = new Dice(6); // 1 ~ 6
var dice8 = new Dice(8); // 1 ~ 8

console.log( dice6.roll === dice8.roll ); // true
```

## Prototype Chain
Allow us to extend `constructors` with Prototypal Inheritance
- [Inheritance and the Prototype Chain (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [Prototypal Pattern vs Classical - LearnCode.academy](https://www.youtube.com/watch?v=doXpW5AD60Q)

```js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.fullName = function() {
 return this.firstName + " " + this.lastName;
};

function Teacher(firstName, lastName, roomNumber) {
  // `this` as in this function context
  // var teacher = this; Person.call(teacher);  
  // Person requires `firstName` and `lastName`
  Person.call(this, firstName, lastName);
  // then the rest of the methods
  this.room = roomNumber;
}

// Finally chains/passes Person.prototypes into Teacher.prototypes
Song.prototype = Object.create(Person.prototype);
```

## ES6 Classes
ECMAScript 6 introduced a new set of keywords `class`, `constructor`, `static`, `extends` and `super`.

```js
// creates an annoynimous function which will return the Person constructor
// var Person = function() { return Person; }
class Person {
  // creates the constructor function
  // function Person(name, age) { ... }
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  // creates the prototype methods
  // Person.prototype.sayname() {}
  sayName() {
    console.log(`Hi, my name is ${this.name}.`);
  }
}

// New instance, just like in ES5
let eddie = new Person('Eddie', 24);

eddie.sayName(); // Hi, my name is Eddie.

// inherits Person
class Student extends Person {
  constructor(name, age, school) {
    // creates the Person.call(this, name, age);
    super(name, age);
    this.school = school;
  }
  sayInfo() {
    console.log(`name: ${this.name}, age: ${this.age}, school: ${this.school}`);
  }
}

let studentEddie = new Student('Eddie', 24, 'teamtreehouse');

studentEddie.sayName(); // Hi, my name is Eddie.
studentEddie.sayInfo(); // name: Eddie, age: 24, school: teamtreehouse
```
