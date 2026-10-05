# JavaScript - Unit Testing

## Behaviour Driven Development
Function/Tests Describe the expected behavior of our application

## Unit Testing
Testing on small pieces of functionality

## Integration Testing
Test new code against existing code to make sure it doesn't break existing code

## End-To-End Testing
Testing code all scenarios

## Refactoring
Writing tests first even though they fail, first work through passing the tests then going back and improving the passing code. Also known as `Red > Green > Refactor` and repeating the cycle.

## Sanity check
A trivial function or test that proves we set things up correctly.

## Mocha
A framework used for writing and running automated test suites, makes it possible to run all of our test suites with one command and watch for changes.

```sh
$ npm install --save-dev mocha
```
```sh
$ mocha test tests.js
## or to run all test in test/test.js
$ mocha
```

We introduce a test suite in Mocha using describe()
Each individual unit test is sometimes called a “spec”
specs by containing them in a function called it()
```js
import { expect } from 'chai'

// Test suit
// groups similar test specs together
describe("Mocha", () => {
  // Test spec (unit test)
  // Groups similar expectations together, representing a single unit test
  it("should run our tests using npm", () => {
    expect(true).to.be.ok;
  })
})
```

## Chai

## Debugger
Alts run time execution allowing to debugging the current scope
```js

app.use((ctx) => {
  // stops here
  debugger;
})

```
