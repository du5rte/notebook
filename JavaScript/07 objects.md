# JavaScript Objects

## Objects
Most everything in JavaScript is an object or can be treat as an object that's why its often refered to as an `Object Oriented Languange`.

```js
[1,2,3] 	     // An array is a object
[1,2,3].length // Property of an array
[1,2,3].push() // Method of an array
```

## Object Literals
A container for values in the form of properties and functionality in the form of methods. They have state and behavior, they mostly use for encapsulating, organize and hide the complexity of code away.

- Data can be storage in `properties` pairs of `key: value`
- The name of a property is a `key`
- The contents of a property is a `value`
- Functions inside objects are called `methods`

```js
var person = {
  name: 'Sarah',
  age: 26,
  treehouseStudent: true,
  skills: ['JavaScript', 'HTML', 'CSS']
};
```

## Object Properties
Properties are variables that belong to an object, they can be access with a dot `.` followed by the name of the key or with brackets `[ ]` with the name inside quotes for name spaced variables `"full name": "Lauren Chalkley"`, thought it's not good pratice.


```js
// Calling a property
person.name; // 'Sarah'
person['name']; // 'Sarah'
// Changing a key value
person.name = 'Boddy';
// Creating a new property
person.country = 'Brazil';
// Accessing properties of properties
person.skills.length // 3
```

## Arrays and Objects
Arrays and objects can be mixed matched together

```js
var people = [
  {
    name: 'Sarah',
    age: 26,
    skills: ['JavaScript', 'HTML', 'CSS']
  },
  {
    name: 'Lynn',
    age: 16,
    skills: ['High-School Student', 'Skateboarder']
  },
  {
    name: 'Jennifer',
    age: 34,
    skills: ['Chef', 'Baker', 'Business Owner']
  }
];

people[1].name; // 'Lynn'
```

## Object Destructuring
Converts `object.keys` into `variables` and vice-versa in ES6

```js
const person = {
  name: 'Sarah',
  age: 34
}

let { name, age } = person // var name = person.name, age = person.age;
```

When creating `object.keys` without value JavaScript looks for `variables` with the same name in the current scope and automatically uses them.
```js
var name = 'Sarah'
var age = 34;

var person = {
  name, // name: name
  age, // age: age
  ["name" + name]: 'some value' // nameWill: 'some value'
};
```

Can also be used to destructure the results of a function
```js
let {fullName} = getUser("Williams") // returns Obj{ firstName, lastName, fullName .. }

console.log(fullName)
```

## Object Assign
Merges various objects into one

```js
let en = {1: 'one', 2: 'two', 3: 'three'}
let pt = {2: 'dois'}

let mergedNumbers = Object.assign({}, en, pt, {3: 'trois'})
// {"1":"one","2":"dois","3":"trois"}
```

## Object Spread
A ES7 feature similar to array spread spreads objects keys inside an object

```js
let newMergedNumbers = {...mergedNumbers, 4: 'cuatro', 5: 'go'}
// {"1":"one","2":"dois","3":"trois","4":"cuatro","5":"go"}
```
