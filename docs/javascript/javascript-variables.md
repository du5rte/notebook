---
title: "JavaScript - Variables"
type: doc
created: 2015-10-14
updated: 2026-10-07
tags: [javascript]
---
# JavaScript - Variables

A variable is a name for a value, like a label on a jar. You put something in, give it a name, and use the name later instead of the value. JavaScript has two keywords for this today: `const` for values that stay put, and `let` for values that change.

## Creating a variable

Write the keyword, a name, `=`, and the value.

```js
const name = 'Ana'
let score = 0

console.log(name)  // 'Ana'
console.log(score) // 0
```

Once a value has a name, you can pass it around.

```js
const message = 'Your coffee is ready'
console.log(message) // 'Your coffee is ready'
```

## const vs let

Use `const` by default. Switch to `let` only when you need to give the name a new value later.

```js
let cupsSold = 0
cupsSold = cupsSold + 1 // fine, let can be reassigned
cupsSold               // 1

const shop = 'Bean There'
shop = 'Other Shop' // TypeError: Assignment to constant variable.
```

`const` makes reading code easier: when you see it, you know that name always points at the same value.

## const is not frozen

`const` stops you reassigning the name. It does not stop you changing what is inside an object or array.

```js
const order = { drink: 'latte', size: 'small' }
order.size = 'large' // fine, we changed a property
order               // { drink: 'latte', size: 'large' }

const queue = ['Ana', 'Ben']
queue.push('Cleo')  // fine
queue               // ['Ana', 'Ben', 'Cleo']

queue = []          // TypeError: the name itself can't point somewhere new
```

If you really need an object that cannot change, `Object.freeze(order)` does that (one level deep).

## Declaring without a value

A `let` with no value starts as `undefined`. A `const` must get its value straight away.

```js
let winner
winner // undefined

const total // SyntaxError: Missing initializer in const declaration
```

## Naming rules and habits

- Names can use letters, digits, `$` and `_`.
- They can't start with a digit: `2cups` is an error, `cups2` is fine.
- They can't be reserved words like `if`, `function` or `class`.
- They are case-sensitive: `score` and `Score` are different variables.

By habit, JavaScript uses camelCase (`totalPrice`, `isOpen`). Pick names that say what the value is: `price` beats `p`, and `isLoggedIn` reads well in an `if`.

## Block scope

`let` and `const` only exist inside the `{ }` block where they are created. Outside, the name is gone.

```js
if (true) {
  const greeting = 'Hi'
  console.log(greeting) // 'Hi'
}
console.log(greeting) // ReferenceError: greeting is not defined
```

This keeps names from leaking into the rest of your program. [[docs/javascript/javascript-scope|JavaScript - Scope]] goes deeper.

## Use before declaring

You can't use a `let` or `const` name on a line above where it is declared. The gap is called the temporal dead zone.

```js
console.log(drink) // ReferenceError: Cannot access 'drink' before initialization
const drink = 'mocha'
```

## Why not var

Older code (and older versions of these notes) uses `var`. It still works, but it has surprises `let` and `const` were made to fix:

- `var` ignores blocks. A `var` inside an `if` or a loop is visible outside it.
- `var` can be used before its line and gives `undefined` instead of an error.
- In a loop, every callback shares one `var`.

```js
// ❌ one shared i, already 3 by the time the timers run
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i))
}
// 3 3 3

// ✅ a fresh i for each round
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i))
}
// 0 1 2
```

With `let`, each loop round gets its own `i`. Read `var` when you meet it, but don't write it.

## Common mistakes

- Using `let` everywhere "just in case". Start with `const`; your editor will tell you if you reassign it.
- Thinking `const` makes an object read-only. It only locks the name.
- Assigning to a name you never declared (`total = 5`). In strict mode and modules this throws; in old scripts it silently makes a global.

## Try it

1. Create a `const` for your favourite drink and a `let` for how many you've had today. Add one to the count.
2. Make a `const` array of three friends, then add a fourth. Why is that allowed?
3. Run the two loops from "Why not var" in the console and explain the difference in one sentence.

## Related
- [[docs/javascript/javascript|JavaScript - Basics]]
- [[docs/javascript/javascript-scope|JavaScript - Scope]]
- [[docs/javascript/javascript-strings|JavaScript - Strings]]
- [[docs/javascript/javascript-numbers|JavaScript - Numbers]]
