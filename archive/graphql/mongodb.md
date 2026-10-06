---
title: "GraphQL - MongoDB"
type: doc
created: 2016-05-08
updated: 2016-06-18
tags: [graphql]
---
# GraphQL - MongoDB

Still-valid fundamentals moved to [[docs/graphql/server|GraphQL - Server]] (Resolvers with MongoDB).

Resources:
- [sitepoint graphql with mongodb](http://www.sitepoint.com/creating-graphql-server-nodejs-mongodb/)


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
