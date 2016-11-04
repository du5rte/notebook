## Initializers and Self

```swift


struct Point {
  init(x: Int, y: Int) {
      self.x = x
      self.y = y
  }
}

```

## Classes

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

## Structs vs Classes

structs work with value types, meaning values are copied, changing the value of one instance of a struct doesnt change the others. creating a new place in memory.

is this instance different do another one?

classes work with Reference Types, meaning values are referenced. It point to the same place in memory changing the existing one.

is this instance the same?
