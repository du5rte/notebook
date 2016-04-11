# JavaScript - Common Patterns

Resources:
- [Higher Order functions - Sitepoint](http://www.sitepoint.com/higher-order-functions-javascript/)
- [Decorators in JavaScript](https://www.youtube.com/watch?v=d8CDFsQHZpE)

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
