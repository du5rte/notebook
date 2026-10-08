---
title: "Engineering - Principles"
type: doc
created: 2026-10-07
updated: 2026-10-07
aliases: ["Engineering Principles", "KISS", "YAGNI"]
tags: [engineering, typescript]
---
# Engineering - Principles

Principles are the rules of thumb you reach for when there's no ticket telling you what to do. Most code we write is a **moving target**: it's fuelled by user feedback and business needs, so it moves fast and changes constantly 🚗💨. These principles aren't about writing perfect code. They're about writing code that's cheap to read, cheap to change and cheap to throw away. If you remember one line from this lesson, make it this one:

> *"How easy will this be to replace three months from now?"*

## Agile 🏃‍♂️: build for change

Assume today's code will be rewritten. The feature you're building will be redesigned after the first round of feedback, and the API you're calling will grow a new field. So the best code isn't the cleverest, it's the easiest to swap out.

Ask the question before every abstraction, every new dependency and every "while I'm here" refactor. If the answer is "hard", look for a smaller step.

## KISS 💋: keep it simple

Do what needs to be done, nothing more. Don't give a component all the bells and whistles on day one. If an existing component almost fits, extend it rather than building a new, more general one.

```tsx
// ❌ a button that does everything, just in case
<Button variant="primary" size="md" iconLeft={...} iconRight={...} loading={false} rounded="full" uppercase />

// ✅ the button this screen needs
<Button onPress={placeOrder}>Place order</Button>
```

## YAGNI: you ain't gonna need it

YAGNI is KISS applied to the future. Only add the functionality you need **now**. The option for "maybe one day" is code you have to read, test and keep working, for a day that rarely comes.

```ts
// ❌ a currency param nobody passes yet
const formatPrice = (amount: number, currency = 'EUR', locale?: string) => ...

// ✅ the case we actually have
const formatPrice = (amount: number) => `€${amount.toFixed(2)}`
formatPrice(3.5) // '€3.50'
```

When the second currency shows up, you'll know far more about what it needs than you do today.

## WET over premature DRY

DRY ("don't repeat yourself") is good advice applied too early. Two pieces of code that look the same today often drift apart tomorrow, and an abstraction that has to serve both grows flags and `if`s until nobody can read it.

So be WET ("write everything twice") first. **No abstraction until the third copy.** By then you can see what's really shared. Until then, leave a comment pointing at the other copy so nobody forgets it exists.

```ts
// Same shape as formatTip in checkout/tip.ts. Merge them if a third one appears.
const formatDiscount = (amount: number) => `-€${amount.toFixed(2)}`
```

Recommend watching 👉 *The Wet Codebase* by Dan Abramov (Deconstruct 2019).

## Make it readable 🧐

Being a good developer doesn't mean writing the cleverest code, it means being a good **teammate** 👯‍♀️. Quality software is rarely built alone: eventually, other people will need to read your code (including you, in six months).

- Names say what things are. No abbreviations.
- Comments only for the non-obvious **why**. The history goes in the commit message.

```ts
// ❌
const d = u.filter((x) => x.a && !x.b)

// ✅
const activeGuests = guests.filter((guest) => guest.confirmed && !guest.cancelled)
```

## Functional by default

When in doubt, opt for the functional style: `const` over `let`, `map` and `filter` over loops, and return new values instead of changing old ones. Code without mutation is easier to follow because a value means the same thing on every line.

```ts
const prices = [2.5, 3, 4.2]

// ❌ a loop that mutates
let total = 0
for (const price of prices) total += price

// ✅ one expression, nothing changes under you
const total = prices.reduce((sum, price) => sum + price, 0) // 9.7
```

For the helpers the language doesn't have (`omit`, `pipe`, `groupBy`), see the utility library verdict in [[docs/decisions|Engineering - Decision Records]].

## Typing is your friend

TypeScript, in strict mode, is the safety net when tests are thin. Avoid `any` and let types describe the real shape of your data, so a whole class of errors gets caught at compile time instead of by a user.

```ts
type Order = { drink: 'latte' | 'espresso'; size: 'small' | 'large' }

const order: Order = { drink: 'mocha', size: 'large' }
// ❌ Type '"mocha"' is not assignable to type '"latte" | "espresso"'
```

## Deep modules

A good module has a **small interface and a deep implementation**: few things to learn on the outside, a lot of work done on the inside. A shallow module makes you learn as much as it saves you.

Avoid optional parameters unless the "absent" case is real. Every optional is a branch the reader has to think about.

```ts
// ❌ shallow: the caller does the thinking
sendEmail({ to, subject, html, text, retries, retryDelay, provider })

// ✅ deep: one obvious call, the details live inside
sendReceipt(order)
```

## One source of truth

Every piece of data lives in exactly one place. If the server owns it, read it from the server cache (Apollo, React Query, Convex) rather than copying it into client state, where the two copies will disagree sooner or later.

```ts
// ❌ a second copy that goes stale
const { data } = useQuery(GET_CART)
const [cart, setCart] = useState(data)

// ✅ read it where it lives
const { data: cart } = useQuery(GET_CART)
```

## No premature abstraction

Solve the problem in front of you. Prefer editing an existing file to creating a new layer, a new "manager" or a new package. This is WET and YAGNI again, applied to architecture: the right structure shows up once the code exists, not before.

## Test behaviour, mock at the boundaries

Test what a module **does** through its public interface, the same way its users call it. Don't test private helpers or internal state: that makes every refactor break tests that should have kept passing.

Mock only at system boundaries: the network, the clock, the file system, a payment provider. Never mock your own modules. If something is hard to test without mocking its internals, that's the interface telling you it needs redesigning.

```ts
// ✅ public interface in, observable result out
expect(applyDiscount(order, 'COFFEE10').total).toBe(9)
```

## Common mistakes

- **Abstracting on the second copy.** Wait for the third. Two is a coincidence.
- **"Just in case" parameters.** They read like requirements and nobody dares to remove them.
- **Mirroring server data in `useState`.** Now you have two truths and a sync bug.
- **Mocking your own code.** The tests pass and prove nothing about how the parts fit together.

## Try it

1. Find a function in your project with an optional parameter. Is the "absent" case real? If not, remove it.
2. Find two near-identical blocks of code. Leave them, and add a comment in each pointing at the other.
3. Rewrite a `for` loop that pushes into an array as a `map` or `filter`.

## Related

- [[docs/decisions|Engineering - Decision Records]]
- [[docs/commits|Engineering - Commits]]
- [[docs/monorepo|Engineering - Monorepos]]
- [[docs/javascript/javascript-functions|JavaScript - Functions]]
- [[docs/javascript/javascript-unit-testing|JavaScript - Unit Testing]]
