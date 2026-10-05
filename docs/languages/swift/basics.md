# Swift - Basics

References:
- [iOS Human Interface Guidelines](https://developer.apple.com/ios/human-interface-guidelines/ui-views/alerts/)

## Xcode
IDE (Integrated Developer Environment)

## Syntax
The commands, special words and punctuation you use to put together a program

## Types
Represent different kinds of data like `strings`, `numbers` or `booleans`

## String

```swift
"Hello, playground"
```

## Integers
Whole digit `Int`

```swift
2014
```

## Floating Point Numbers
6 decimal digits `Float`

```swift
2.0
```

## Double Float
15 decimal digits `Double` most recommended to use for decimal digits unless specified

```swift
2.0
```

## Booleans
True or false, 1 or 0 `Bool`

```swift
true
false
```

## Type Safety and Type Inference
When a variable is created and assigned a value swift `Type Inference` simplicity assigns a types, but it can also be set manually.

```swift
let bestPlayer: String = "Michael Jordan"
```

Different Types (e.g. Int and Floats) cannot perform maths operations
```swift
let height = 12
let width = 10
let area = height * width

// height and width are of type Int, `10.764` is a Float/Double
let areaInSquareMeters = area/10.764 // Error
```

```swift
let height = 12.0
let width = 10.0
let area = height * width

// All values are of type Float/Double
let areaInSquareMeters = area / 10.764
```

## Type aliases
`Any` is an instance of any type `AnyObject` is an instance of any class type.

```swift
var something: Any
var someObject: AnyObject
```

## Property List
Organises data into named values and lists of values in a `.plist` file

## XML
Extensible Markup Language is a set of rules for encoding documents in both machines and human readable format.
