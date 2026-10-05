# Swift - Enums


## Enumerates


```swift
enum Direction {
  case Left, Right, Up, Down
}
```

```swift
enum Day {
  case Monday
  case Tuesday
  case Wednesday
  case Thursday
  case Friday
  case Saturday
  case Sunday
}

enum DayType {
  case Weekday
  case Weekend
}

func weekdayOrWeekend(day: Day) -> DayType {
  switch day {
    case Day.Saturday, Day.Sunday: return DayType.Weekend

    // because Day is mentioned in `switch` it can be omitted
    // it also knows DayType is returned so i can also be omitted
    case .Monday, .Tuesday, .Wednesday, .Thursday, .Friday: return .DayType

    // because all options have been covered there's not need for `default:`
  }
}
```

## Associated Enums

```swift
enum MobilePhone {
    case iPhone(String)
    case Android(String)
    case Blackberry(String)
    case WindowsPhone(String)
}

let iPhone = MobilePhone.iPhone("6S")
```


```swift
// import CoreGraphics
import UIKit

// CGFloat Core Graphics Float

enum ColorCompoent {
    case RGB(CGFloat, CGFloat, CGFloat, CGFloat)
    case HSB(CGFloat, CGFloat, CGFloat, CGFloat)

    func color() -> UIColor {
        switch self {
            case .RGB(let red, let green, let blue, let alpha):
                return UIColor(
                    red: red/255.0,
                    green: green/255.0,
                    blue: blue/255.0,
                    alpha: alpha
                )
            case .HSB(let hue, let saturation, let brightness, let alpha):
                return UIColor(
                    hue: hue/360.0,
                    saturation: saturation/100.0,
                    brightness: brightness/100.0,
                    alpha: alpha
                )
        }

    }
}

ColorCompoent.RGB(61.0, 120.0, 198.0, 1.0)
// RGB(61.0, 120.0, 198.0, 1.0)
ColorCompoent.RGB(61.0, 120.0, 198.0, 1.0).color()
// actual color r 0.239 g 0.471 b 0.776 a 1.0

ColorCompoent.HSB(hue: 254, saturation: 50, brightness: 50, alpha: 1).color()
// actual color r 0.308 g 0.25 b 0.5 a 1.0
```

## Optionals

Using an `?` wraps its a conditional type of `Int` or `nil` (abscent of data)
```swift
// Type `Int` or `nil`
var someInt: Int?
```

Using an `!` unwraps it from that condition, it's very unrecommended to use this method

```swift
struct Person {
    let firstName: String
    let middleName: String?
    let lastName: String

    func getFullName() -> String {
        if middleName == nil {
            return firstName + " " + lastName
        } else {
            // `!` forces unwrap, highly unrecommended!
            return firstName + " " + middleName! + " " + lastName
        }

    }
}

let me = Person(firstName: "Duarte", middleName: nil, lastName: "Monteiro")

me.getFullName()
```

## If Let

```swift
let airportCodes = ["CDG": "Charles de Gaulle"]

// if this optinal value exist execute this code
if let newYorkAirport = airportCodes["JFK"] {
    // automatically unwraps the optional value
    print(newYorkAirport)
} else {
    print("Whoops that key does not exist")
}
```

## The Optimal Pyramid of Doom
It can quickly lead to a pyramid of code, there's better way to do this in swift 2


```swift
if let dailyWeather = weatherDictionary["daily"] {
    if let highTemperature = dailyWeather["temperature"] {
        print(highTemperature)
    }
}

if the previous was true
if let dailyWeather = weatherDictionary["daily"], let highTemperature = dailyWeather["temperature"] {
  print(highTemperature)
}
```

```swift
struct Friend {
    let name: String
    let age: String
    let address: String?
}
```


Even is address is non existing it will jump into else statement
```swift
func createFriend(dict: [String: String]) -> Friend? {
    if let name = dict["name"], let age = dict["age"], let address = dict["address"] {
        return Friend(name: name, age: age, address: address)
    } else {
        return nil
    }

}
```


This way we check for name and age and address can be optional
```swift
func createFriend(dict: [String: String]) -> Friend? {
    if let name = dict["name"], let age = dict["age"] {
        let address = dict["address"]

        return Friend(name: name, age: age, address: address)
    } else {
        return nil
    }
}
```

## Guard
This is the safer and cleaner way to write optionals as `guard` forces to write the worst case scenario up front
```swift
func createFriend(dict: [String: String]) -> Friend? {
    guard let name = dict["name"], let age = dict["age"] else {
        return nil
    }

    let address = dict["address"]

    return Friend(name: name, age: age, address: address)
}
```


## Raw Values
default values raw values can only be `String`, `Int`, `Float` or `Double`

```swift
enum Coin: Double {
    case Penny =  0.01
    case Nickel = 0.05
    case Dime = 0.10
    case Quarter = 0.25
}

func totalValue(coins: [Coin]) -> Double {
    var total: Double = 0

    for coin in coins {
        total += coin.rawValue
    }

    return total
}

let coins: [Coin] = [.Penny, .Nickel, .Dime, .Dime, .Quarter, .Quarter, .Quarter]
totalValue(coins: coins)
```


```swift
enum HTTPMethod: Sring {
    case POST, GET, PUT, DELETE
}

HTTPMethod.GET.rawValue // "GET"
```

## Optional Chaining

```swift
class Address {
    // classes require a init() method but when dealing with optionals it's not required
    var streetName: String?
    var buildingNumber: String?
    var apartmentNumber: String?
}

class Residence {
    var address: Address?
}

class Person {
    var residence: Residence?
}

let susan = Person()
let address = Address()
let residence = Residence()

address.streetName = "Sesame Street"
address.buildingNumber = "123"
address.apartmentNumber = "69"

residence.address = address

susan.residence = residence
```

When we have this many level it takes a lot of work to check just get the apartmenet number
```swift
if
    let home = susan.residence,
    let postalAddress = home.address,
    let apartmentNumber = postalAddress.apartmentNumber,
    let convertedNumber = Int(apartmentNumber)
{
    print(convertedNumber)
}
```
A more elegant way is to use optional chaining
```swift
let apartmentNumber = susan.residence?.address?.apartmentNumber
```

```swift
if let apartmentNumber = susan.residence?.address?.apartmentNumber {
    print(apartmentNumber)
}
```

## Pattern Matching With Enums

Instead of looping through each case in wallet and matching again a case
```swift
for coin in wallet {
    switch coin {
        case .Quarter: count += 1
        default: continue
    }
}
```
There's a more elegant way to do this in swift 2
```swift
for case .Quarter in wallet {
    count += 1
}
```

```swift
for coin in wallet {
    if case .Nickel = coin {
        print("Not so much money!")
    } else if case .Dime = coin {
        print("Eh I guess it's some money")
    }
}
```


## Nil Coalescing Operator

```swift
let firstName: String? = "Duarte"
let userName = "du5rte"

var displayName: String
```
With the ternary conditional operator we have to use bang operator which is unrecommended

```swift
displayName = firstName != nil ? firstName! : userName
```

Using Nil Coalescing Operator that's not necessary
```swift
displayName = firstName ?? userName
```

## Computed Properties
Instead of using a function we can just user computed Properties

```swift
let UIFontTextStyleHeadline = "UIFontTextStyleHeadline"
let UIFontTextStyleBody = "UIFontTextStyleBody"
let UIFontTextStyleFootnote = "UIFontTextStyleFootnote"

enum Text: String {
    case Headline
    case Body
    case Footnote

    var style: String {
        switch self {
            case .Headline: return UIFontTextStyleHeadline
            case .Body: return UIFontTextStyleBody
            case .Footnote: return UIFontTextStyleFootnote
        }
    }
}
```
