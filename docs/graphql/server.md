---
title: "GraphQL - Server"
type: doc
created: 2016-05-08
updated: 2016-05-08
tags: [graphql]
---
# GraphQL - Server


## GraphQL

```js
import {
  // These are the basic GraphQL types
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLEnumType,

  // This is used to create required fileds and arguments
  GraphQLNonNull,

  // This is the class we need to create the schema
  GraphQLSchema,
} from 'graphql'
```


## Schema
```js
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Queries',
    fields: () => ({
      /* insert queries */
      hello
    })
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutations',
    fields: () => ({
      /* insert mutations */

    })
  })
})
```


## Query

```js
export const hello = {
  type: GraphQLString,
  description: "Accepts a name so you can be nice and say hi",
  // Field Argument
  args: {
    name: {
      type: GraphQLString,
      description: "Name you want to say hi to :)",
    }
  },
  resolve(root, args, info) {
    return `Hello ${args.name || "World"}!`;
  }
}
```


## Types
Validate the queried data, fields can be a type, list of types `GraphQLList` or another type object nested inside `GraphQLObjectType`

```js
const accountType = new GraphQLObjectType({
  name: 'Customer',
  description: 'Customer Account',
  fields: () => ({
    account_balance: {type: GraphQLFloat},
    account_type: {type: GraphQLString},
    currency: {type: GraphQLString}
  })
})

const customerType = new GraphQLObjectType({
  name: 'Customer',
  description: 'Banking Customer',
  fields: () => ({
    _id: {type: GraphQLString},
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
    // an array of accounts
    accounts: {type: new GraphQLList(accountType)}
  })
})
```


## Mutation

```js
export const hello = {
  type: GraphQLString,
  description: "Accepts a name so you can be nice and say hi",
  args: {
    name: {
      type: GraphQLString,
      description: "Name you want to say hi to :)",
    }
  },
  resolve(root, args, info) {
    return `Hello ${args.name || "World"}!`;
  }
}
```

## Node Edge Pattern
Fundamentals kept from [[archive/graphql/relay|GraphQL - Relay (2016)]].

- `type`: adds the edge node pattern along with cursor and pageInfo
- `args`: adds query parameters (first, last, after and before)

```graphiql
{
  store {
    customers(first: 2) {
      edges {
        node {
          _id
          first_name
          last_name
        }
      }
    }
  }
}
```

## Resolvers with MongoDB
Fundamentals kept from [[archive/graphql/mongodb|GraphQL - MongoDB (2016)]].

Although graphql filters only the necessary fields in the query `mongoDB` is returning all the fields not being efficient.
```js
import { db, ObjectId } from 'mongodb'

const customer = {
  type: customerType,
  args: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
  },
  resolve(root, args, context, info) {
    return db.collection('bank_data')
      .findOne({_id: ObjectId(args._id)})
  }
}
```

## Related
- [[docs/graphql/basics|GraphQL - Basics]]
- [[docs/graphql/graphiql|GraphQL - GraphiQL]]
