# JavaScript Numbers

## Numbers
Used for making calculations: adding, subtracting, computing total costs, keeping track of a game score, etc. Unlike strings, numbers don't need quotes.

## Integers
Whole numbers e.g. `5` `0` `-100` `9999`

```js
var score = 0;
```

## Floating Point Numbers
Decimal numbers e.g. `3.14` `-9.888888` `.000009`

```js
var pi = 3.14159265359;
```

## Scientifc Notation
Very large numbers or very small numbers, e.g. `9e-6` (.000009), `9e+6` (900000)
```js
var numberOfAtomsonEarth = 1.33e+105; // 1,329,999,999,999,999,744,856,320,232,896,408,568,208,984,680,600,256,608,968,528,800,792,688,048,688,776,152,064,608,064,832,992,376,472,832
```

# Doing Maths

```js
// Addiction
2 + 7
// Substraction
4 - 3
// Multiplication
10 * 9
// Division
// divides the left by the right
6 / 3
```
With variables
```js
var damage = 30;
var score = 100 - damage;
```

With same variables shorthands
```js
var score = 30;
score = score + 10; // 40;

// Addiction
score += 10;
// Substraction
score -= 20;
// Multiplication
score *= 5;
// Division
score /= 2;
```

Increament and decrement
```js
score ++; // score += 1; score = score + 1;
score --; // score -= 1; score = score - 1;
```

## Parse Integer
Sometimes returned inputs by prompt or forms come as a string, `parseInt(  )` Converts a string to a Integer.

```js
var age = prompt("How old are you?");
console.log(age); // "21"; age + age = "2121" Not 42
console.log(parseInt(age)); // 21; parseInt(age) + parseInt(age) = 42

// If the number is not on the beginning of the string it will return `NaN` (Not a Number)
parseInt("That's so 2014!"); // NaN

// It will also cut decimal numbers
parseInt('1.89 light years away'); // 1
```

## Parse Float
`parseInt(  )` converts a string to a Float (decimal number)

```js
parseInt('1.89 light years away'); // 1.89
```

## The Math Object
`Math` is a `Native JavaScript Object` with methods we can use. [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math

`Math.round( )`
```js
// Rounds to the nearest integer
Math.round(2.2) // 2
Math.round(4.9) // 5
```

`Math.floor( )`
```js
// Rounds to the smallest integer
Math.floor(1.2) // 1
Math.floor(0.00012) // 0
Math.floor(2) // 2
```

`Math.ceil( )`
```js
// Rounds to the biggest integer
Math.ceil(1.2) // 2
Math.ceil(0.00012) // 1
Math.ceil(5.028) // 6
```

`Math.random(  )` -  [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
```js
// Generates a floating, pseudo-random number between 0~1, including 0 but not including 1
Math.random(); // 0.5876477009151131
// Can be scaled to our desired range
Math.random()*6 // 0 ~ 5
Math.floor( Math.random()*6 ) + 1; // 1 ~ 6
```
