# JavaScript - Classes

Resources:
- [Inheritance and the Prototype Chain (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [Prototypal Pattern vs Classical - LearnCode.academy](https://www.youtube.com/watch?v=doXpW5AD60Q)
- [Exploring ES7 decorators](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841#.b8iw8mlhp)

## Classes
Uses `Constructor Functions` and `Prototypes` to create similar looking object structures. Classes are a new ES6 feature.

## Constructor Function
Creates similar structured objects by describing how a object should be create. Constructor functions are Capitalized for convention.

```js
function Person(name, surname) {
  // `this` will mean the value of each `new instance`
  // this = new {}; john = {};
  this.name = name;
  this.surname = surname;
  // methods can also be used inside it
  this.greet = function() {
    return "Hi, I'm " + this.name + ".";
  };
  // we can return this but it's not required
  return this;
}
```

## New
Generates a `new` object `instance` of it's parent structure.

```js
var john = new Person('John', 'Smith');
```
```
{
  name: 'John',
  surname: 'Smith',
  greet: function () {
    return "Hi, I'm " + this.name + ".";
  }
}
```
```js
var chris = new Person('Chris', 'Grey');
```
```
{
  name: 'Chris',
  surname: 'Grey',
  greet: function () {
    return "Hi, I'm " + this.name + ".";
  }
}
```

Each new `instance` is unique, and so are it's `keys` and `methods`, even if they are the same, which **takes more unnecessary RAM space**.
```js
john.greet === chris.greet // false
```

We could extract the function and reference it in the constructor. But having a function floating around isn't good practice.
```js
function personGreet() {
  return "Hi, I'm " + this.name + ".";
}

function Person(sides) {
  this.name = name;
  this.surname = surname;
  // link `method` to the exterior `function`
  this.greet = personGreet;
}
```
```js
john.greet === chris.greet // true
```

## Prototype
Prototypes works a template for `instances`, to share values or behaviors across `instances` of Objects. When we call a `new object.method()` JavaScript first checks inside the `instances`, then it check inside it's `prototype`.
```js
function Person(sides) {
  this.name = name;
  this.surname = surname;
}

Person.prototype.greet = function() {
  return "Hi, I'm " + this.name + ".";
}
```
```js
john.greet === chris.greet // true
```

## Prototype Chain
Allow us to extend existing constructors with `Prototypal Inheritance` using `.call( )`

```js
function Teacher(name, surname, subject) {
  // `this` as in `this function context`
  // var teacher = this; Person.call(teacher);  
  // Person requires `firstName` and `lastName`
  Person.call(this, name, surname);
  // then the values or methods
  this.subject = subject;
}
```
And chain/pass `Person.prototypes` into `Teacher.prototypes`
```js
Teacher.prototype = Object.create(Person.prototype);
```
Add prototypes
```js
Teacher.prototype.sayJob = function() {
  return "I'm a " + this.subject + " teacher.";
}
```
Create new instance
```js
var teresa = new Teacher('Teresa', 'Rodrigues', 'Maths');
```

## ES6 Classes
ECMAScript 6 introduces a new set of keywords `class`, `constructor`, `static`, `extends` and `super`.

```js
// creates an anonymous function which will return the Person constructor
// var Person = function() { return Person; }
class Person {
  // creates the constructor function
  // function Person(name, surname) { ... }
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }
  // creates the prototype methods
  // Person.prototype.sayname() {}
  greet() {
    return "Hi, I'm " + this.name + ".";
  }
}
```

Creating `new` instances are just like in ES5
```js
let jack = new Person('Jack', 'Martin');

jack.greet(); // Hi, I'm Jack.
```

Chains classes with `extends` and `super`
```js
class Student extends Person {
  constructor(name, age, school) {
    // creates the Person.call(this, name, age);
    super(name, age);
    this.school = school;
  }
  sayInfo() {
    console.log(`name: ${this.name}, surname: ${this.age}, school: ${this.school}`);
  }

  greet() {
    // calls the original greet from Person
    return super.greet()
  }
}
```

Automatically chains `prototypes`
```js
let studentJack = new Student('Jack', 'Martin', 'teamtreehouse');

studentJack.greet(); // Hi, I'm Jack.
studentJack.sayInfo(); // name: Jack, surname: Martin, school: teamtreehouse
```

## ES7 Decorators
With esnext `classes` we can't just wrap methods in function, that's where decorators come in

Old way
```js
function fluent(fn) {
  return function(...args) {
    fn.apply(this, args);
    return this
  }
}
```
```js
Person.prototype.setName = fluent(function(first, last) {
  this.first = first
  this.last = last
})

Person.prototype.sayName = fluent(function() {
  console.log(this.first, this.last)
})

var p = new Person()

p.setName('Jane', 'Lee').sayName().setName('John', 'Smith').sayName()
```

New Way
```js
function fluent(target, name, descriptor) {
  // console.log(target) // Person Object
  // console.log(name) // setName
  // console.log(descriptor) // setName Object
  // console.log(descriptor.value) // setName function(first,last) { ... }

  var fn = descriptor.value

  descriptor.value = function(...args) {
    fn.apply(target, args)
    return target
  }
}
```
```js
class Person {
  @fluent setName(first, last) {
    this.first = first
    this.last = last
  }

  @fluent sayName() {
    console.log(this.first, this.last)
  }
}

var p = new Person()

p.setName('Jane', 'Lee').sayName().setName('John', 'Smith').sayName()
```

## Class of methods

```js
class myMethods {
  static shout(something) {
    this.say(something.toUpperCase())
  }

  static say(something) {
    console.log(something)
  }
}

```
