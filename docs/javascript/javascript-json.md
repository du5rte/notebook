---
title: "JavaScript - JSON"
type: doc
created: 2016-03-18
updated: 2026-10-07
tags: [javascript]
---
# JavaScript - JSON

JSON (JavaScript Object Notation) is the most common way to send data between a browser, a server, a database and other services. It looks like a JavaScript object, but it's **just text**: a string in a strict format that any language can read. You turn objects into JSON to send or save them, and JSON back into objects to use them.

## What JSON looks like

Objects and arrays, nested as deep as you like.

```json
[
  { "name": "Aimee", "inOffice": false, "phone": "503-555-1212" },
  { "name": "Ben", "inOffice": true, "phone": null }
]
```

## The rules are stricter than JavaScript

| JavaScript object | JSON |
| --- | --- |
| `{ name: 'Ana' }` | ❌ keys and strings need double quotes: `{ "name": "Ana" }` |
| Trailing comma `[1, 2,]` | ❌ not allowed |
| `// comments` | ❌ not allowed |
| `undefined`, functions, `Map`, `Set` | ❌ dropped, or turned into `null` or `{}` |
| Dates | ⚠️ become strings |

JSON can hold strings, numbers, `true`/`false`, `null`, arrays and objects. That's all.

## JSON.stringify: object to text

```js
const order = { drink: 'latte', size: 'large', extraShot: true }

JSON.stringify(order)
// '{"drink":"latte","size":"large","extraShot":true}'

JSON.stringify(order, null, 2) // indented with 2 spaces, nicer to read
```

## JSON.parse: text to object

```js
const text = '{"drink":"latte","size":"large"}'
const parsed = JSON.parse(text)

parsed.drink // 'latte'
```

Bad JSON throws an error, so wrap text you didn't write in `try`/`catch`.

```js
try {
  JSON.parse("{ drink: 'latte' }") // single quotes, no quoted key
} catch (error) {
  console.error('Not valid JSON') // 'Not valid JSON'
}
```

## Getting JSON from a server

`fetch` gives you a response, and `response.json()` reads the body and parses it in one go. It's asynchronous, so you `await` it (see [[docs/javascript/javascript-async|JavaScript - Asynchronous Programming]]).

```js
const response = await fetch('/api/orders')
const orders = await response.json() // already an array or object, no JSON.parse needed
```

Sending JSON goes the other way: `JSON.stringify` the body and say so in the headers.

```js
await fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(order),
})
```

## Saving to localStorage

`localStorage` only stores strings, so JSON is the bridge. More in [[docs/browser/browser-storage|Storage]].

```js
localStorage.setItem('cart', JSON.stringify(['latte', 'muffin']))

const cart = JSON.parse(localStorage.getItem('cart') ?? '[]')
cart // ['latte', 'muffin']
```

## Dates don't come back as dates

A `Date` turns into a string on the way out and stays a string on the way back.

```js
const event = { name: 'Launch', at: new Date('2026-01-15') }
const copy = JSON.parse(JSON.stringify(event))

typeof copy.at        // 'string'
new Date(copy.at)     // a Date again
```

For copying objects, prefer `structuredClone(event)`: it keeps dates, `Map`s and `Set`s.

## Common mistakes

- Calling `JSON.parse` on something that's already an object (like the result of `response.json()`).
- Writing JSON by hand with single quotes or a trailing comma.
- Expecting `undefined` values, functions or `Map`s to survive `JSON.stringify`.
- Parsing without `try`/`catch` when the text comes from a user or another service.

## Try it

1. Turn `{ name: 'Ana', tags: ['vip'] }` into JSON and back, and check the result with `console.log`.
2. Save a list of favourite drinks to `localStorage` and read it back after a page refresh.
3. Predict what `JSON.stringify({ a: undefined, b: 1 })` gives, then check.

## Related
- [[docs/javascript/javascript-objects|JavaScript - Objects]]
- [[docs/javascript/javascript-async|JavaScript - Asynchronous Programming]]
- [[docs/browser/browser-storage|Storage]]
- [[docs/javascript/javascript-maps|JavaScript - Map and Set]]
