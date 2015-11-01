# JavaScript

Resources:
- [7 Things you should stop doing in node](http://webapplog.com/seven-things-you-should-stop-doing-with-node-js/)

## Modules
A cleaner, more dynamic new syntax for `import` and `exports` need to be at the top of the file, they can also be destructured and renamed.

Module Origin
```js
// export function
module.exports = function() { /***/  };
// export functions or variables
module.exports.foo = 'some value';
// export functions
module.exports.bar = function() { /***/  };
// export object literal
module.exports = {
  foo: 'some value',
  bar: function() { /***/ }
};
```
Module Destiny
```js
var myModule = require('myModule');
// obj.func()
myModule.foo();
// var = obj.func()
var foo = myModule.foo;
foo()
```

Module Origin
```js
// export function
export default function() { /***/ }
// export functions or variables
export var foo = 'some value'
export function bar() { .. }
// export object literal
export default {
  foo: 'some value',
  bar() { /***/ },
}

// Module Destiny
import myModule from 'myModule'
myModule.foo()
// or destructure it
import { each, omit } from 'lodash'
each()
// We can also import as
import { foo as foolish, bar } from "myModule"
console.log(foolish) // 'some value'
```
