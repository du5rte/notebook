---
title: "JavaScript - Scope"
type: doc
created: 2015-08-27
updated: 2026-10-07
tags: [javascript]
---
# JavaScript - Scope

Scope is which variables a piece of code can see. Context is what `this` points to while that code runs. They sound alike and get mixed up a lot, so this lesson takes them one at a time: scope, then closures (scope that sticks around), then `this`.

```
scope   === which variables I can reach
context === what `this` is
```

## Scope is like a house

Think of a family house. Children can use whatever the parents bought for the house, but if a child buys cookies with their own money, they keep them in their own room. Inner code can see outer variables; outer code can't see inner ones.

```js
const shop = 'Corner Café' // outer

function order() {
  const drink = 'latte' // inner
  return `${drink} from ${shop}` // can see both
}

order() // 'latte from Corner Café'
drink   // ReferenceError: drink is not defined
```

## Block scope: let and const vs var

`let` and `const` live inside the nearest `{ }` block. The old `var` ignores blocks and lives in the whole function, which leads to surprises. Use `const` by default, `let` when the value changes, and leave `var` in old code.

```js
if (true) {
  const size = 'large'
  var oldSize = 'large'
}

oldSize // 'large': var leaked out of the block
size    // ReferenceError
```

| | `var` | `let` / `const` |
|---|---|---|
| Scope | function | block `{ }` |
| Use before declaring | `undefined` | ReferenceError |
| Redeclare in same scope | allowed | error |

## Shadowing

An inner variable with the same name as an outer one hides it inside that scope. The outer one is untouched.

```js
const coffee = 'espresso'

function makeTea() {
  const coffee = 'none today'
  return coffee
}

makeTea() // 'none today'
coffee    // 'espresso'
```

Assigning to a name that doesn't exist anywhere, without `const` or `let`, used to create a global by accident. ES modules and strict mode turn that into an error, which is what we want.

## Closures

A function remembers the variables around it when it was created, even after the outer function has finished. That memory is a closure.

```js
function makeCounter() {
  let count = 0
  return () => {
    count += 1
    return count
  }
}

const nextTicket = makeCounter()
nextTicket() // 1
nextTicket() // 2
```

Nobody outside can touch `count`. Closures are how we keep private state in plain functions, and they're behind most of the patterns in [[docs/javascript/javascript-patterns|JavaScript - Common Patterns]].

## What is `this`?

`this` is decided by **how a function is called**, not where it's written. For a regular function, the rule of thumb is: look left of the dot.

```js
const dice = {
  sides: 6,
  describe() {
    return `A ${this.sides}-sided dice`
  },
}

dice.describe() // 'A 6-sided dice': this === dice

const describe = dice.describe
describe() // TypeError in strict mode: this is undefined
```

With nothing left of the dot, `this` is `undefined` in strict mode (modules and classes are always strict). In old sloppy scripts it fell back to the global object, `window` in the browser.

## Losing `this` in callbacks

The classic bug: a method passes a regular function as a callback, and that callback is called with nothing left of the dot.

```js
const dice = {
  sides: 6,
  rollLater() {
    setTimeout(function () {
      console.log(this.sides) // undefined: `this` isn't dice here
    }, 100)
  },
}
```

## Arrow functions keep the outer `this`

Arrow functions don't have their own `this`. They use the `this` of the code around them. That makes them the fix for the bug above.

```js
const dice = {
  sides: 6,
  rollLater() {
    setTimeout(() => {
      console.log(Math.floor(Math.random() * this.sides) + 1) // works
    }, 100)
  },
}
```

Before arrows, people wrote `const self = this` above the callback and used `self` inside. You'll still see `self` and `_this` in older code.

The flip side: don't use an arrow as an object method. It would take `this` from outside the object.

## call, apply and bind

These set `this` by hand. `call` and `apply` run the function straight away; `bind` returns a new function with `this` locked in.

```js
function introduce(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`
}

const ana = { name: 'Ana' }

introduce.call(ana, 'Hi', '!')    // "Hi, I'm Ana!"
introduce.apply(ana, ['Hi', '!']) // "Hi, I'm Ana!": arguments as an array
const anaIntro = introduce.bind(ana)
anaIntro('Hello', '.')            // "Hello, I'm Ana."
```

Memory aid: **a**pply takes an **a**rray. Today, spread (`fn.call(obj, ...args)`) covers most uses of `apply`, and arrows cover most uses of `bind`.

## `this` in event listeners

With a regular function, the browser sets `this` to the element the listener is attached to. With an arrow, you get the outer `this` instead, so use `event.currentTarget`, which works either way.

```js
for (const item of document.querySelectorAll('li')) {
  item.addEventListener('click', (event) => {
    const counter = event.currentTarget.querySelector('span')
    counter.textContent = Number(counter.textContent) + 1
  })
}
```

Each `li` counts its own clicks, because `currentTarget` is the one that was clicked.

## Common mistakes

- **Pulling a method off its object**: `const roll = dice.roll; roll()` loses `this`. Call it on the object, or `bind` it.
- **Arrow functions as methods**: `{ sides: 6, roll: () => this.sides }` gives `undefined`.
- **Using `var` in a loop with callbacks**: every callback sees the last value. `let` gives each loop pass its own variable.
- **Mixing up scope and context**: a variable you can't reach is a scope problem; a wrong `this` is a context problem.

## Try it

1. Write `makeTab()` that returns an `add(price)` function. Each call adds to a private total and returns it.
2. Make `const cup = { size: 'large', describe() { return this.size } }` and break it by passing `cup.describe` to `setTimeout`. Fix it two ways: with an arrow, then with `bind`.
3. Predict the output of `for (var i = 0; i < 3; i++) setTimeout(() => console.log(i))`, then switch to `let` and compare.

## Related

- [[docs/javascript/javascript-variables|JavaScript - Variables]]
- [[docs/javascript/javascript-functions|JavaScript - Functions]]
- [[docs/javascript/javascript-patterns|JavaScript - Common Patterns]]
- [[docs/javascript/javascript-object-oriented|JavaScript - Classes]]
