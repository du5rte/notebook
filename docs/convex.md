---
title: "Databases - Convex"
type: doc
created: 2026-10-07
updated: 2026-10-07
aliases: [Convex]
tags: [databases, typescript]
---
# Databases - Convex

Convex is a reactive backend: a document database, your server functions and realtime sync in one place. You write TypeScript functions in a `convex/` folder next to your app; they run on Convex's servers, and any screen that reads data **updates by itself** when that data changes. No REST routes, no client cache to invalidate, no WebSocket plumbing. It's like a shared Google Doc for your app's data: everyone looking at it sees the change as it happens. It's my default backend for solo projects.

## The mental model

Three kinds of functions, one database:

| | Reads | Writes | Calls outside APIs | Reactive | Transactional |
| :-- | :-: | :-: | :-: | :-: | :-: |
| `query` | ✅ | ❌ | ❌ | ✅ | ✅ |
| `mutation` | ✅ | ✅ | ❌ | ❌ | ✅ |
| `action` | via queries | via mutations | ✅ | ❌ | ❌ |

Your app subscribes to queries and calls mutations. Convex tracks which documents each query read, and when a mutation changes one of them, it re-runs that query and pushes the new result to every client watching.

```sh
npx convex dev
# pushes your functions to your own dev deployment on every save
# and regenerates the typed client in convex/_generated
```

## Schema with validators

You describe tables with validators from `convex/values`. Convex checks every write against them, and generates your types from them. Every document gets `_id` and `_creationTime` for free.

```ts
// convex/schema.ts
import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
  }).index('by_email', ['email']),

  messages: defineTable({
    userId: v.id('users'),
    body: v.string(),
  }).index('by_user', ['userId']),
})
```

`v.id('users')` is a typed reference to another table: documents **with relations**. 🎉

## Inferred types

**Never hand-write types Convex can infer.** The schema is the one source of truth; the types come from it.

```ts
import type { Doc, Id } from './_generated/dataModel'

type Message = Doc<'messages'>
// { _id: Id<'messages'>, _creationTime: number, userId: Id<'users'>, body: string }
```

When you need a type for a shape that isn't a whole document, define the validator once and infer from it:

```ts
import { v, type Infer } from 'convex/values'

export const newMessage = v.object({ userId: v.id('users'), body: v.string() })
export type NewMessage = Infer<typeof newMessage>
// { userId: Id<'users'>, body: string }
```

## Queries: reading

A query takes validated `args` and reads with `ctx.db`. Use `withIndex` to look things up by an index from your schema.

```ts
// convex/messages.ts
import { query } from './_generated/server'
import { v } from 'convex/values'

export const byUser = query({
  args: { userId: v.id('users') },
  handler: (ctx, { userId }) =>
    ctx.db
      .query('messages')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .order('desc')
      .take(20),
})
```

In React (or React Native), `useQuery` subscribes to it:

```tsx
const messages = useQuery(api.messages.byUser, { userId })
// undefined while loading, then the latest 20 messages
// re-renders on its own when someone sends a new one
```

Queries must be deterministic: no `fetch`, no random side effects. That's what lets Convex cache and re-run them safely.

## Mutations: writing

A mutation reads and writes the database in one transaction. If it throws, nothing is saved.

```ts
import { mutation } from './_generated/server'

export const send = mutation({
  args: { body: v.string() },
  handler: async (ctx, { body }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not signed in')

    const user = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', identity.email!))
      .unique()
    if (!user) throw new Error('User not found')

    return ctx.db.insert('messages', { userId: user._id, body })
  },
})
```

```tsx
const send = useMutation(api.messages.send)
await send({ body: 'Coffee at 3?' })
// every screen showing this user's messages updates
```

Check who's calling inside every public function. The functions are your API; anyone can call them.

## Actions: the outside world

When you need to call something outside Convex (Stripe, an email service, an AI model), use an action. Actions can `fetch`, but they can't touch `ctx.db` directly: they go through queries and mutations with `ctx.runQuery` and `ctx.runMutation`.

```ts
import { action } from './_generated/server'
import { internal } from './_generated/api'

export const translate = action({
  args: { messageId: v.id('messages') },
  handler: async (ctx, { messageId }) => {
    const message = await ctx.runQuery(internal.messages.get, { messageId })
    const response = await fetch(process.env.TRANSLATE_API_URL!, {
      method: 'POST',
      body: JSON.stringify({ text: message?.body }),
    })
    const { text } = await response.json()
    await ctx.runMutation(internal.messages.saveTranslation, { messageId, text })
  },
})
```

An action isn't a transaction: if it fails halfway, the mutations it already ran stay. Keep the database work in mutations and make actions thin.

`internal.*` functions (defined with `internalQuery`, `internalMutation`) can only be called from your other Convex functions, never from a client. Use them for anything a user shouldn't trigger directly.

## Webhooks with HTTP actions

Services like Clerk tell you about events by calling a URL. An HTTP action is that URL, defined in your codebase:

```ts
// convex/http.ts
import { httpRouter } from 'convex/server'
import { httpAction } from './_generated/server'
import { internal } from './_generated/api'

const http = httpRouter()

http.route({
  path: '/clerk-users-webhook',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    const { data } = await request.json()
    await ctx.runMutation(internal.users.create, {
      name: `${data.first_name} ${data.last_name}`,
      email: data.email_addresses[0].email_address,
    })
    return new Response(null, { status: 200 })
  }),
})

export default http
```

In production, verify the webhook's signature before trusting the body.

## Why I pick it for solo projects

Wiring a database by hand means a server, a schema, a client cache, migrations and realtime plumbing, each in its own place (the full saga is in [[docs/databases|Databases - Basics]]). Convex collapses all of it into one folder of TypeScript.

- ✅ One schema, types inferred end to end, from table to component
- ✅ Realtime by default, no subscriptions to write
- ✅ Caching and state updates handled for you, so no server state mirrored into client state
- ✅ Your own dev deployment, then push to production
- ✅ Managed and scaled for you, or self-host the open source backend
- ⚠️ It's its own platform: your data model and functions are written for Convex
- ⚠️ A team with existing Postgres, SQL skills and reporting tools is often better on [[docs/sql|Postgres with Drizzle]]

Rule of thumb: solo or small team, app-shaped data, realtime screens? Convex. Existing SQL world, heavy reporting? Postgres.

## Common mistakes

- **`.filter()` instead of an index.** `filter` reads every document in the table. Define an index and use `withIndex`.
- **Hand-written types.** They drift from the schema. Use `Doc<'table'>`, `Id<'table'>` and `Infer`.
- **Writing the database from an action.** Actions aren't transactional. Do the writes in a mutation and call it.
- **Forgetting `undefined`.** `useQuery` returns `undefined` while loading; render a loading state.
- **No auth check in a public function.** Every exported `query` and `mutation` is callable by anyone with your deployment URL.

## Try it

1. Add a `likes` table that references `users` and `messages`, with an index to count likes per message.
2. Write a `like` mutation that refuses to like the same message twice.
3. Open the app in two browser windows, like a message in one, and watch the other update.

## Related

- [[docs/databases|Databases - Basics]]
- [[docs/sql|Databases - SQL and Postgres]]
- [[docs/typescript/typescript|TypeScript - Basics]]
