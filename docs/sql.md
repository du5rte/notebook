---
title: "Databases - SQL and Postgres"
type: doc
created: 2026-10-07
updated: 2026-10-07
aliases: [SQL, Postgres, PostgreSQL, Drizzle]
tags: [databases, typescript]
---
# Databases - SQL and Postgres

SQL is the language you use to talk to a relational database: ask for rows, add them, change them, delete them. Postgres is the relational database most teams reach for today: free, open source, rock solid, and it does far more than tables (JSON columns, full-text search, extensions). Learn SQL once and it works almost everywhere. Then, in a TypeScript app, you put a type-safe ORM like Drizzle on top so your queries are checked before they run.

We'll use a small coffee shop: `customers` and their `orders`.

## Tables and rows

A table has fixed columns, each with a type. Every row is one thing. A **primary key** gives each row a unique id.

```sql
CREATE TABLE customers (
  id         serial PRIMARY KEY,
  name       text NOT NULL,
  email      text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
```

`NOT NULL` and `UNIQUE` are rules the database enforces for you. Try to insert two customers with the same email and Postgres refuses.

## SELECT: reading

`SELECT` picks columns, `FROM` picks the table, `WHERE` filters rows.

```sql
SELECT name, email FROM customers WHERE name = 'Ana';
-- name | email
-- Ana  | ana@example.com
```

Add `ORDER BY` to sort and `LIMIT` to take the first few:

```sql
SELECT name FROM customers ORDER BY created_at DESC LIMIT 3;
-- the three newest customers
```

Avoid `SELECT *` in app code: ask for the columns you use.

## INSERT, UPDATE, DELETE: writing

```sql
INSERT INTO customers (name, email) VALUES ('Ana', 'ana@example.com')
RETURNING id;
-- id: 1

UPDATE customers SET name = 'Ana Silva' WHERE id = 1;
-- UPDATE 1

DELETE FROM customers WHERE id = 1;
-- DELETE 1
```

`RETURNING` hands you back the row you just wrote, so you don't need a second query to get the new `id`.

## Relations and foreign keys

An order belongs to a customer. Instead of copying the customer into every order, the order stores the customer's `id`. A **foreign key** makes the database check that customer actually exists.

```sql
CREATE TABLE orders (
  id          serial PRIMARY KEY,
  customer_id integer NOT NULL REFERENCES customers (id),
  drink       text NOT NULL,
  price_cents integer NOT NULL
);
```

One customer, many orders: that's a **one-to-many** relation. Many-to-many (orders and toppings) needs a third table in the middle with one row per pair.

Store money as whole cents in an integer. Floats round: `0.1 + 0.2 // 0.30000000000000004`.

## JOIN: reading across tables

A join stitches rows from two tables together on a matching column.

```sql
SELECT customers.name, orders.drink
FROM orders
JOIN customers ON customers.id = orders.customer_id;
-- name | drink
-- Ana  | Flat white
-- Ana  | Cortado
-- Ben  | Latte
```

`JOIN` (an inner join) keeps only rows that match on both sides. `LEFT JOIN` keeps every row from the left table, with `NULL` where there's no match: use it for "all customers, and their orders if they have any".

## Indexes

An index lets Postgres find rows without reading the whole table. Primary keys and `UNIQUE` columns get one automatically. Foreign keys **don't**, and you'll almost always filter on them.

```sql
CREATE INDEX orders_customer_id_idx ON orders (customer_id);

SELECT * FROM orders WHERE customer_id = 1;
-- now an index lookup, not a full scan
```

Put `EXPLAIN` in front of a slow query to see whether it uses an index.

## Transactions

A transaction groups writes so they **all happen or none do**. The classic example is moving money: take it from one account, add it to another. If the second step fails, the first must not stick.

```sql
BEGIN;
UPDATE accounts SET balance_cents = balance_cents - 500 WHERE id = 1;
UPDATE accounts SET balance_cents = balance_cents + 500 WHERE id = 2;
COMMIT;
-- or ROLLBACK; and neither update happened
```

## Migrations

Your schema changes over time: a new column, a renamed table. A **migration** is a small SQL file that moves the database from one version to the next. They're numbered, committed to git and run in order, so every environment ends up with the same shape.

```sql
-- 0002_add_phone.sql
ALTER TABLE customers ADD COLUMN phone text;
```

Never edit a migration that has already run in production. Write a new one.

## Postgres on Neon

You don't want to babysit a database server. Neon is managed, serverless Postgres: it's regular Postgres, you connect with a connection string, and it scales down when idle. It also does **branches**: a copy of your database for a feature or a preview deploy, the same way git branches your code. This is what my team runs.

```sh
# .env (never commit it)
DATABASE_URL=postgres://…
```

## Drizzle: SQL with types

Writing SQL strings in TypeScript gives you no types: rename a column and nothing complains until runtime. Drizzle is a thin, type-safe ORM. You describe your tables in TypeScript, and Drizzle infers the types and writes the SQL. It stays close to SQL, so everything above still applies.

```ts
// db/schema.ts
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const customers = pgTable('customers', {
  id: serial().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
})

export const orders = pgTable('orders', {
  id: serial().primaryKey(),
  customerId: integer().notNull().references(() => customers.id),
  drink: text().notNull(),
  priceCents: integer().notNull(),
})

export type Customer = typeof customers.$inferSelect
export type NewCustomer = typeof customers.$inferInsert
```

Never hand-write the `Customer` type: infer it from the table, so there's one source of truth.

Connect with `casing: 'snake_case'` and you write `camelCase` in TypeScript while the database keeps `snake_case` columns:

```ts
// db/index.ts
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

export const db = drizzle(process.env.DATABASE_URL!, { schema, casing: 'snake_case' })
```

## Drizzle queries

The query builder reads like the SQL it generates.

```ts
import { eq } from 'drizzle-orm'

const [ana] = await db
  .insert(customers)
  .values({ name: 'Ana', email: 'ana@example.com' })
  .returning()
// { id: 1, name: 'Ana', email: 'ana@example.com', createdAt: … }

const rows = await db
  .select({ name: customers.name, drink: orders.drink })
  .from(orders)
  .innerJoin(customers, eq(customers.id, orders.customerId))
// [{ name: 'Ana', drink: 'Flat white' }, …]

await db.update(customers).set({ name: 'Ana Silva' }).where(eq(customers.id, ana.id))
await db.delete(customers).where(eq(customers.id, ana.id))
```

Typo a column name and TypeScript catches it before the query ever runs.

Transactions take a callback. Throw inside it and everything rolls back:

```ts
import { eq, sql } from 'drizzle-orm'
// assuming an `accounts` table with `balanceCents`

await db.transaction(async (tx) => {
  await tx.update(accounts).set({ balanceCents: sql`${accounts.balanceCents} - 500` }).where(eq(accounts.id, 1))
  await tx.update(accounts).set({ balanceCents: sql`${accounts.balanceCents} + 500` }).where(eq(accounts.id, 2))
})
```

The Neon HTTP driver is built for one-shot queries; for interactive transactions like this use Neon's WebSocket driver (`drizzle-orm/neon-serverless`).

## Drizzle migrations

Change `schema.ts`, then let `drizzle-kit` diff it against the last migration and write the SQL for you.

```ts
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './db/schema.ts',
  out: './drizzle',
  casing: 'snake_case',
  dbCredentials: { url: process.env.DATABASE_URL! },
})
```

```sh
npx drizzle-kit generate   # writes drizzle/0001_….sql from your schema changes
npx drizzle-kit migrate    # runs pending migrations against the database
```

Read the generated SQL before you run it. A rename can come out as "drop column, add column", which drops your data.

## Common mistakes

- **Building SQL by gluing strings.** `"WHERE email = '" + email + "'"` is how SQL injection happens. Use parameters, or a query builder like Drizzle that does it for you.
- **No index on foreign keys.** Postgres doesn't add one; your joins will scan.
- **Money as floats.** Use integer cents.
- **Editing an old migration.** Environments that already ran it never see the change. Add a new one.
- **`SELECT *` everywhere.** You pay for columns you don't use, and a new column silently changes your result shape.

## Try it

1. Write the SQL for "every customer's name and how many orders they've placed", including customers with zero orders. (Hint: `LEFT JOIN` and `COUNT`.)
2. Add a `toppings` many-to-many to the coffee shop: which tables do you need?
3. Rewrite exercise 1 with Drizzle and check what type it infers for the result.

## Related

- [[docs/databases|Databases - Basics]]
- [[docs/convex|Databases - Convex]]
- [[docs/typescript/typescript|TypeScript - Basics]]
- [[docs/node/node-server|Node - Server]]
