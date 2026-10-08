---
title: "Swift - Optionals"
type: doc
created: 2026-10-07
updated: 2026-10-07
tags: [swift]
---
# Swift - Optionals

An optional is a box that either holds a value or is empty (`nil`). Think of a coffee order's "extra shot" field: some orders have one, some don't. Swift makes "might be missing" part of the type, `String?`, and **won't let you use the value until you've opened the box**. That one rule removes a whole family of "cannot read property of undefined" crashes. You'll unwrap optionals constantly, so this lesson is worth slowing down for.

## String vs String?

A plain `String` always has a value. A `String?` might be `nil`.

```swift
var name: String = "Ana"
name = nil // ❌ error: 'nil' cannot be assigned to type 'String'

var middleName: String? = nil // ✅
middleName = "Alison"         // ✅
```

In TypeScript this is `string | undefined` with `strictNullChecks` on. Same idea, but Swift has no way to switch it off.

You'll get optionals back from lots of everyday APIs:

```swift
let airports = ["LHR": "Heathrow"]
airports["JFK"]  // nil (String?)
Int("42")        // Optional(42)
Int("abc")       // nil
[1, 2].first     // Optional(1)
```

## if let: unwrap when it's there

`if let` opens the box. Inside the braces you have a plain, non-optional value.

```swift
let middleName: String? = "Alison"

if let middleName {
    print("Middle name: \(middleName)") // middleName is a String here
} else {
    print("No middle name")
}
// Middle name: Alison
```

`if let middleName {` is short for `if let middleName = middleName {`. You'll see the long form in older code and when you want a new name: `if let name = airports["JFK"] { ... }`.

Unwrap several at once with commas. All must succeed for the block to run.

```swift
let order = ["drink": "Latte", "size": "Large"]

if let drink = order["drink"], let size = order["size"] {
    print("\(size) \(drink)") // Large Latte
}
```

This replaces the old "pyramid of doom" of nested `if let`s.

## guard let: bail out early

`guard` is the opposite shape: deal with the bad case first and leave, then carry on with unwrapped values for the rest of the function. It keeps the happy path unindented.

```swift
struct Friend {
    let name: String
    let age: String
    let address: String?
}

func makeFriend(from data: [String: String]) -> Friend? {
    guard let name = data["name"], let age = data["age"] else {
        return nil
    }
    // name and age are plain Strings from here on
    return Friend(name: name, age: age, address: data["address"])
}

makeFriend(from: ["name": "Ana", "age": "32"]) // Friend(name: "Ana", ...)
makeFriend(from: ["name": "Ana"])              // nil
```

The `else` must leave the scope (`return`, `throw`, `break`), and the compiler checks that it does.

**if let vs guard let**: use `if let` when the value is only needed in one small block, `guard let` when the rest of the function depends on it.

In TypeScript this is the early return: `if (!name) return null`, after which TS narrows `name` to `string`.

## ?? : a fallback value

The nil-coalescing operator gives a default when the optional is empty.

```swift
let nickname: String? = nil
let displayName = nickname ?? "Guest"
displayName // "Guest"
```

In TypeScript this is exactly `nickname ?? 'Guest'`.

## Optional chaining with ?.

`?.` reaches through a chain of optionals. If any link is `nil`, the whole thing is `nil` and nothing crashes.

```swift
struct Address { var apartment: String? }
struct Residence { var address: Address? }
struct Person { var residence: Residence? }

let susan = Person(residence: Residence(address: Address(apartment: "3B")))
let tom = Person()

susan.residence?.address?.apartment // Optional("3B")
tom.residence?.address?.apartment   // nil

let apartment = tom.residence?.address?.apartment ?? "No apartment"
```

Same operator, same meaning as TypeScript's `?.`. The result is always optional, so pair it with `if let` or `??`.

## Force unwrap with ! (avoid it)

`!` rips the box open without checking. If it's empty, the app crashes.

```swift
let code: String? = nil
let upper = code!.uppercased() // 💥 Fatal error: Unexpectedly found nil
```

❌ `name!` because "it's definitely there"
✅ `guard let name else { return }` or `name ?? "Guest"`

In TypeScript `!` only silences the compiler. In Swift it's a runtime check that kills the app. The only fair uses are values that really cannot be missing, like a URL you typed as a literal, and tests.

## Optionals are enums

There's no magic: `String?` is shorthand for `Optional<String>`, an enum with two cases, `.some(value)` and `.none`. That's why you can `switch` on one.

```swift
let extraShot: Int? = 2

switch extraShot {
case .some(let shots): print("\(shots) extra shots")
case .none: print("No extra shot")
}
// 2 extra shots
```

More on enums with values in [[docs/swift/swift-enums|Enums]].

## Common mistakes

- Sprinkling `!` to make errors go away. Each one is a possible crash.
- Comparing to `nil` and then force unwrapping (`if x != nil { x! }`). Use `if let x` instead.
- Nesting `if let`s. Use one `if let` with commas, or `guard`.
- Forgetting that `?.` returns an optional, then wondering why the result needs unwrapping too.

## Try it

1. Convert `"42"` and `"forty-two"` to `Int` with `Int(...)` and print each with `?? 0`.
2. Write `func initials(first: String, middle: String?, last: String) -> String` that skips the middle initial when it's `nil`.
3. Rewrite a nested `if let` from old code as a single `guard let`.

## Related
- [[docs/swift/swift|Swift - Basics]]
- [[docs/swift/swift-collections|Swift - Collections]]
- [[docs/swift/swift-enums|Swift - Enums]]
- [[docs/swift/swift-errors|Swift - Error Handling]]
- [[docs/typescript/typescript|TypeScript - Basics]]
