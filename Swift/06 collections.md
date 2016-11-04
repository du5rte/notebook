## Swift - Collections and Control Flow


## Arrays

```swift
var shopping = ["Eggs", "Fish", "Meat"]
// or
var shopping: [String] = ["Eggs", "Fish", "Meat"]

// reading values
let firstItem = shopping[0] // "Eggs"

// add items (mutable)
shopping.append("milk")
// or
shopping += ["butter", "apples"]

// modifying items
todo[4] = "Cereals"

// swift 2.0
shopping.insert("Ham", atIndex: 2)
shopping.removeAtIndex(2)

// swift 3.0
shopping.insert("Ham", at: 2)
shopping.remove(at:2)


shopping.count // 5
```

## Dictionaries


```swift
var dictionary = ["Key": "Value"]


var airportCodes: [String: String] = [
    "LGA": "La Guardia",
    "LHR": "Heathrow",
    "CDG": "Charles De Gaulle",
    "HKG": "Hong Kong International",
    "DXB": "Dubai International"
]

let dict: [Int: String] = [
  1: "someValue",
  2: "anotherValue"
]

// Read from a dictionary

airportCodes["LGA"]

// Insert Key Value Pairs (mutable)

airportCodes["SYD"] = "Sydney Airport"
airportCodes.updateValue("Dublin Airport", forKey: "DUB")

// Remove Key Value pairs

airportCodes["DUB"] = nil
```

Optional Type
A value that can contain of two values, if it doesn't contain it returns nil otherwise it will return the value
