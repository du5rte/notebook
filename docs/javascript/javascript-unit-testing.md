---
title: "JavaScript - Unit Testing"
type: doc
created: 2016-12-10
updated: 2026-10-07
tags: [javascript]
---
# JavaScript - Unit Testing

A test is a small program that checks your program does what you meant. You write down "given this, I expect that", and a test runner checks it every time the code changes. Tests are what let you refactor on a Friday afternoon without fear. The ideas here are the same in every tool; the examples use the `describe` / `it` / `expect` style shared by Vitest and Jest.

## Unit vs integration vs end-to-end

Tests come in sizes. Small ones are fast and pinpoint the problem; big ones are slow but prove the whole thing works together.

| | Unit | Integration | End-to-end |
|---|---|---|---|
| Checks | one function or component | several pieces together (code + database, two modules) | the real app, the way a user drives it |
| Speed | milliseconds | slower | slowest |
| When it fails | tells you exactly where | tells you which seam | tells you *something* is broken |
| How many | lots | some | a few key journeys |

A common rule of thumb: many unit tests, fewer integration tests, a handful of end-to-end tests for the journeys that must never break (sign up, checkout).

## Your first test

A test file groups related tests with `describe`. Each `it` is one test, often called a spec, and reads like a sentence. `expect` makes the check.

```js
// price.js
export function totalPrice(items) {
  return items.reduce((total, item) => total + item.price, 0)
}
```

```js
// price.test.js
import { describe, it, expect } from 'vitest' // Jest provides these as globals
import { totalPrice } from './price.js'

describe('totalPrice', () => {
  it('adds up the prices', () => {
    expect(totalPrice([{ price: 3 }, { price: 2.5 }])).toBe(5.5)
  })

  it('returns 0 for an empty order', () => {
    expect(totalPrice([])).toBe(0)
  })
})
```

Run it with `npx vitest` (or `npx jest`). Both re-run tests as you save.

A good first test is a **sanity check**: something trivial like `expect(true).toBe(true)`, just to prove the setup works before you test real code.

## Arrange, act, assert

Most tests have three steps. Keeping them visibly separate makes tests easy to read.

```js
it('applies a loyalty discount', () => {
  // Arrange: set up the situation
  const order = { items: [{ price: 10 }], loyaltyCard: true }

  // Act: do the one thing being tested
  const total = checkout(order)

  // Assert: check the result
  expect(total).toBe(9)
})
```

One act per test. If a test needs two acts, it's probably two tests.

## Common matchers: toBe vs toEqual

`toBe` checks it's the very same value (`===`). Objects and arrays are only `===` to themselves, so compare their contents with `toEqual`.

```js
expect(2 + 2).toBe(4)                       // ✅
expect({ size: 'large' }).toBe({ size: 'large' })    // ❌ different objects
expect({ size: 'large' }).toEqual({ size: 'large' }) // ✅ same contents

expect(['latte', 'tea']).toContain('tea')    // ✅
expect(() => checkout(null)).toThrow()       // ✅ wrap code that should throw
await expect(loadMenu()).resolves.toHaveLength(3) // ✅ for Promises
```

The full list of matchers is in the Vitest and Jest docs.

## Setup with beforeEach

When every test needs the same starting point, build it fresh in `beforeEach`. Fresh state per test means tests can't affect each other.

```js
describe('cart', () => {
  let cart

  beforeEach(() => {
    cart = createCart()
  })

  it('starts empty', () => {
    expect(cart.items).toEqual([])
  })

  it('adds an item', () => {
    cart.add('latte')
    expect(cart.items).toEqual(['latte'])
  })
})
```

## Test doubles: mocks, stubs and spies

Some code talks to things you don't want in a unit test: a payment API, the clock, email. A test double stands in for them, like a stunt double.

| Double | What it does | Example |
|---|---|---|
| Stub | returns a canned answer | "the exchange rate is always 1.2" |
| Spy | records how it was called | "was `sendEmail` called once?" |
| Mock | a fake that does both, often checked afterwards | Vitest's `vi.fn()`, Jest's `jest.fn()` |
| Fake | a simple working version | an in-memory database |

```js
import { vi } from 'vitest' // in Jest: jest.fn()

it('emails a receipt after payment', async () => {
  const sendEmail = vi.fn()
  await pay({ amount: 4, email: 'ana@example.com' }, { sendEmail })

  expect(sendEmail).toHaveBeenCalledTimes(1)
  expect(sendEmail).toHaveBeenCalledWith('ana@example.com', expect.any(String))
})
```

Mock only at the edges of your system (network, time, email). If you mock your own functions, the test ends up checking your mocks instead of your code.

## Test behaviour, not implementation

Test what the code does through its public interface, not how it does it inside. Then you can rewrite the inside and the tests still pass.

- ❌ `expect(cart._items.length).toBe(1)`: breaks if you rename a private field.
- ✅ `expect(cart.count()).toBe(1)`: only breaks if the behaviour changes.

## Red, green, refactor

Test-driven development (TDD) writes the test first.

1. **Red**: write a test for the next small behaviour. It fails, because the code doesn't exist yet.
2. **Green**: write the simplest code that makes it pass.
3. **Refactor**: tidy the code, with the test as your safety net. Repeat.

You don't have to do TDD all the time, but it works especially well for bug fixes: write a test that reproduces the bug first, then fix it.

## Debugging a failing test

Put `debugger` on the line you care about and run the tests with your editor's debugger attached. Execution pauses there and you can inspect every variable in scope.

```js
it('applies a loyalty discount', () => {
  const order = { items: [{ price: 10 }], loyaltyCard: true }
  debugger // pauses here when a debugger is attached
  expect(checkout(order)).toBe(9)
})
```

`it.only` runs just that one test while you focus. Remove it before committing.

## Common mistakes

- **`toBe` on objects or arrays**: use `toEqual`.
- **Forgetting to `await` an async test**: the test passes before the Promise even settles.
- **Tests that depend on each other's order**: build fresh state in `beforeEach`.
- **Leaving `it.only` or `it.skip` in**: the rest of the suite silently stops running.

## Try it

1. Write `isOpen(hour)` for a café open from 8 to 18, then test the edges: 7, 8, 18 and 19.
2. Write a test that catches the `sort()` bug from [[docs/javascript/javascript-algorithms|JavaScript - Algorithms]]: `[10, 9, 1]` should sort to `[1, 9, 10]`.
3. Test a function that takes a `sendEmail` dependency, using a mock to check it was called with the right address.

## Related

- [[docs/javascript/javascript-algorithms|JavaScript - Algorithms]]
- [[docs/javascript/javascript-async|JavaScript - Asynchronous Programming]]
- [[docs/javascript/javascript-functions|JavaScript - Functions]]
