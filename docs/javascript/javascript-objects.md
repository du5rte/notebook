---
title: "JavaScript - Objects"
type: doc
created: 2015-10-14
updated: 2026-10-07
aliases: ["JavaScript Objects"]
tags: [javascript]
---
# JavaScript - Objects

An object groups related values under names, like a form you fill in: name, age, city. Where an [[docs/javascript/javascript-arrays|array]] is a list in order, an object is a set of labelled boxes. Almost everything you get from an API, a database or a form is an object, so reading and reshaping them is core JavaScript.

## Creating an object

Curly braces, then `key: value` pairs. Keys are the labels; values can be anything, even other objects, arrays or functions.

```js
const person = {
  name: 'Sarah',
  age: 26,
  isStudent: true,
  skills: ['JavaScript', 'HTML', 'CSS'],
}
```

## Reading properties: dot vs brackets

Use a dot when you know the key. Use brackets when the key is in a variable or has a space in it.

```js
person.name          // 'Sarah'
person['name']       // 'Sarah'

const field = 'age'
person[field]        // 26

person.skills.length // 3
person.email         // undefined, no such key
```

## Changing, adding and removing

```js
const order = { drink: 'latte' }

order.size = 'large'     // add a property
order.drink = 'mocha'    // change one
delete order.size        // remove one
order                    // { drink: 'mocha' }
```

This changes the object in place. Often you'll want a changed copy instead, see spread below.

## Methods

A function stored in an object is a method. Inside it, `this` is the object it was called on.

```js
const cafe = {
  name: 'Bean There',
  greet() {
    return `Welcome to ${this.name}`
  },
}

cafe.greet() // 'Welcome to Bean There'
```

More on `this` and classes in [[docs/javascript/javascript-object-oriented|JavaScript - Classes]].

## Shorthand properties and computed keys

If a variable has the same name as the key, write it once. Brackets around a key work out its name when the code runs.

```js
const name = 'Sarah'
const age = 34

const person = { name, age } // { name: 'Sarah', age: 34 }

const field = 'email'
const contact = { [field]: 'sarah@mail.com' } // { email: 'sarah@mail.com' }
```

## Destructuring

Pull properties out into variables by name. You can rename and give defaults.

```js
const user = { name: 'Ana', city: 'Porto' }

const { name, city } = user
name // 'Ana'

const { name: firstName, country = 'Portugal' } = user
firstName // 'Ana'
country   // 'Portugal', the default, because user has no country
```

It's handy straight in a function's parameters.

```js
const greet = ({ name }) => `Hi ${name}`
greet(user) // 'Hi Ana'
```

## Spread: copying and merging

`...` copies properties into a new object. Later keys win.

```js
const defaults = { size: 'medium', milk: 'whole' }
const choice = { milk: 'oat' }

const order = { ...defaults, ...choice, extraShot: true }
// { size: 'medium', milk: 'oat', extraShot: true }
```

✅ This is how you "update" an object without changing the original.

```js
const updated = { ...order, size: 'large' }
order.size   // 'medium', untouched
updated.size // 'large'
```

## Objects are shared, not copied

Assigning an object to a new name does not copy it. Both names point at the same object.

```js
// ❌ changes the original too
const original = { drink: 'latte' }
const copy = original
copy.drink = 'tea'
original.drink // 'tea' 🤔

// ✅ a real copy
const realCopy = { ...original }
```

Spread is shallow: nested objects are still shared. For a full deep copy use `structuredClone(original)`.

## Keys, values and entries

Turn an object into arrays when you want to loop over it or reshape it.

```js
const stock = { latte: 12, mocha: 0, tea: 5 }

Object.keys(stock)    // ['latte', 'mocha', 'tea']
Object.values(stock)  // [12, 0, 5]
Object.entries(stock) // [['latte', 12], ['mocha', 0], ['tea', 5]]

// back the other way: keep only what's in stock
Object.fromEntries(
  Object.entries(stock).filter(([, count]) => count > 0)
)
// { latte: 12, tea: 5 }
```

## Does it have this key?

```js
Object.hasOwn(stock, 'mocha') // true, even though the value is 0
'mocha' in stock              // true
stock.mocha ? 'yes' : 'no'    // 'no' ❌ 0 is falsy, so this lies
```

For reading deep, maybe-missing properties, see `?.` in [[docs/javascript/javascript-booleans|JavaScript - Booleans]].

## Arrays of objects

Real data is usually a list of objects. Combine what you know.

```js
const people = [
  { name: 'Sarah', age: 26 },
  { name: 'Lynn', age: 16 },
  { name: 'Jennifer', age: 34 },
]

people[1].name                          // 'Lynn'
people.filter((p) => p.age >= 18).map((p) => p.name) // ['Sarah', 'Jennifer']
```

## Common mistakes

- Thinking `const copy = original` makes a copy.
- Checking a key with a truthy test when its value could be `0`, `''` or `false`.
- Writing the same key twice in one object literal. The last one silently wins.
- Using an object as a dictionary with object keys. Use a [[docs/javascript/javascript-maps|Map]].

## Try it

1. Make a `book` object with a title, author and year. Add a `pages` property, then remove `year`.
2. Given `const settings = { theme: 'light', fontSize: 14 }`, make a copy with `theme: 'dark'` without changing the original.
3. Turn `{ apples: 3, pears: 0, plums: 7 }` into a list of the fruit names that are in stock.

## Related
- [[docs/javascript/javascript-arrays|JavaScript - Arrays]]
- [[docs/javascript/javascript-maps|JavaScript - Map and Set]]
- [[docs/javascript/javascript-json|JavaScript - JSON]]
- [[docs/javascript/javascript-object-oriented|JavaScript - Classes]]
