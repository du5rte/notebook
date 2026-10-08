---
title: "Swift - Collections"
type: doc
created: 2016-11-04
updated: 2026-10-07
aliases: ["Swift - Collections and Control Flow"]
tags: [swift]
---
# Swift - Collections

Collections hold many values in one place. Swift has three you'll use daily: an **array** (an ordered list, like a shopping list), a **dictionary** (lookups by key, like airport codes to names) and a **set** (unique values, like a guest list). All three are typed: an array of `String` can only ever hold strings. And unlike TypeScript, **they are values, not references**: assigning an array copies it.

## Arrays

An array is an ordered list. Its type is written `[Element]`.

```swift
var shopping = ["Eggs", "Fish", "Meat"] // [String], inferred
var empty: [String] = []                // empty arrays need a type

shopping[0]     // "Eggs"
shopping.count  // 3
shopping.first  // Optional("Eggs")
shopping.isEmpty // false
```

Changing an array needs `var`. A `let` array is frozen completely.

```swift
shopping.append("Milk")           // ["Eggs", "Fish", "Meat", "Milk"]
shopping += ["Butter"]            // adds to the end
shopping.insert("Ham", at: 1)     // ["Eggs", "Ham", "Fish", ...]
shopping.remove(at: 1)            // returns "Ham"
shopping[0] = "Free-range eggs"   // replace

let fixed = ["Tea"]
fixed.append("Cake") // ❌ error: 'fixed' is a 'let' constant
```

In TypeScript `const arr = []` still lets you `push`. In Swift, `let` means the contents too.

## Arrays are copied, not shared

This is the biggest surprise coming from TypeScript.

```swift
var myOrder = ["Latte"]
var yourOrder = myOrder // a copy
yourOrder.append("Croissant")

myOrder   // ["Latte"]
yourOrder // ["Latte", "Croissant"]
```

In TypeScript both names would point at the same array and both would show the croissant. Swift copies lazily (only when one side changes), so it's cheap. The same is true for dictionaries, sets, strings and structs: see [[docs/swift/swift-structs-and-classes|Structs and Classes]].

## Dictionaries

A dictionary maps keys to values. Its type is `[Key: Value]`.

```swift
var airports = [
    "LGA": "La Guardia",
    "LHR": "Heathrow",
    "CDG": "Charles de Gaulle",
]

airports["LHR"]          // Optional("Heathrow")
airports["XYZ"]          // nil
airports["DUB"] = "Dublin" // add or update
airports["DUB"] = nil      // remove
airports.count             // 3
```

Reading a key always gives an **optional**, because the key might not be there. You unwrap it with `if let` or give a fallback with `??`. That's the whole of [[docs/swift/swift-optionals|Optionals]].

```swift
let name = airports["XYZ"] ?? "Unknown airport" // "Unknown airport"
```

A handy shortcut for counting: the `default:` subscript.

```swift
var tally: [String: Int] = [:]
for drink in ["tea", "coffee", "tea"] {
    tally[drink, default: 0] += 1
}
tally // ["tea": 2, "coffee": 1]
```

Dictionaries are **unordered**. Looping over one can come out in any order, so sort the keys if order matters.

```swift
for (code, name) in airports.sorted(by: { $0.key < $1.key }) {
    print("\(code): \(name)")
}
```

In TypeScript this is a `Record<string, string>` or a `Map`.

## Sets

A set is an unordered bag of unique values. Use it when you only care "is it in there?".

```swift
var guests: Set = ["Ana", "Ben"]
guests.insert("Ana")     // no change, already there
guests.contains("Ben")   // true
guests.count             // 2
```

Checking `contains` on a set is fast no matter how big it gets; on an array it gets slower as the array grows.

## map, filter, reduce

These work like their JavaScript namesakes and return new collections. `$0` is the first argument of a short closure (more in [[docs/swift/swift-functions|Functions]]).

```swift
let prices = [3.2, 2.8, 4.5]

prices.map { $0 * 2 }      // [6.4, 5.6, 9.0]
prices.filter { $0 < 4 }   // [3.2, 2.8]
prices.reduce(0, +)        // 10.5
prices.sorted()            // [2.8, 3.2, 4.5]
prices.contains(4.5)       // true

let names = ["Ana", "Ben"]
names.map { $0.uppercased() } // ["ANA", "BEN"]
```

Also worth knowing: `first(where:)`, `compactMap` (map and drop the `nil`s), `min()`, `max()`. The full list lives in Apple's docs.

## Which collection?

| Need | Use |
|---|---|
| Order matters, duplicates allowed | Array ✅ (the default) |
| Look things up by a key | Dictionary |
| Unique values, fast "is it in?" | Set |

## Common mistakes

- Reading `array[5]` past the end. Swift crashes ("Index out of range") rather than returning `undefined`. Use `first`, `last`, or check `indices.contains(5)`.
- Forgetting that `dictionary[key]` is optional and fighting the compiler. Unwrap it once with `if let` or `??`.
- Expecting a copy to change the original. Arrays and dictionaries are values.

## Try it

1. Make a shopping list, add two items, remove the first, and print the count.
2. Count how many times each word appears in `["tea", "coffee", "tea", "juice"]` with a dictionary.
3. From `[12, 7, 3, 20]`, get the numbers above 5, doubled, in one chain.

## Related
- [[docs/swift/swift-control-flow|Swift - Control Flow]]
- [[docs/swift/swift-optionals|Swift - Optionals]]
- [[docs/swift/swift-functions|Swift - Functions]]
- [[docs/javascript/javascript-arrays|JavaScript - Arrays]]
