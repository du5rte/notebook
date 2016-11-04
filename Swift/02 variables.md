# Swift - Variables


## Variables Naming Conventions

- No whitespace characters
- Cannot start with a number
- No special characters
- No mathematical symbols

## Assignment Operator
Assigns a value to a variable or constant `=`

```swift
var str = "Hello, playground"
```

## Variables
Hold mutable data, values can be changed, in swift when type is assigned it cannot be change. Types are automatically defined when from it's given value.


```swift
var str = "Hello, playground" // String
var number = 10 // Int


var str = 3 // Error
var number = "30" // Error
```

## Constants
Hold immutable data, values cannot be changed later on and neither can types.

```swift
let language = "Swift"

language = "Objective-C" // Error
```
