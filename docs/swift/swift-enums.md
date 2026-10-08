---
title: "Swift - Enums"
type: doc
created: 2016-11-04
updated: 2026-10-07
tags: [swift]
---
# Swift - Enums

An enum lists every possible value of something: the days of the week, the sizes on a coffee menu, the states a screen can be in. Swift enums go much further than TypeScript's: cases can **carry data**, and enums can have **methods and computed properties**. Paired with `switch`, the compiler checks you've handled every case, which makes enums the best tool for modelling "it's one of these".

## Declaring an enum

Name the type in `UpperCamelCase` and each case in `lowerCamelCase`.

```swift
enum Size {
    case small, medium, large
}

var order = Size.medium
order = .large // the type is known, so `Size.` can be dropped
```

In TypeScript this is a string union, `type Size = 'small' | 'medium' | 'large'`.

## switch must cover every case

Switch over an enum and the compiler knows all the cases, so no `default` is needed. Add a case later and every `switch` that forgot it becomes an error. That's the point.

```swift
enum Day {
    case monday, tuesday, wednesday, thursday, friday, saturday, sunday
}

func isWeekend(_ day: Day) -> Bool {
    switch day {
    case .saturday, .sunday: true
    case .monday, .tuesday, .wednesday, .thursday, .friday: false
    }
}

isWeekend(.sunday) // true
```

✅ List the cases. ❌ Reaching for `default` on your own enums: you lose the "you forgot a case" error.

## Raw values

Give an enum a type (`String`, `Int`, `Double`) and each case gets a fixed **raw value**. Handy for talking to APIs and storage.

```swift
enum HTTPMethod: String {
    case get = "GET", post = "POST", put = "PUT", delete = "DELETE"
}

HTTPMethod.get.rawValue      // "GET"
HTTPMethod(rawValue: "POST") // Optional(.post)
HTTPMethod(rawValue: "NOPE") // nil
```

With `String`, a case's raw value defaults to its own name. With `Int`, they count up from 0.

```swift
enum Coin: Int {
    case penny = 1, nickel = 5, dime = 10, quarter = 25 // cents
}

let wallet: [Coin] = [.penny, .dime, .quarter, .quarter]
wallet.reduce(0) { $0 + $1.rawValue } // 61
```

Creating from a raw value returns an optional, because the string might not match a case. See [[docs/swift/swift-optionals|Optionals]].

## Associated values

Each case can carry its own data. This is where Swift enums leave TypeScript's behind.

```swift
enum Payment {
    case cash
    case card(lastFour: String)
    case voucher(code: String, amount: Double)
}

let payment = Payment.card(lastFour: "4242")

switch payment {
case .cash:
    print("Paid in cash")
case .card(let lastFour):
    print("Card ending \(lastFour)")
case .voucher(let code, let amount):
    print("Voucher \(code) for £\(amount)")
}
// Card ending 4242
```

In TypeScript this is a **discriminated union**: `{ kind: 'card'; lastFour: string } | { kind: 'cash' }`. Swift's version is shorter and the `switch` is checked for you.

A perfect fit for a screen that loads data:

```swift
enum LoadState {
    case loading
    case loaded([String])
    case failed(String)
}
```

No more `isLoading`, `data` and `error` flags that can disagree with each other.

## Methods and computed properties

Enums can hold behaviour. Inside, `self` is the current case.

```swift
enum Size: String, CaseIterable {
    case small, medium, large

    var millilitres: Int {
        switch self {
        case .small: 240
        case .medium: 350
        case .large: 470
        }
    }

    func label() -> String {
        "\(rawValue.capitalized) (\(millilitres)ml)"
    }
}

Size.large.millilitres // 470
Size.small.label()     // "Small (240ml)"
```

`CaseIterable` gives you `allCases`, perfect for building a picker:

```swift
Size.allCases.map { $0.rawValue } // ["small", "medium", "large"]
```

## Matching one case: if case and for case

When you only care about one case, a full `switch` is overkill.

```swift
if case .card(let lastFour) = payment {
    print("Card ending \(lastFour)")
}

let quarters = wallet.filter { $0 == .quarter }.count // 2

for case .quarter in wallet {
    print("Found a quarter")
}
```

`if case` reads backwards at first (pattern on the left, value on the right). That's normal.

## Common mistakes

- Using `default` in a `switch` over your own enum. You lose the compiler's help when a case is added.
- Modelling state with several booleans (`isLoading`, `hasError`) instead of one enum.
- Forgetting that `Enum(rawValue:)` is optional.
- `UpperCamelCase` cases (`.Monday`). That was Swift 2 style; cases are `lowerCamelCase` now.

## Try it

1. Make a `TrafficLight` enum with a `next` computed property that cycles red, green, amber.
2. Make an enum `Drink` with `case coffee(shots: Int)` and `case tea`, and a function that prices each.
3. Model a login screen with an enum: idle, submitting, success with a username, failure with a message.

## Related
- [[docs/swift/swift-control-flow|Swift - Control Flow]]
- [[docs/swift/swift-optionals|Swift - Optionals]]
- [[docs/swift/swift-structs-and-classes|Swift - Structs and Classes]]
- [[docs/swift/swift-errors|Swift - Error Handling]]
- [[docs/swift/swift-protocols|Swift - Protocols]]
