# Swift - Loops


## For in Loop

```
for name in array {
  statements
}
```

```swift
for item in shopping {
  print(item) // (3 times)
}
```

## Looping Over Ranges

`a...b`

```swift
for number in 1...10 {
    print(number) // 1, 2, 3 ... 10
}

for number in 1...10 {
  print("\(number) times 3 equals \(number * 3)") // 3 times 3 equals 9
}
```

## Looping Over Ranges

a..<b

```swift
for number in 1..<10 {
    print(number) // 1, 2, 3 ... 9
}
```

## While Loop

```
while condition {
  statement
}
```
```swift
var index = 0

while index < 20 {
  index += 1
  print(index)
}

var i = 0

while i < todo.count {
  print(todo[i])
  i += 1
}
```

## Repeat While
similar but get at least one run through the loop

```
repeat {
  statement
} while condition
```
