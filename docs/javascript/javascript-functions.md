---
title: "JavaScript - Functions"
type: doc
created: 2015-10-14
updated: 2026-10-07
aliases: ["JavaScript Functions"]
tags: [javascript]
---
# JavaScript - Functions

A function is a set of instructions we can name once and run as many times as we like. Think of a recipe card: you write it down once, then anyone can follow it whenever they want coffee. Functions are at the heart of JavaScript. We pass them around, store them in variables and hand them to other functions, so it pays to know them well.

## Declaring and calling a function

We create a function with the `function` keyword and run it by adding `()` after its name.

```js
function goToCoffeeShop() {
  console.log('Going to the coffee shop.')
}

goToCoffeeShop() // logs 'Going to the coffee shop.'
```

Without the `()` we are only talking *about* the function, not running it. That difference matters later, when we pass functions to other functions.

## Declarations vs expressions

A function can also be stored in a variable. This is a function expression.

```js
// declaration
function greet(name) {
  return `Hi ${name}`
}

// expression
const greetToo = function (name) {
  return `Hi ${name}`
}
```

| | Declaration | Expression |
|---|---|---|
| Can be called before the line it's written on | Yes (it's hoisted) | No |
| Has a name of its own | Always | Optional |
| Typical use | Top-level helpers | Callbacks, values stored in objects |

## Return values

`return` hands a value back to whoever called the function. Anything after `return` in that function is skipped. A function with no `return` gives back `undefined`.

```js
function makeCoffee() {
  return 'Flat white'
  console.log('never runs')
}

makeCoffee() // 'Flat white'
```

The first `return` reached wins, so we can return early from a condition.

```js
const inbox = ['invoice from Dave', 'plane tickets', 'spam']

function isInboxEmpty(messages) {
  return messages.length === 0
}

isInboxEmpty(inbox) // false
```

A comparison already gives `true` or `false`, so there's no need for `if (...) return true else return false`.

## Parameters and arguments

Parameters are the names in the function definition. Arguments are the actual values we pass when we call it.

```js
function add(x, y) { // x and y are parameters
  return x + y
}

add(6, 4) // 10: 6 and 4 are arguments
```

Arguments are matched by position. Pass them in the wrong order, or leave one out, and the function quietly gets the wrong values.

```js
function calcBMI(weight, height, fitness) {
  return Math.round(weight / (height * height))
}

calcBMI(70, 1.85) // 20
calcBMI(1.85, 70) // 0, oops
```

## Passing an object instead

When a function takes more than two or three values, pass one object. Order stops mattering and the call reads like a sentence. We pull the values out with destructuring right in the parameter list.

```js
function calcBMI({ weight, height }) {
  return Math.round(weight / (height * height))
}

calcBMI({ height: 1.85, weight: 70 }) // 20
```

We can rename while destructuring with a colon.

```js
function calcBMI({ weight: w, height: h }) {
  return Math.round(w / (h * h))
}
```

If our variables already have the right names, the shorthand saves typing.

```js
const weight = 70
const height = 1.85

calcBMI({ weight, height }) // same as { weight: weight, height: height }
```

## Default parameters

A default kicks in when an argument is missing or `undefined`.

```js
function orderCoffee(size = 'medium') {
  return `One ${size} coffee`
}

orderCoffee()        // 'One medium coffee'
orderCoffee('large') // 'One large coffee'
```

Defaults work inside destructured objects too. Adding `= {}` at the end lets us call the function with nothing at all.

```js
function calcBMI({ weight = 70, height = 1.85, fitness = 1 } = {}) {
  return Math.round((weight / (height * height)) * fitness)
}

calcBMI()                 // 20
calcBMI({ fitness: 1.2 }) // 25
```

## Rest parameters

`...` in the parameter list collects any number of arguments into a real array.

```js
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0)
}

sum(1, 2, 3, 4, 5) // 15
```

The rest parameter must be the last one: `function log(level, ...messages)`.

## Arrow functions

Arrow functions are a shorter way to write function expressions. They shine in one-liners and callbacks.

```js
const sum = (a, b) => {
  return a + b
}

// one expression: the braces and `return` can go
const sumShort = (a, b) => a + b

// one parameter: the parentheses can go
const double = n => n * 2

;[1, 2, 3].map(double) // [2, 4, 6]
```

To return an object from a one-liner, wrap it in parentheses, otherwise the braces are read as a function body.

```js
const makeOrder = item => ({ item, paid: false })

makeOrder('latte') // { item: 'latte', paid: false }
```

Arrow functions also don't get their own `this`. That's covered in [[docs/javascript/javascript-scope|JavaScript - Scope]].

## Methods

A function stored on an object is called a method. The shorthand skips the `function` keyword.

```js
const dice = {
  sides: 6,
  roll() {
    return Math.floor(Math.random() * this.sides) + 1
  },
}

dice.roll() // a number from 1 to 6
```

Inside a method, `this` is the object before the dot: here, `dice`.

## Generator functions

A generator, written `function*`, can pause and hand back several values one at a time with `yield`.

```js
function* coffeeOrders() {
  yield 'espresso'
  yield 'latte'
  yield 'cortado'
}

const orders = coffeeOrders()
orders.next() // { value: 'espresso', done: false }
orders.next() // { value: 'latte', done: false }

for (const order of coffeeOrders()) {
  console.log(order) // 'espresso', 'latte', 'cortado'
}

;[...coffeeOrders()] // ['espresso', 'latte', 'cortado']
```

You won't write generators often, but they explain how `for...of` and spreading work under the hood.

## Common mistakes

- **Forgetting the `()`**. `button.onclick = save()` runs `save` right away and stores its result. You want `button.onclick = save`.
- **Using `++` in an arrow**. `n => n++` returns `n` *before* adding one, so `[0, 1, 2].map(n => n++)` gives `[0, 1, 2]`. Write `n => n + 1`.
- **Expecting a value from a function with no `return`**. You get `undefined`. One-line arrows return automatically; arrows with braces don't.
- **Returning an object from an arrow without parentheses**. `() => { a: 1 }` returns `undefined`.

## Try it

1. Write `orderCoffee({ size, milk })` with defaults of `'medium'` and `'oat'`, returning a sentence like `'One medium coffee with oat milk'`.
2. Write `average(...numbers)` that returns the average of any amount of numbers.
3. Rewrite `function isEven(n) { if (n % 2 === 0) { return true } else { return false } }` as a one-line arrow function.

## Related

- [[docs/javascript/javascript-scope|JavaScript - Scope]]
- [[docs/javascript/javascript-patterns|JavaScript - Common Patterns]]
- [[docs/javascript/javascript-async|JavaScript - Asynchronous Programming]]
- [[docs/javascript/javascript-objects|JavaScript - Objects]]
