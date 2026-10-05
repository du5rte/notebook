# JavaScript - Booleans

## Booleans
Like `booleans` are a type of value like strings and numbers, a `boolean` value can only be `true` or `false`

```js
var imHuman = true;
var imRobot = false;
```

## Truthy and Falsey
JavaScript is a loosely typed language, it meaning often tries to coerce to one type of data. Some other values can be `true` and `false`

#### Truthy Values
- `true`
- Any `String` - `"string"`, even `"False"` or `"0"`
- Any `Object` - `{}`, even if empty
- Any `Array` - `[]`, even if empty
- `new Date()`
- Any `Floating Value` - `100`, `2.0`, etc..

#### Falsey  Values
- `false`
- Negative Values - `0`, `0.0`
- `null`
- `undefined`
- `NaN`
- Empty String - `""`

## Undefined
The value given to a variable if it is **without a value**.

```js
var message;
console.log(message); // undefined
console.log(typeof message); // "undefined"
```

Assigning a functions that don't return a value to a variable will give it a value of `undefined`, although it will do it's job.
```js
function printToDom(text) {
   document.write(text);
}
var captureMessage = printToDom("hello"); // undefined
```

## Null
Unlike undefined, is a literal. Null can be used in places where a value is expected to be returned, but is not. It return a empty `object`

```js
function add(x, y) {
  return x + y;
}
console.log(add(2, null)); // 2
```

Null returns a empty `object`
```js
var nothingHere = null;
console.log(typeof nothingHere); // "object"
```

## NaN
The value given to a value when it can not be coerced to a number or a mathematical operation fails.

```js
parseInt("three") // NaN
```
NaN is a `number`
```js
var notaNumber = NaN; // NaN
console.log(typeof notaNumber); // "number"
```

## Comparison Operators
Used to compares values to determine a boolean value

- `>` Greater than
- `>=` Greater than or Equal to
- `<` Less than
- `<=` Less than Or Equal to
- `==` Equal to
- `===` Strict Equal to
- `!=` Not Equal To
- `!==` Strict Not Equal to
- `&&` And
- `||` Or
- `!` Not

```js
2 > 2 // false
2 >= 2 // true
1 < 7 // true
1 <= 36 // true
3 == "3" // true
'dog' !== 'dog' // false
3 === 7 || 'cat' === 'cat' // true
```

#### Comparing Strings
The first letter of the first string is compared to the first letter of the second string, and if equal, the letter after it.
```js
'lion' > 'zebra' // false ; `l` comes before `z` in the alphabet
```

#### Equality Operators
Determines if 2 values are the same, it can compare different values. Equality Operator often coerces values. So it's not good pratice to use it.
```js
3 == "3" // true
'' == 0 // true
```

#### Strict Comparison operator
Compare the value as well as the `typeof` two type of data
```js
3 == "3" // false
'' == 0 // false
```


#### And Operator
Compares multipe comparisons, all comparisons need to be `true` otherwise the whole comparison turn `false`

```js
var age = 34;
age > 30 && age < 40 // true
```

#### Or Operator
Compares multiple comparisons, take only one comparisons need to be `true`.

```js
var age = 49;
var netWorth = '9450800';
age < 30 || netWorth > 1e6 // true
```

#### Not operator
Using a `!` inverts a boolean value, `!true = not true`

```js
console.log(!true); // false
console.log(!false); // true
```
