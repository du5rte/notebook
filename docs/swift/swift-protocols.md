---
title: "Swift - Protocols"
type: doc
created: 2016-11-04
updated: 2026-10-07
tags: [swift]
---
# Swift - Protocols

A protocol is a contract: a list of properties and methods a type promises to have. "Anything that can be blended" or "anything with a full name". Structs, classes and enums can all sign the contract, and code can then work with any of them without caring which. Swift leans on protocols far more than on inheritance, and SwiftUI is built on them: every view you write conforms to the `View` protocol.

## Declaring and conforming

List the requirements, then add the protocol after the type's name.

```swift
protocol FullyNameable {
    var fullName: String { get }
}

struct User: FullyNameable {
    var fullName: String // stored
}

struct Friend: FullyNameable {
    let firstName: String
    let lastName: String

    var fullName: String { "\(firstName) \(lastName)" } // computed
}

Friend(firstName: "Taylor", lastName: "Swift").fullName // "Taylor Swift"
```

`{ get }` means "readable". The type decides how: a stored property or a computed one both count.

In TypeScript this is an `interface`. One big difference: TypeScript checks shape (anything with a `fullName` fits), Swift checks the declaration (the type must say `: FullyNameable`).

## Protocols as types

Use a protocol wherever a type goes: parameters, arrays, properties. Mixed types can share one array as long as they all conform.

```swift
protocol Blendable {
    func blend() -> String
}

struct Fruit: Blendable {
    let name: String
    func blend() -> String { "\(name) mush" }
}

struct Milk: Blendable {
    func blend() -> String { "milkshake" }
}

struct Cheese {} // not Blendable

func makeSmoothie(_ ingredients: [any Blendable]) -> [String] {
    ingredients.map { $0.blend() }
}

makeSmoothie([Fruit(name: "Strawberry"), Milk()]) // ["Strawberry mush", "milkshake"]
makeSmoothie([Cheese()]) // ❌ error: Cheese doesn't conform to Blendable
```

`any Blendable` reads as "a box holding any type that conforms". It's the modern spelling; older code writes `[Blendable]`.

## some vs any

You'll see `some` all over SwiftUI, so it's worth the contrast now.

- `any Blendable`: could be a different conforming type each time. Flexible; you can mix types in one array.
- `some Blendable`: one specific conforming type that the compiler knows but doesn't make you write out. Faster, and the type can't change.

```swift
func favourite() -> some Blendable {
    Fruit(name: "Mango") // always a Fruit, the caller just sees "some Blendable"
}
```

That's exactly `var body: some View` in [[docs/swift/swift-swiftui|SwiftUI]]: the body is one concrete (and very long) view type you never have to spell. Rule of thumb: ✅ `some` by default, `any` when you really need to mix types.

## Default behaviour with protocol extensions

Extend a protocol to give every conforming type a free implementation. A type can still write its own.

```swift
protocol Greeter {
    var name: String { get }
}

extension Greeter {
    func greeting() -> String { "Hi, \(name)" }
}

struct Barista: Greeter {
    let name: String
}

Barista(name: "Ana").greeting() // "Hi, Ana"
```

This is how Swift shares behaviour without a base class, sometimes called protocol-oriented programming.

## Adding conformance with an extension

You can make an existing type conform after the fact, even a type you didn't write. It also keeps each conformance in its own tidy block.

```swift
protocol PrettyPrintable {
    var prettyDescription: String { get }
}

struct Customer {
    let name: String
    let id: Int
}

extension Customer: PrettyPrintable {
    var prettyDescription: String { "name: \(name) id: \(id)" }
}
```

## Protocols you'll use every day

The standard library comes with protocols that unlock features. For many, Swift writes the code for you if all your properties already conform.

| Protocol | Unlocks | Written for you? |
|---|---|---|
| `Equatable` | `==` | ✅ structs and enums |
| `Hashable` | use in a `Set` or as a dictionary key | ✅ |
| `Comparable` | `<`, `sorted()` | ⚠️ simple enums only, otherwise you write `<` |
| `Identifiable` | an `id`, so SwiftUI `List` can track rows | needs an `id` property |
| `Codable` | JSON encoding and decoding | ✅ |

```swift
struct Drink: Identifiable, Hashable, Codable {
    var id = UUID()
    let name: String
}
```

Notice the naming: most protocols say what a type **can do** (`-able`).

## Inheritance vs composition

Inheritance says a thing **is a** something (`Jetplane` is an `Airplane`). Protocols say it **has a** capability (`Bird` and `Airplane` can both `Fly`). A bird isn't a plane, but both can fly, so a protocol fits where a base class wouldn't. A type can conform to many protocols but inherit from only one class.

```swift
protocol Flyer { func fly() -> String }

struct Bird: Flyer { func fly() -> String { "Flap flap" } }
class Airplane: Flyer { func fly() -> String { "Whoosh" } }
```

Protocols can also build on each other: `protocol PrettyPrintable: CustomStringConvertible { ... }` requires both.

## Delegates

A delegate is an object that another object reports to. "The race calls its tracker when a lap ends." Define the messages as a protocol, keep a `weak var delegate`, and any conforming object can listen.

```swift
protocol RaceDelegate: AnyObject {
    func raceDidEnd(winner: String)
}

class Race {
    weak var delegate: RaceDelegate?
    func end() { delegate?.raceDidEnd(winner: "Horse 3") }
}

class Scoreboard: RaceDelegate {
    func raceDidEnd(winner: String) { print("Winner: \(winner)") }
}

let race = Race()
let scoreboard = Scoreboard()
race.delegate = scoreboard
race.end() // Winner: Horse 3
```

`AnyObject` limits the protocol to classes, so the reference can be `weak` (see [[docs/swift/swift-structs-and-classes|Structs and Classes]]). In TypeScript you'd pass a callback or an event listener; you'll still meet delegates across Apple's frameworks, while SwiftUI mostly uses closures and bindings instead.

## Common mistakes

- **The extension dispatch trap.** A method that's only in a protocol extension (not listed in the protocol itself) is picked by the variable's declared type. If `Barista` writes its own `greeting()`, `Barista(...).greeting()` uses the barista's, but `(barista as any Greeter).greeting()` uses the extension's. Fix: list the method in the protocol.
- Building a deep class hierarchy for shared behaviour. A protocol plus an extension is usually lighter.
- A strong `delegate` property. It creates a reference cycle. Make it `weak`.

## Try it

1. Write a `Priceable` protocol with `var price: Double { get }`, conform a `Coffee` and a `Cake` struct, and total an `[any Priceable]`.
2. Give `Priceable` a default `formattedPrice` with a protocol extension.
3. Make a struct `Equatable` and `Hashable`, then put a few in a `Set`.

## Related
- [[docs/swift/swift-structs-and-classes|Swift - Structs and Classes]]
- [[docs/swift/swift-enums|Swift - Enums]]
- [[docs/swift/swift-swiftui|Swift - SwiftUI Basics]]
- [[docs/typescript/typescript|TypeScript - Basics]]
