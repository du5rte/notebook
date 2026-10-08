---
title: "TypeScript - Everyday Patterns"
type: doc
created: 2026-10-07
updated: 2026-10-07
aliases: ["TypeScript - Enums are bad"]
tags: [typescript]
---
# TypeScript - Everyday Patterns

Once you know the basics and generics, most day-to-day TypeScript is a handful of patterns you use over and over: constant objects instead of enums, utility types to reshape what you already have, unions that describe every state, `satisfies` to check without losing detail, and types inferred from a schema. The common thread is **one source of truth**: write the value or the schema once and let the types follow, instead of keeping two copies in sync by hand.

## `as const` objects over enums

TLDR; enums are bad. Use a plain object with `as const` and derive the types from it.

`enum` is the odd one out in TypeScript. Every other type disappears when compiled, but an enum generates real JavaScript code. String enums are also nominal: you can't pass the matching string, only the enum member. And tools that run TypeScript by just stripping the types (like Node's built-in type stripping) don't support them.

```ts
// ❌ enum
enum AuthStrategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
}

function signIn(strategy: AuthStrategy) {}
signIn('oauth_google')
// ❌ Argument of type '"oauth_google"' is not assignable to parameter of type 'AuthStrategy'
```

```ts
// ✅ as const object
export const AuthStrategy = {
  Google: 'oauth_google',
  Microsoft: 'oauth_microsoft',
  Slack: 'oauth_slack',
  Apple: 'oauth_apple',
} as const // <- the important bit

// key types
type AuthStrategyKey = keyof typeof AuthStrategy
// 'Google' | 'Microsoft' | 'Slack' | 'Apple'

// value types
type AuthStrategyValue = (typeof AuthStrategy)[AuthStrategyKey]
// 'oauth_google' | 'oauth_microsoft' | 'oauth_slack' | 'oauth_apple'

function signIn(strategy: AuthStrategyValue) {}
signIn(AuthStrategy.Google) // ✅
signIn('oauth_google')      // ✅ plain strings work too
```

Read `keyof typeof AuthStrategy` right to left: `typeof` turns the **value** into a type, `keyof` takes its keys. Without `as const`, the values would widen to `string` and you'd lose the union.

You get everything an enum gave you (a named constant, autocomplete, a closed set of values) and it's still just an object you can loop over.

```ts
const ButtonSize = { Small: 'sm', Medium: 'md', Large: 'lg' } as const
type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize] // 'sm' | 'md' | 'lg'

Object.values(ButtonSize) // ['sm', 'md', 'lg']
```

Naming the type and the object the same (`ButtonSize`) is fine: one lives in type land, the other in value land, and it reads like an enum at the call site.

## Utility types: reshape, don't repeat

TypeScript ships generic helpers that build new types from existing ones. Learn these five and you'll cover most cases.

```ts
type User = {
  id: string
  name: string
  email: string
  role: 'guest' | 'admin'
}
```

| Utility | What it does | Example |
|---|---|---|
| `Partial<T>` | every key optional | a patch: `Partial<User>` |
| `Pick<T, Keys>` | keep only some keys | `Pick<User, 'id' \| 'name'>` |
| `Omit<T, Keys>` | drop some keys | `Omit<User, 'id'>` for a create form |
| `Record<Keys, Value>` | object with those keys, all one type | `Record<User['role'], string>` |
| `ReturnType<typeof fn>` | what a function returns | type of a hook's result |

```ts
function updateUser(id: string, changes: Partial<Omit<User, 'id'>>) {}
updateUser('u1', { name: 'Ana' }) // ✅
updateUser('u1', { id: 'u2' })    // ❌ 'id' does not exist in type

const roleLabel: Record<User['role'], string> = {
  guest: 'Guest',
  admin: 'Admin',
} // forget one and TypeScript tells you

function createCart() {
  return { items: [] as string[], total: 0 }
}
type Cart = ReturnType<typeof createCart> // { items: string[]; total: number }
```

The point is the same as `as const`: if `User` changes, every derived type changes with it. The full list is in the TypeScript handbook.

## Discriminated unions: one type per state

When data can be in several states, don't make one object with lots of optional fields. Make a union where each member has a shared literal field (the **discriminant**) saying which state it's in.

```ts
// ❌ everything optional, any combination is "valid"
type Request = { isLoading: boolean; data?: string[]; error?: string }

// ✅ one shape per state
type Request =
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'error'; error: string }
```

Checking `status` narrows to the right member, so you can only read `data` when it exists.

```ts
function render(request: Request) {
  switch (request.status) {
    case 'loading':
      return 'Loading…'
    case 'success':
      return `${request.data.length} messages` // data exists here
    case 'error':
      return `Oops: ${request.error}`
  }
}
```

**Exhaustiveness check:** add a new status later and you want TypeScript to point at every `switch` that forgot it. Assign the leftover to `never`:

```ts
    default: {
      const unhandled: never = request
      return unhandled
    }
```

If a case is missing, `request` isn't `never` there and you get an error.

## `satisfies`: check without widening

An annotation (`const x: Type = ...`) checks the value, but then the variable **is** that type and the specific details are lost. `satisfies` checks the value against a type and keeps the precise inferred type.

```ts
type Theme = Record<string, string>

const annotated: Theme = { primary: '#0a84ff', surface: '#fff' }
annotated.primary   // string
annotated.secondary // string, no error 😬 (any key is allowed)

const theme = { primary: '#0a84ff', surface: '#fff' } satisfies Theme
theme.primary   // string
theme.secondary // ❌ Property 'secondary' does not exist
```

Pairs nicely with `as const` for config objects: `{ ... } as const satisfies Config` gives you literal values **and** a check that the shape is right.

## Types from a schema: `z.infer`

Types vanish at runtime, so they can't check what an API, a form or `localStorage` actually hands you. A schema library like Zod does the runtime check, and `z.infer` turns the schema into a type, so you write the shape once.

```ts
import { z } from 'zod'

const Order = z.object({
  id: z.string(),
  drink: z.string().min(1),
  size: z.enum(['S', 'M', 'L']),
  notes: z.string().optional(),
})

type Order = z.infer<typeof Order>
// { id: string; drink: string; size: 'S' | 'M' | 'L'; notes?: string | undefined }
```

At the boundary, parse. `safeParse` returns a discriminated union, so you narrow it just like the request example above.

```ts
const result = Order.safeParse(await response.json())

if (!result.success) {
  console.error(result.error) // what was wrong, field by field
} else {
  result.data.size // 'S' | 'M' | 'L', and actually checked
}
```

The same schema can drive form validation (React Hook Form takes a Zod resolver), so the form, the API check and the type all come from one place.

## Common mistakes

- ❌ Forgetting `as const`: the values widen to `string` and `keyof typeof` still works but the value union is just `string`. ✅ Add `as const` to the object.
- ❌ Writing a type by hand next to a schema that describes the same thing. They'll drift. ✅ `type X = z.infer<typeof X>`.
- ❌ Annotating config objects (`const theme: Theme`) and then wondering why autocomplete forgot your keys. ✅ `satisfies Theme`.
- ❌ A `switch` over a union with no `never` check. ✅ Add the exhaustive `default` so new cases can't be forgotten.

## Try it

1. Replace this enum with an `as const` object and derive both the key and value types: `enum Size { Small = 'S', Medium = 'M', Large = 'L' }`.
2. Model a file upload as a discriminated union (`idle`, `uploading` with `progress`, `done` with `url`, `failed` with `error`) and write a `label(upload)` function with an exhaustive `switch`.
3. Write a Zod schema for a sign-up form (`name`, `email`, `age` at least 18), infer its type, and `safeParse` one valid and one invalid object.

## Related
- [[docs/typescript/typescript|TypeScript - Basics]]
- [[docs/typescript/typescript-generics|TypeScript - Generics]]
- [[docs/javascript/javascript-objects|JavaScript - Objects]]
- [[docs/react/react|React - Basics]]
