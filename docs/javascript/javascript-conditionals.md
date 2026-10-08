---
title: "JavaScript - Conditionals"
type: doc
created: 2015-10-14
updated: 2026-10-07
tags: [javascript]
---
# JavaScript - Conditionals

Conditionals let your code make choices: show "Sold out" or the price, greet a guest or a returning customer. They all ask a question that comes out [[docs/javascript/javascript-booleans|truthy or falsy]], then run one block of code or another.

## if

The block runs only when the condition in the brackets is truthy.

```js
const cupsLeft = 0

if (cupsLeft === 0) {
  console.log('Sold out') // 'Sold out'
}
```

## else

`else` is the backup: it runs when the `if` didn't.

```js
if (cupsLeft > 0) {
  console.log('Order now')
} else {
  console.log('Sold out')
}
// 'Sold out'
```

## else if

Chain more questions. JavaScript checks them top to bottom and runs the **first** one that's truthy, then skips the rest.

```js
const temperature = 18

if (temperature > 25) {
  console.log('Iced latte')
} else if (temperature > 15) {
  console.log('Flat white')
} else {
  console.log('Hot chocolate')
}
// 'Flat white'
```

Order matters: put the most specific check first.

## Ternary: if/else in one line

`condition ? valueIfTrue : valueIfFalse`. It's an expression, so it gives back a value. Great for choosing between two values; not for running big blocks of code.

```js
const friends = 1
const label = friends === 1 ? 'friend' : 'friends'
`You have ${friends} ${label}` // 'You have 1 friend'
```

❌ Nested ternaries get hard to read fast.

```js
const text = n === 0 ? 'no friends' : n === 1 ? '1 friend' : `${n} friends`
```

✅ Use a small function with early returns instead (next section).

## Early returns (guard clauses)

Inside a function, handle the odd cases first and `return`. The main path stays flat, with no deep nesting.

```js
function friendsText(n) {
  if (n === 0) return 'You have no friends'
  if (n === 1) return 'You have 1 friend'
  return `You have ${n} friends`
}

friendsText(0) // 'You have no friends'
friendsText(3) // 'You have 3 friends'
```

## switch

`switch` compares one value against a list of cases with `===`. It reads well when you have many exact matches.

```js
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

counter(5, { type: 'INCREMENT' }) // 6
```

Here each case `return`s. Without a `return`, you need a `break`, or the code "falls through" into the next case.

```js
switch (size) {
  case 'small':
    price = 3
    break
  case 'large':
    price = 4
    break
}
```

## A lookup object instead of switch

When each case just picks a value, an object is often shorter and easier to change.

```js
const prices = { small: 3, medium: 3.5, large: 4 }

const priceFor = (size) => prices[size] ?? 0

priceFor('large') // 4
priceFor('huge')  // 0
```

## Common mistakes

- `if (x = 5)` assigns instead of comparing. Use `===`.
- Forgetting `break` in a `switch` and running the next case too.
- Putting a broad check before a specific one in an `else if` chain, so the specific one never runs.
- Nesting `if`s three levels deep when early returns would keep it flat.

## Try it

1. Write `ticketPrice(age)`: free under 4, 5 under 18, 8 for everyone else.
2. Rewrite it with early returns if you used `else if`, or the other way around. Which reads better?
3. Turn a `switch` on day names (`'sat'`, `'sun'` are weekend) into a lookup object.

## Related
- [[docs/javascript/javascript-booleans|JavaScript - Booleans]]
- [[docs/javascript/javascript-loops|JavaScript - Loops]]
- [[docs/javascript/javascript-functions|JavaScript - Functions]]
