---
title: "Swift - SwiftUI Basics"
type: doc
created: 2026-10-07
updated: 2026-10-07
aliases: ["SwiftUI"]
tags: [swift]
---
# Swift - SwiftUI Basics

SwiftUI is Apple's way of building interfaces for iPhone, Mac and Apple Watch. If you know React, you already know the big idea: **the UI is a function of state**. You describe what the screen looks like for the current data, and SwiftUI redraws it when the data changes. No storyboards, no outlets wiring buttons to code. The same views run on watchOS, so everything here applies to a watch app too, just on a smaller screen.

## An app is a struct, and so is a view

A view is a struct that conforms to the `View` protocol. Its only requirement is a `body` that returns other views.

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Good morning ☕️")
    }
}

#Preview {
    ContentView()
}
```

`some View` means "one specific view type I don't have to spell out" (see [[docs/swift/swift-protocols|Protocols]]). `#Preview` renders it live in Xcode's canvas while you type.

The app itself is one more struct, marked `@main`:

```swift
@main
struct CoffeeApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

In React this is a function component returning JSX, and `@main` is your `createRoot(...).render(<App />)`.

## Stacks: laying things out

Views go in stacks: `VStack` (top to bottom), `HStack` (left to right) and `ZStack` (on top of each other). `Spacer()` pushes things apart.

```swift
struct OrderRow: View {
    let drink: String
    let price: Double

    var body: some View {
        HStack {
            Text(drink)
            Spacer()
            Text(price, format: .currency(code: "GBP"))
        }
    }
}
```

In CSS terms, `VStack` and `HStack` are flexbox columns and rows, and `Spacer()` is a `flex: 1` gap.

Views are cheap structs, not live objects. SwiftUI creates and throws them away all the time, so never store anything important in a plain property and expect it to survive.

## Modifiers

You style a view by chaining **modifiers**. Each one wraps the view in a new view, so **order matters**.

```swift
Text("Latte")
    .padding()
    .background(.yellow) // yellow includes the padding

Text("Latte")
    .background(.yellow)
    .padding() // yellow hugs the text, padding outside it
```

Common ones: `.font(.title)`, `.foregroundStyle(.secondary)`, `.padding()`, `.frame(maxWidth: .infinity)`, `.background(...)`, `.clipShape(.capsule)`. Xcode's autocomplete lists the rest.

In React this is the `style` prop, except it's a chain and each step wraps the last. Think of it as layers.

## @State: data a view owns

Mark a property `@State` and SwiftUI stores it outside the struct, keeps it between redraws, and re-renders the body when it changes.

```swift
struct CupCounter: View {
    @State private var cups = 0

    var body: some View {
        VStack {
            Text("\(cups) cups today")
            Button("Another one") {
                cups += 1
            }
        }
    }
}
```

In React this is `const [cups, setCups] = useState(0)`. In SwiftUI you just assign: `cups += 1`. Keep `@State` `private`: it belongs to this view.

## @Binding: let a child change the parent's state

A child view gets a **binding**: read and write access to state that lives somewhere else. Pass it with `$`.

```swift
struct MilkToggle: View {
    @Binding var hasMilk: Bool

    var body: some View {
        Toggle("Milk", isOn: $hasMilk)
    }
}

struct OrderForm: View {
    @State private var hasMilk = false

    var body: some View {
        VStack {
            MilkToggle(hasMilk: $hasMilk)
            Text(hasMilk ? "With milk" : "Black")
        }
    }
}
```

`hasMilk` is the value, `$hasMilk` is the binding. In React you'd pass both `hasMilk` and `setHasMilk` as props. A binding is that pair in one.

## @Observable: shared app data

When several views need the same data, put it in a class marked `@Observable`. The view that creates it owns it with `@State`; children receive it as a plain property. SwiftUI tracks which properties each body reads and only redraws those views.

```swift
@Observable
class Order {
    var drinks: [String] = []
    var total: Double = 0

    func add(_ drink: String, price: Double) {
        drinks.append(drink)
        total += price
    }
}

struct MenuScreen: View {
    @State private var order = Order() // the owner

    var body: some View {
        VStack {
            Button("Add latte") { order.add("Latte", price: 3.2) }
            Basket(order: order)
        }
    }
}

struct Basket: View {
    let order: Order // a class, so this is the same shared object

    var body: some View {
        Text("\(order.drinks.count) drinks, £\(order.total, specifier: "%.2f")")
    }
}
```

If a child needs a binding into it (for a `TextField`, say), declare it `@Bindable var order: Order` and use `$order.note`.

This is one of the few places you want a class: one shared, changing thing (see [[docs/swift/swift-structs-and-classes|Structs and Classes]]). In React terms it's a small store, like a Zustand store, without selectors.

| You need | Use | React |
|---|---|---|
| Local view state | `@State` | `useState` |
| Child edits parent's value | `@Binding` | value + setter props |
| Shared model | `@Observable` class + `@State` owner | store or context |

## Lists

`List` shows rows, and works best with data that's `Identifiable` so SwiftUI can tell rows apart (like React's `key`).

```swift
struct Drink: Identifiable, Hashable {
    let id = UUID()
    let name: String
}

let menu = [Drink(name: "Latte"), Drink(name: "Flat white")]

List(menu) { drink in
    Text(drink.name)
}
```

Inside other views, `ForEach(menu) { drink in ... }` does the same without the list styling.

## Navigation

`NavigationStack` holds a stack of screens. `NavigationLink` pushes a value, and `.navigationDestination` says which view shows for that type.

```swift
struct MenuList: View {
    let menu: [Drink]

    var body: some View {
        NavigationStack {
            List(menu) { drink in
                NavigationLink(drink.name, value: drink)
            }
            .navigationTitle("Menu")
            .navigationDestination(for: Drink.self) { drink in
                Text("You picked a \(drink.name)")
            }
        }
    }
}
```

The value must be `Hashable`. This works the same on Apple Watch: a list you tap into is the classic watch app layout.

## Common mistakes

- Putting a `NavigationStack` inside every screen. Use one at the root; pushed screens inherit it.
- Holding an `@Observable` model as a plain `let` in the view that **creates** it. It gets recreated on every redraw. The creator uses `@State`.
- Expecting modifiers to be order-independent like CSS properties. They wrap, so order changes the result.
- Lists of data without stable ids. Rows flicker or animate wrongly. Make the data `Identifiable`.

## Try it

1. Build a counter with a `+` and a `-` button that can't go below zero.
2. Move the `-`/`+` buttons into a child view that takes a `@Binding`.
3. Make an `@Observable` `Order` with a list of drinks, show it in a `List`, and push a detail screen with `NavigationStack`.

## Related
- [[docs/swift/swift-structs-and-classes|Swift - Structs and Classes]]
- [[docs/swift/swift-protocols|Swift - Protocols]]
- [[docs/swift/swift-functions|Swift - Functions]]
- [[docs/react/react|React - Basics]]
