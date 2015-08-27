# JavaScript Booleans  ////

- Booleans
- Not Operator

## Booleans
Along with `strings` and `number` booleans are a type of value, a `boolean` value can only be `true` or `false`

```js
if (false) {
  document.write('The condition is true');
} else {
  document.write('The condition is false');
}
```

## Not operator
Using a `!` before inverts a boolean value
- !true == NOT true
- !false == NOT false

```js
!true  == false
!false == true
```
## Truthy and Falsey
JavaScript is a loosely typed language that means JavaScript often tries to coerce one type of data. Some other values can be `true` and `false`

```js
function truthyChecker(someValue) {
    if (someValue) {
      console.log("this is truthy!!");
      return true
    } else {
      console.log("this is falsey!!");
      return false
    }
};
```

## Truthy Values
- `true`
- Any `String` - `"string"`, even `"False"` or `"0"`
- Any `Object` - `{}`, even if empty
- Any `Array` - `[]`, even if empty
- `new Date()`
- Any `Floating Value` - `100`, `2.0`, etc..

### Falsey  Values
- `false`
- Negative Values - `0`, `0.0`
- `null`
- `undefined`
- `NaN`
- Empty String - `""`


## undefined
Undefined is simply the value that is given to a variable if it is  _without a value_

Example if we set a `variable` to be equal to a `function` without `returning` a value we'll get `undefined`
```js
function foobar(someValue) {
  console.log(someValue);
}
// the function will work but won't return nothing for `myVariable`
myVariable = foobar(10) // 10, undefined
typeof myVariable // "undefined"
```

## null
Unlike undefined, is a literal. Null can be used in places where a value is expected to be returned, but is not. It return a empty `object`

Example:
```js
function fooBar(someValue) {
  if (someValue) {
    console.log(someValue);
    return someValue
  } else {
    console.log("nothing returned!!!");
    return null
  }
}
myVar = fooBar() // nothing returned!!!, null
typoof myVar // "object"
```

## NaN
`NaN`, or _Not a Number_, is a property of the global object that is returned when a value can not be coerced to a number or a mathematical operation fails.

Example:
```js
Math.floor("hello!!!") // NaN
parseInt(10) // 10
parseInt("10foo") // 10
parseInt("foo10") // NaN because it starts with a letter

notANumber = parseInt("yayyyyy!") // NaN
notANumber // NaN
typoof notANumber // "number"
```
