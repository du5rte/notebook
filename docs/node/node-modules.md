---
title: "Node - Modules"
type: doc
created: 2016-03-18
updated: 2016-04-11
tags: [node]
---
# Node - Modules

Resources:
- [ES6 Modules](https://github.com/lukehoban/es6features#modules)

## Require
Used to import `modules` into our project, require can search for modules according to it's directory with `./` or withing `node_modules` and in `node` it-self

- `'./my-module'` looks up in the same directory
- `'../my-module'` looks up in the parent directory
- `'/Users/user/project/my-module'` looks up in an absolute directory
- `'http'` looks for module in `node_modules` or in `node` it-self

```js
var http = require('http')
```

Or used to break out our code into different files

`file_1.js`
```js
console.log('file one')
```
`file_2.js`
```js
require('./file_1')
console.log('two')
```

## Module Exports
Allows us to `export` all or parts of the code in the file

```js
// export default
module.exports = function() { return 'default'; }

// export functions or variables
module.exports.foo = 'foo';
module.exports.bar = function() { return 'bar' };

// export object literal
module.exports = {
  foo: 'foo',
  bar: function() { return 'bar' }
};
```

## Module Require
Allows us to `import` code from an `export`

```js
var myModule = require('./my-module');
myModule.foo();
console.log(myModule.bar);

// or by reassigning the module to variables
var foo = myModule.foo;
console.log(foo);

var bar = myModule.bar;
bar();
```

## Export
A cleaner, more dynamic new syntax for `import` and `exports` need to be at the top of the file, they can also be destructured and renamed.

```js
// export default
export default function() { return 'default' }

// export functions or variables
export var foo = 'foo'
export function bar() { return 'bar' }

// export object literal
export default {
  foo: 'foo',
  bar() { return 'bar' }
}

// deconstructed export
var foo = 'foo'
function bar() { return 'bar' }

export {foo, bar}
```

## Import

```js
import myModule from './my-module'
myModule.foo()

// it can be destructured
import { each, omit } from 'lodash'
each()
omit()

// it also be renamed
import { foo as foolish, bar } from "./my-module"
console.log(foolish) // 'foo'
bar() // 'bar'
```

## Creating Modules

There's different methods to import our on modules by using `mode.export` and `require`

### Method 1
We can only set one object equals to module.exports


In `custom_hello.js`
```js
var hello = function() {
console.log("hello");
}
module.exports = hello;
```
In `app.js`
```js
var hello = require('./custom_hello');
hello();
```

### Method 2
We can set multiple methods

In `custom_goodbye.js`
```js
exports.goodbye = function() {
  console.log("goodbye");
};
```
In `app.js`
```js
var gb = require('./custom_goodbye');
gb.goodbye();

// if we only need to call it one, We can require and call it in one line
require('./custom_goodbye').goodbye();
```

### Method 3


In `my_module.js`
```js
var foo = function () {
  /* some code */
}
var bar = function () {
  /* some other code */
}
var baz = function () { // Private function!
  /* yet other some code */
}
module.foo = foo;
module.bar = bar;
```
In `app.js`
```js
var myMod = require('./my_module');

myMod.foo();

myMod.bar();
```

## Related
- [[docs/node/node-npm|npm]]
- [[docs/node/node|Node.js - Basics]]
- [[docs/javascript/javascript|JavaScript - Basics]]
