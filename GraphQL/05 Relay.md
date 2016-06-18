# GraphQL - Relay

Resources:
- [relay-mongodb-connection](https://github.com/mikberg/relay-mongodb-connection)
- [graphql-relay-js](https://github.com/graphql/graphql-relay-js)
- [A look at Relay and Apollo](https://medium.com/front-end-developers/a-look-at-relay-and-apollo-96fcb215e1d#.jzct16bbl)
- [Facebook, Relay and GraphQL, Give it 5 days](http://red-badger.com/blog/2015/08/28/give-it-5-days-facebook-relay-and-graphql/)

## Node Edge Pattern

```js
import {
  connectionDefinitions,
  connectionArgs,
  connectionFromArray
} from 'graphql-relay'

import connectionFromMongoCursor from 'relay-mongodb-connection'

var { connectionType: CustomersConnection } = connectionDefinitions({
  nodeType: CustomerType
})

var customers = {
  // adds the edge node pattern along with cursor and pageInfo
  type: CustomersConnection,
  // adds query parameters (first, last, after amd before)
  args: connectionArgs,
  async resolve(root, args, ctx, info) {
    args.first = args.first || 100
    // automatically skips and limits the MongoDB Cursor
    // so that only the necessary documents are retrieved from the database.
    let customers = await connectionFromMongoCursor(
      db.collection('bank_data').find({})
      , args
    )

    return customers
  }
}
```

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
