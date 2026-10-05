# Swift - Error Handling

## Errors
Code that produces an incorrect or unexpected result or causes your program to behave in an intended manner. There's different kinds of errors

## Domain Error
Consider little errors that don't need to alt execution, for example optional values and fai-able functions

```swift
// converts a string number into a Int
Int.init("1")
// if there's not a number it doesn't crash it just returns nil
Int.init("abc")
```

## Compiler Errors
Errors that show up while parsing the code and prevent it from running.


## Runtime Errors
Errors that the compiler cannot cash and they only show up when the program executes a certain line of code. If they are not guarded against its considered a `Unrecoverable Errors` if we it's predicted it can fail it's a `Recoverable Errors`


## Modeling Errors
In some cases we might not want a optional `nil` value but for the program to let us know there's been an error

```swift
struct Friend {
  let name: String
  let age: String
  let address: String?
}

func createFriendFromJSON(dict: [String: String]) -> Friend? {
    guard let name = dict["name"], age = dict["age"] else {
        // exits the function silencely
        return nil
    }

    let address = dict["address"]

    return Friend(name: name, age: age, address: address)
}
```

```swift
enum FriendError: ErrorType {
    case InvalidData
}

// `throws` indicate that this function can return an error
func createFriendFromJSON(dict: [String: String]) throws -> Friend {
    guard let name = dict["name"], age = dict["age"] else {
        // exists the function with an error
        // but we don't know why it fails
        throw FriendError.InvalidData
    }

    let address = dict["address"]

    return Friend(name: name, age: age, address: address)
}

let response = [
  "name": "Pasan",
  "ages": "27",
  "address": "someAdress"
]

// now we can try to call the function
let friend = try createFriendFromJSON(dict: response)
```

```swift
enum FriendError: ErrorType {
    // the error can accept a String
    case InvalidData(String)
}

func createFriendFromJSON(dict: [String: String]) throws -> Friend {
    // now we can be more discribtive with our errors
    guard let name = dict["name"] else {
        throw FriendError.InvalidData("Name key fails")
    }

    guard let age = dict["age"] else {
        throw FriendError.InvalidData("Age key fails")
    }

    let address = dict["address"]

    return Friend(name: name, age: age, address: address)
}
```

## handling errors

to handle errors we first need to catch it
```swift

func sendMessageToFriend(friend: Friend, message: String) { }

do {
    let friend = try createFriendFromJSON(dict: response)
    // only if friend if successful it will send message
    sendMessageToFriend(friend: friend, message: "successful friend")
} catch FriendError.InvalidData(let key) {
    print(key)
} catch FriendError.NetworkError {
    print("check your connection ")
} catch let error {
    // general error
}
```

## Do
Propagates errors to its outer scope and handled by a catch clause

```swift
enum ParserError: Error {
    case EmptyDictionary
    case InvalidKey
}

struct Parser {
    var data: [String : String?]?

    func parse() throws {
        guard data != nil else {
            throw ParserError.EmptyDictionary
        }

        guard data?["someKey"] != nil else {
            throw ParserError.InvalidKey
        }
    }
}

let data: [String : String?]? = ["someKey": nil]
let parser = Parser(data: data)

do {
    try parser.parse()
} catch ParserError.EmptyDictionary {
    print("Empty Dictionary")
} catch ParserError.InvalidKey {
    print("Invalid Key")
} catch {
    print("something when wrong")
}
```

## Defer
To execute statements as we leave the current scope we use a  statement. Defer statements are executed in reverse order of which they are written.

```swift
defer {
  close(file1)
}
```

## Fatal Error

fatalError

```swift
do {
    try parser.parse()
} catch ParserError.EmptyDictionary {
    print("Empty Dictionary")
} catch ParserError.InvalidKey(let key) {
    print("Invalid Key: \(key)")
} catch let error {
    fatalError("\(error)")
}
```
