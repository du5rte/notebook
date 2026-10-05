# Javascript - AMD


## Asynchronous Module Definition
- Asynchronous: the way files are loaded
- Module: `add.js`, `subtract.js`, `multiply.js`, `divide.js`
- Definition: the way we define

## Global Variable Space
We are polluting the "global variable space" with all these variables

```js
var add  = function(x, y) {
  return x + y;
};
var subtract = function(x, y) {
  return x - y;
};
var multiply = function(x, y) {
  return x * y;
};
var divide = function(x, y) {
  return x / y;
};
subtract(10,5);
```

## Module Grouping
We are polluting the global variable space with all these variables

```js
// Now we are only using 1 object `calculator`
calculator = {
  add: function(x, y) {
    return x + y;
  },
  subtract: function(x, y) {
    return x - y;
  },
  multiply: function(x, y) {
    return x * y;
  },
  divide: function(x, y) {
    return x / y;
  }
};
```

## Module Defining
This allows us to add different key objects in different files

```js
var calculator = {};
// <script src="add.js"></script>
calculator.add = function(x, y) {
  return x + y;
};
// <script src="subtract.js"></script>
calculator.subtract = function(x, y) {
  return x - y;
};
// <script src="multiply.js"></script>
calculator.multiply = function(x, y) {
  return x * y;
};
// <script src="divide.js"></script>
calculator.divide = function(x, y) {
  return x / y;
};
calculator.add(5,5);
calculator.divide(9,3);
```

## Module Dependencies
Dependencies have to be called in order of `Parent` > `Child`

```html
<script src="add.js"></script>
<!-- if `add` is called before `calculator` we'll get an error -->
<script src="calculator.js"></script>
<script src="subtract.js"></script>
<script src="multiply.js"></script>
<script src="divide.js"></script>
```

## Module Extending
We can assign calculator to existing calculator `or` create the object calculator. If the object already **exist** it will be assigned to it, otherwise it will create a **new** object.

```js
var calculator = calculator || {};
```

```js
// now we can use <script src="multiply.js"></script> in any order
calculator.multiply = function(x, y) {
  return x * y;
};
calculator.multiply(9,3);
```

### Extending
Lest say we wanted another module `square`

```js
calculator.multiply = function(x) {
  // we already have a multiplier we could use
  //return x * x;
  calculator.multiply(x,x);
```
But now we depend on `multiply`
```html
<script src="multiply.js"></script>
<script src="square.js"></script> <!-- depends on multiply! -->
```

## RequireJS

```xml
<!-- we're loading `require.js` then `app.js` which should be in the same folder -->
<script data-main="app" src="require.js"></script>
```

```js
// is taking the name of the file as the module name
// <script src="add.js"></script>
define(function() {
  // The meat of the function
  return function(x,y) {
    return x + y;
  };
  //
});
```

```js
// <script src="app.js"></script>
require(['calculator/add'], function(nameItWhatEver) {
  console.log(nameItWhatEver(3,4));
});
```
