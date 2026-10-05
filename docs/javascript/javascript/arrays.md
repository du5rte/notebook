# JavaScript Arrays

Resources:
- [Array Methods You Should Use Today](http://colintoh.com/blog/5-array-methods-that-you-should-use-today)

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

##### Length
The number of keys in a array
```js
myShopping.length // 4

// One way to add a value to the end of the array
myShopping[ numbers.length ] = 'chips'; // myShopping[4] = 'chips';
```

##### Push
Pushes item(s) to the end of the array
```js
myShopping.push('chips', 'broccoli'); // ['rice', 'bread', 'bananas', 'chicken', 'chips', 'broccoli']
```

##### Unshift
Pushes a item to the beginning of the array
```js
myShopping.unshift('chips', 'broccoli'); // ['chips', 'broccoli', 'rice', 'bread', 'bananas', 'chicken']
```

##### Pop
Removes (and can store in a variable) the last item of an array
```js
var lastItem = myShopping.pop(); // 'chicken'
```

##### Shift
Removes (and can store in a variable) the first item of an array
```js
var firstItem = myShopping.shift(); // 'rice'
```

##### Join
Joins a array in a string separated by a supply of characters
```js
myShopping.join(', '); // "rice, bread, bananas, chicken"
```

##### Concat
Joins one or more arrays to another array
```js
var moreShopping = ['potatos', 'salmon', 'orange juice'];
var evenMoreShopping = ['bacon', 'lettuce'];
myShopping.concat(moreShopping, evenMoreShopping);
// ["rice", "bread", "bananas", "chicken", "potatos", "salmon", "orange juice", "bacon", "lettuce"]
```

##### Index Of
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

## Array Destructuring

```js
let myShopping = ['rice', 'bread', 'bananas', 'chicken']

 // c is discarded
let [a, b, ,d] =  myShopping
let [first, ...remainingItems]

console.log(a, b, d)
```

## Spread
Spreads an array into individual items in ES6

```js
let myShopping = ['rice', 'bread', 'bananas', 'chicken']
let moreShopping = [...myShopping, 'eggs', 'milk']; // ['rice', 'bread', 'bananas', 'chicken', 'eggs', 'milk']
```

## Newer Array Methods

##### Map
Iterates over each child, which then can be modified and returned

```js
let myShopping = ['rice', 'bread', 'bananas', 'chicken']

let prettyShopping = myShopping.map((child, index, array) => {
  // Capitalizes
  return child.replace(/^[a-z]/, (w) => w.toUpperCase())
})

console.log(prettyShopping) // ["Rice","Bread","Bananas","Chicken"]
```


##### Filter
Optionally filter children

```js
let myShopping = ['rice', 'bread', 'bananas', 'chicken']

let halfShopping = myShopping.filter((child, index, array) => {
  if(index < array.length / 2) {
    return child
  }
})

console.log(halfShopping)
```


##### Reduce

```js
let x = ['a', 'b', 'c', 'd', 'e']

let initialValue = []

let y = x.reduce((previousValue, currentValue, currentIndex, array) => {
  // or initialValue
  console.log(previousValue) // []

  console.log(currentValue, currentIndex) // a 0

  return currentValue.replace(/^[a-z]/, (w) => w.toUpperCase()) // A
}, initialValue);

console.log(y)
```
