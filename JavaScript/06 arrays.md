# JavaScript Arrays

## Arrays
Stores multiple values inside on container

```js
var allKinds = [1, -100, true, 'JavaScript', {a: 1, b: 2}, function(c) { return c;}];
```

## Arrays Keys
Each value inside an array is a `key`, ranging from `0 ~ *`

```js
var myShopping = ['rice', 'bread', 'bananas', 'chicken'];

myShopping[0]; // 'rice'
myShopping[3]; // 'chicken'
```

## Array Methods
Arrays have method that can be used

##### `.length`
The number of keys in a array
```js
myShopping.length // 4

// One way to add a value to the end of the array
myShopping[ numbers.length ] = 'chips'; // myShopping[4] = 'chips';
```

##### `.push(  )`
Pushes item(s) to the end of the array
```js
myShopping.push('chips', 'broccoli'); // ['rice', 'bread', 'bananas', 'chicken', 'chips', 'broccoli']
```

##### `.unshift(  )`
Pushes a item to the beginning of the array
```js
myShopping.unshift('chips', 'broccoli'); // ['chips', 'broccoli', 'rice', 'bread', 'bananas', 'chicken']
```

##### `.pop(  )`
Removes (and can store in a variable) the last item of an array
```js
var lastItem = myShopping.pop(); // 'chicken'
```

##### `.shift(  )`
Removes (and can store in a variable) the first item of an array
```js
var firstItem = myShopping.shift(); // 'rice'
```

##### `.join(  )`
Joins a array in a string separated by a supply of characters
```js
myShopping.join(', '); // "rice, bread, bananas, chicken"
```

##### `.concat(  )`
Joins one or more arrays to another array
```js
var moreShopping = ['potatos', 'salmon', 'orange juice'];
var evenMoreShopping = ['bacon', 'lettuce'];
myShopping.concat(moreShopping, evenMoreShopping);
// ["rice", "bread", "bananas", "chicken", "potatos", "salmon", "orange juice", "bacon", "lettuce"]
```

##### `.indexOf(  )`
Searches and returns the position of a value in a array
```js
var fruit = myShopping.indexOf('bananas'); // 2
var fruit = myShopping.indexOf('pineapples'); // -1 ; means does not exist
```

## Two-Dimensional Arrays
Create a spreadsheet-like data structure by storing arrays in arrays

```js
var grades = [
  [80, 90, 100, 95],
  [75, 95, 85, 100],
  [60, 80, 77, 90]
];

grades[0][3]; // 95
grades[1][0] // 75
grades[2][2] // 77
```

## Spread
Extend arrays similarly to `array.concat(anotherArray)` in ES6

```js
var myShopping = ['rice', 'bread', 'bananas', 'chicken']
var moreShopping = [...myShopping, 'eggs', 'milk']; // ['rice', 'bread', 'bananas', 'chicken', 'eggs', 'milk']
```
