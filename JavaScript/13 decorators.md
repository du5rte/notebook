# JavaScript - Common Patterns

Resources:
- [Higher Order functions - Sitepoint](http://www.sitepoint.com/higher-order-functions-javascript/)
- [Decorators in JavaScript](https://www.youtube.com/watch?v=d8CDFsQHZpE)

## Callback Function
JavaScript works on a single tread some tasks can take longer so it's important to keep our code `asynchronous`, `functions` can be passed as `arguments`, why a lot of Javascript syntax is the way it is.

```js
// Here we are only passing the callback, not calling it yet!
function testMic(sequence, callback) {
    console.log('Testing ' + sequence)
    callback()
}

testMic('1 2 3', function() {
    console.log('done');
})
// 'Testing 1 2 3'
// 'done'
```

Commonly seen in jQuery, when we say this, we are actually passing a `callback` that `.click()` will fire after the `click-event` is done

```js
$('button').click(function() {
  console.log('clicked!')
})

// or

function handleClick() {
  console.log('clicked!')
}

// no execution `()` here, click will call it when it's done
$('button').click(handleClick)
```

Commonly it's added in an `conditional` otherwise it would throw a missing parameter error if we called it without a `callback`.
```js
function add(first, second, callback) {
    console.log(first + second)
    // only runs the function if a callback exists
    if (callback) {
      callback()
    }
}
```

## Self Executing Anonymous function
Evaluates immediately and does not necessarily require naming or assignment

```js
(function(val) {
  console.log(val)
})('foo')

// or

!function(val) {
  console.log(val)
}('foo')
```

## Module Import Pattern
Self executing functions are commonly used to extend libraries by importing it into the module, there's also a slight performance benefit as now it's referencing the `local scope`  instead for crawling through the `global scope` searching for it

```js
(function(underscore) {
  underscore.awesomeMethod = function() {
    return 'Yaay!'
  }
  console.log(underscore.VERSION)
})(_)

_.awesomeMethod() // "Yay"
```

## Module Export Pattern
Also know as `Loose Augmentation` keeps the code from cluttering the name space but can also work be split through different files.

```js
var awesomeNewModule = (function(exports){
  var exports = {
    foo: 5,
    bar: 10
  }
  exports.helloMars = function() {
    console.log("Hello Mars!")
  }
  exports.goodbye = function() {
    console.log("Goodbye!")
  }
  return exports
// If awesomeNewModule extend it, otherwise create it
}( awesomeNewModule || {} ))

awesomeNewModule.foo
awesomeNewModule.helloMars // Hello Mars!
```

## Higher Order functions
A function that takes other functions and returns a function **huh??**.

```js
function wrapperFunction() {
  return function(val) {
    return "hello " + val
  }
}

// myFunction gets assigned the function within wrapperFunction
var greet = wrapperFunction()

// var myFunction = function(val) {
//   return "hello " + val
// }

greet('world') // "hello world"
```

Can also be used pipe results from one function to the other in a sequence.
```js
function compose(a,b) {
  return function(c) {
    return a(b(c)) + '!!!'
  }
}

function st(val) {
  return 'this, ' + val
}
function nd(val) {
  return 'is, ' + val
}

compose(st, nd)('sparta') // this, is, sparta!!!
```


Or chain functions on after the other by wrapping a `Class Function` prototype methods

```js
function fluent(fn) {
  return function(...args) {
    fn.apply(this, args);
    return this
  }
}
```

```js
Person.prototype.setName = fluent(function(first, last) {
  this.first = first
  this.last = last
})

Person.prototype.sayName = fluent(function() {
  console.log(this.first, this.last)
})

var p = new Person()

p.setName('Jane', 'Lee').sayName().setName('John', 'Smith').sayName()
```


## Decorators Functions
With esnext `classes` we can't just wrap methods in function, that's where decorators come in

```js
function fluent(target, name, descriptor) {
  // console.log(target) // Person Object
  // console.log(name) // setName
  // console.log(descriptor) // setName Object
  // console.log(descriptor.value) // setName function(first,last) { ... }

  var fn = descriptor.value

  descriptor.value = function(...args) {
    fn.apply(target, args)
    return target
  }
}
```

```js
class Person {
  @fluent setName(first, last) {
    this.first = first
    this.last = last
  }

  @fluent sayName() {
    console.log(this.first, this.last)
  }
}

var p = new Person()

p.setName('Jane', 'Lee').sayName().setName('John', 'Smith').sayName()
```
