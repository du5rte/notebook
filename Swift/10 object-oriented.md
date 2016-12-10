# Swift - Objects

## Structs vs Classes
Structures are good for defining object instances, storing instances of data. Classes are best for doing things, modeling state and change inner models
```
are things? Structs
do things? Classes
```

## Struct
Structs work with value types, meaning values are copied, creating a new place in memory, changing the value of one instance of a struct doesn't change the others.

```swift


struct Point {
  init(x: Int, y: Int) {
      self.x = x
      self.y = y
  }
}

```

## Classes
Classes work with Reference Types, meaning values are referenced, pointing to the same place in memory and changing the existing one.

```swift

struct Point {
    let x: Int
    let y: Int

    init(x: Int, y: Int) {
        self.x = x
        self.y = y
    }

    func surroundingPoints(withRange range: Int = 1) -> [Point] {
        var results: [Point] = []


        for xCoord in (x-range)...(x+range) {
            for yCoord in (y-range)...(y+range) {
                let coordinatePoint = Point(x:xCoord, y:yCoord)

                results.append(coordinatePoint)
            }
        }

        return results
    }
}

let coordinatePoint = Point(x:0, y:0)

// Method
coordinatePoint.surroundingPoints()

class Enemy {
    var life: Int = 2
    var position: Point

    init(x: Int, y: Int) {
        self.position = Point(x: x, y: y)
    }

    func decreaseHealth(factor: Int) {
        life -= factor
    }
}




class Tower {
    let position: Point
    var range: Int = 1
    var strength: Int = 1

    init(x: Int, y: Int) {
        self.position = Point(x: x, y: y)
    }

    func fireAtEnemy(enemy: Enemy) {
        if inRange(position: self.position, range: self.range, target: enemy.position) {
            while enemy.life > 0 {
                enemy.decreaseHealth(factor: self.strength)

                print("Enemy vanquished!")
            }
        } else {
            print("Darn! The enemy is out of range!")
        }
    }

    func inRange(position: Point, range: Int, target: Point) -> Bool {

        let availablePosition = position.surroundingPoints(withRange: range)

        for point in availablePosition {
            if (point.x == target.x) && (point.y == target.y) {
                return true
            }
        }

        return false
    }
}

let tower = Tower(x: 0, y: 0)
let enemy = Enemy(x: 1, y: 1)

tower.fireAtEnemy(enemy: enemy)
```

## helper methods
Methods that we do not call directly on an instance but help compute the output for another function


## Class Inheritance
sub class

```swift
// creates a sub class
class SuperEnemy: Enemy {
  let isSuper: Bool = true


}

let SuperEnemy = SuperEnemy(x: 1, y: 1)
```

```swift
class Person {
    let firstName: String
    let lastName: String

    init(firstName: String, lastName: String) {
        self.firstName = firstName
        self.lastName = lastName
    }

    func getFullName() -> String {
        return "\(firstName) \(lastName)"
    }
}

// Enter your code below

class Doctor: Person {
    override func getFullName() -> String {
        return "Dr. \(lastName)"
    }
}

let someDoctor = Doctor(firstName: "Dave", lastName: "Smith")
```



## Type Methods
Methods that are defined on the type itself rather than an instance. Useful for uses that don't hold on to data.

```swift
class PlistConverter {
    class func someMethod() {

    }
}

// Instead of doing
// let t = listConverter
// t.someMethod()

// We an do
PlistConverter.someMethod()
```

## Type Casting
Also known as Down Casting is the process of converting from a superclass to a more specific subclass. When working with classes additional values or methods that are not defined in the `Superclass` maybe be available when using it as a base type.

```swift
class Employee {
    var name: String

    init(name: String) {
        self.name = name
    }
}

class HourlyEmployee: Employee {
    let hourlyWage: Double
    var hoursWorked: Double

    init(name: String, hourlyWage wage: Double, hoursWorked hours: Double) {
        self.hourlyWage = wage
        self.hoursWorked = hours
        super.init(name: name)
    }

    func payWages() -> Double {
      return hourlyWage * hoursWorked
    }
}

class SalariedEmployee: Employee {
    let salary: Double

    init(name: String, salary: Double) {
        self.salary = salary
        super.init(name: name)
    }

    func paySalary() -> Double {
      return salary
    }
}

let employees: [Employee] = [ ... ]

for employee in employees {
  // Error
  // The type of each item we get is not HourlyEmployee or SalariedEmployee
  // But the base class Employee
  employee.paySalary()
}

```

### Is
A way to check it's type

```swift
for employee in employees {

  if employee is HourlyEmployee {
    print("Hourly")
  }

  if employee is SalariedEmployee {
    print("Salaried")
  }
}
```

### As
`as?` conditional `as!` Forced

```swift
for employee in employees {

  if employee is HourlyEmployee {
    // if you are 100% the down cast will succeed
    let hourlyEmployee = employee as! HourlyEmployee
    hourlyEmployee.payWages()
  }

  if employee is SalariedEmployee {
    // for a safer option
    let salariedEmployee = employee as? SalariedEmployee
    salariedEmployee?.paySalary()

    // or for automated unwrapping the optinal
    if let salariedEmployee = employee as? SalariedEmployee {
      salariedEmployee.paySalary()
    }
  }
}
```

## Type Properties
Are associated with the type it self not the instance, they are useful in cases where the property won't change from instance to instance

```swift
struct LevelTracker {
  static let maxLevel: Int = 99
}
```

```js
struct Point {
    let x: Int
    let y: Int
}

struct Map {
    // it's associated with the type itself
    // doesn't not need an instance to be accessed
    static let origin: Point = Point(x: 0, y: 0)

    // if it's defined as a var it can be changed later on
    static var name: String = "Awesome Map"
}

Map.origin
Map.name = "Cool Map"
```

## Computed Properties
A Computed property does not actually store a value, but computes it based on the values of other stored properties. They work on classes, structs and enums.

```swift
struct Rectangle {
    var length: Int
    var width: Int

    // computed properties cannot be constants
    var area: Int {
        return length * width
    }
}

let r1 = Rectangle(length: 5, width: 10)

r1.area // 50
```

By default computed properties are read-only unless they have a `get` and `set`

```swift
struct Point {
    var x: Int = 0
    var y: Int = 0
}

struct Size {
    var width: Int = 0
    var height: Int = 0
}

struct Rectange {
    var origin = Point()
    var size  = Size()

    var center: Point {
        // how we get the value
        get {
            let centerX: Int = origin.x + size.width/2
            let centerY: Int = origin.y + size.height/2

            return Point(x: centerX, y: centerY)

        }

        // how we set the value
        // it can't actually store it but we can modift it's origin
        set(centerValue) {
            origin.x = centerValue.x - size.width/2
            origin.y = centerValue.y - size.height/2
        }
    }
}

var rect = Rectange()
print(rect.center)

// may look like we are storing on the property but we actually change the origin
rect.center = Point(x: 10, y: 15)
print(rect.center)
```

## Lazy Stored Properties
A property whose initial value is not calculated until the first time we use it, Helps save computing resources for expensive tasks by deferring until we actually need it

```swift
class ReadItLaterClient {
    // can't be a constant because it's not created initially
    lazy var session: URLSession = URLSession(configuration: URLSessionConfiguration.default())
}
```

## Property Observers
A property observer allows you to execute some code any time a value is set or about to be set. willSet and didSet are not called during the initialisation process.

```swift

class {
  ...

  // property
  var value: Double = 0.0 {
    // before it as set
    willSet {
      print("Old value: \(value)")
    }

    // once it as set
    didSet {
      tempView.alpha = CGFloat(value)
      print("Old value: \(value)")
    }
  }
}
```
```swift
class TemperatureController: UIViewController {
    var temperature: Double {
        didSet {
            if (temperature > 80) {
                return view.backgroundColor = UIColor.redColor()
            } else if (temperature < 40) {
                return view.backgroundColor = UIColor.blueColor()
            } else {
                return view.backgroundColor = UIColor.greenColor()
            }
        }
    }

    init(temperature: Double) {
        self.temperature = temperature
        super.init()
    }

    override func viewDidLoad() {
        view.backgroundColor = UIColor.whiteColor()
    }
}
```

## Initialisation
Prepares an object (`Struct`, `Class` or `Enum`) for use, assign values to all store properties and any other setup

In the init method we assign default or optional values to stored properties
```swift
init() {}
```

### Failable Initializer
An optional that either contains the object, if the initialization succeeded, or contains nil if initialization failed. e.g. UIImage
```swift
init?(named name: String) {}
```

### Throwing Initializer
An error if the initialization process fails, an object if it succeeds

```swift
enum PersonError: Error {
    case InvalidData
}

class Person {
    let name: String
    let age: Int

    init?(dict: [String: AnyObject]) throws {
        guard
            let name = dict["name"] as? String,
            let age = dict["age"] as? Int
        else {
            throw PersonError.InvalidData
        }

        self.name = name
        self.age = age
    }
}
```

### Failable and Throwing Initializer
Initializer can be both Failable and Throwing but we should do that


### Initializer Delegation
We can have multiple init methods allowing to create object in numerous ways

```swift
struct Rectange {
    var origin = Point()
    var size  = Size()

    init(origin: Point, size: Size) {
        self.origin = origin
        self.size = size
    }

    // we can have multiple init as long as they have different parameters
    init(x: Int, y: Int, height: Int, width: Int) {
        let origin = Point(x: x, y: y)
        let size = Size(width: width, height: height)

        // we can call on another initilizer
        self.init(origin: origin, size: size)
    }

    // if we know the center we can determine the origin
    init(center: Point, size: Size) {
      let originX = center.x - size.width/2
      let originY = center.y - size.height/2
      let origin = Point(x: originX, y: originY)

      self.init(origin: origin, size: size)
    }
}
```

### Designated Initializers
Initialization with referenced types required not only Initializer it's current properties but as well as all other inherited properties from it's super class. Every class must have at least a initializer *Designated Initializer* responsible for initializing store properties and calling super init.

```swift
class Vehicle {
    var name: String

    // designated initializer
    init(name: String) {
        self.name = name
    }
}
```

### Convenience Initializers
Designated initializers always delegate instantiation up the chain. Convenience initializers always delegate across the chain.

```swift
class Vehicle {
    var name: String

    // designated initializer
    init(name: String) {
        self.name = name
    }

    // convenience initializer
    convenience init() {
        // you need to call the designated initializer first
        self.init(name: "Unnamed")
    }
}
```

### Required Initializers
Specifies that subclasses or value types that inherit from a protocol must implement an initializer

```swift
class SomeClass {
    required init() {

    }
}

class AnotherClass: SomeClass {
  // init by itself will throw an compiler error
  // init() {
  //       
  // }

  // it needs to be
  required init() {

  }
}
```

## Value Semantics
Value types are inherently immutable so you cannot change them. When you modify a value type, a copy is created an assigned to the variable.

```swift
struct Point {
    var x: Double
    var y: Double

    // we cannot reassign the value of a properties
    // but we can create a new copy with a new value
    // for that we use `mutating` to let swift make it's magic under the hood
    mutating func moveLeft(steps: Double) {
        x -= steps
    }


}

// assigned to a variable
var p1 = Point(x: 1, y: 2)
var p2 = p1

// here it might loo like we are changing the property
// but actually swift created a copy of the struct with a the new value
p1.x = 4 // 4
// that's why p2.x still remaind 1
p2.x     // 1


// assigned to a constant
let p3 = Point(x: 2, y: 4)
// can't change it's properties
// p3.x = 5

struct AnotherPoint {
    let x: Double
    let y: Double
}

var p4 = AnotherPoint(x: 1, y: 2)
// p4.x = 5
// again change it's properties
```

## Reference Semantics
In contrast to value types, reference types aren't copied and this leads to some very interesting behavior.

```swift
class Robot {
    var model: String

    init(model: String) {
        self.model = model
    }
}

var someRobot = Robot(model: "T1999")
var anotherRobot = someRobot

// unlike value semanatics
someRobot.model = "T2000"
// it remains de same as values are referenced
anotherRobot.model // T2000

// what's constant is the reference the object
let thirdRobot = Robot(model: "T3000")
// not the object it self
thirdRobot.model = "TXXX"
```

## Mixed Semantics
when you mix the two together in a single type\

```swift
// unlike value semanatics
someRobot.model = "T2000"
// it remains de same as values are referenced
anotherRobot.model // T2000

// what's constant is the reference the object
let thirdRobot = Robot(model: "T3000")
// not the object it self
thirdRobot.model = "TXXX"


struct Shape {
    // 2. and despite shapeView being a constant
    let shapeView: UIView

    init(width: CGFloat, height: CGFloat, color: UIColor) {
        let frame = CGRect(x: 0, y: 0, width: width, height: height)
        // 4. because it uses a reference type within
        shapeView = UIView(frame: frame)
        shapeView.backgroundColor = color
    }
}


// 1. despite square also being a constant
let square = Shape(width: 100, height: 100, color: .red)

// 3. it not totally immutable
square.shapeView.backgroundColor = .blue
```


## Type Methods
static creates a type method for value types
```swift
struct Point {
    let x: Double
    let y: Double
}


struct Map {
    static let origin: Point = Point(x: 0, y: 0)

    // static here means two things that:
    // its associated at the type level rather than the instance
    // and that it's staticly dispached (called at compiled time not run-time)
    static func distanceFromOrigin(point: Point) -> Double {
        let horizontalDistance = origin.x - point.x
        let verticalDistance = origin.y - point.y

        func square(value: Double) -> Double {
            return value * value
        }

        return square(value: horizontalDistance) + square(value: verticalDistance)
    }
}
```


## Final Classes

```swift
class Calculator {
    class func squareRoot(value: Double) -> Double {
        return sqrt(value)
    }

    // 2. using final prevents it from being overriden
    // because the compiler its the only emplimentation
    // it can be staticly dispached
    // in value types `static` is a alias for final class
    final class func square(value: Double) -> Double {
        return value * value
    }

}

class NewtonCalculator: Calculator {
    // 1. only at run time it determined which method its used, dynamicly dispached
    override class func squareRoot(value: Double) -> Double {
        var guess = 1.0
        var newGuess: Double

        while true {
            newGuess = (value/guess + guess)/2
            if guess == newGuess {
                return guess
            }
            guess = newGuess
        }

    }
}

NewtonCalculator.squareRoot(value: 100)
```

## Extending a Native Type
Native types can be extended by adding computed properties but added stored properties or property observers cannot be added. New type and instance methods can be added, nested types and convenience initializers can be added.

```swift
extension Int {
    // added a calculated property
    var isOdd: Bool {
        // selfing meaning the `Int` it self
        return self % 2 != 0
    }
}

3.isOdd
8.isOdd
```
```swift
extension String {
    func add(num: Int) -> Int? {
        if let value = Int(self) {
            return value + num
        } else {
            return nil
        }
    }
}

"2".add(num: 3) // 5
```
