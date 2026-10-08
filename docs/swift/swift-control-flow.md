---
title: "Swift - Control Flow"
type: doc
created: 2016-11-04
updated: 2026-10-07
aliases: ["Swift - Conditionals", "Swift - Loops"]
tags: [swift]
---
# Swift - Control Flow

Control flow is how a program decides what to run and how many times: "if it's cold, wear a sweater", "for every item on the list, print it". Swift has the `if`, `for` and `while` you know from TypeScript, plus a `switch` that is far more powerful and is used everywhere. No brackets around conditions, but braces are always required.

## Comparison and logical operators

These work like TypeScript, with one simplification: there's only `==`. No `===` for value comparison, because there's no type coercion to protect against.

| Operator | Meaning |
|---|---|
| `==` `!=` | equal, not equal |
| `<` `>` `<=` `>=` | smaller, bigger, or equal |
| `&&` `\|\|` `!` | and, or, not |

```swift
let temperature = 20
temperature < 18                     // false
temperature > 10 && temperature < 25 // true
```

(Swift does have `===`, but it means "the same class instance". See [[docs/swift/swift-structs-and-classes|Structs and Classes]].)

## if, else if, else

No parentheses around the condition. Braces are mandatory, even for one line.

```swift
let temperature = 15

if temperature < 10 {
    print("It's freezing, wear a jacket")
} else if temperature < 18 {
    print("It's cold, wear a sweater")
} else {
    print("It's great outside, a t-shirt will do")
}
// It's cold, wear a sweater
```

## if as an expression

`if` and `switch` can produce a value directly, so you don't need a `var` you assign in each branch.

```swift
let outfit = if temperature < 18 { "sweater" } else { "t-shirt" }
outfit // "sweater"
```

In TypeScript this is the ternary `temperature < 18 ? 'sweater' : 't-shirt'`. Swift has the ternary too; the `if` form reads better once there are more than two branches.

## switch

`switch` compares one value against many cases. Two rules make it safer than JavaScript's:

1. **No fall through.** Each case ends on its own, no `break` needed.
2. **It must be exhaustive.** Every possible value is covered, or you add `default`.

```swift
let airportCode = "LHR"

switch airportCode {
case "LGA", "JFK":
    print("New York")
case "LHR":
    print("London")
default:
    print("Unknown city")
}
// London
```

A case can match a range, which replaces long `if` chains.

```swift
let temperature = 47

let feeling = switch temperature {
case ..<32: "Frozen"
case 32..<45: "Freezing"
case 45..<70: "Chilly"
case 70...100: "Pretty hot"
default: "Melting"
}
feeling // "Chilly"
```

You can also match tuples and add conditions with `where`. This one decides which of two choice slots to fill:

```swift
let order = (size: "large", hasMilk: true)

switch order {
case ("small", false): print("Espresso")
case (_, true) where order.size == "large": print("Latte")
case (_, true): print("Cortado")
default: print("Americano")
}
// Latte
```

`_` means "anything here". `switch` really shines with [[docs/swift/swift-enums|enums]], where the compiler checks you handled every case.

## Ranges

A range is a sequence of numbers between two ends.

| Range | Includes | Example |
|---|---|---|
| `1...5` | 1 to 5 | closed |
| `1..<5` | 1 to 4 | half-open, perfect for indexes |
| `2...` | 2 to the end | one-sided, for slicing arrays |

```swift
let queue = ["Ana", "Ben", "Cleo", "Dev"]
queue[1..<3] // ["Ben", "Cleo"]
queue[2...]  // ["Cleo", "Dev"]
```

## for-in loops

`for-in` walks through anything you can iterate: arrays, ranges, dictionaries, strings.

```swift
for number in 1...3 {
    print("\(number) times 3 is \(number * 3)")
}
// 1 times 3 is 3
// 2 times 3 is 6
// 3 times 3 is 9

let shopping = ["Eggs", "Fish", "Bread"]
for (index, item) in shopping.enumerated() {
    print("\(index + 1). \(item)")
}
// 1. Eggs
// 2. Fish
// 3. Bread
```

In TypeScript this is `for (const item of shopping)`. Swift has no C-style `for (let i = 0; i < n; i++)`: use a range, or `stride(from: 0, to: 10, by: 2)` for steps.

You can filter right in the loop with `where`:

```swift
for number in 1...100 where number % 7 == 0 && number % 2 != 0 {
    print(number)
}
// 7, 21, 35, 49, 63, 77, 91
```

Often you don't need a loop at all: `map`, `filter` and `reduce` are in [[docs/swift/swift-collections|Collections]].

## while and repeat-while

`while` checks the condition first. `repeat-while` runs the body once before checking, like `do...while` in JavaScript.

```swift
var cupsLeft = 3
while cupsLeft > 0 {
    print("Pouring, \(cupsLeft) left")
    cupsLeft -= 1
}

var attempts = 0
repeat {
    attempts += 1 // runs at least once
} while attempts < 3
attempts // 3
```

Use `break` to leave a loop early and `continue` to skip to the next round.

## Common mistakes

- Forgetting `default` in a `switch` over a `String` or `Int`. The compiler error "switch must be exhaustive" means exactly that.
- Using `1...count` to loop over indexes. It goes one past the end and crashes. Use `0..<count`, or better, `for item in array` or `indices`.
- Adding `break` at the end of every case out of JavaScript habit. It's harmless but noise. (An empty case does need `break`, because a case can't be empty.)

## Try it

1. Write a `switch` that turns a score from 0 to 100 into a grade `"A"` to `"F"` using ranges.
2. Loop over `["Mon", "Tue", "Wed"]` with `enumerated()` and print `"Day 1: Mon"`.
3. Print every even number from 0 to 20 with `stride`.

## Related
- [[docs/swift/swift|Swift - Basics]]
- [[docs/swift/swift-collections|Swift - Collections]]
- [[docs/swift/swift-enums|Swift - Enums]]
- [[docs/javascript/javascript-conditionals|JavaScript - Conditionals]]
- [[docs/javascript/javascript-loops|JavaScript - Loops]]
