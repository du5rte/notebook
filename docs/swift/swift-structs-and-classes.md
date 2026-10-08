---
title: "Swift - Structs and Classes"
type: doc
created: 2016-12-10
updated: 2026-10-07
aliases: ["Swift - Objects", "Swift - Memory Management"]
tags: [swift]
---
# Swift - Structs and Classes

Structs and classes both bundle data and behaviour into your own types: a `CoffeeOrder`, a `Point`, a `Robot`. They look almost identical. The difference is what happens when you pass one around: **a struct is copied, a class is shared**. Think of a struct as a photocopy of a form and a class as a link to one shared Google Doc. In Swift, **reach for a struct by default** and use a class only when you need one shared, changing thing. SwiftUI views and most of your data will be structs.

## Structs

A struct gets a free initialiser for its stored properties (the memberwise init).

```swift
struct Point {
    var x: Int
    var y: Int
}

let origin = Point(x: 0, y: 0)
origin.x // 0
```

Add computed properties and methods right inside it.

```swift
struct Rectangle {
    var width: Int
    var height: Int

    var area: Int { width * height } // computed, not stored

    func isBigger(than other: Rectangle) -> Bool {
        area > other.area
    }
}

let room = Rectangle(width: 5, height: 10)
room.area // 50
```

In TypeScript you'd write a `type Rectangle = { width: number; height: number }` plus loose functions. A Swift struct keeps them together, without the baggage of a class.

## mutating

A struct's methods can't change its own properties unless marked `mutating`. It's Swift being explicit that this method changes the value.

```swift
struct Counter {
    var count = 0
    mutating func increment() { count += 1 }
}

var cups = Counter()
cups.increment()
cups.count // 1

let fixed = Counter()
fixed.increment() // ❌ error: 'fixed' is a 'let' constant
```

A `let` struct is frozen all the way down. Not even a `var` property inside can change.

## Classes

A class needs its own `init` and can inherit from another class.

```swift
class Robot {
    var model: String

    init(model: String) {
        self.model = model
    }
}

let robot = Robot(model: "T1999")
```

## Value vs reference semantics

Here's the whole difference in one example.

```swift
var p1 = Point(x: 1, y: 2)
var p2 = p1     // copy
p2.x = 99
p1.x // 1   ✅ untouched

let r1 = Robot(model: "T1999")
let r2 = r1     // same robot
r2.model = "T2000"
r1.model // "T2000"   the "copy" changed too
```

Notice `r1` is a `let` and its model still changed. For a class, `let` freezes the **reference**, not the object.

| | Struct | Class |
|---|---|---|
| Assigning or passing | copies | shares |
| `let` freezes | everything | only the reference |
| Free memberwise init | ✅ | ❌ |
| Inheritance | ❌ | ✅ |
| Identity (`===`) | ❌ | ✅ |
| Memory | no counting needed | ARC (below) |

In TypeScript every object behaves like a Swift class. That's why React asks you to never mutate state: Swift structs give you that immutability for free.

Watch out for mixed semantics: a struct that holds a class instance copies the reference, so both copies share that one object.

## Inheritance and override

A class can subclass another and replace methods with `override`. Mark a class `final` when it shouldn't be subclassed.

```swift
class Person {
    let firstName: String
    let lastName: String

    init(firstName: String, lastName: String) {
        self.firstName = firstName
        self.lastName = lastName
    }

    func fullName() -> String { "\(firstName) \(lastName)" }
}

final class Doctor: Person {
    override func fullName() -> String { "Dr. \(lastName)" }
}

Doctor(firstName: "Dave", lastName: "Smith").fullName() // "Dr. Smith"
```

When you're holding the parent type, check and cast with `is` and `as?`.

```swift
let people: [Person] = [Doctor(firstName: "Dave", lastName: "Smith")]
for person in people {
    if let doctor = person as? Doctor { print(doctor.fullName()) }
}
```

Deep class trees are rare in modern Swift. Shared behaviour usually comes from [[docs/swift/swift-protocols|protocols]] instead.

## Property tools: static, didSet, lazy

```swift
struct Map {
    static let origin = Point(x: 0, y: 0) // belongs to the type, not an instance
}
Map.origin // Point(x: 0, y: 0)

struct Thermostat {
    var temperature = 20 {
        didSet { print("Changed from \(oldValue) to \(temperature)") }
    }
}
var heating = Thermostat()
heating.temperature = 22 // Changed from 20 to 22

class Client {
    lazy var session = URLSession(configuration: .default) // created on first use
}
```

`static` is like a TypeScript `static` field. `didSet` runs after every change (`willSet` before), but not during `init`. `lazy` delays expensive setup until something reads it.

## Extensions

`extension` adds methods and computed properties to any type, even ones you didn't write.

```swift
extension Int {
    var isOdd: Bool { self % 2 != 0 }
}

3.isOdd // true
8.isOdd // false
```

Extensions can't add stored properties. TypeScript has no safe equivalent; patching `Number.prototype` is the closest, and you shouldn't.

## ARC: how classes are freed

Structs live and die with the variable that holds them. Class instances are shared, so Swift counts the strong references to each one. When the count hits zero, the object is freed and its `deinit` runs. This is **Automatic Reference Counting** (ARC): the compiler writes the counting code for you, and there's no garbage collector.

```swift
class Order {
    let drink: String
    init(drink: String) { self.drink = drink }
    deinit { print("\(drink) freed") }
}

var first: Order? = Order(drink: "Latte") // count 1
var second = first                        // count 2
first = nil                               // count 1
second = nil                              // count 0: "Latte freed"
```

## Reference cycles and weak

If two objects hold strong references to each other, neither count reaches zero and both leak.

```swift
class Tenant {
    var apartment: Apartment?
}

class Apartment {
    weak var tenant: Tenant? // weak: doesn't add to the count
}
```

A `weak` reference doesn't keep the object alive, and becomes `nil` when it goes away, so it's always an optional `var`. Rule of thumb: **the owner holds strong, the back-reference is weak** (parent strong to child, child weak to parent, and delegates weak).

Closures cause the most common cycle: an object stores a closure that uses `self`.

```swift
class Stopwatch {
    var onTick: (() -> Void)?
    var ticks = 0

    func start() {
        onTick = { [weak self] in
            self?.ticks += 1 // without [weak self], the stopwatch keeps itself alive forever
        }
    }
}
```

In TypeScript the garbage collector handles cycles for you. In Swift you have to break them. With SwiftUI and structs you'll meet this less often, but it shows up in any class with a callback.

## Common mistakes

- Making everything a class out of habit from other languages. Start with a struct.
- Expecting a struct passed to a function to be changed by it. It got a copy.
- Thinking `let` makes a class instance read-only.
- Strong references in both directions, or `self` captured strongly in a stored closure. Use `weak`.

## Try it

1. Make a `struct BankAccount` with a `mutating func deposit(_:)`. Copy it, deposit into the copy, and print both balances.
2. Make the same as a `class`. What changes?
3. Add a `deinit` to a class, set the only reference to `nil` in a playground, and watch it print.

## Related
- [[docs/swift/swift-functions|Swift - Functions]]
- [[docs/swift/swift-enums|Swift - Enums]]
- [[docs/swift/swift-protocols|Swift - Protocols]]
- [[docs/swift/swift-swiftui|Swift - SwiftUI Basics]]
- [[docs/javascript/javascript-object-oriented|JavaScript - Classes]]
