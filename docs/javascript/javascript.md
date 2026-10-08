---
title: "JavaScript - Basics"
type: doc
created: 2015-10-14
updated: 2026-10-07
tags: [javascript]
---
# JavaScript - Basics

JavaScript is the language of the web. HTML says what is on the page, CSS says how it looks, and JavaScript says what it does: open a menu, check a form, fetch new messages. The same language also runs outside the browser with Node.js, so one language can power the page and the server behind it. This is the first lesson: where to type code, how a program is read, and the one big idea that shapes everything else.

## Your first line of code: the browser console

Every browser ships with developer tools, and the console is a place to type JavaScript and see the answer right away. In Chrome open it with `Cmd + Option + J` on a Mac or `Ctrl + Shift + J` on Windows and Linux.

```js
console.log('Hello, world') // Hello, world
2 + 3                      // 5
'coffee'.toUpperCase()     // 'COFFEE'
```

`console.log()` prints a value. In the console you can also just type an expression and it shows the result. Use it as a scratchpad while you learn.

## Running JavaScript with Node.js

Node.js runs JavaScript in your terminal, no browser needed. Type `node` on its own for an interactive prompt like the console, or save code in a file and run the file.

```js
// hello.js
const name = 'Ana'
console.log(`Hi ${name}`)
```

```bash
node hello.js
# Hi Ana
```

## Adding JavaScript to a web page

On a real page, JavaScript lives in a `.js` file that the HTML loads with a `<script>` tag.

```html
<head>
  <script src="app.js" defer></script>
</head>
```

`defer` tells the browser to download the file while it reads the HTML, and run it once the page is ready. Without it, a script in the `<head>` runs before the elements it wants to use exist. `<script type="module">` is deferred automatically and lets you use `import` and `export`.

## Statements, semicolons and comments

A program is a list of statements, read from top to bottom, one at a time.

```js
const coffee = 'flat white'
const price = 3.5
console.log(`${coffee}: ${price}`) // flat white: 3.5
```

Semicolons at the end of a statement are optional: JavaScript inserts them for you. Pick a style and let a formatter keep it consistent. One catch without them: a line that starts with `(`, `[` or a backtick gets glued onto the line before, so start such lines with a `;` or use semicolons throughout. JavaScript also ignores extra spaces and new lines, so layout is for humans.

Comments are notes for people. JavaScript skips them.

```js
// A single-line comment

/*
  A comment that
  spans several lines
*/
```

## Values and types

Everything you work with is a value, and every value has a type. Each type gets its own lesson.

```js
typeof 'Ana'          // 'string'
typeof 42             // 'number'
typeof true           // 'boolean'
typeof undefined      // 'undefined'
typeof { name: 'Ana' } // 'object'
typeof ['a', 'b']     // 'object' (arrays are objects too)
```

## The big idea: JavaScript waits for events

JavaScript in the browser is event-driven. It runs your code once, then sits and waits. When something happens (a click, a key press, a reply from a server) it runs the function you asked it to run for that event.

```js
const button = document.querySelector('button')

button.addEventListener('click', () => {
  console.log('Order placed')
})

console.log('Waiting for a click...')
// Waiting for a click...
// (later, on each click) Order placed
```

Notice the order: the last line prints first, because the click function only runs when the click happens. Timers work the same way.

```js
setTimeout(() => console.log('Coffee is ready'), 2000)
console.log('Brewing...')
// Brewing...
// (two seconds later) Coffee is ready
```

This "do this later, when X happens" pattern is everywhere in JavaScript. [[docs/javascript/javascript-async|JavaScript - Asynchronous Programming]] builds on it.

## Built-in objects vs host objects

Some tools come with the language and work everywhere. Others come from where the code runs, called the host environment.

| Comes from | Examples | Available in |
| --- | --- | --- |
| The language | `Math`, `JSON`, `Date`, `Array`, `Map` | Everywhere |
| The browser | `document`, `window`, `localStorage`, `fetch` | Browser |
| Node.js | `fs`, `http`, `process` | Node |

So `Math.round(2.6)` works in both, but `document` does not exist in Node, and `fs` does not exist in the browser. `globalThis` points at the global object in either one. The full list of built-ins is on MDN.

## Strict mode

Strict mode makes JavaScript throw errors for sloppy code it would otherwise let slide, like assigning to a variable you never declared. Modules (`type="module"` or `import`/`export`) and classes are strict automatically. In an old-style script, turn it on with a line at the top.

```js
'use strict'

total = 10 // ReferenceError: total is not defined
```

Without strict mode that line would silently create a global variable called `total`.

## Common mistakes

- Loading a script in the `<head>` without `defer`, then wondering why `document.querySelector()` returns `null`.
- Using `document` in Node, or `require('fs')` in the browser. Check which host you are in.
- Expecting code inside an event listener or `setTimeout` to run straight away.

## Try it

1. Open the console and use `console.log()` to print your name, then your name in capitals.
2. Save a file `hello.js` that logs today's coffee order and run it with `node`.
3. Make a page with a button that logs `'Clicked!'` every time you press it. Add a log after the listener and check which prints first.

## Related
- [[docs/javascript/javascript-variables|JavaScript - Variables]]
- [[docs/javascript/javascript-async|JavaScript - Asynchronous Programming]]
- [[docs/browser/browser|Browser - DOM]]
- [[docs/browser/browser-storage|Browser - Storage]]
- [[docs/node/node|Node - Basics]]
- [[docs/node/node-npm|Node - npm and pnpm]]
- [[docs/node/node-modules|Node - Modules]]
