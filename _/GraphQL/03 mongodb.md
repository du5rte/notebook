# GraphQL - MongoDB

Resources:
- [sitepoint graphql with mongodb](http://www.sitepoint.com/creating-graphql-server-nodejs-mongodb/)




```js
export const customer = {
  type: customerType,
  args: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
  },
  resolve(root, args, ctx, info) {
    return db.collection('bank_data')
      .findOne({_id: ObjectId(args._id)})
  }
}
```


MongoDB will return the projected fields
```js
export function fieldsToProjection(info) {
  let projection = {}
  info.fieldASTs[0].selectionSet.selections.map(function(selection) {
    projection[selection.name.value] = 1
  })
  return projection
}
```
```js
export const customer = {
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
  resolve(root, { limit = 50, skip = 0 }, ctx, info) {
    return db.collection('bank_data')
      .find({}, infoToProjection(info))
      .limit(limit)
      .skip(skip)
      .toArray()
  }
}
```
