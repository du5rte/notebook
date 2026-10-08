---
title: "JavaScript - Strings"
type: doc
created: 2015-10-14
updated: 2026-10-07
aliases: ["JavaScript Strings"]
tags: [javascript]
---
# JavaScript - Strings

A string is text: a name, a message, a whole page of HTML. Wrapping text in quotes tells JavaScript "this is data, not code". Most of what a program shows a person is a string, so building, cutting and checking strings is something we do all day.

## Three kinds of quotes

Single quotes, double quotes and backticks all make a string.

```js
const a = 'Hello Ana'
const b = "Hello Ben"
const c = `Hello Cleo`
```

Single and double quotes behave the same. Pick one and stay consistent. Backticks are special: they make template literals, below.

## Quotes inside quotes

If the text contains the same quote you used to wrap it, JavaScript thinks the string ended early. Use the other kind of quote, or escape it with a backslash.

```js
'She's great'          // SyntaxError
"She's great"          // fine
'She\'s great'         // fine
'<h1 class="title">Menu</h1>' // fine, double quotes inside single
```

Other useful escapes: `\n` for a new line and `\\` for a real backslash.

## Template literals

Backticks let you drop values straight into text with `${ }`, and the string can span several lines.

```js
const name = 'Thomas'
const drink = 'espresso'

`Hi ${name}, one ${drink} coming up!`
// 'Hi Thomas, one espresso coming up!'

`Total: ${2 * 3.5} euros` // 'Total: 7 euros'

const receipt = `Bean There
1 x ${drink}
Thanks!`
```

## Template literals vs concatenation

Before backticks, we joined strings with `+`. It still works, but gets hard to read fast.

```js
// ❌ hard to read, easy to forget a space
const greet = 'Hi ' + name + ', one ' + drink + ' coming up!'
```

```js
// ✅ same result, reads like the sentence it builds
const greet = `Hi ${name}, one ${drink} coming up!`
```

`+=` adds to the end of an existing `let` string.

```js
let order = 'latte'
order += ', extra hot' // 'latte, extra hot'
```

## Length and single characters

`length` counts the characters. Square brackets get one character by position, starting at 0. `at()` also accepts negative numbers to count from the end.

```js
const word = 'coffee'
word.length // 6
word[0]     // 'c'
word.at(-1) // 'e'
```

## Strings never change

Every string method returns a new string. The original stays the same.

```js
const shout = 'hello'
shout.toUpperCase() // 'HELLO'
shout               // 'hello', unchanged

const loud = shout.toUpperCase() // keep the result in a new variable
```

## The methods you'll use most

```js
const email = '  Ana@Example.com  '

email.trim()                 // 'Ana@Example.com'
email.trim().toLowerCase()   // 'ana@example.com'

const file = 'holiday-photo.jpg'
file.includes('photo')       // true
file.startsWith('holiday')   // true
file.endsWith('.png')        // false
file.slice(0, 7)             // 'holiday'
file.slice(-3)               // 'jpg'
file.split('.')              // ['holiday-photo', 'jpg']
file.replaceAll('-', ' ')    // 'holiday photo.jpg'

'7'.padStart(3, '0')         // '007'
'ha'.repeat(3)               // 'hahaha'
```

The full list is on MDN. For pattern matching beyond these, see [[docs/regex|Regex - Basics]].

## Turning other values into strings

```js
const price = 3.5
const sizes = ['small', 'large']

String(42)        // '42'
`${true}`         // 'true'
price.toFixed(2)  // '3.50'
sizes.join(', ')  // 'small, large'
```

## Comparing strings

`===` checks for exactly the same text, including case. `<` and `>` compare character codes, which puts all capitals before lowercase. For sorting words people will read, use `localeCompare`.

```js
'latte' === 'Latte'           // false
'Zebra' < 'apple'             // true, surprising
'apple'.localeCompare('Zebra') // -1, apple comes first
```

## Tagged templates

A function name written right before a template literal receives the text pieces and the values separately, so it can build the string its own way. You'll meet these in libraries (styled components, SQL helpers, `String.raw`) more than you'll write them.

```js
String.raw`C:\new\folder` // 'C:\\new\\folder', backslashes kept as typed
```

## Common mistakes

- Calling a method and expecting the original string to change.
- Adding a number to a string: `'5' + 1` gives `'51'`, not `6`. Convert first, see [[docs/javascript/javascript-numbers|JavaScript - Numbers]].
- Comparing user input without `trim()` and `toLowerCase()`.
- Emoji and some accented letters can count as two characters: `'👋'.length` is `2`. `[...'👋'].length` counts what a person sees as one.

## Try it

1. Given `const first = 'ana'` and `const last = 'silva'`, build `'Ana Silva'` with a template literal.
2. Clean up `'  BEN@MAIL.COM '` into `'ben@mail.com'`.
3. Write `initials('Jane Doe')` that returns `'JD'`.

## Related
- [[docs/javascript/javascript-numbers|JavaScript - Numbers]]
- [[docs/javascript/javascript-booleans|JavaScript - Booleans]]
- [[docs/javascript/javascript-arrays|JavaScript - Arrays]]
- [[docs/regex|Regex - Basics]]
