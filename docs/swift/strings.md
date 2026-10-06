---
title: "Swift - Strings"
type: doc
created: 2016-11-04
updated: 2016-11-04
tags: [swift]
---
# Swift - Strings

## Strings

```swift
let country = "United States of America"
let state = "North Carolina"
let city = "Charlotte"
let street = "West Street"
```

## Strings Concatenation

```swift
let concatenatedAddress = country + ", " + state + ", " + city

// different types cannot be concatenated
let streetAddress = 222 + street // Error
```

## String Interpolation

```swift
let interpolateAddress = "\(country), \(state), \(city)"

// different types can be interpolated
let streetAddress = "\(222) \(street)"
```

## Related
- [[docs/swift/numbers|Swift - Numbers]]
- [[docs/swift/booleans|Swift - Booleans]]
- [[docs/swift/collections|Swift - Collections and Control Flow]]
