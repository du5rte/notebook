# Swift - Functions


swift allows for same name functions as long as they take on different parameters

## Functions

```swift
func calculateArea() {
    let length = 10
    let width = 12

    let area = length * width
}
```

## Parameters

```swift
func calculateArea(length: Int, width: Int) {
    let area = length * width

    print(area)
}
```

## Arguments
```swift
calculateArea(length: 12, width: 10) // 120
```

## Return Types
```swift
func calculateArea(length: Int, width: Int) -> Int {
    let area = length * width

    return area
}
```

a function that doesn't return anything is of type `Void` or `()`

## Name Parameters
Parameters can have `local` names and `external` names

```swift
func getRemainder(value a: Int, divisor b: Int) -> Int {
    // local names
    return a % b
}

// external names
getRemainder(value: 3, divisor: 2)
```

## Default Values


```swift
func carpetCostCalculator(area: Int, carpetColor: String = "grey") -> Int {
    var price: Int

    switch carpetColor {
        case "grey": price = 1
        case "tan": price = 2
        case "blue": price = 4
        default: price = 0
    }

    let total = area * price

    return total
}

carpetCostCalculator(area: areaOfRoom1)
```

## Returning Complex Values
construct known as a tuple

```swift
func carpetCostCalculator(area: Int, carpetColor: String = "grey") -> (price: Int, carpetColor: Int) {
    var price: Int

    switch carpetColor {
        case "grey": price = 1
        case "tan": price = 2
        case "blue": price = 4
        default: price = 0
    }

    let total = area * price

    return total
}

let result = carpetCostCalculator(area: areaOfRoom1)

result.0
result.price
```

## Function Scope

```swift
var greeting = "hello"

func greet() {
    // only available inside this function scope
    let greeting = "yo"

    print(greeting)
}

greet() // yo

print(greeting) // hello
````


## Structure

```swift
let coordinate1: (x: Int, y: Int) = (0,0)

coordinate1.x


struct Point {
    let x: Int
    let y: Int
}

// instance of a struct
let p1 = Point(x:1, y:2)

p1.x
````

## Methods


```swift
struct Point {
    let x: Int
    let y: Int

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
```
