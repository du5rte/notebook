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
