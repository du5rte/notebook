# JavaScript - esnext

Resources:
- [Babel Documentation](https://babeljs.io/docs/learn-es2015/)
- [Javascript ES6 Cheatsheet - LearnCode.academy](https://www.youtube.com/watch?v=AfWYO8t7ed4)
- [ES6 and ES7 the future of Javascript](https://youtu.be/6AytbSdWBKg)



## Async Functions
```js
async function() {
  let friends = await $.get('http://somegsite.com/friends')
  console.log(friends)
}
```

and ES7


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
http://stackoverflow.com/questions/23099855/koa-co-bluebird-or-q-generators-promises-thunks-interplay-node-js
http://www.sitepoint.com/simplifying-asynchronous-coding-es7-async-functions/
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
