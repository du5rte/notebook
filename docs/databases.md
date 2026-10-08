---
title: "Databases - Basics"
type: doc
created: 2015-11-01
updated: 2026-10-07
aliases: [Databases, The pain of wiring databases]
tags: [databases]
---
# Databases - Basics

A database is where your app keeps things it needs to remember after it restarts: users, orders, messages. Think of it as a very organised filing cabinet that many people can open at once without losing a page. This lesson covers the core ideas (tables vs documents, schemas, indexes), then walks the journey every developer takes wiring one into an app, and where I landed.

## Tables vs documents

There are two big families. **Tabular** (relational, SQL) databases work like spreadsheets: rows and columns, one table per kind of thing. **Document** (NoSQL) databases store JSON-like objects grouped in collections.

| SQL (Postgres, MySQL, SQLite) | Document (MongoDB, Firestore, Convex) |
| :---------------------------- | :------------------------------------ |
| Database                      | Database                              |
| Table                         | Collection                            |
| Row                           | Document                              |
| Column                        | Field                                 |
| Index                         | Index                                 |
| Join                          | Embedding or referencing              |

In a tabular database, account holders and their accounts live in two tables. An account doesn't contain its holder: it points at it with `holder_id`, and you **join** the two to read them together.

**account_holders**

| id | first_name | last_name |
| :- | :--------- | :-------- |
| 1  | Johnathan  | Smith     |
| 2  | Chang      | Yung      |

**accounts**

| id | account_type | balance  | currency | holder_id |
| :- | :----------- | :------- | :------- | :-------- |
| 1  | Investment   | 80000.00 | USD      | 1         |
| 2  | Savings      | 5000.00  | USD      | 1         |
| 3  | Savings      | 3000.00  | JPY      | 2         |

In a document database you can **embed** the accounts inside their holder, so one read gets everything:

```json
{
  "id": 1,
  "firstName": "Johnathan",
  "lastName": "Smith",
  "accounts": [
    { "accountType": "Investment", "balance": 80000, "currency": "USD" },
    { "accountType": "Savings", "balance": 5000, "currency": "USD" }
  ]
}
```

Embed vs reference is the document world's big decision. Embed what you always read together and that belongs to one parent (a holder's accounts). Reference what's shared or grows without limit (a vendor used by a thousand products, comments on a post), otherwise you'll update the same vendor in a thousand places.

## Schemas

A schema is the blueprint: what kinds of things exist, what fields they have, and how they relate. SQL enforces it in the database. Many document databases don't, which feels free on day one and hurts on day ninety.

```sql
CREATE TABLE users (
  id    serial PRIMARY KEY,
  name  text NOT NULL,
  email text UNIQUE NOT NULL
);
```

Whatever you pick, you want **one schema that your types come from**, so the database, the server and the client agree on what a `User` is.

## Indexes

An index is the index at the back of a book. Without one, finding every user with a given email means reading every row (a full scan). With one, the database jumps straight there.

```sql
CREATE INDEX users_email_idx ON users (email);

SELECT * FROM users WHERE email = 'ana@example.com';
-- uses the index instead of scanning the whole table
```

Indexes make reads fast and writes a little slower, because every insert also updates the index. Add them for the fields you filter and sort by, not for everything.

> Search engines take the same idea further with an **inverted index**: a map from every word to the documents that contain it. "Space" points to both a Star Trek quote and a space-cowboy lyric; "frontier" only to the first. Rank results by how often a word appears in a document, weighted down if it appears in every document, and you get relevance. Postgres full-text search works on this idea.

## The pain of wiring databases

I hate, you hate, everyone hates it. Here are the phases of hate. 😤

### 1. You bootstrap a database

You'll first boot a SQL or NoSQL database **locally** and it's great! 🎉 Then you deploy it somewhere others can reach it, and you spend hours figuring out AWS or DigitalOcean. Then you spend countless hours learning Linux, and your whole weekend perfecting deployments.

### 2. You switch to a managed database

You'll move to a managed service like Neon or MongoDB Atlas, which comes with great features: a data inspector, easy scaling, automated backups. More costly, but **honestly worth every penny** unless you want to live half of your life managing a server in a basement.

### 3. You add a server

You **can't possibly** connect your client straight to the database! 😱 Anyone could inspect the requests and hack it. So you wire every request through a Node.js server that handles authentication and authorisation: *who is who, and who can do what*.

Which is another thing you need to write, deploy and manage, when **most of the data passing through it needs no action at all**. Now you have three connection points to keep in step: `database -> server`, `server -> client`, `client -> render`.

```ts
// server
app.get('/users/:email', async (req, res) => {
  const user = await db.collection('users').findOne({ email: req.params.email })
  res.json(user)
})

// client
const response = await fetch(`/users/${email}`)
const user = await response.json()

// render
<p>{user.name} - {user.email}</p>
```

### 4. You build a schema

You'll run into miscommunication between database, server and client, so you'll **religiously enforce a schema** on your team. By passing Postman collections around Slack, writing Swagger docs, or, one step ahead, using GraphQL with codegen to generate a typed client and hooks. Ultimately you want **types checked and enforced throughout your code**.

### 5. You add caching

Every time you load a feed, *the client requests the server, the server queries the database, the database returns the rows, the server responds, the client resolves the promise, the component renders… Exhausting!* 😩 So you cache on the client with React Query, or Apollo for GraphQL, to stop asking for what you already have.

> Server-side, the classic move is a **key-value store** like Redis in front of the database: keep the answer to an expensive query under a key (`feed:user:42`) with an expiry, and only hit the database on a miss. Fast, simple, and one more thing to keep in sync.

### 6. You dread migrations

Now that your types line up across every connection point, the thought of changing the database gives you anxiety. 📈 One rename means updates across repos and version matching. 😵‍💫

Rename `email` to `emailAddress` and watch it ripple:

```ts
// ❌ the server query fails
db.collection('users').findOne({ email })

// ✅ you fix the server, ❌ the client fetch now gets the wrong shape
const user = await (await fetch(`/users/${email}`)).json()

// ✅ you fix the fetch, ❌ the render shows undefined
<p>{user.name} - {user.email}</p>
```

### 7. You need relations

Then you need **relations**: *which message belongs to which user?* If you like NoSQL, your server runs several queries per request, maybe stitched together with GraphQL. If you're a MongoDB fan maybe you tried Mongoose (*if you did, I'm sorry* ❤️‍🩹) or Realm (now deprecated). Eventually you realise you have to move to SQL.

### 8. You reach for an ORM

An ORM like Prisma or Drizzle lets you define your SQL schema in TypeScript, in your codebase, and query it with typed functions instead of strings. Prisma has a reputation for being slow, but it's an **interesting paradigm** and very developer friendly. Most SQL databases prefer `snake_case`, but you don't have to give up `camelCase` in your code just yet. More in [[docs/sql|Databases - SQL and Postgres]].

### 9. You switch to a BaaS

*Maybe, maybe*, you come across a BaaS (Backend as a Service) like Supabase: Postgres with authentication, access policies and an API on top. Now you barely need a server of your own.

### 10. You need realtime updates

Chat, notifications, live dashboards. You add WebSockets, Socket.io, Redis pub/sub or Supabase Realtime, then hand-write subscriptions that merge new data into your cache. It works, and it's a lot of plumbing for "show the new message".

### 11. You need synced data

You want truly native realtime sync, so you switch to Firebase. It's great for getting projects started, **but gets pretty expensive once your app grows**. No schema enforcement, security rules become a nightmare to maintain, and most of your data is locked away in Google Cloud.

### You find Convex 🙌

An **open source**, fully reactive database. Instead of setting up listeners, queries are **automatically reactive**: they re-run only when the data they read changes, and the app updates without extra code. It manages caching and state updates for you. Your backend functions live in your codebase, in TypeScript, fully type safe.

- ✅ Written from the ground up in Rust
- ✅ Documents **with relations** 🎉
- ✅ Open source or cloud managed
- ✅ All data is realtime and reactive
- ✅ Caching and state updates handled for you
- ✅ Type-safe schema defined in your codebase, pushed to the server
- ✅ Your own dev deployment before you touch production
- ✅ Handles provisioning and scaling
- ✅ A CLI that makes starting and integrating projects easy
- ✅ HTTP actions for webhooks, with the rest of your code

Here's the user-with-messages screen that took a server, a fetch and a cache above:

```tsx
const user = useQuery(api.users.get, { userId })
const messages = useQuery(api.messages.byUser, { userId })

if (!user || !messages) return <Loading />

return <MessageList user={user} messages={messages} />
// re-renders by itself when a new message lands
```

Full lesson: [[docs/convex|Databases - Convex]].

**Other contenders:** tRPC (end-to-end typesafe APIs over your own database, what we use with Drizzle and Neon on a team) and InstantDB (a modern Firebase).

## Common mistakes

- **Connecting the client straight to the database.** Every request needs a server, or a backend with access rules, deciding who can do what.
- **Indexing nothing, or everything.** Index the fields you filter and sort by.
- **Embedding data that's shared.** If the same vendor lives inside a thousand documents, you'll update it a thousand times.
- **Hand-writing the same type in three places.** Generate or infer it from one schema.

## Try it

1. Draw the account holders example as one embedded document per holder. Now add a `Bank` that many accounts share: embed or reference? Why?
2. You filter orders by `customerId` and sort by `createdAt` on every page load. Which index would you add?
3. Pick an app you use daily. Which of the phases of hate do you think its team went through?

## Related

- [[docs/sql|Databases - SQL and Postgres]]
- [[docs/convex|Databases - Convex]]
- [[docs/graphql/graphql|GraphQL - Basics]]
- [[docs/node/node-server|Node - Server]]
- [[docs/security|Security]]
