---
title: "Swift - Error Handling"
type: doc
created: 2016-12-10
updated: 2026-10-07
tags: [swift]
---
# Swift - Error Handling

Things go wrong: the network drops, the JSON is missing a key, the card is declined. Swift makes failure **visible in the function's signature** with `throws`, and makes every caller acknowledge it with `try`. Compared with TypeScript, where any function might throw and nothing tells you, this feels strict at first and then very calm: you always know where an error can come from.

## Four kinds of failure

| Kind | Example | How Swift handles it |
|---|---|---|
| Compile-time | a typo, a type mismatch | the build fails, nothing runs |
| Simple "no value" | `Int("abc")` | returns `nil`, an [[docs/swift/swift-optionals\|optional]] |
| Something went wrong, and why matters | invalid data, network down | `throw` an error ✅ this lesson |
| A bug that should never happen | index out of range | the app crashes on purpose |

Rule of thumb: if the caller only needs "did it work?", return an optional. If they need to know **why** it failed, throw.

## Defining errors

An error is any type that conforms to the `Error` protocol. An enum is the natural fit, one case per reason, with associated values for detail.

```swift
enum OrderError: Error {
    case missingField(String)
    case outOfStock
}
```

## Throwing

Mark the function `throws`, then `throw` an error to leave it immediately.

```swift
struct Friend {
    let name: String
    let age: String
}

func makeFriend(from data: [String: String]) throws -> Friend {
    guard let name = data["name"] else {
        throw OrderError.missingField("name")
    }
    guard let age = data["age"] else {
        throw OrderError.missingField("age")
    }
    return Friend(name: name, age: age)
}
```

Compare with the optional version in [[docs/swift/swift-optionals|Optionals]]: that one returns `nil` and the caller can't tell which key was missing. This one says.

## try and do/catch

Calling a throwing function needs `try`, inside a `do` block with `catch` clauses. Catches are checked top to bottom, like a `switch`.

```swift
let response = ["name": "Ana", "ages": "32"] // typo in the key

do {
    let friend = try makeFriend(from: response)
    print("Welcome, \(friend.name)") // skipped: the line above threw
} catch OrderError.missingField(let field) {
    print("Missing \(field)")
} catch {
    print("Something else went wrong: \(error)") // `error` is provided for you
}
// Missing age
```

In TypeScript this is `try { } catch (e) { }`. Two differences: the `try` keyword marks the exact line that can throw, and you can match error cases right in the `catch`.

## try? and try!

Two shortcuts when you don't need the details.

```swift
let friend = try? makeFriend(from: response) // Friend? : nil if it threw
let sure = try! makeFriend(from: ["name": "Ana", "age": "32"]) // crashes if it throws
```

✅ `try?` when failure just means "no value".
❌ `try!` outside of tests and values you control. Like `!` on an optional, it turns an error into a crash.

## Passing errors up

A `throws` function can call other throwing functions without catching. The error travels up to whoever does catch it.

```swift
func welcome(_ data: [String: String]) throws -> String {
    let friend = try makeFriend(from: data) // if this throws, welcome throws too
    return "Hi, \(friend.name)"
}
```

## Errors and async

Network code is both `async` and `throws`, so you'll write `try await` constantly. It reads the same way.

```swift
func loadMenu(from url: URL) async throws -> [String] {
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode([String].self, from: data)
}
```

In TypeScript this is `await fetch(...)` inside `try/catch`, except a rejected promise there can go unnoticed. In Swift you can't call `loadMenu(from:)` without `try`.

## defer: always clean up

`defer` runs a block when the current scope ends, however it ends: normal return or thrown error. Use it for clean-up you can't forget.

```swift
func brew() throws {
    print("Heating up")
    defer { print("Machine off") }
    throw OrderError.outOfStock
}

try? brew()
// Heating up
// Machine off
```

Like `finally` in TypeScript, but written next to the setup it undoes. Several `defer`s run in reverse order.

## fatalError

`fatalError("message")` stops the app on purpose. It's for "this should be impossible" (a bug), not for errors the user can cause.

```swift
guard let menu = Bundle.main.url(forResource: "menu", withExtension: "json") else {
    fatalError("menu.json is missing from the app bundle")
}
```

## Common mistakes

- Using `try!` to quiet the compiler. Each one is a possible crash.
- A bare `catch { }` that swallows the error. At least print or log `error`.
- Throwing when an optional would do, or returning `nil` when the caller needs the reason.
- Forgetting the final general `catch`. A `do` must handle every error unless the function itself `throws`.

## Try it

1. Write `func withdraw(_ amount: Int, from balance: Int) throws -> Int` that throws `insufficientFunds(needed: Int)`.
2. Call it in `do/catch` and print how much more was needed.
3. Call it again with `try?` and print the result with `?? balance`.

## Related
- [[docs/swift/swift-optionals|Swift - Optionals]]
- [[docs/swift/swift-enums|Swift - Enums]]
- [[docs/swift/swift-functions|Swift - Functions]]
- [[docs/javascript/javascript-async|JavaScript - Asynchronous Programming]]
