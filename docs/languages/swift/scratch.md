typealias

## tuples
Under the hood in Swift a tuple is just a struct without a name

```swift
class Page {
    let story: Story
    typealias Choice = (title: String, page: Page)

    init(story: Story) {
        self.story = story
    }

    var firstChoice: Choice?
    var secondChoice: Choice?
}

extension Page {
    func addChoice(title: String, page: Page) -> Page {
        switch (firstChoice, secondChoice) {
            case (.some, .some):
                break
            case (.none, .none), (.none, .some):
                firstChoice = (title, page)
            case (.some, .none):
                secondChoice = (title, page)
        }

        return page
    }
}
```


## Linked lists
A list that has a reference to the next item in the list `singly link list`. A linked list that has both references to the next and previous item is a `doubly link list`
