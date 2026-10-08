---
title: "Swift - Functions"
type: doc
created: 2016-11-04
updated: 2026-10-07
aliases: ["Swift - Closures", "Swift - Scratch"]
tags: [swift]
---
# Swift - Functions

A function is a recipe with a name: write it once, run it whenever you like. Swift functions look like TypeScript ones with one twist you'll notice straight away: **argument labels**. Calls read like sentences, `makeCoffee(size: "large", withMilk: true)`, and that's on purpose. The second half of this lesson covers closures, Swift's arrow functions, which SwiftUI uses everywhere.

## Declaring and calling

`func`, a name, parameters with types, and `->` for the return type.

```swift
func area(length: Int, width: Int) -> Int {
    return length * width
}

area(length: 12, width: 10) // 120
```

If the body is a single expression, you can leave out `return`.

```swift
func area(length: Int, width: Int) -> Int {
    length * width
}
```

In TypeScript this is `function area(length: number, width: number): number`. A function with no `->` returns `Void`, Swift's `void`.

## Argument labels

Each parameter has a **label** (used by the caller) and a **name** (used inside). By default they're the same. Write two words to split them, or `_` to drop the label.

```swift
func send(_ message: String, to friend: String) -> String {
    "Sent '\(message)' to \(friend)"
}

send("Coffee?", to: "Ana") // "Sent 'Coffee?' to Ana"
```

The rule of thumb from Apple's API guidelines: the call site should read as an English phrase. `send("Coffee?", to: "Ana")` beats `send(message: "Coffee?", friend: "Ana")`.

TypeScript has no labels; the closest habit is passing an options object, `send({ message, to })`.

## Default values

Give a parameter a default and callers can skip it.

```swift
func carpetCost(area: Int, colour: String = "grey") -> Int {
    let pricePerMetre = switch colour {
    case "grey": 1
    case "tan": 2
    case "blue": 4
    default: 0
    }
    return area * pricePerMetre
}

carpetCost(area: 20)                 // 20
carpetCost(area: 20, colour: "blue") // 80
```

Because labels are part of a function's identity, Swift lets two functions share a name if their labels or types differ (overloading). In TypeScript, overloads are only extra signatures on one implementation.

## Returning several values with a tuple

A tuple is a small, unnamed group of values. Under the hood it's a struct without a name. Use it to return two or three things without declaring a type.

```swift
func split(bill: Double, between people: Int) -> (each: Double, tip: Double) {
    let tip = bill * 0.1
    return ((bill + tip) / Double(people), tip)
}

let result = split(bill: 40, between: 4)
result.each // 11.0
result.tip  // 4.0

let (each, tip) = split(bill: 40, between: 4) // destructure, like TS
```

If a tuple travels further than one call, make it a struct instead.

## typealias

`typealias` gives an existing type a friendlier name. It doesn't create a new type.

```swift
typealias Choice = (title: String, page: Int)
let next: Choice = (title: "Open the door", page: 12)
```

In TypeScript this is `type Choice = { title: string; page: number }`.

## Scope

A name declared inside a function only exists inside it, and can shadow one outside.

```swift
let greeting = "hello"

func greet() {
    let greeting = "yo"
    print(greeting)
}

greet()          // yo
print(greeting)  // hello
```

## Closures

A closure is a function without a name, written in braces. Parameters and return type go before `in`.

```swift
let double = { (number: Int) -> Int in
    number * 2
}
double(4) // 8
```

In TypeScript this is `const double = (number: number): number => number * 2`.

When Swift can infer the types, you can shorten a closure step by step. All of these are the same:

```swift
let prices = [3, 2, 5]

prices.map({ (price: Int) -> Int in return price * 2 })
prices.map({ price in price * 2 })
prices.map { price in price * 2 } // trailing closure
prices.map { $0 * 2 }             // shorthand argument
// [6, 4, 10]
```

**Trailing closure syntax**: when the last argument is a closure, it goes after the parentheses (and if it's the only argument, the parentheses go too). This is why SwiftUI code looks like `Button("Order") { placeOrder() }`.

Use `$0` for one-liners. Name the parameter once the closure is longer than a line.

## Functions as values

Functions are values: store them, pass them, return them. A function's type is written `(Int) -> Int`.

```swift
func applyDiscount(to price: Double, using rule: (Double) -> Double) -> Double {
    rule(price)
}

applyDiscount(to: 10) { $0 * 0.8 } // 8.0
```

## Closures capture

A closure remembers the variables around it, even after the surrounding function has returned.

```swift
func makeCounter() -> () -> Int {
    var count = 0
    return {
        count += 1
        return count
    }
}

let nextTicket = makeCounter()
nextTicket() // 1
nextTicket() // 2
```

Same as a JavaScript closure. One Swift-only gotcha: a closure stored on a class that refers to `self` keeps that object alive. The fix, `[weak self]`, is in [[docs/swift/swift-structs-and-classes|Structs and Classes]].

## Common mistakes

- Calling with the wrong label, or none. The compiler tells you: "missing argument label 'to:' in call".
- Using `$0` and `$1` in a closure that's three lines long. Name them.
- Reaching for a tuple when the data has a meaning of its own. Make a struct.

## Try it

1. Write `greet(_ name: String, at time: String)` so the call reads `greet("Ana", at: "9am")`.
2. Write a function that returns the min and max of an `[Int]` as a named tuple.
3. Use `filter` with a trailing closure to keep only names longer than three letters.

## Related
- [[docs/swift/swift|Swift - Basics]]
- [[docs/swift/swift-collections|Swift - Collections]]
- [[docs/swift/swift-errors|Swift - Error Handling]]
- [[docs/swift/swift-swiftui|Swift - SwiftUI Basics]]
- [[docs/javascript/javascript-functions|JavaScript - Functions]]
