---
title: "Swift - Basics"
type: doc
created: 2016-11-04
updated: 2026-10-07
aliases: ["Swift - Variables", "Swift - Strings", "Swift - Numbers", "Swift - Booleans"]
tags: [swift]
---
# Swift - Basics

Swift is Apple's language for iPhone, Mac and Apple Watch apps. If you write TypeScript, a lot will feel familiar: `let`, type inference, arrow-ish closures, string interpolation. The big difference is that **Swift is strict at compile time**: types never change, `nil` has to be handled, and the compiler stops you before the app ever runs. This lesson covers the building blocks: constants and variables, types, strings, numbers and booleans.

## Playgrounds: try code without an app

A playground runs Swift line by line and shows each result in the sidebar, like a REPL with a notebook view. In Xcode, go to **File > New > Playground**, pick a blank template and start typing.

```swift
let greeting = "Hello, playground"
print(greeting) // Hello, playground
```

Every example in these lessons runs in a playground. You don't need a project until [[docs/swift/swift-swiftui|SwiftUI]].

## let vs var

`let` is a constant: assign it once and it never changes. `var` can be reassigned. Use `let` by default and only switch to `var` when the compiler asks for it.

```swift
let language = "Swift"
language = "Objective-C" // ❌ error: cannot assign to value: 'language' is a 'let' constant

var cupsOfCoffee = 1
cupsOfCoffee = 2 // ✅ 2
```

In TypeScript this is `const` vs `let`. One difference: a Swift `let` struct or array is fully frozen, not just the binding. More on that in [[docs/swift/swift-structs-and-classes|Structs and Classes]].

Names follow the same rules as JavaScript: no spaces, can't start with a number, `lowerCamelCase` for values, `UpperCamelCase` for types.

## Types and type inference

Every value has a type, and Swift works it out from the value you assign. You can also write it yourself after a colon.

```swift
let bestPlayer = "Michael Jordan" // String (inferred)
let year: Int = 2016              // Int (annotated)
```

Once a variable has a type, it keeps it forever.

```swift
var orderNumber = 10
orderNumber = "ten" // ❌ error: cannot assign value of type 'String' to type 'Int'
```

In TypeScript this is the same as `let year: number = 2016`, except Swift has no `any` escape hatch by default.

The everyday types:

| Type | Example | TypeScript |
|---|---|---|
| `String` | `"Flat white"` | `string` |
| `Int` | `42` | `number` |
| `Double` | `3.5` | `number` |
| `Bool` | `true` | `boolean` |

## Strings

Strings use double quotes only. Join them with `+`, or drop values in with **interpolation**: `\(value)`.

```swift
let city = "Charlotte"
let street = "West Street"

let address = city + ", " + street // "Charlotte, West Street"
let label = "\(222) \(street)"     // "222 West Street"
```

`+` only joins strings with strings. Interpolation works with any type, so reach for it first.

```swift
let wrong = 222 + street // ❌ error: binary operator '+' cannot be applied
```

In TypeScript this is a template literal: `` `${222} ${street}` ``.

A few things you'll use every day:

```swift
let order = "Flat white"
order.count             // 10
order.isEmpty           // false
order.uppercased()      // "FLAT WHITE"
order.contains("white") // true
order.hasPrefix("Flat") // true

let receipt = """
    Order: \(order)
    Total: £3.20
    """ // multi-line string, indentation of the closing quotes is stripped
```

## Numbers

Use `Int` for whole numbers and `Double` for decimals. `Float` exists but has less precision; you'll only meet it in graphics APIs.

```swift
let cups = 3        // Int
let price = 3.20    // Double

cups + 2   // 5
7 / 2      // 3   (Int division drops the decimals)
7.0 / 2    // 3.5
7 % 2      // 1   (remainder)
```

Swift never mixes number types for you. Convert explicitly.

```swift
let width = 12
let height = 10
let area = width * height // 120 (Int)

let squareMetres = area / 10.764         // ❌ error: Int and Double
let squareMetres = Double(area) / 10.764 // ✅ 11.148...
```

In TypeScript every number is a `number`, so this error is new. It's annoying for a week, then it saves you from rounding bugs.

There's no `++` or `--` (removed in Swift 3). Use `+=` and `-=`.

```swift
var score = 0
score += 1 // 1
score -= 1 // 0
```

## Booleans

`Bool` is `true` or `false`. Nothing else is "truthy": an empty string or `0` is not `false`.

```swift
let isOpen = true
let isClosed = !isOpen // false

let cups = 0
if cups { }       // ❌ error: type 'Int' cannot be used as a boolean
if cups == 0 { }  // ✅
```

In TypeScript `if (cups)` quietly works. Swift makes you say what you mean.

## Any

`Any` holds a value of any type. You'll see it in older APIs and JSON code, but you can't do much with it until you cast it back with `as?`. Avoid it in your own code; there's almost always a better type.

```swift
let things: [Any] = ["Latte", 3, true]
```

## Common mistakes

- Using `var` everywhere. The compiler warns "variable was never mutated; consider changing to 'let'". Listen to it.
- Mixing `Int` and `Double` in maths. Convert one side with `Double(...)` or `Int(...)`.
- Writing `'single quotes'`. Swift strings are always `"double"`.
- Expecting `0` or `""` to be falsy. Compare explicitly.

## Try it

1. In a playground, store your name and age in constants and print `"Ana is 32"` with interpolation.
2. Calculate the price of 3 coffees at `3.20` each when the quantity is an `Int`. Fix the type error.
3. Try to change a `let`. Read the error, then fix it the way the compiler suggests.

## Related
- [[docs/swift/swift-control-flow|Swift - Control Flow]]
- [[docs/swift/swift-collections|Swift - Collections]]
- [[docs/swift/swift-optionals|Swift - Optionals]]
- [[docs/typescript/typescript|TypeScript - Basics]]
