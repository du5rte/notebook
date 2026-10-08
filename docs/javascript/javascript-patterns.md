---
title: "JavaScript - Common Patterns"
type: doc
created: 2016-03-18
updated: 2026-10-07
aliases: ["JavaScript - Decorators"]
tags: [javascript]
---
# JavaScript - Common Patterns

Because functions in JavaScript are values, we can pass them in, hand them back and wrap them. Almost every pattern you'll meet comes from that one idea: callbacks, higher-order functions and decorators. The other half of this lesson is about organising code into files: ES modules today, and the older tricks they replaced, so you recognise them in legacy code.

## Callbacks

A callback is a function you pass to another function so it can call it later: when a click happens, when data arrives, or once for each item in a list.

```js
const orders = ['latte', 'tea', 'mocha']

orders.forEach((order) => console.log(`Making a ${order}`))
// 'Making a latte'
// 'Making a tea'
// 'Making a mocha'
```

Pass the function, don't call it: `button.addEventListener('click', save)`, not `save()`. Callbacks for slow work (network, timers) are covered in [[docs/javascript/javascript-async|JavaScript - Asynchronous Programming]].

## Higher-order functions

A higher-order function takes a function, returns a function, or both. You already use the most common ones: `map`, `filter` and `reduce` take a function and apply it to every item.

```js
const prices = [3.2, 2.5, 4.0]

prices.map((price) => price * 2)      // [6.4, 5, 8]
prices.filter((price) => price > 3)   // [3.2, 4]
```

Returning a function lets us make specialised versions of a general one. This leans on closures from [[docs/javascript/javascript-scope|JavaScript - Scope]].

```js
function greeter(greeting) {
  return (name) => `${greeting} ${name}`
}

const sayHi = greeter('Hi')
const sayOla = greeter('Olá')

sayHi('Ana')   // 'Hi Ana'
sayOla('Rui')  // 'Olá Rui'
```

## Composing functions

Small functions can be piped together, the output of one feeding the next.

```js
const pipe = (...fns) => (value) => fns.reduce((result, fn) => fn(result), value)

const trim = (text) => text.trim()
const shout = (text) => text.toUpperCase()
const exclaim = (text) => `${text}!`

const announce = pipe(trim, shout, exclaim)

announce('  coffee is ready ') // 'COFFEE IS READY!'
```

## Decorators: wrapping a function

A decorator takes a function and returns a new one that adds behaviour around it, without changing the original. Logging, timing, caching and retrying are the classic uses.

```js
function logged(fn) {
  return function (...args) {
    console.log(`Calling ${fn.name} with`, args)
    return fn.apply(this, args)
  }
}

const add = (a, b) => a + b
const loggedAdd = logged(add)

loggedAdd(2, 3) // logs 'Calling add with [2, 3]', returns 5
```

`fn.apply(this, args)` passes along whatever `this` and arguments the wrapper got, so the wrapper also works on methods.

A wrapper that returns `this` makes any method chainable. This is the "fluent" pattern from the original notes:

```js
function fluent(fn) {
  return function (...args) {
    fn.apply(this, args)
    return this
  }
}

class Person {
  setName = fluent(function (first, last) {
    this.first = first
    this.last = last
  })

  sayName = fluent(function () {
    console.log(`${this.first} ${this.last}`)
  })
}

new Person().setName('Jane', 'Lee').sayName().setName('John', 'Smith').sayName()
// 'Jane Lee'
// 'John Smith'
```

## The `@decorator` syntax

Wrapping class methods by hand gets clumsy, so there's a TC39 proposal for an `@` syntax. TypeScript supports it, and frameworks like Angular use decorators heavily. In plain JavaScript you need a build step until browsers ship it; check MDN for current support.

A method decorator receives the method and a `context` object, and returns the replacement.

```js
function logged(method, context) {
  return function (...args) {
    console.log(`Calling ${context.name}`)
    return method.apply(this, args)
  }
}

class Order {
  @logged
  pay(amount) {
    return `Paid ${amount}`
  }
}

new Order().pay(4) // logs 'Calling pay', returns 'Paid 4'
```

Older code (Babel's legacy plugin, TypeScript's `experimentalDecorators`) uses a different signature: `(target, name, descriptor)`. If you see `descriptor.value`, that's the old style.

## ES modules

Every file is its own module with its own scope. Nothing leaks out unless you `export` it, and nothing comes in unless you `import` it.

```js
// menu.js
export const drinks = ['latte', 'tea']
export function price(drink) {
  return drink === 'latte' ? 3.2 : 2.5
}
export default function openShop() {
  return 'Open!'
}
```

```js
// app.js
import openShop, { drinks, price } from './menu.js'

price(drinks[0]) // 3.2
openShop()       // 'Open!'
```

| | Named export | Default export |
|---|---|---|
| How many per file | any number | one |
| Import name | must match (or rename with `as`) | you choose |
| Good for | utilities, several things | one main thing per file |

Many teams prefer named exports only: the names stay consistent across the codebase and editors autocomplete them. Node also has the older CommonJS format (`require`, `module.exports`); see [[docs/node/node-modules|Node - Modules]].

## Why the old patterns existed

Before modules, every `<script>` shared one global scope. Two files declaring `count` would overwrite each other. Developers used a function's scope as a private room:

```js
// IIFE: Immediately Invoked Function Expression
const counter = (function () {
  let count = 0 // private
  return {
    next: () => ++count,
  }
})()

counter.next() // 1
```

This "module pattern" gave us private variables and one global name instead of many. ES modules do the same job natively, so you don't need it in new code. You'll still meet IIFEs in old libraries and bundler output, so it's worth recognising the `(function () { ... })()` shape.

## Common mistakes

- **Calling instead of passing**: `setTimeout(save(), 1000)` runs `save` now. ✅ `setTimeout(save, 1000)`.
- **Losing `this` in a wrapper**: ❌ `return (...args) => fn(...args)` drops `this`. ✅ use a regular function and `fn.apply(this, args)`.
- **Forgetting `.js` in browser imports**: browsers need the full path, `./menu.js`, not `./menu`. Bundlers hide this.
- **Mixing default and named imports**: `import { openShop } from './menu.js'` fails if it was a default export.

## Try it

1. Write `timed(fn)` that logs how long `fn` took, using `performance.now()`.
2. Write `once(fn)` that only runs `fn` the first time and returns the first result after that.
3. Split a small script into two modules: one exports `formatPrice`, the other imports and uses it.

## Related

- [[docs/javascript/javascript-functions|JavaScript - Functions]]
- [[docs/javascript/javascript-scope|JavaScript - Scope]]
- [[docs/javascript/javascript-async|JavaScript - Asynchronous Programming]]
- [[docs/javascript/javascript-object-oriented|JavaScript - Classes]]
- [[docs/node/node-modules|Node - Modules]]
- [[docs/node/node-events|Node - Events]]
