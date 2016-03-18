# JavaScript Functions
JavaScript is often called a `Functional Programing Languages` as functions are at the heart of javascript works.

Resources:
- [ES6 default, rest, spread - medium](https://medium.com/ecmascript-2015/default-rest-spread-f3ab0d2e0a5e)
- [ES7 async functions - sitepoint](http://www.sitepoint.com/simplifying-asynchronous-coding-es7-async-functions/)
- [ES7 generators, async functions = node submit](http://nodesummit.com/media/evolution-of-javascript-es7)

## Functions
A set of instructions we can use over and over again, created with the keyword `function` or anonymously with `var`. Functions usually `Get` or `Set` something.

```js
// Create named function
function goToCoffeeShop() {
  console.log('Go to coffee shop.');
}
// Create anonymous function
var goToCoffeeShop = function() {
  console.log('Go to coffee shop.');
};

// Call function
goToCoffeeShop() // Prints 'Go to coffee shop.' to the console
```

## Return
Functions may return or may not return something, with the keyword `return`, it can return a `string` `number` or `variable`, anything written after it will be ignored.

```js
function goToCoffeeShop() {
  var coffee = 'Go to coffee shop.';
  return coffee;
}

goToCoffeeShop() // 'Go to coffee shop.'
```

Multiple returns can be used with `if` statements, only the first evaluated return passes.

```js
var inbox = ['invoice from dave', 'plane tickets', 'spam'];

function isEmailEmpty() {
  if (inbox.length === 0) {
    return true;
  } else {
    return false;
  }
}

isEmailEmpty(); // false
```

## Arguments
Variables that are passed into a functions inside it's parenthesis `(  )`

```js
function add(x, y) {
  return x + y;
}

add(6, 4); // 10
```

If a `arguments` come in the wrong sequence it can cause an error, one way to go around it to use `null`, to skip the argument. or leave optional arguments for the end.
```js
function calcBMI(fitness, weight, height)  {
  var bmi = weight / (height * height);
  if (fitness > 1) {
    bmi *= activity;
  }
  return Math.round(bmi);
}

calcBMI(1.2, 70, 1.85); // 25
calcBMI(70, 1.85); // NaN
calcBMI(null, 70, 1.85); // 20
```

A better way is to use an `object` as it's argument, the order of parameters won't matter anymore but each parameters needs to be called by `object.parameter`
```js
function bmi(info)  {
  var bmi = info.weight / (info.height * info.height);
  if (info.fitness > 1) {
    bmi *= info.fitness;
  }
  return Math.round(bmi);
}

bmi({height:1.85, weight: 70}); // 20
```

## Methods
Are functions inside object as a `key`, created just like `annonymous functions`, inside or outside the object.
```js
// Inside the object
var dice = {
  roll: fuction() { /**/ }
};
// Outside the object
dice.roll = function() { /**/ };
```

## This
`this` referees to it's parent scope.
```js
var dice = {
  sides: 6,
  roll: function() {
    // this.sides = dice.sides = 6
    return Math.floor(Math.random() * this.sides) + 1;
  }
}
```

## Scope
Each function has it's own scope `this` referees to it's parent, when wrapping a function inside another function it will be adopted by it's new parent context.

```js
var dice = {
  sides: 6,
  roll: function() {
    setTimeout(function () {
      // setTimeout.sides = setTimeout.sides = Error!
      return Math.floor(Math.random() * this.sides) + 1;
    }, 100);
  }
}
```

The scope can be changed with a variable pointing to this `var _this = this;`
```js
setTimeout(function () {
  var _this = this;
  return Math.floor(Math.random() * _this.sides) + 1;
}, 100);
```

Or with `.bind(this)` at the end of the function
```js
setTimeout(function () {
  return Math.floor(Math.random() * this.sides) + 1;
}.bind(this), 100);
```

## Arrow Functions
A simpler ES6 Syntax to create functions, arrow functions also automatically bind to `this`.

Before
```js
var sum = function(a, b) {
  return a + b;
}
```

A little cleaner, but not that amazing
```js
const sum = (a, b) => {
  return a + b
}
```

Better with one liners
```js
const sum = (a,b) => a + b
```

Even better with just one value
```js
const increment = a => a++
// Example
[0,1,2].map(val => val++) // [1,2,3]
```

Lexical Context Binding, automatically binds `this` to it's grand-parent.
```js
const dice = {
  sides: 6,
  roll: function() {
    setTimeout( () => {
      // var _this = this
      return Math.floor(Math.random() * this.sides/*_this.sides*/) + 1
    }, 100)
  }
}
```

## Destructuring
Converts `object.keys` into `variables` and vice-versa in ES6

Pass variables to functions in ES5, has to be done manually
```js
var weight = 70
var height = 1.85

calcBMI({name: weight, height: height})
```
But in ES6, if they have the same name JavaScript picks on it and automatically does it.
```js
let weight = 70
let height = 1.85

// If the variables already exist JavaScript uses them.
calcBMI({ name, age }) // {name: weight, height: height}
```

Back in the function Instead of using `obj.parameter`, it can be destructured into `variables` and even renamed
```js
function calcBMI({ weight: w, height: h, fitness: f }) { // calcBMI(_ref)
  // var weight = _ref.weight
  // var w = _ref.weight
  var bmi = w / (h * h)
  if (f > 1) {
    bmi *= f
  }
  return Math.round(bmi)
}

calcBMI({ weight: 70, height:1.85, fitness: 1.2 }) // 25
```

Another Example
```js
Promise.all([promise1, promise2]).then(function([results1, results2]) {
  // rather than using results.result1 results.result2
})
```


## Default Parameters
Default `parameters` can be set in the function in ES6, it creates a variable which if the value is undefined, defaults to the value provided.

```js
function loadProfiles(userNames = []) {
  console.log(userNames.length)
}

loadProfiles() // 0
```

```js
function calcBMI({ weight, height, fitness = 1.2 } = {}) {
  // var fitness = _ref.fitness === undefined ? 1.2 : _ref.fitness;
  var bmi = weight / (height * height)
  if (f > 1) {
    bmi *= fit
  }
  return Math.round(bmi)
}

calcBMI({ weight: 70, height:1.85 }) // 25
```

## Rest Parameters
Passes a number of indefinite parameters as an `array`

```js
function sum(...numbers) {
  // var numbers = [parameter[0], paramters[1] ..etc ]
  var result = 0;
  numbers.forEach(function (number) {
    result += number;
  });
  return result;
}

sum(1, 2, 3, 4, 5) // 15
```

## Generator Functions
Is a function that can return **multiple** values with `yield`, which works like an intermediante `return`.

```js
function* awesomeGenerator() {
  yield 'generator'
  yield 'functions'
  yield 'are'
  return 'great'
}

var iterator = awesomeGenerator()

iterator.next() // {value: "generator", done: false}
iterator.next() // {value: "functions", done: false}
iterator.next() // {value: "are",       done: false}
iterator.next() // {value: "great",     done: true}
```

```js
for(let awesome of awesomeGenerator()) {
  console.log(awesome)
}
// generator
// functions
// are
```

```js
let names = [...awesomeGenerator()]

console.log(names) // ["generator","functions","are"]
```


## Async Functions
Anything inside an `async` function that depends on a value intercepted by `await` will wait until it returns a `promise`

```js
async function() {
  let friends = await $.get("http://www.filltext.com/?rows=3")
  console.log(friends)
}
```
