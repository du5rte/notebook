# JavaScript - ES6 and ES7
- [ES6 and ES7 the future of Javascript](https://youtu.be/6AytbSdWBKg)
http://stackoverflow.com/questions/23099855/koa-co-bluebird-or-q-generators-promises-thunks-interplay-node-js
http://www.sitepoint.com/simplifying-asynchronous-coding-es7-async-functions/


## Includes
String.prototype.includes(text, start)

```js
let title = "ES6 The future of JavaScript";
title.includes("ES6")        // true
title.includes("ES7")        // false
title.includes("JavaScript") // true
title.includes("javascript") // false
```

## startsWith
String.prototype.startsWith(text, start)

```js
title.startsWith("ES6")    // true
title.startsWith("es6")    // false
title.startsWith("The")    // false
title.startsWith("The", 4) // true
```

## endsWith
String.prototype.endsWith(text, end)

```js
title.endsWith("Script")     // true
title.endsWith("javascript") // false
title.endsWith("6")          // false
title.endsWith("6", 3)       // true
```

## repeat
String.prototype.repeat(count)

```js
"x".repeat(3)     // xxx
"hello".repeat(2) // hellohello
```


## trim
Trims white space
String.prototype.trim()

```js
" x    ".trim()     // "x"
" \tx".trim()       // "x"
"foo bar \n".trim() // "foo bar"
```

## Template Strings

Verbatim literal string, no backslash escapes
```js
console.log(`in ES6, \n is a line feed`);
// or
console.log(`in ES6,
is a line feed`);

// in ES6,
// is a line feed
```

Interpolation into template string
```js
var name = "Bob",
    time = "today";
console.log(`hello ${name}, how are you ${time}?`)
// hello Bob, how are you today?
```

Dedent, line breaking without new line
```js
console.log(dedent `hello ${name},
                    how are you ${time}?`);
```
Javascript
```js
function printMessage (status='working', language='ES6') {
  let message = 'Status: ';
  console.log(`${message} ${language} is ${status}`);
}

printMessage(status='working');
```
CoffeeScript
```coffee
printMessage = (status="working", language="CoffeeScript") ->
  message = "Status: "
  console.log "#{message} #{language} is #{status}"

printMessage(status="working");
```

## Destructuring (Array Pattern)
```js
var [m, d, y] = [12, 4, 2014]
// equals to:
var m = 12;
var d = 4;
var y = 2014;
```

## Destructuring (Object Pattern)
```js
var today = {m:12, d:4, y:2014};
var {m: month, d: day} = today;
// equals to:
var month = today.m; // 12
var day = today.d;   // 4
```

## Block Scope
```js
// var
for (var i=0; i < 4; i++) {
  var j = i * i;
  console.log(j);
}
console.log(j); // works: 9
console.log(i); // works: 4

// let
for (let i=0; i < 4; i++) {
  let j = i * i;
  console.log(j);
}
console.log(i); // fails: is not defined
console.log(j); // fails: is not defined
```

## Arrow Function Syntax
Like CoffeeScript "Fat Arrow", outer `this` binding not `new-able` no `arguments` object

Single parameter shorthand
```js
let square = x => x * x;
square(4) // 16
```

0 or n > 1 parameters case
```js
let empty = () => undefined;
let add = (a, b) => a + b;
add(4,6) // 10
```


```js
// The classic mistake..
Car.prototype.start = function() {
  setTimeout(function() {
    this.startDriving(); // Wrong `this`!
  }, 1000);
};
// Much better than using ES5 .bind
Car.prototype.start = function() {
  setTimeout(() => this.startDriving(), 1000);
};
```

## Classes

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  breath() {
    console.log(`${this.name} is breathing`);
  }
}
// instead of:
function Animal(name) {
  this.name = name;
}
Animal.prototype.breathe = function() {
  console.log(`${this.name} is breathing`);
}
// equals to:
var Animal = (function () {
  function Animal(name) {
    _classCallCheck(this, Animal);

    this.name = name;
  }

  _createClass(Animal, [{
    key: "breath",
    value: function breath() {
      console.log("" + this.name + " is breathing");
    }
  }]);

  return Animal;
})();
```

## SubClassing

```js
class Dog extends Animal {
  constructor(name) {
    super(name);
  }
  bark() {
    console.log(`woof ${this.name} is barking`);
  }
}
```

## Simple Modules

```js
// bar.js
let baz = 'baz'; // baz.js

export baz; // could combine: export let baz = 'baz';

// app.js
import {baz} from "baz.js";
```

Default Exports
```js
// print.js
export default function print(what) {
  return `print module called with ${what}`;
}
```
```js
// app.js
import print from "print.js"
```

Mixing and matching
```js
// foo.js
import {bar} from "./baz.js";
console.log(`from module baz: ${baz}`);

let foo = 'foo';

export default foo;
export let bar = 'bar';
```
```js
// app.js
import {bar} from "foo.js";
```

## Default Parameters

```js
function f(a = 0, b = a * a, c = b * a) {
  return [a, b, c];
}
console.log(f()) // [0, 0, 0]
console.log(f(3)) // [3, 9, 27]
// equals to:
function f() {
  var a = arguments[0] === undefined ? 0 : arguments[0];
  var b = arguments[1] === undefined ? a * a : arguments[1];
  var c = arguments[2] === undefined ? b * a : arguments[2];
  return (function () {
    return [a, b, c];
  })();
}
```

## Rest Parameters

```js
function f(...r) {
  return r;
}
f(1,2,3)           // [1, 2, 3]
f(1,2,3,4,5,6,7,8) // [1, 2, 3, 4, 5, 6, 7, 8]
```

## Spread

```js
var a = [3,4,5]; //
var b = [1,2, ...a]; // [1, 2, 3, 4, 5 `plus whatever more a is becomes`]

let f = (...r) => r;
let g = (a) => f(...a);

g(a); // [3, 4, 5 plus whatever more a is becomes`]
```

## Iterators & Generators

for-of
```js
for (var v of [1,2,3]) {
  console.log(v);
}
```

No Default Iterator
```js
// ERROR IS NOT ITERABLE
for (var [k, v] of {p:1,q:2,r:3}) {
  console.log(k);
}
```

Generators
```js
function* items(o) {
  for (var k in o) {
    yield [k, o[k]];
  }
}
for (var [k,v] of items({p:3,q:4,r:5})) {
  console.log(k,v);
}
```

Generator as default Iterator
```js
Object.defineProperty(Object.prototype, Symbol.iterator, {
  value: items
});
for (var [k,v] of items({p:3,q:4,r:5})) console.log(k,v);
```

## Async

Callback Hell
```js
load("config.json", function(config) {
  db.lookup(JSON.parse(config).table, username, function(user) {
    load(user.id + ".png", function(avatar) {
      // Could fit a whole cow in there!
    });
  });
});
```

Promises Purgatory
```js
load("config.json")
  .then(function(config) {
    return db.lookup(JSON.parse(config).table;
  })
  .then(function(user) {
    return load(user.id + ".png");
  })
  .then(function(avatar) {
    // ....
  });
```

Shallow Coroutine Heaven
```js
import spawn from "http:// taskjs.org/es6-modules/task.js";
spawn(function* () {
  var config = JSON.parse( yield load("config.json") );
  var user = yield db.lookup(config.table, username);
  var avatar = yield load(user.id + ".png");
  // ...
})
```

Async Functions (ES7)
```js
// or `var asyncTask = function(ms) {`
function asyncTask(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// or `var aSyncFunction = async function() {`
async function aSyncFunction() {
  console.log(1);
  await asyncTask(1000);
  console.log(2);
  await asyncTask(1000);
  console.log(3);
};

aSyncFunction();
```
