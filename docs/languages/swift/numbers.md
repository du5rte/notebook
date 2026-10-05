## Swift - Numbers

## Type Inference

```swift
let year: Int = 2014
```

## Integers
Whole digit `Int`

```swift
2014
```

## Floating Point Numbers
6 decimal digits `Float`

```swift
2.0
```
## Double Float
15 decimal digits `Double` most recommended to use for decimal digits unless specified

```swift
2.0
```

## Operators
- `+` Addition Operator
- `-` Subtraction Operator
- `*` Multiplication Operator
- `/` Division Operator
- `%` Remainder (Modulo) Operator
- `++` Increment Operator
- `--` Decrement Operator

## Type Safety
Different Types (e.g. Int and Floats) cannot perform maths operations
```swift
let height = 12
let width = 10
let area = height * width

// height and width are of type Int, `10.764` is a Float/Double
let areaInSquareMeters = area/10.764 // Error
```

```swift
let height = 12.0
let width = 10.0
let area = height * width

// All values are of type Float/Double
let areaInSquareMeters = area / 10.764
```

## Increment and Decrement
Increment `++` and Decrement operators `--` has been deprecated in swift 3 in favor of `+= 1` and `-= 1`

```swift
let levelScore: Int = 0

levelScore += 1 // 1
levelScore += 1 // 2
levelScore -= 2 // 0
```
