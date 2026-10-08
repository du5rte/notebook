---
title: "TypeScript - Basics"
type: doc
created: 2026-10-07
updated: 2026-10-07
aliases: ["JavaScript - TypeScript"]
tags: [typescript]
---
# TypeScript - Basics

TypeScript is JavaScript with types. You write the same code you already know, add a few labels saying what shape your data has, and the editor tells you about mistakes **before** you run anything. Think of it as a spell checker for your code: it doesn't write the essay for you, but it underlines the typo while you're still typing. The types are erased when the code is compiled, so what runs in the browser or in Node is plain JavaScript.

## Why types?

A function says what it needs only in your head. The next person (or you, three months from now) has to guess.

```js
// JavaScript
function sendEmail(contact) {
  console.log(`${contact.name} <${contact.email}>`)
}

sendEmail('Josh') // runs, prints 'undefined <undefined>'
```

```ts
// TypeScript
function sendEmail(contact: { name: string; email: string }) {
  console.log(`${contact.name} <${contact.email}>`)
}

sendEmail('Josh')
// ❌ Argument of type 'string' is not assignable to parameter of type '{ name: string; email: string; }'
sendEmail({ name: 'Josh', email: 'josh@example.com' }) // ✅ 'Josh <josh@example.com>'
```

The bug is caught in the editor, not by a user. Types are also documentation that can't go stale: hover over any value in your editor to see its type.

## Inference: let TypeScript do the typing

You don't need to label everything. TypeScript **infers** types from the values you give it.

```ts
const order = 'flat white' // type: 'flat white'
let total = 3.5            // type: number
const sizes = ['S', 'M', 'L'] // type: string[]

total = 'free' // ❌ Type 'string' is not assignable to type 'number'
```

Rule of thumb: annotate **function parameters** (TypeScript can't guess what callers will pass) and let inference handle the rest. Return types are inferred too; add one when you want the function's contract to be explicit.

```ts
function price(cups: number, each: number) {
  return cups * each
}

price(2, 3.5) // 7, return type inferred as number
```

## Primitives

The everyday types match JavaScript's values, all lowercase.

```ts
const name: string = 'Ana'
const age: number = 31
const isMember: boolean = true
const nickname: string | null = null
let notSetYet: string | undefined
```

Use lowercase `string`, `number`, `boolean`. The capitalised `String`, `Number` and `Object` are wrapper objects, not what you want.

## Arrays and objects

An array type is the item type plus `[]`. An object type lists its keys. A `?` marks a key as optional.

```ts
const guests: string[] = ['Ana', 'Ben']

const coffee: { name: string; price: number; milk?: string } = {
  name: 'Espresso',
  price: 2,
}

coffee.milk // string | undefined
guests.push(42) // ❌ Argument of type 'number' is not assignable to parameter of type 'string'
```

## Naming a shape: `type` vs `interface`

Writing the same object shape twice gets old. Give it a name. There are two ways, and for objects they do almost the same thing.

```ts
type Contact = {
  name: string
  email: string
}

interface Emailable {
  name: string
  email: string
}

function sendEmail(contact: Contact) {
  console.log(`${contact.name} <${contact.email}>`)
}

sendEmail({ firstName: 'Josh', email: 'josh@example.com' })
// ❌ Object literal may only specify known properties, and 'firstName' does not exist in type 'Contact'
```

| | `type` | `interface` |
|---|---|---|
| Object shapes | ✅ | ✅ |
| Unions (`'S' \| 'M'`) | ✅ | ❌ |
| Extending | `&` | `extends` |
| Declaration merging | ❌ | ✅ (two `interface Window` blocks merge) |

Pick one and be consistent. `type` covers everything an `interface` does for app code, plus unions, so it's a sensible default. Reach for `interface` when you extend a library's types or when a class `implements` it.

## Unions and narrowing

A **union** says "one of these". It's how you model real data: an order is either pending or ready, an id is a string or a number.

```ts
type Size = 'S' | 'M' | 'L'
type Id = string | number

const size: Size = 'XL' // ❌ Type '"XL"' is not assignable to type 'Size'
```

With a union, TypeScript only lets you use what **all** members share. To use the rest, you **narrow**: check what you have, and inside that branch TypeScript knows the exact type.

```ts
function formatId(id: string | number) {
  if (typeof id === 'string') {
    return id.toUpperCase() // id is string here
  }
  return id.toFixed(0) // id is number here
}

formatId('abc') // 'ABC'
formatId(42.7)  // '43'
```

`typeof`, `===`, `in`, `Array.isArray()` and `instanceof` all narrow. So does an early `return`.

```ts
function greet(name: string | null) {
  if (!name) return 'Hi stranger'
  return `Hi ${name}` // name is string here
}
```

## Strict mode

TypeScript has a `strict` flag in `tsconfig.json`. Turn it on, always. Without it, `null` and `undefined` slip into every type and missing annotations quietly become `any`, which is most of the bugs you wanted TypeScript to catch.

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

```ts
// strict on
function firstGuest(guests: string[]) {
  const match = guests.find(guest => guest.startsWith('A')) // string | undefined
  return match.toUpperCase() // ❌ 'match' is possibly 'undefined'
}
```

Annoying for a minute, then it saves you from `Cannot read properties of undefined` in production.

## `unknown` vs `any`

Both mean "could be anything", but they behave in opposite ways.

- `any` switches the type checker **off**. Anything goes, nothing is caught.
- `unknown` keeps it **on**. You can hold the value, but you must narrow it before you use it.

```ts
const fromApi: any = JSON.parse('"hello"')
fromApi.toFixed(2) // no error, crashes at runtime 💥

const safe: unknown = JSON.parse('"hello"')
safe.toUpperCase() // ❌ 'safe' is of type 'unknown'
if (typeof safe === 'string') {
  safe.toUpperCase() // ✅ 'HELLO'
}
```

Use `unknown` for anything from outside your code: API responses, `JSON.parse`, `catch (error)`. Treat `any` as a last resort, and leave a comment saying why.

## Common mistakes

- ❌ Annotating everything: `const name: string = 'Ana'`. ✅ Let inference work; annotate parameters.
- ❌ Using `String`, `Number`, `Object` or `{}` as types. ✅ Use `string`, `number` and a real object shape.
- ❌ Reaching for `any` to make a red line go away. ✅ Use `unknown` and narrow, or fix the type.
- ❌ Casting with `as` to silence an error (`data as User`). It tells TypeScript to trust you, and it will, even when you're wrong. ✅ Narrow or validate instead.
- ❌ Forgetting that types vanish at runtime. A `User` type doesn't check that the API actually sent a user. ✅ Validate data at the boundary (see [[docs/typescript/typescript-patterns|TypeScript - Everyday Patterns]]).

## Try it

1. Write a `type Order` with `drink`, `size` (`'S' | 'M' | 'L'`) and an optional `notes`. Make a function `describe(order: Order)` that returns `'M flat white'`, or `'M flat white (oat milk)'` when there are notes.
2. Write `parseAge(input: unknown): number | null` that returns the number when `input` is a number or a numeric string, and `null` otherwise.
3. Turn `strict` off and on in a small project and compare how many errors appear. Read two of them.

## Related
- [[docs/javascript/javascript|JavaScript - Basics]]
- [[docs/typescript/typescript-generics|TypeScript - Generics]]
- [[docs/typescript/typescript-patterns|TypeScript - Everyday Patterns]]
- [[docs/react/react|React - Basics]]
