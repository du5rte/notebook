## Swift - Memory Management


## MRR
Programmer were responsible for memory Management, Memory Retain Release, was used to Manage object ownership and relationships Reference counting. Which could cause Memory leaks or dangling pointer which could crash apps.


## ARC
In the new method the memory management is moved from the developer to the compiler, Automated Reference Counting works by allocating space in memory for our reference types, value types and not tracked. The second we stock using a class ARC clean it up.

```Swift
class Food {
    let name: String

    init(name: String) {
        self.name = name

        print("Memory allocated for \(name)")
    }

    deinit {
        print("\(name) is being deinitialized. Memory deallocated")
    }
}

var reference1: Food? = Food(name: "Hot Dog")
var reference2: Food? = reference1

reference1 = nil
// type is still being hold on in reference2
reference2 = nil
// there's nothing holding it anymore so it's deallocated
```

## Memory Leaks

```Swift
class Person {
    let name: String

    init(name: String) {
        self.name = name

        print("Memory allocated for \(name)")
    }

    var apartment: Apartment?

    deinit {
        print("\(name) is being deinitialized. Memory deallocated")
    }
}

class Apartment {
    let unit: String

    init(unit: String) {
        self.unit = unit

        print("Memory allocated for \(unit)")    }

    var tenant: Person?

    deinit {
        print("\(unit) is being deinitialized. Memory deallocated")
    }
}

// Each variable has a strong reference to the instances we assign to it
var person: Person? = Person(name: "Pasan")
var apartment: Apartment? = Apartment(unit: "3B")

// both instances hold references to each other
// creating a strong reference cycle between them
person?.apartment = apartment
apartment?.tenant = person


// despite getting of the references to person and apartment
// those references hold references to each other
person = nil
apartment = nil
```

## Weak References
A weak reference is one that does not keep a strong hold on the instance it refers to and it doesn't stop ARC from disposing of it. Basicly tells ARC to ignore the reference (or reference count), ARC only cares about strong references.

```Swift
class Person {
    ...
    weak var apartment: Apartment?

}

class Apartment {
    ...
    weak var tenant: Person?

}
```
