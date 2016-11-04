# Swift - Conditionals

## Comparison Operators
Equal to Operator ==
Not Equal to Operator !=
Bigger than >
Smaller Than <
Bigger or Equal to >=
Smaller or Equal to <=

## If Statement

```
if condition {
  statement
}
```
```swift
var temperature = 20

if tempature < 18 {
  print("it's cold outside, wear a sweater")
}
```
## If Else Statement

```
if condition {
  statement
} else {
  statmenet
}
```
```swift
if tempature < 18 {
  print("it's cold outside, wear a sweater")
} else {
  print("it's great outside, a t-shirt will be fine")
}
```

## Full If Else Statement

```
if condition {
  statement
}

else if anotherCondition {
  statement
}

else {
  statmenet
}
```
```swift
if tempature < 10 {
  print("it's freezing outside, wear a jacket")
} else if tempeature < 18 {
  print("it's cold outside, wear a sweater")
} else {
  print("it's great outside, a t-shirt will be fine")
}
```


## Logical Operators

And Operator &&
```
if true && true {

}
```

Or Operator ||
```
if true || false {

}
```

Not Operator
```
if !false {

}
```

```swift
var results: [Int] = []

for n in 1...100 {
    // Enter your code below

    let isMultipleOfSeven = n % 7 == 0
    let isEven = n % 2 == 0
    let isOdd = !isEven

    // End code
    if isMultipleOfSeven && isOdd {
        results.append(n)
    }
}

results // [7, 21, 35, 49, 63, 77, 91]
```

## Switch Statements

```
switch value to consider {
    case value1:
        Respond to value1
    case value2:
        Respond to value2
    default:
        do something else
}
```

```swift
let airportCodes = ["LGA", "LHR", "CDG", "HKG", "DXB"]

for airportCode in airportCodes {
  switch airportCode {
      case "LGA":
          print("New York")
      case "LHR":
          print("London")
      default:
          print("Unknown City")
  }
}
```
```swift
var randomTemperature = 47

switch randomTemperature {
  case 0..<32: print("Frozen")
  case 32..<45: print("Freeeezing")
  case 45..<70: print("chilly")
  case 70...100: print("pretty hot")
  default: print("is melting")
}
```

```swift
var europeanCapitals: [String] = []
var asianCapitals: [String] = []
var otherCapitals: [String] = []

let world = [
    "BEL": "Brussels",
    "LIE": "Vaduz",
    "BGR": "Sofia",
    "USA": "Washington D.C.",
    "MEX": "Mexico City",
    "BRA": "Brasilia",
    "IND": "New Delhi",
    "VNM": "Hanoi"
]

for (key, value) in world {
    // Enter your code below
    switch key {
        case "BEL", "LIE", "BGR":
            europeanCapitals.append(value)
        case "VNM":
            asianCapitals.append(value)
        default:
            otherCapitals.append(value)
    }
    // End code
}
```
