---
title: "JavaScript - Arrays"
type: doc
created: 2015-10-14
updated: 2026-10-07
aliases: ["JavaScript Arrays"]
tags: [javascript]
---
# JavaScript - Arrays

An array is an ordered list: a shopping list, an inbox, the queue at the counter. It keeps many values under one name, in order, and lets you add, remove, search and sort them. Arrays are the shape most data arrives in, so this is one of the lessons you'll use every day.

## Creating an array

Square brackets, values separated by commas. Any type of value can go in, but a list usually holds one kind of thing.

```js
const shopping = ['rice', 'bread', 'bananas', 'chicken']
const scores = [80, 95, 72]
const empty = []
```

## Reading items by position

Positions (indexes) start at **0**. `at()` also takes negative numbers, counting from the end.

```js
shopping[0]      // 'rice'
shopping[3]      // 'chicken'
shopping[10]     // undefined, nothing there
shopping.at(-1)  // 'chicken', the last item
shopping.length  // 4
```

## Adding and removing

These four change the array in place.

```js
const queue = ['Ana', 'Ben']

queue.push('Cleo')     // adds to the end    → ['Ana', 'Ben', 'Cleo']
queue.unshift('Dan')   // adds to the start  → ['Dan', 'Ana', 'Ben', 'Cleo']
queue.pop()            // removes the last,  returns 'Cleo'
queue.shift()          // removes the first, returns 'Dan'
queue                  // ['Ana', 'Ben']
```

## Mutating vs copying

Some methods change the original array; others leave it alone and return a new one. This matters as soon as an array is shared, like state in React.

| ❌ Changes the original | ✅ Returns a new array |
| --- | --- |
| `push(x)` | `[...arr, x]` |
| `sort()` | `toSorted()` |
| `reverse()` | `toReversed()` |
| `splice(i, 1)` | `toSpliced(i, 1)` or `filter` |
| `arr[i] = x` | `with(i, x)` |

```js
const prices = [4, 1, 3]

const sorted = prices.toSorted((a, b) => a - b)
sorted // [1, 3, 4]
prices // [4, 1, 3], untouched
```

Prefer the copying versions by default. Reach for the mutating ones when you own the array and nobody else is looking.

## Sorting numbers

`sort()` and `toSorted()` compare items **as strings** unless you give them a compare function.

```js
const tips = [10, 1, 2]

tips.toSorted()                // [1, 10, 2] 🤔
tips.toSorted((a, b) => a - b) // [1, 2, 10] ✅ smallest first
tips.toSorted((a, b) => b - a) // [10, 2, 1] biggest first

const names = ['Lynn', 'ana', 'Ben']
names.toSorted((a, b) => a.localeCompare(b)) // ['ana', 'Ben', 'Lynn']
```

## Searching

Pick the method by the question you're asking.

```js
const shopping = ['rice', 'bread', 'bananas', 'chicken']

shopping.includes('bread')   // true, is it there?
shopping.indexOf('bananas')  // 2, where is it? (-1 if missing)

const scores = [80, 95, 72]
scores.find((s) => s > 90)       // 95, the first match
scores.findIndex((s) => s > 90)  // 1
scores.some((s) => s < 75)       // true, does any match?
scores.every((s) => s >= 70)     // true, do all match?
```

## Transforming

`map`, `filter` and `reduce` turn one array into something new. They're the modern default for looping and get their own section in [[docs/javascript/javascript-loops|JavaScript - Loops]].

```js
scores.map((s) => s + 5)            // [85, 100, 77]
scores.filter((s) => s >= 80)       // [80, 95]
scores.reduce((sum, s) => sum + s, 0) // 247
```

## Slicing and joining

```js
const shopping = ['rice', 'bread', 'bananas', 'chicken']

shopping.slice(1, 3)     // ['bread', 'bananas'], from index 1 up to (not including) 3
shopping.join(', ')      // 'rice, bread, bananas, chicken'
'a,b,c'.split(',')       // ['a', 'b', 'c']
```

## Spread: copying and combining

`...` spreads an array's items into a new one.

```js
const fruit = ['apple', 'pear']
const veg = ['carrot']

const copy = [...fruit]                  // ['apple', 'pear']
const all = [...fruit, ...veg, 'eggs']   // ['apple', 'pear', 'carrot', 'eggs']
```

## Destructuring

Pull items out into their own variables by position. `...rest` collects what's left.

```js
const podium = ['Ana', 'Ben', 'Cleo', 'Dan']

const [gold, silver] = podium
gold    // 'Ana'
silver  // 'Ben'

const [winner, ...others] = podium
others  // ['Ben', 'Cleo', 'Dan']

const [, , bronze] = podium // skip with empty commas
bronze  // 'Cleo'
```

## Arrays inside arrays

An array can hold arrays, like rows in a spreadsheet. Read with two indexes: row, then column.

```js
const grades = [
  [80, 90, 100],
  [75, 95, 85],
]

grades[1][0]  // 75
grades.flat() // [80, 90, 100, 75, 95, 85]
```

## Common mistakes

- Off by one: the last item is `arr[arr.length - 1]` (or `arr.at(-1)`), not `arr[arr.length]`.
- Sorting numbers without a compare function.
- Calling `sort()` on an array you didn't mean to change. Use `toSorted()`.
- `typeof []` is `'object'`. To check for an array, use `Array.isArray(x)`.
- Copying with `const b = a`. That's the same array with two names; use `[...a]`.

## Try it

1. Make a guest list, add two names to the end and remove the first one.
2. Sort `[{ name: 'Ana', age: 30 }, { name: 'Ben', age: 25 }]` by age without changing the original.
3. Use destructuring to get the first and last items of `['mon', 'tue', 'wed', 'thu', 'fri']`.

## Related
- [[docs/javascript/javascript-loops|JavaScript - Loops]]
- [[docs/javascript/javascript-objects|JavaScript - Objects]]
- [[docs/javascript/javascript-maps|JavaScript - Map and Set]]
- [[docs/javascript/javascript-strings|JavaScript - Strings]]
- [[docs/javascript/javascript-numbers|JavaScript - Numbers]]
