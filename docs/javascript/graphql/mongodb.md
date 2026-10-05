# GraphQL - MongoDB

Resources:
- [sitepoint graphql with mongodb](http://www.sitepoint.com/creating-graphql-server-nodejs-mongodb/)


Although graphql filters only the necessary fields in the query `mongoDB` is returning all the fields no being efficient.
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

This function uses the query `info` to create a mongoDB `projection`
```js
function fieldsToProjection(info) {
  let projection = {}
  info.fieldASTs[0].selectionSet.selections.map(function(selection) {
    projection[selection.name.value] = 1
  })
  return projection
}

const customer = {
  type: customerType,
  args: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
  },
  resolve(parent, args, context, info) {
    return db.collection('bank_data')
      .findOne({_id: ObjectId(args._id)}, infoToProjection(info))
  }
}
```

```js
export const customers = {
  type: new GraphQLList(customerType),
  args: {
    limit: {type: GraphQLInt},
    skip: {type: GraphQLInt}
  },
  resolve(root, args, context, info) {
    return db.collection('bank_data')
      .find({}, infoToProjection(info))
      .limit(args.limit)
      .skip(args.skip)
      .toArray()
  }
}
```
