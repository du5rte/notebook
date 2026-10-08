---
title: "Node - Modules"
type: doc
created: 2016-03-18
updated: 2026-10-07
tags: [node]
---
# Node - Modules

A module is just a file that shares some of its code with other files. Instead of one giant script, we split our program into small files, each with one job, and pull in only what we need. Modern Node uses ES modules (`import` and `export`), the same syntax the browser uses. You'll still meet the older CommonJS style (`require`) in existing code, so we'll compare them at the end.

## Turning on ES modules

Node needs to know a file is an ES module. The simplest way is one line in `package.json`:

```json
{
  "type": "module"
}
```

Now every `.js` file in the project is an ES module. Without it, use the `.mjs` extension instead.

## Named exports

Put `export` in front of anything you want to share. Everything else stays private to the file.

```js
// coffee.js
export const sizes = ['small', 'medium', 'large']

export function price(size) {
  return { small: 2, medium: 2.5, large: 3 }[size]
}

function secretRecipe() {} // not exported, private
```

Or list them at the bottom:

```js
export { sizes, price }
```

## Importing

Import the names you need inside curly braces. For your own files, the path starts with `./` or `../` and includes the `.js` extension.

```js
// app.js
import { price, sizes } from './coffee.js'

price('large') // 3
sizes.length   // 3
```

Rename on the way in with `as`, or grab everything as one object:

```js
import { price as coffeePrice } from './coffee.js'
import * as coffee from './coffee.js'

coffee.price('small') // 2
```

## Default exports

A file can have one default export: "the main thing this file gives you". The importer picks the name.

```js
// greet.js
export default function greet(name) {
  return `Hi ${name}`
}
```

```js
// app.js
import greet from './greet.js'
import sayHello from './greet.js' // any name works

greet('Ana') // 'Hi Ana'
```

Named exports are usually the better default: the names stay consistent across files and editors can auto-import them.

## Where Node looks

The string after `from` tells Node where to find the module.

| Specifier | Looks in |
|---|---|
| `'./coffee.js'`, `'../lib/db.js'` | a file relative to this one |
| `'node:fs'`, `'node:http'` | Node's built-in modules |
| `'express'` | `node_modules`, installed with [[docs/node/node-npm\|npm]] |

```js
import { readFile } from 'node:fs/promises'
import express from 'express'
import { price } from './coffee.js'
```

The `node:` prefix is optional for built-ins, but it makes it obvious the module ships with Node.

## Things ES modules give us

**Top-level `await`.** We can await at the top of a module without wrapping it in a function.

```js
import { readFile } from 'node:fs/promises'

const config = JSON.parse(await readFile('./config.json', 'utf8'))
```

**`import.meta`.** Information about the current file. This replaces CommonJS's `__dirname` and `__filename`.

```js
import.meta.dirname  // '/home/ana/shop'
import.meta.filename // '/home/ana/shop/app.js'
```

**Dynamic `import()`.** Load a module only when you need it. It returns a promise.

```js
if (process.argv.includes('--report')) {
  const { makeReport } = await import('./report.js')
  makeReport()
}
```

## CommonJS vs ES modules

CommonJS is Node's original module system. It's still everywhere in older packages and tutorials, so it's worth reading fluently.

```js
// coffee.cjs
function price(size) { /* ... */ }
module.exports = { price }

// app.cjs
const { price } = require('./coffee.cjs')
```

| | ES modules | CommonJS |
|---|---|---|
| Share | `export` | `module.exports = ...` |
| Use | `import { x } from './x.js'` | `const { x } = require('./x')` |
| File extension in path | required | optional |
| Loading | static, resolved before code runs | `require` runs when reached |
| Top-level `await` | yes | no |
| Current folder | `import.meta.dirname` | `__dirname` |
| Turned on by | `"type": "module"` or `.mjs` | the default, or `.cjs` |

Write new code as ES modules. An ES module can import a CommonJS package. Going the other way is more limited, so if you maintain a library, check the Node docs on interoperability.

## Common mistakes

- **Leaving off the extension.** `import './coffee'` fails in an ES module. Write `'./coffee.js'`.
- **Forgetting `"type": "module"`.** You'll get "Cannot use import statement outside a module". Add it to `package.json` or rename the file to `.mjs`.
- **Using `__dirname` in an ES module.** It isn't defined. Use `import.meta.dirname`.
- **Mixing `exports.x = ...` and `module.exports = {...}`** in CommonJS. Reassigning `module.exports` throws away anything added to `exports` before.

## Try it

1. Create `math.js` with named exports `add` and `multiply`, and import both into `app.js`.
2. Give `greet.js` a default export and import it under a different name.
3. Read a `config.json` with top-level `await` and print one value from it.

## Related
- [[docs/node/node|Node - Basics]]
- [[docs/node/node-npm|Node - npm and pnpm]]
- [[docs/javascript/javascript|JavaScript - Basics]]
- [[docs/javascript/javascript-functions|JavaScript - Functions]]
