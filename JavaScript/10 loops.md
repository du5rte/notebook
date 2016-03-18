# JavaScript - Loops

Resources:
- [forEach, for, for-in, for-of = stackover](http://stackoverflow.com/questions/9329446/for-each-over-an-array-in-javascript)

# Loops
Loops are block of code that runs over and over again until it's `condition` turns `false`, **loops can be dangerous** if not used correctly, they and run `infintely` and crash a browser.

```js
while (true) {
  var counter = 1;
  console.log(counter); // 1 2 3 ... 3454544 ... 125123023402 ... crash!
  counter += 1;
}
```

# While Loop
Checks the `condition` at the very start, while it's `true` runs over and over again until the condition is `false`, at which points exists the loop.


```js
var counter = 1;
while ( counter <= 10 ) {
  console.log(counter); // 1 2 3 4 5 6 7 8 9 10
  counter += 1;
}
```
```js
var secret = prompt("What is the secret password?");
while ( secret !== "sesame" ) {
  secret = prompt("Try again");
}
```


# Do While Loop
Runs once, checks the `condition` and continues to loop while it's condition is `true`.

```js
var secret; // Good practice to use a empty variable before the loop
do {
  secret = prompt("What is the secret password?");
} while ( secret !== "sesame" )

console.log("You know the secret password. Welcome.");
```

## For Loop
A compact version of a `while` loop

```js
for ( var counter = 0; counter <= 10; counter += 1 ) {
	console.log( counter ); // 1 2 3 4 5 6 7 8 9 10
}
```
or even more compact using `i` meaning `index`
```js
for (var i = 0; i <= 10; i++) {
	console.log( i ); // 1 2 3 4 5 6 7 8 9 10
}
```

## Breaking Loop
When a `while` loops encounters a `break`, it exists the loop regardless of it's condition still being `true`

```js
var secret;
var tries = 0;
while ( tries < 10 ) { // will give user 10 tries
  secret = prompt("What is the secret password?");
  tries++;
  if ( secret === "sesame" ) {
    secret = true;
    break;
  }
}
if (secret) {
  console.log("You got the secret password, welcome.");
} else {
  console.log("Stop fooling yourself! You don't know the password.");
}
```

## For Loop (Array)
Loops through values in a array using `for` loop and the array `.length`

```js
var students = ['Sarah', 'Lynn', 'Jennifer', 'Paul'];

for (var i = 0; i < students.length; i++) {
  console.log(students[i]); // 'Sarah' 'Lynn' 'Jennifer' 'Paul'
}
```

## For in Loop (Object)
Loops through keys in a object using `for in` loop

```js
var person = {
  name: 'Sarah',
  age: 26,
  treehouseStudent: true,
  skills: ['JavaScript', 'HTML', 'CSS']
};

for (var key in person) {
  console.log(key); // "name" "age" "treehouse" "skills"
  console.log(person[key]); // "Sarah" "26" "['JavaScript', 'HTML', 'CSS']"
}
```

## Looping a Array of Objects
Loops through using a combination of previous two techniqes.

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

for (var i =0; i < people.length; i++) {

  console.log(people[i].name); // 'Sarah' 'Lynn' 'Jennifer'

  for (var person in people[i]) {
    console.log(person); // 'name' 'age' 'skills' 'name' 'age' ..etc
    console.log(people[i][person]); // 'Sarah' 26 [..] 'Lynn' 16 [..] ..etc
  }
}
```

## For Each (Array)
Loops through an array using an `iterator function`, optionally it can take an index. ES5 feature

```js
var students = ['Sarah', 'Lynn', 'Jennifer', 'Paul'];

students.forEach(function(student /*, index*/) {
  console.log(student); // 'Sarah' 'Lynn' 'Jennifer' 'Paul'
  // console.log(index); // 0 1 2 3
});
```

## For Of
Loops through an array using a ES6 `iterator function`

```js
let students = ['Sarah', 'Lynn', 'Jennifer', 'Paul']

for (let student of students) {
  console.log(student) // 'Sarah' 'Lynn' 'Jennifer' 'Paul'
}
```

## Iterator
A object that knows how to access items from a collection 1 at the time while keeping track of its current position.

`next` method returns an object with they key values `{value, done}`, `done` will be `false` if there's more values to be returned and be `true` when there's no longer nothing to return. `value` will return any value until it reaches the end which then returns `undefined`.

```js
let students = ['Sarah', 'Lynn', 'Jennifer', 'Paul']

let iterator = students[Symbol.iterator]()

let firstRun = iterator.next() // {value: "Sarah", done: false}
// or with destructuring
// let {value: student} = iterator.next()
let student = firstRun.value

// ...

let lastRun = iterator.next() // {value: undefined, done:t rue}
```
