---
title: "Node - Basics"
aliases: ["Node.js - Basics"]
type: doc
created: 2015-11-01
updated: 2026-10-07
tags: [node]
---
# Node - Basics

Node.js lets us run JavaScript outside the browser: on our laptop, on a server, in a build tool. Ryan Dahl took Chrome's V8 JavaScript engine, left the browser parts behind (no `window`, no DOM) and added what a server needs: files, networking, processes. If you already know JavaScript, Node is the shortest path to writing a web server, a script or a command-line tool.

## Installing

Download Node from nodejs.org, or use a version manager such as `nvm` so you can switch versions per project. Pick the current LTS (long-term support) release unless you have a reason not to. Node comes with `npm`, its package manager.

```sh
node -v # prints the Node version
npm -v  # prints the npm version
```

## The REPL

REPL stands for Read, Evaluate, Print, Loop. Type `node` with no file and you get a prompt where every line runs straight away. It's a great scratchpad.

```sh
$ node
> 1 + 2
3
> const name = 'Sarah'
> name.toUpperCase()
'SARAH'
> .exit
```

Press `Ctrl + C` twice, or type `.exit`, to leave.

## Browser vs Node

Same language, different surroundings. The JavaScript is identical; the global objects are not.

| | Browser | Node |
|---|---|---|
| Global object | `window` | `global` (both have `globalThis`) |
| Page and DOM | `document` | none |
| Files and processes | no | `node:fs`, `process` |
| `fetch`, `console`, timers | yes | yes |

```js
globalThis === global // true in Node
typeof window         // 'undefined' in Node
```

## Running a file

Save some code in a file and pass it to `node`.

```js
// hello.js
const name = process.argv[2] ?? 'world'
console.log(`Hello ${name}`)
```

```sh
node hello.js       # Hello world
node hello.js Ana   # Hello Ana
```

## Blocking vs non-blocking

This is the big idea behind Node. Picture a coffee shop with one barista.

A **blocking** barista takes your order, makes the coffee, hands it over, and only then takes the next order. While the milk steams, the queue waits.

```
order_1 >>>>>>>>>
                 order_2 >>>>>>>>>
                                  order_3 >>>>>>>>>
```

Another fix is hiring more baristas (**threads or workers**). It works, but every extra barista costs memory and CPU.

```
barista_1 order_1 >>>>>>>>>
barista_2 order_2 >>>>>>>>>
barista_3 order_3 >>>>>>>>>
```

A **non-blocking** barista takes your order, starts the machine, and takes the next order while it runs. When a coffee is ready, they hand it over. That's Node: one main thread that never sits idle waiting for a disk, database or network.

```
order_1 >>>>>>>>>
order_2 >>>>>>>>>
order_3 >>>>>>>>>
```

In code, the slow work goes off to the system and we get the result later.

```js
import { readFile } from 'node:fs/promises'

readFile('hello.js', 'utf8').then((text) => {
  console.log('2. file has', text.length, 'characters')
})
console.log('1. order taken, next please')

// 1. order taken, next please
// 2. file has 62 characters
```

The second `console.log` runs first, because Node didn't stand around waiting for the disk.

While Node waits for the file, it's free to handle other work. How it decides what runs next is the event loop: see [[docs/node/node-events|Node - Events]].

## Watch mode

While developing, we want Node to restart every time we save. That used to need a tool called `nodemon`. Node now has it built in.

```sh
node --watch server.js
```

## Debugging

Add `--inspect` and Node opens a debugger you can attach to from Chrome DevTools (open `chrome://inspect`) or from your editor. A `debugger;` statement in the code pauses there like a breakpoint.

```sh
node --inspect app.js
node --inspect-brk app.js # pause on the first line
```

```js
function total(prices) {
  debugger // execution stops here when a debugger is attached
  return prices.reduce((sum, p) => sum + p, 0)
}
```

For quick checks, `console.log` is fine. For "why is this value wrong three calls deep", a debugger wins.

## Common mistakes

- **Looking for `window` or `document`.** They don't exist in Node. Use `globalThis` for code that runs in both.
- **Blocking the main thread.** A long loop or a `readFileSync` in a request handler stops every other request. Prefer the async (`promises`) versions of APIs in servers.
- **Installing old global tools out of habit.** `nodemon` and `node-inspector` are no longer needed: use `--watch` and `--inspect`.

## Try it

1. Open the REPL and find out what `typeof globalThis.process` returns.
2. Write `greet.js` that prints `Hello <name>` using the first command-line argument, and run it with `node --watch`. Change the message and save.
3. Put a `debugger` statement in a function, run it with `--inspect-brk`, and step through it in DevTools.

## Related
- [[docs/node/node-modules|Node - Modules]]
- [[docs/node/node-npm|Node - npm and pnpm]]
- [[docs/node/node-events|Node - Events]]
- [[docs/node/node-process|Node - Process]]
- [[docs/javascript/javascript|JavaScript - Basics]]
- [[docs/javascript/javascript-async|JavaScript - Asynchronous Programming]]
