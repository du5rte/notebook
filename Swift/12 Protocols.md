

## Protocols
Also know as interface in other programing languages
efforce it
provides an expection of certain behaviors

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
