## Swift - Delegates

## Design Patterns
A design pattern is a general, reusable solution to a commonly occurring problem within a given context, regardless of the particular domain.

commonly they try to solve:
- Avoiding inflexible objects
- maintaining loose relationships
- avoid tight coupling

## Delegate Pattern
Also known as Decorator Pattern.

We have a bunch of tightly coupled objects and there are some severe limitations to this design, we want a way to track all the races but all the tracker data lives inside the Race Objects.
```swift
import Foundation

// Participants

struct Horse {
    func giddyUp() {}
}

struct Car {
    func vroomVroom() {}
}

struct RaceCar {
    func readySetGo() {}
}

// Tracker

class Tracker {
    var laps: Int = 0
    var startTime: Date?
    var lapFirst: Horse?
    var winner: Horse?
}

// Races

class Race {
    var laps: Int = 0
    // Trackers are confined within the Races Object
    let raceTracker: Tracker = Tracker()

    func start() {
        // Some set up
    }

    func updateProgress() {

    }

    func end() {
        // Some tear down
    }
}

class HorseRace: Race {

    let participants: [Horse]

    init(laps: Int, horses: [Horse]) {
        self.participants = horses
        super.init()
        self.laps = laps
    }

    override func start() {
        print("Starting Race!")
        raceTracker.startTime = Date()
        for horse in participants {
            horse.giddyUp()
        }
    }

    override func updateProgress() {
        raceTracker.laps += 1
        raceTracker.lapFirst = participants.first
        print("Progress updated!")
    }
    override func end() {
        print("And the winner is...\(participants.first)")
        raceTracker.winner = participants.first
    }
}


// Usage

let horse1 = Horse()
let horse2 = Horse()
let horse3 = Horse()

let race = HorseRace(laps: 4, horses: [horse1, horse2, horse3])
race.start()
race.updateProgress()
race.end()
```

We create a delegate protocol first that defines the properties and methods that we require our delegates to implement. We add a property to our class that specifies the type of the protocol that we just declared. To this property, we can assign any object that conforms to the protocol to act as our delegate.

```swift
import Foundation

// Protocol

protocol RaceDelegate {
    func raceDidStart()
    func raceStatus(lapNumber: Int, first: Any)
    func raceDidEnd(winner: Any)
}

// Participants

struct Horse {
    func giddyUp() {}
}

struct Car {
    func vroomVroom() {}
}

struct RaceCar {
    func readySetGo() {}
}

// Races

class Race {
    var laps: Int = 0
    // needs to be a variable as it only be implemented after initiation
    var delegate: RaceDelegate?

    func start() {
        // Some set up
    }

    func updateProgress() {

    }

    func end() {
        // Some tear down
    }
}

class HorseRace: Race {
    let participants: [Horse]

    init(laps: Int, horses: [Horse]) {
        self.participants = horses
        super.init()
        self.laps = laps
    }

    override func start() {
        delegate?.raceDidStart()
    }

    override func updateProgress() {
        laps += 1
        delegate?.raceStatus(lapNumber: laps, first: Horse())
    }

    override func end() {
        delegate?.raceDidEnd(winner: Horse())
    }
}

// Tracker

// tracker needs to conform to the RaceDelegate Protocol
class Tracker: RaceDelegate {
    func raceDidStart() {
        print("Tracker notified that the race has started!")
    }

    func raceStatus(lapNumber: Int, first: Any) {
        print("Tracker nofified that race status has been updated! Current lap \(lapNumber) with first place: \(first)")
    }

    func raceDidEnd(winner: Any) {
        print("Tracker notified that the race ended! The winner is \(winner)")
    }
}

class Broadcast: RaceDelegate {
    func raceDidStart() {
        print("Hey everyone! The race stated!")
    }

    func raceStatus(lapNumber: Int, first: Any) {
        print("Woot woot! Another lap finished! \(first) is on the lead")
    }

    func raceDidEnd(winner: Any) {
        print("Yayy the race ended! The winner is: \(winner)")
    }
}



// Usage

let participatens: [Horse] = [Horse(), Horse(), Horse()]
let race = HorseRace(laps: 4, horses: participatens)

// Tracker exists outside the race and multiple races can use it
let tracker = Tracker()
let broadcast = Broadcast()

// both tracker
race.delegate = tracker

race.start()

// and broadcast can be used as they conforms to RaceDelegate
race.delegate = broadcast

race.end()
```
