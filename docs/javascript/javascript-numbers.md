---
title: "JavaScript - Numbers"
type: doc
created: 2015-10-14
updated: 2026-10-07
aliases: ["JavaScript Numbers"]
tags: [javascript]
---
# JavaScript - Numbers

Numbers are for anything you count or calculate: a price, a score, a cart total. Unlike strings they don't need quotes. JavaScript has one main number type for whole numbers and decimals alike, which keeps things simple but brings a couple of gotchas you'll want to know before you handle money.

## One type for all numbers

Whole numbers and decimals are both just `number`.

```js
const cups = 3
const price = 3.5
const tiny = 9e-6         // 0.000009, scientific notation
const big = 1_000_000     // underscores are only there to help you read it

typeof cups  // 'number'
typeof price // 'number'
```

## Doing maths

```js
2 + 7    // 9
10 - 4   // 6
3 * 3.5  // 10.5
10 / 4   // 2.5
10 % 3   // 1, the remainder
2 ** 3   // 8, two to the power of three
```

The remainder operator `%` is handy for "every other" and "is it even" questions: `n % 2 === 0`.

## Updating a number

There are shortcuts for "take the current value and change it". They need a `let`.

```js
let score = 30
score += 10 // 40
score -= 5  // 35
score *= 2  // 70
score /= 7  // 10
score++     // 11
score--     // 10
```

## Decimals are not exact

Computers store decimals in binary, and some simple decimals can't be stored exactly.

```js
0.1 + 0.2          // 0.30000000000000004
0.1 + 0.2 === 0.3  // false
```

For money, ❌ don't add euros as decimals. ✅ Work in whole cents and only divide when you show the result.

```js
const latte = 350 // cents
const muffin = 275
const total = latte + muffin       // 625
const display = (total / 100).toFixed(2) // '6.25'
```

## Rounding

```js
Math.round(4.5)  // 5, nearest whole number
Math.floor(4.9)  // 4, always down
Math.ceil(4.1)   // 5, always up
Math.trunc(-4.7) // -4, just drops the decimals

const pi = 3.14159
pi.toFixed(2)    // '3.14', note: a string
```

`toFixed()` is for display. It gives back a string, so don't keep doing maths with it.

## Strings into numbers

Values from forms, URLs and `prompt()` arrive as strings. Adding them joins text instead of adding numbers.

```js
const age = '21'
age + age                 // '2121'
Number(age) + Number(age) // 42
```

`Number()` vs `parseInt()` / `parseFloat()`:

| | `Number()` | `parseInt(x, 10)` | `parseFloat()` |
| --- | --- | --- | --- |
| `'42'` | `42` | `42` | `42` |
| `'1.89'` | `1.89` | `1` | `1.89` |
| `'12px'` | `NaN` | `12` | `12` |
| `''` | `0` ⚠️ | `NaN` | `NaN` |

✅ Use `Number()` when the whole string should be a number. Use `parseInt(x, 10)` or `parseFloat()` when you want the number at the start of some text, like `'12px'`. Always pass `10` to `parseInt` so it reads base ten.

## NaN and Infinity

`NaN` means "Not a Number": the result of maths that makes no sense. It is, confusingly, of type `number`, and it isn't equal to anything, not even itself.

```js
Number('three')    // NaN
NaN === NaN        // false
Number.isNaN(NaN)  // true, the reliable check

10 / 0             // Infinity
```

## Random numbers

`Math.random()` gives a decimal from 0 up to, but not including, 1. Scale it and round down to get a whole number in a range.

```js
Math.random() // e.g. 0.5876477009151131

// roll a dice: 1 to 6
Math.floor(Math.random() * 6) + 1 // e.g. 4
```

## Formatting for people

`toLocaleString()` adds thousands separators and currency in the reader's style. The `Intl.NumberFormat` docs on MDN cover every option.

```js
const visitors = 1234567.891
visitors.toLocaleString('en-GB') // '1,234,567.891'

const total = 6.25
total.toLocaleString('en-GB', { style: 'currency', currency: 'EUR' }) // '€6.25'
```

## Very big whole numbers

Above `Number.MAX_SAFE_INTEGER` (2 ** 53 - 1) whole numbers lose precision. For bigger ones, like some database IDs, there's `BigInt`, written with an `n` on the end. You rarely need it, but it's good to know why a huge ID can come back slightly wrong.

```js
9007199254740993   // 9007199254740992, off by one
9007199254740993n  // 9007199254740993n
```

## Common mistakes

- Adding form values without converting them: `'5' + 1` is `'51'`.
- Checking `x === NaN`. It's always `false`; use `Number.isNaN(x)`.
- Comparing decimals with `===` after doing maths on them.
- Doing more maths on the string that `toFixed()` returns.

## Try it

1. Write `addTip(billInCents, percent)` that returns the total in cents, rounded to a whole cent.
2. Convert `'12.5kg'` into the number `12.5`.
3. Write `rollDice(sides)` that returns a whole number from 1 to `sides`.

## Related
- [[docs/javascript/javascript-strings|JavaScript - Strings]]
- [[docs/javascript/javascript-booleans|JavaScript - Booleans]]
- [[docs/javascript/javascript-arrays|JavaScript - Arrays]]
