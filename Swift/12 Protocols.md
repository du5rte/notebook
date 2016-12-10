# Swift - Protocols

## Protocols
A protocol defines a blueprint of methods, properties, and other requirements that suit a particular task or piece of functionality. Also know as `interface` in other programing languages it enforce an expectation of behaviors without using inheritance.

`User` and `Friend` both differ in their implementation but both conform to `FullyNameable`

```swift
protocol FullyNameable {
    var fullName: String { get }
}

struct User: FullyNameable {
    // assigns a value to fullName on init
    var fullName: String
}

let user = User(fullName: "John Smith")
user.fullName // "John Smith"

struct Friend: FullyNameable {
    // does not assign a value to fullName on init
    let firstName: String
    let middleName: String
    let lastName: String

    // instead creates a computed property base on inited values
    var fullName: String {
        return "\(firstName) \(middleName) \(lastName)"
    }
}

let friend = Friend(firstName: "Taylor", middleName: "Alison", lastName: "Swift")
friend.fullName // "Taylor Alison Swift"
```


## Modeling Behavior with Protocols
In the case that we have different `Employee`s and we want them to be `Payable`, adding a pay

```swift
class Employee {
    // ...

    // A extendable pay method sounds like a logic solution, but if we forget to override than on it will still work and pay the employee `0`
    func pay() -> (basePay: Double, benefits: Double, deductions: Double, vacationTime: Int) {
        return (0, 0, 0, 0)
    }
}

class HourlyEmployee: Employee {
    var hourlyWage: Double = 15.00
    var hoursWorked: Double = 0
    let availableVacation = 0

    // it works but it's a bad pratice
    override func pay() -> (basePay: Double, benefits: Double, deductions: Double, vacationTime: Int) {
        return (hourlyWage * hoursWorked, 0, 0, availableVacation)
    }
}

func payEmployee (employee: Employee) {
    employee.pay()
}
```

This a good example where protocols are useful to model class behaviors to ensure that the code behavior don't go wrong, so it helps you to avoid some errors based on human error, In this case it helps you showing you an error if you forgot to override the superclass method (pay method)
```swift
protocol Payable {
    func pay() -> (basePay: Double, benefits: Double, deductions: Double, vacationTime: Int)
}

class Employee {
    // ...

    // No longer needs a default method
    // func pay() -> (basePay: Double, benefits: Double, deductions: Double, vacationTime: Int) {
    //     return (0, 0, 0, 0)
    // }
}

// extends on `Employee` and `Payable`
class HourlyEmployee: Employee, Payable {
    var hourlyWage: Double = 15.00
    var hoursWorked: Double = 0
    let availableVacation = 0

    // no longer needs to override
    func pay() -> (basePay: Double, benefits: Double, deductions: Double, vacationTime: Int) {
        return (hourlyWage * hoursWorked, 0, 0, availableVacation)
    }
}

// on type of `Payable`
func payEmployee (employee: Payable) {
    employee.pay()
}
```


## Protocols as Types
Also useful to conform loosely related objects, protocols can be use as a type, as a parameter type or return type in a function, method or initializer, as the type of a constant, variable or property, or as the type of items in a array, dictionary or any other container.


```swift
protocol Blendable {
    func blend()
}

class Fruit: Blendable {
    var name: String

    init(name: String) {
        self.name = name
    }

    func blend() {
        print("I'm mush")
    }
}

// not every Dairy ingredient is good for a smoothly
class Dairy {
    var name: String

    init(name: String) {
        self.name = name
    }
}

class Cheese: Dairy {}

class Milk: Dairy, Blendable {

    func blend() {
        print("I'm milkshake")
    }
}
```

Because all of them conform to the blendable protocol we are sure they will have the blend method
```swift
func makeSmoothie(ingredients: [Blendable]) {
    for ingredient in ingredients {
        ingredient.blend()
    }
}

let strawberry = Fruit(name: "Strawberry")
let cheddar = Cheese(name: "Cheddar")
let chocolateMilk = Milk(name: "Chocolate")

//let ingredients = [strawberry, chocolateMilk] // Error add explicit type annotation [Any]
//let ingredients: [Blendable] = [strawberry, cheddar] // Error 'Cheese' does not conform
let ingredients: [Blendable] = [strawberry, chocolateMilk]

makeSmoothie(ingredients: ingredients)
```

## IS-A vs HAS-A
If a model want to use the same features and maybe expand on them `inheritance` is the best option on the flip side is a model has common features with another model `composition` is a better option.

### IS-A
`Jetplane` is a `Airplane`
```swift
class Airplane {}

// inherits and maybe expands on Airplane
class Jetplane: Airplane {}
```

### HAS-A
`Bird` has a `Fly` feature
```swift
// Extract Fly feature into a protocol
protocol Fly {}

// both share a common relationship with Fly protocol
class Airplane: Fly {}

struct Bird: Fly {}
```

## Protocol Inheritance
protocol can be inherit other protocols

```swift
protocol Printable {
    func description() -> String
}

// extends on `Printable`
protocol PrettyPrintable: Printable {
    func prettyDescription() -> String
}

// User now conforms with PrettyPrintable which in turn conforms to Printable
struct User: PrettyPrintable {
    let name: String
    let age: Int
    let address: String

    func description() -> String {
        return "\(name). \(age). \(address)"
    }

    func prettyDescription() -> String {
        return "name: \(name) age: \(age) address: \(address)"
    }
}

let user = User(name: "eddie", age: 25, address: "sesame street")

user.description()
user.prettyDescription()
```


## Swift's Standard Library Protocols
Swift has 55 Swift Standard Library Protocols, mostly grouped into 3 categories. [What the 55 Swift Standard Library Protocols Taught Me](https://www.skilled.io/gregheo/what-the-55-swift-standard-library-protocols-taught-me).

- `Can do` (-able) .eg Equatable, FullyNameable
- `Is a` (-Type) .eg IntType
- `Can be` (-Convertible) .eg FloatLiteralConvertible, NilLiteralConvertable


## Protocol Oriented Programming
Carefully defining the defining of objects

## Protocol Conformance Using Extensions
One of the most useful aspects of extensions is that we can add protocol conformance to any existing types

```swift
import UIKit
import GameKit

protocol UniqueType {
    var id: Int { get }
}

extension UIView: UniqueType {
    var id: Int {
        return Int(arc4random_uniform(1000) + 1)
    }
}
```

```swift
protocol PrettyPrintable {
    var prettyDescription: String { get }
}

struct User {
    let name: String
    let ID: Int
}

// Enter your code below

extension User: PrettyPrintable {
    var prettyDescription: String {
        return "name: \(self.name) id: \(self.ID)"
    }
}
```

## Protocol Extensions
extends protocols themselves to provide default implementations

```swift
import Foundation
import UIKit

protocol UniqueType {
    var id: Int { get }
}

extension UniqueType {
  // we extend a protocol we can make calculated properties & methods
    var id: Int {
        return Int(arc4random_uniform(1000) + 1)
    }
}

extension UIView: UniqueType {
    // protocols extensions work as defaults and can be override
   var id: Int {
       return 1
   }
}

let view = UIView()
view.id
```


## Method Dispatch in a Protocol Extension

```swift
protocol PersonType {

    var firstName: String { get }
    var middleName: String? { get }
    var lastName: String { get }

    func fullName() -> String
}


extension PersonType {
    // default implementations
    func  fullName() -> String {
        return "\(firstName) \(middleName ?? "") \(lastName)"
    }

    func greeting() -> String {
        return "Hi, " + fullName()
    }
}

struct User: PersonType {

    let firstName: String
    let middleName: String?
    let lastName: String

    // defined implemation for greeting()
    func greeting() -> String{
        return "Hey there, " + fullName()
    }

    func fullName() -> String {
        return "\(lastName), \(firstName)"
    }
}

let someUser = User(firstName: "Pasan", middleName: nil, lastName: "Premaratne")
// conforms to PersonType again
let anotherUser: PersonType = User(firstName: "Gabriel", middleName: nil, lastName: "Nadel")

// uses `greeting()` from the struct
someUser.greeting() // "Hey there, Premaratne, Pasan"
// uses `greeting()` from the protocol
anotherUser.greeting() // "Hi, Nadel, Gabriel"


struct Friend: PersonType {
    let firstName: String
    let middleName: String?
    let lastName: String

    func greeting() -> String {
        return "Hello, " + fullName()
    }
}

let someFriend = Friend(firstName: "Ben", middleName: nil, lastName: "Jakuben")

let people = [someUser, anotherUser, someFriend]

// uses the default implementation
for person in people {
    print (person.greeting())
}
```
