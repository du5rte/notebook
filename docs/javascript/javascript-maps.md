---
title: "JavaScript - Map and Set"
type: doc
created: 2016-03-18
updated: 2026-10-07
aliases: ["JavaScript - Maps"]
tags: [javascript]
---
# JavaScript - Map and Set

`Map` and `Set` are two built-in collections for jobs plain objects and arrays do badly. A `Map` is a dictionary where **any** value can be a key, even an object. A `Set` is a list where every value appears only once, like a guest list that ignores duplicates. You'll still use objects and arrays most days; reach for these when you hit the problems below.

## TLDR;

| You need | Use |
| --- | --- |
| A fixed shape: `{ name, age }` | Object |
| A lookup table built at runtime, with lots of adds and removes | `Map` |
| Keys that aren't strings (objects, numbers kept as numbers) | `Map` |
| An ordered list, duplicates allowed | Array |
| Unique values, fast "is it in there?" | `Set` |

## The problem with objects as dictionaries

Object keys are always strings. Use an object as a key and JavaScript turns it into the string `'[object Object]'`, so every user ends up in the same slot.

```js
const ana = { name: 'Ana' }
const ben = { name: 'Ben' }

const replies = {}
replies[ana] = 5
replies[ben] = 42

replies // { '[object Object]': 42 } 🤔 Ana's count is gone
```

## Map

A `Map` keeps keys as they are. Use `set`, `get`, `has` and `delete`, and `size` to count.

```js
const replies = new Map()

replies.set(ana, 5)
replies.set(ben, 42)

replies.get(ana)   // 5
replies.has(ben)   // true
replies.size       // 2
replies.delete(ben)
replies.size       // 1
```

You can also start a `Map` from a list of `[key, value]` pairs.

```js
const prices = new Map([
  ['latte', 3.5],
  ['tea', 2],
])
prices.get('tea') // 2
```

## Looping over a Map

A `Map` is iterable and remembers the order you added things. Each round gives you a `[key, value]` pair.

```js
for (const [drink, price] of prices) {
  console.log(`${drink}: ${price}`)
}
// latte: 3.5
// tea: 2

[...prices.keys()] // ['latte', 'tea']
```

## Map vs object

| | Object | `Map` |
| --- | --- | --- |
| Key types | strings (and symbols) | ✅ anything |
| Count items | `Object.keys(o).length` | ✅ `map.size` |
| Loop directly | ❌ needs `Object.entries` | ✅ `for...of` |
| Frequent add and remove | ⚠️ fine for small ones | ✅ built for it |
| Turns into JSON | ✅ `JSON.stringify` | ❌ convert first |
| Fixed shape like `{ name, age }` | ✅ | ❌ |

Converting between them:

```js
const stock = { latte: 12, tea: 5 }
const stockMap = new Map(Object.entries(stock))
const backAgain = Object.fromEntries(stockMap) // { latte: 12, tea: 5 }
```

## Set

A `Set` holds each value once. Adding a duplicate is simply ignored.

```js
const tags = new Set()

tags.add('javascript')
tags.add('css')
tags.add('javascript') // ignored

tags.size              // 2
tags.has('css')        // true
tags.delete('css')
```

## Removing duplicates from an array

The everyday use of `Set`: pass an array in, spread it back out.

```js
const signups = ['ana@mail.com', 'ben@mail.com', 'ana@mail.com']

const unique = [...new Set(signups)]
// ['ana@mail.com', 'ben@mail.com']
```

## Set vs array

`set.has(x)` stays fast however big the set gets, while `array.includes(x)` checks items one by one. If you keep asking "is this in the list?", a `Set` is the better tool.

```js
const vips = new Set(['Ana', 'Cleo'])
vips.has('Ana') // true
```

Newer runtimes also give sets `union()`, `intersection()` and `difference()`. Check MDN for support before relying on them.

## WeakMap and WeakSet

Weak versions only accept objects as keys, can't be looped over, and don't stop the garbage collector from cleaning up an object nobody else uses. They're for attaching extra data to objects you don't own, without changing them.

```js
// ❌ marks the post itself, changing data that isn't ours
post.isRead = true

// ✅ remember it on the side
const readPosts = new WeakSet()
readPosts.add(post)
readPosts.has(post) // true
```

When the post object goes away, its entry in `readPosts` goes with it. You'll rarely write these, but they explain some library code.

## Common mistakes

- Using `map[key] = value` on a `Map`. That sets a plain property; use `map.set(key, value)`.
- Expecting two lookalike objects to be the same key. `Map` and `Set` compare objects by reference, like `===`.
- `JSON.stringify(new Map(...))` gives `'{}'`. Convert with `Object.fromEntries` first.

## Try it

1. Count how many times each word appears in `['tea', 'latte', 'tea', 'mocha', 'tea']` using a `Map`.
2. Remove duplicate tags from `['js', 'css', 'js', 'html', 'css']`.
3. Given two arrays of guest names, list the names that appear in both.

## Related
- [[docs/javascript/javascript-objects|JavaScript - Objects]]
- [[docs/javascript/javascript-arrays|JavaScript - Arrays]]
- [[docs/javascript/javascript-loops|JavaScript - Loops]]
- [[docs/javascript/javascript-object-oriented|JavaScript - Classes]]
