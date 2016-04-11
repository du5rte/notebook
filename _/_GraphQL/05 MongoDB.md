



```js
const restaurant = {
  type: restaurantType,
  args: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
  },
  async resolve(root, {_id, limit=24}, info) {
    return await db.collection('restaurants').findOne({_id: pmongo.ObjectId(_id)}, fields)
  }
}
```
```js
const restaurant = {
  type: restaurantType,
  args: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
  },
  async resolve(root, {_id, limit=24}, info) {
    // filters the data from mongo to the server
    // {_id: 1, restaurant_id: 1, name: 1, borough: 1, cuisine: 1, address: 1}
    let projection = {}
    info.fieldASTs[0].selectionSet.selections.map(function(selection) {
      projection[selection.name.value] = 1
    })

    return await db.collection('restaurants').findOne({_id: pmongo.ObjectId(_id)}, projection)
  }
}
```
