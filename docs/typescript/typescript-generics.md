---
title: "TypeScript - Generics"
type: doc
created: 2026-10-07
updated: 2026-10-07
tags: [typescript]
---
# TypeScript - Generics

A generic is a type with a blank in it. Instead of writing one function for a list of strings and another for a list of numbers, you write one function and say "the type goes here, fill it in when you use me". It's like a labelled storage box: the box is always the same, the label says what's inside, and once it's labelled `Books` nobody can put shoes in it. You reach for generics when a function or type works the same way for many types, and you don't want to lose track of **which** one.

## Why: `any` loses information

Say you want a function that returns the first item of a list.

```ts
function first(items: any[]) {
  return items[0]
}

const order = first(['latte', 'mocha']) // any
order.toFixed(2) // no error, crashes at runtime 💥
```

`any` works, but the type falls out the bottom. You put strings in and got `any` out. A generic keeps the link between what goes in and what comes out.

## Generic functions

Put a **type parameter** in angle brackets, then use it like any other type. `T` is the convention for a single one; use a real name when there are several.

```ts
function first<T>(items: T[]): T | undefined {
  return items[0]
}

first(['latte', 'mocha']) // type: string | undefined, value: 'latte'
first([1, 2, 3])          // type: number | undefined, value: 1
```

You almost never pass `T` yourself. TypeScript **infers** it from the arguments. You can still be explicit when inference can't see it, for example with an empty array:

```ts
const queue = first<string>([]) // string | undefined
```

## Generic types

Types can have blanks too. This is how `Array<T>`, `Promise<T>` and React's `useState<T>` work.

```ts
type Box<T> = {
  label: string
  contents: T
}

const books: Box<string[]> = { label: 'Books', contents: ['Dune', 'Emma'] }
const mugs: Box<number> = { label: 'Mugs', contents: 6 }
```

A very common one in app code is the shape of an API response, where the envelope is always the same and only the data changes.

```ts
type ApiResponse<Data> =
  | { status: 'success'; data: Data }
  | { status: 'error'; message: string }

type User = { id: string; name: string }

async function getJson<Data>(url: string): Promise<ApiResponse<Data>> {
  const response = await fetch(url)
  if (!response.ok) return { status: 'error', message: response.statusText }
  return { status: 'success', data: await response.json() }
}

const result = await getJson<User>('/api/me')
if (result.status === 'success') {
  result.data.name // string
}
```

One honest caveat: `<User>` here is a promise you make to TypeScript, not a check. The server could send anything. To actually check the data, validate it with a schema (see [[docs/typescript/typescript-patterns|TypeScript - Everyday Patterns]]).

## Constraints: `extends`

Sometimes "any type" is too loose. If the function reads `.length`, it needs things that have a length. `extends` sets a minimum.

```ts
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b
}

longest('espresso', 'latte') // 'espresso'
longest([1, 2], [1, 2, 3])   // [1, 2, 3]
longest(10, 20)
// ❌ Argument of type 'number' is not assignable to parameter of type '{ length: number; }'
```

The other constraint you'll use all the time is `keyof`: "a key that really exists on this object".

```ts
function pluck<Item, Key extends keyof Item>(items: Item[], key: Key): Item[Key][] {
  return items.map(item => item[key])
}

const menu = [
  { name: 'Latte', price: 3.2 },
  { name: 'Mocha', price: 3.6 },
]

pluck(menu, 'name')  // ['Latte', 'Mocha'], type: string[]
pluck(menu, 'price') // [3.2, 3.6], type: number[]
pluck(menu, 'size')  // ❌ Argument of type '"size"' is not assignable to parameter of type '"name" | "price"'
```

`Item[Key]` is an **indexed access type**: "the type of `Item`'s `Key` property". That's how the return type follows the key you picked.

## A real example: `groupBy`

Grouping a list by some property comes up in every app: orders by status, messages by day. A typed version keeps both the item type and the group names.

```ts
function groupBy<Item, Group extends string>(
  items: Item[],
  getGroup: (item: Item) => Group,
): Partial<Record<Group, Item[]>> {
  return items.reduce<Partial<Record<Group, Item[]>>>((groups, item) => {
    const group = getGroup(item)
    return { ...groups, [group]: [...(groups[group] ?? []), item] }
  }, {})
}

type Order = { id: number; status: 'pending' | 'ready' }

const orders: Order[] = [
  { id: 1, status: 'ready' },
  { id: 2, status: 'pending' },
  { id: 3, status: 'ready' },
]

const byStatus = groupBy(orders, order => order.status)
// { ready: [{ id: 1, ... }, { id: 3, ... }], pending: [{ id: 2, ... }] }
byStatus.ready   // Order[] | undefined
byStatus.shipped // ❌ Property 'shipped' does not exist
```

Notice you never wrote `<Order, 'pending' | 'ready'>`. Both were inferred from the arguments. That's the goal: generics in the library code, zero angle brackets at the call site. `Partial` and `Record` are built-in utility types, covered in [[docs/typescript/typescript-patterns|TypeScript - Everyday Patterns]].

Modern JavaScript also ships `Object.groupBy()`, which is typed in the same spirit. Write your own when you want to learn, use the built-in in real code.

## Common mistakes

- ❌ A generic used only once: `function log<T>(value: T): void`. If `T` doesn't connect an input to an output (or two inputs), it adds nothing. ✅ `function log(value: unknown): void`.
- ❌ Passing type arguments everywhere: `first<string>(['a'])`. ✅ Let inference fill them in; pass them only when it can't.
- ❌ Treating `getJson<User>()` as validation. It's a cast with nicer syntax. ✅ Validate at the boundary.
- ❌ Single letters for many parameters: `<T, U, V, K>`. ✅ Real names (`Item`, `Key`, `Data`) once there's more than one.

## Try it

1. Write `last<T>(items: T[]): T | undefined` and check the inferred type for a list of strings and a list of numbers.
2. Write `indexBy<Item, Key extends keyof Item>(items: Item[], key: Key)` that turns `[{ id: 'a', name: 'Ana' }]` into `{ a: { id: 'a', name: 'Ana' } }`.
3. Write a `type Paginated<Item>` with `items`, `page` and `hasMore`, and use it for a list of messages.

## Related
- [[docs/typescript/typescript|TypeScript - Basics]]
- [[docs/typescript/typescript-patterns|TypeScript - Everyday Patterns]]
- [[docs/javascript/javascript|JavaScript - Basics]]
- [[docs/javascript/javascript-async|JavaScript - Asynchronous Programming]]
- [[docs/react/react|React - Basics]]
