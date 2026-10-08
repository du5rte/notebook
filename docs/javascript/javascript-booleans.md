---
title: "JavaScript - Booleans"
type: doc
created: 2015-10-14
updated: 2026-10-07
tags: [javascript]
---
# JavaScript - Booleans

A boolean is a yes or no: `true` or `false`. Is the shop open? Is the cart empty? Did the login work? Every `if` in your code comes down to one of these. This lesson covers how JavaScript gets to `true` or `false`, the "truthy" values that act like them, and the two kinds of "nothing", `null` and `undefined`.

## true and false

```js
const isOpen = true
const isSoldOut = false

typeof isOpen // 'boolean'
```

Name booleans like a question: `isOpen`, `hasPaid`, `canEdit`. Then `if (isOpen)` reads like English.

## Comparisons give booleans

```js
5 > 3        // true
5 >= 5       // true
2 < 1        // false
'tea' === 'tea' // true
'tea' !== 'coffee' // true
```

## === vs ==

`===` checks that the value **and** the type are the same. `==` converts types first, then compares, with rules that surprise everyone.

```js
3 === '3'  // false
3 == '3'   // true
'' == 0    // true 🤔
null == undefined // true
```

✅ Always use `===` and `!==`. If you want to compare a string to a number, convert it yourself first.

## Objects compare by reference

Two arrays or objects are only `===` when they are the **same** one, not when they look the same.

```js
const order = { drink: 'latte' }
const lookalike = { drink: 'latte' }
const sameOrder = order

order === lookalike // false, two different objects
order === sameOrder // true, one object with two names
```

## And, or, not

```js
const age = 34
age > 30 && age < 40   // true, both must be true
age < 18 || age > 65   // false, at least one must be true
!true                  // false
```

## Truthy and falsy

`if` and `&&`/`||` don't need a real boolean. JavaScript treats every value as "truthy" or "falsy". There are only a handful of falsy values; learn them and everything else is truthy.

| Falsy | Truthy (surprising ones) |
| --- | --- |
| `false` | `'false'` |
| `0`, `-0`, `0n` | `'0'` |
| `''` (empty string) | `' '` (a space) |
| `null` | `[]` (empty array) |
| `undefined` | `{}` (empty object) |
| `NaN` | |

```js
if ('') console.log('never runs')
if ([]) console.log('runs, even though it is empty')

Boolean('')   // false
!!'hello'     // true, double "not" turns any value into a boolean
```

To check an empty array, ❌ `if (cart)` is always true. ✅ `if (cart.length > 0)`.

## && and || return values

`&&` and `||` stop as soon as they know the answer, and give back the value they stopped on, not just `true` or `false`.

```js
'Ana' || 'Guest'   // 'Ana'
'' || 'Guest'      // 'Guest'
user && user.name  // user.name, or user if it's falsy
```

## null vs undefined

Both mean "nothing here", but with a different story behind them.

- `undefined`: no value has been given yet. A variable with nothing in it, a missing property, a function with no `return`.
- `null`: someone deliberately set it to "empty".

```js
let winner
winner // undefined

const order = { drink: 'latte' }
order.size // undefined, the property doesn't exist

const selectedTable = null // we chose "no table yet"

typeof undefined // 'undefined'
typeof null      // 'object', an old bug kept for compatibility
```

## ?? for defaults

`??` (nullish coalescing) gives a fallback only when the left side is `null` or `undefined`. `||` falls back on **any** falsy value, which bites when `0` or `''` are real answers.

```js
const sugars = 0

sugars || 2  // 2 ❌ we lose the real answer, 0
sugars ?? 2  // 0 ✅

const nickname = null
nickname ?? 'Guest' // 'Guest'
```

## ?. for things that might not be there

Optional chaining `?.` stops and gives `undefined` if the thing before it is `null` or `undefined`, instead of throwing an error.

```js
const user = { name: 'Ana', address: null }

user.address.city    // TypeError: Cannot read properties of null
user.address?.city   // undefined
user.address?.city ?? 'Unknown' // 'Unknown'

user.greet?.()       // undefined, only calls greet if it exists
```

Use it where something is genuinely optional. Sprinkling it everywhere hides real bugs.

## Common mistakes

- Using `==` and getting caught by `'' == 0`.
- Treating an empty array or object as falsy.
- Using `||` for defaults when `0`, `''` or `false` are valid values. Use `??`.
- Writing `if (x = 5)`: a single `=` assigns, it doesn't compare.

## Try it

1. Predict, then check in the console: `!!'0'`, `!![]`, `!!NaN`, `null ?? 'x'`, `0 || 'x'`.
2. Write `displayName(user)` that returns `user.nickname`, or `user.name` if there's no nickname, or `'Guest'` if there's no user at all.
3. Explain in one sentence why `[1] === [1]` is `false`.

## Related
- [[docs/javascript/javascript-conditionals|JavaScript - Conditionals]]
- [[docs/javascript/javascript-strings|JavaScript - Strings]]
- [[docs/javascript/javascript-numbers|JavaScript - Numbers]]
- [[docs/javascript/javascript-objects|JavaScript - Objects]]
