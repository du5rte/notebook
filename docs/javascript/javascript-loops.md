---
title: "JavaScript - Loops"
type: doc
created: 2015-10-14
updated: 2026-10-07
tags: [javascript]
---
# JavaScript - Loops

A loop runs the same code once for each item, or until something changes: send an email to every guest, add up a basket, ask for the password until it's right. Modern JavaScript gives you two everyday tools: `for...of` to walk through a list, and array methods like `map` and `filter` that loop for you and hand back a result. Start there; the older loops are for the cases they don't cover.

## for...of: one item at a time

`for...of` gives you each item of a list in order. No counters, no indexes.

```js
const guests = ['Sarah', 'Lynn', 'Jennifer']

for (const guest of guests) {
  console.log(`Welcome, ${guest}!`)
}
// Welcome, Sarah!
// Welcome, Lynn!
// Welcome, Jennifer!
```

It works on anything iterable: arrays, strings, [[docs/javascript/javascript-maps|Maps and Sets]].

```js
for (const letter of 'tea') console.log(letter) // 't' 'e' 'a'
```

Need the position too? Ask the array for its `entries()`.

```js
for (const [index, guest] of guests.entries()) {
  console.log(`${index + 1}. ${guest}`)
}
// 1. Sarah
// 2. Lynn
// 3. Jennifer
```

## Array methods: loops that return something

Most of the time you loop to **make** something: a new list, a single total, one match. Array methods do the looping and give you the result, without a `let` you change along the way.

| You want | Use | Gives back |
| --- | --- | --- |
| Every item, changed | `map` | a new array, same length |
| Only some items | `filter` | a new, shorter array |
| The first match | `find` | one item, or `undefined` |
| One value from all items | `reduce` | anything: a number, an object |
| Just to do something | `forEach` | nothing |

```js
const basket = [
  { name: 'Latte', price: 3.5 },
  { name: 'Muffin', price: 2.75 },
  { name: 'Water', price: 1 },
]

basket.map((item) => item.name)
// ['Latte', 'Muffin', 'Water']

basket.filter((item) => item.price > 2)
// [{ name: 'Latte', ... }, { name: 'Muffin', ... }]

basket.find((item) => item.name === 'Water')
// { name: 'Water', price: 1 }

basket.reduce((total, item) => total + item.price, 0)
// 7.25
```

`reduce` takes a function and a starting value (`0` here). The function gets the running total and the next item, and returns the new running total.

## for...of vs array methods

The same job, two ways:

```js
// ❌ a loop, a mutable variable and a push
const names = []
for (const item of basket) {
  if (item.price > 2) names.push(item.name)
}
```

```js
// ✅ say what you want, get a new array
const names = basket
  .filter((item) => item.price > 2)
  .map((item) => item.name)
// ['Latte', 'Muffin']
```

Rule of thumb: making a value? **Use a method.** Doing something (logging, sending, awaiting one at a time)? **Use `for...of`.**

## Stopping early: break and continue

Array methods always run to the end (except `find`, `some` and `every`, which stop at the answer). When you need to bail out of a loop, use `for...of` with `break`, or skip one round with `continue`.

```js
const orders = ['latte', 'tea', 'SOLD OUT', 'mocha']

for (const order of orders) {
  if (order === 'SOLD OUT') break
  console.log(order)
}
// 'latte' 'tea'
```

## Looping over an object

Objects aren't iterable directly. Turn them into a list first with `Object.keys`, `Object.values` or `Object.entries`.

```js
const person = { name: 'Sarah', age: 26, city: 'Lisbon' }

for (const [key, value] of Object.entries(person)) {
  console.log(`${key}: ${value}`)
}
// name: Sarah
// age: 26
// city: Lisbon
```

You'll also see `for...in` in older code. It walks keys, including inherited ones, so prefer `Object.entries`.

## The classic for loop

The counter loop is still useful when you need control over the steps: count backwards, jump by two, or loop a set number of times.

```js
for (let i = 10; i > 0; i -= 2) {
  console.log(i) // 10 8 6 4 2
}
```

Three parts: where to start, keep going while this is true, what to do after each round.

## while and do...while

`while` keeps going as long as a condition is true, when you don't know in advance how many rounds you'll need.

```js
let cupsLeft = 3
while (cupsLeft > 0) {
  console.log(`Pouring, ${cupsLeft} left`)
  cupsLeft--
}
// Pouring, 3 left / Pouring, 2 left / Pouring, 1 left
```

`do...while` checks **after** the first round, so the body always runs at least once.

```js
let password
do {
  password = prompt('What is the password?')
} while (password !== 'sesame')
```

## Common mistakes

- Infinite loops: a `while` whose condition never becomes false. Make sure something inside changes it.
- Using `map` just to loop (and ignoring the array it returns). Use `forEach` or `for...of`.
- Forgetting the starting value in `reduce`. On an empty array it throws.
- Using `forEach` with `async` callbacks and expecting it to wait. Use `for...of` with `await`, see [[docs/javascript/javascript-async|JavaScript - Asynchronous Programming]].
- Using `for...in` on an array. It gives you the indexes as strings.

## Try it

1. Given `const prices = [3.5, 2.75, 1]`, get the total with `reduce`.
2. From a list of `{ name, isVip }` guests, get just the names of the VIPs.
3. Print the countdown `3, 2, 1, Lift off!` with a classic `for` loop.

## Related
- [[docs/javascript/javascript-arrays|JavaScript - Arrays]]
- [[docs/javascript/javascript-conditionals|JavaScript - Conditionals]]
- [[docs/javascript/javascript-booleans|JavaScript - Booleans]]
- [[docs/javascript/javascript-functions|JavaScript - Functions]]
- [[docs/javascript/javascript-maps|JavaScript - Map and Set]]
