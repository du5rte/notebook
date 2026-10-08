---
title: "GraphQL - Basics"
type: doc
created: 2026-10-07
updated: 2026-10-07
aliases: [GraphQL, Apollo Client]
tags: [react, graphql]
---
# GraphQL - Basics

GraphQL is a query language for APIs. Instead of the server deciding what each endpoint returns, the **client asks for exactly the fields it needs**, in one request, and gets back JSON in the same shape as the question. Think of ordering at a coffee bar: REST hands you the set menu, GraphQL lets you say "oat flat white, one shot, no foam" and that's what arrives. These days I consume GraphQL rather than write servers for it, mostly the Shopify Storefront API through Apollo Client, so this lesson is client-side.

## GraphQL vs REST

With REST, each resource has a URL and returns a fixed shape. Building one screen often means several round trips, each returning more than you need.

```ts
// REST: three trips, whole objects each time
const product = await fetch('/api/products/latte').then((res) => res.json())
const reviews = await fetch(`/api/products/${product.id}/reviews`).then((res) => res.json())
const shop = await fetch(`/api/shops/${product.shopId}`).then((res) => res.json())
```

GraphQL has **one endpoint**. You send a query describing the tree you want.

```graphql
query {
  product(handle: "latte") {
    title
    reviews(first: 2) { rating }
    shop { name }
  }
}
```

```json
{
  "data": {
    "product": {
      "title": "Latte",
      "reviews": [{ "rating": 5 }, { "rating": 4 }],
      "shop": { "name": "Corner Coffee" }
    }
  }
}
```

|  | REST | GraphQL |
|---|---|---|
| Endpoints | one per resource | one |
| Response shape | server decides | client decides |
| Over-fetching | ⚠️ common | ✅ ask for what you need |
| Several resources in one trip | ❌ | ✅ |
| HTTP caching | ✅ simple (GET by URL) | ⚠️ needs a client cache |
| Typed schema | optional | ✅ always |

## The schema

Every GraphQL API publishes a **schema**: the types, their fields, and what you can query. It's a contract, and it's why tools can autocomplete your queries and check them before they run. `!` means the field is never null.

```graphql
type Product {
  id: ID!
  title: String!
  price: Float!
  tags: [String!]!
}

type Query {
  product(handle: String!): Product
}
```

You don't need to write schemas to use GraphQL, but read the one you're querying. An explorer like GraphiQL (Shopify ships one too) shows the docs next to an editor with autocomplete. It's the fastest way to learn an API.

## Queries and arguments

A query is fields, nested as deep as the data goes. Fields can take arguments, and you can rename a field in the response with an alias.

```graphql
query {
  latte: product(handle: "latte") { title }
  mocha: product(handle: "mocha") { title }
}
# { "data": { "latte": { "title": "Latte" }, "mocha": { "title": "Mocha" } } }
```

## Variables

Don't build queries with string interpolation. Name the query, declare typed variables with `$`, and pass the values separately as JSON.

```graphql
query ProductByHandle($handle: String!) {
  product(handle: $handle) {
    title
  }
}
```

```json
{ "handle": "latte" }
```

The query text stays the same for every product, which makes it safe, cacheable and easy to type.

## Fragments

A fragment is a reusable set of fields on a type. Use it when several queries need the same fields, or to let a component declare the data it needs.

```graphql
fragment ProductCard on Product {
  id
  title
  featuredImage { url }
}

query Home {
  products(first: 3) {
    nodes { ...ProductCard }
  }
}
```

## Mutations

Queries read; **mutations** write. Same syntax, different keyword. Ask for the changed data back so your cache can update.

```graphql
mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart { id totalQuantity }
    userErrors { field message }
  }
}
```

Two gotchas. Mutations in one request run **in order**, one after another, while query fields can resolve in parallel. And a GraphQL response is usually HTTP `200` even when something went wrong: check `errors` in the response, and APIs like Shopify's return business errors as data (`userErrors`), so check those too.

## Apollo Client in React

Apollo Client sends your queries and keeps the results in a **normalised cache**. Set it up once and wrap your app in the provider.

```tsx
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_STOREFRONT_URL,
    headers: { 'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_STOREFRONT_TOKEN ?? '' },
  }),
  cache: new InMemoryCache(),
})

<ApolloProvider client={client}>
  <App />
</ApolloProvider>
```

The Storefront token is a public, read-mostly token, which is why it can live in the client. Never put an admin key there.

## useQuery

`useQuery` runs the query and re-renders with `loading`, `error` and `data`. Type the data and variables so the result is checked.

```tsx
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

type ProductData = { product: { title: string } | null }
type ProductVariables = { handle: string }

const PRODUCT = gql`
  query ProductByHandle($handle: String!) {
    product(handle: $handle) { id title }
  }
`

function ProductTitle({ handle }: ProductVariables) {
  const { data, loading, error } = useQuery<ProductData, ProductVariables>(PRODUCT, {
    variables: { handle },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong</p>
  return <h1>{data?.product?.title ?? 'Not found'}</h1>
}
// <ProductTitle handle="latte" /> → <h1>Latte</h1>
```

Writing those types by hand gets old. A code generator can read the schema and your queries and produce them for you.

## useMutation

`useMutation` gives you a function to call and the state of the last call.

```tsx
import { useMutation } from '@apollo/client/react'

const [addToCart, { loading }] = useMutation(ADD_TO_CART)

<button
  disabled={loading}
  onClick={() => addToCart({ variables: { cartId, lines: [{ merchandiseId, quantity: 1 }] } })}
>
  Add
</button>
```

## The cache is your state

Apollo stores every object by its type and id (`Cart:abc`). When a mutation returns `cart { id totalQuantity }`, Apollo updates that cart in the cache, and **every component showing it re-renders**. No manual refetch, no copying into a store.

This is the "one source of truth" rule from [[docs/react/react-state|React - State and Hooks]]: the cache owns server data. Read it with `useQuery` wherever you need it; don't mirror it into `useState`. Always ask for `id` so objects can be matched. When a mutation creates or deletes something the cache can't guess about (a new item in a list), use `refetchQueries` or `update` to tell it.

## Common mistakes

- Interpolating values into the query string instead of using variables.
- Forgetting `id` in a selection, so the cache can't merge updates.
- Treating HTTP `200` as success and ignoring `errors` or `userErrors`.
- Copying `data` into local state and watching it go stale.
- Asking for everything "just in case". The point is to ask for what the screen shows.

## Try it

1. In a GraphQL explorer, write a query for three products with their title and price, then turn the count into a `$first` variable.
2. Pull the product fields into a `ProductCard` fragment and use it in two queries.
3. Build a React component with `useQuery` that lists products, and a button with `useMutation` that adds one to a cart and shows the new total without a refetch.

## Related
- [[docs/react/react-state|React - State and Hooks]]
- [[docs/react/react|React - Basics]]
- [[docs/nextjs|Next.js - Basics]]
- [[docs/http|Networking - HTTP]]
- [[docs/javascript/javascript-json|JavaScript - JSON]]
- [[docs/typescript/typescript|TypeScript - Basics]]
- [[docs/react-native/react-native|React Native - Basics]]
