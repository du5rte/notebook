# MongoDB - Mongo Shell

Resources:
- [Using Vim with the Mongo Shell](https://www.compose.io/articles/how-i-stopped-worrying-and-learned-to-love-the-mongo-shell/)

## Mongo
The `mongo` shell is an JavaScript shell to interact with the MongoDB Server

## Databases
To create a database use `use` <databasename>, creates (if it does not exist) and switches to it.

```js
use reviews // switched to db reviews
```

## Collections
Documents are always store in `collections` within a database.

Adding document
```js
// potions collection gets automatically created within database
db.potions.insert(
  {
    "name": "Invisibility",
    "vendor": "Kettlecooked",
    "price": 10.99,
    "score": 59,
    "tryDate": new Date(2012, 8, 13), // Turns into a ISODate( ... )
    "ingredients": ["newt toes", "secret", "laughter"],
    // Objects can be embedded in the document
    "ratings": {
      "strength": 2,
      "flavour": 5
    },
    "sizes": [2, 8, 16]
  }
)
```

Retrieving document
```js
db.potions.find()
// each document gets assigned an unique `_id`
// { "_id" : ObjectId("5656785f311d5a7ec2dd3510"), "name" : "Invisibility" .... }
```

Deleting collection
```js
db.potions.drop()
```

## Queries
The `find` function queries for specific documents from the collection.

```js
db.bank_data.find()         // finds all documents e.g. {} * 50000
db.bank_data.find().count() // prints the count of documents e.g. 50000
db.bank_data.findOne()      // finds the first document e.g. {..}
```

## Query by Field
Uses a `query` parameter to return matching set of documents. **Queries are case sensitive**.

Finds potions that match the name
```js
db.potions.find({"name": "Invisibility"})    
```

Finds potions with laughter
```js
db.potions.find({"ingredients": "laughter"})
```

Finds the best tasting potions within ratings
```js
db.potions.find({"ratings.flavour": 5})      
```

## Query by Comparison
Uses [Comparison Operators](http://docs.mongodb.org/manual/reference/operator/query/) to find a matching documents.

- `$gt`: Greater than
- `$gte`: Greater than or equal to
- `$lt`: Less than
- `$lte`: Less than or equal to
- `$ne`: Not equal to
- `$and`: And
- `$or`: Or
- `$$elemMatch`: Element Match
- `$`: Projects the first element in an array that matches the query condition.

Finds document priced less than 20.
```js
db.potions.find({"price": {$lt: 20}})         
```

Finds document priced between 10 and 20.
```js
db.potions.find({"price": {$gt: 10, $lt: 20}})
```

Finds documents not vended by Brewers.
```js
db.potions.find({"vendor": {$ne: "Brewers"}})
```
#### $$elemMatch
**Warning** comparisons compare each `key` separately so `[2, 8, 16]` would return as a match because individually `8` is less than `$lt:16` and `16` is bigger than `$gt:10`.
```
[2, 8, 16]    | value within range false | $lt:16 true  | $gt:10 true | match true
[32, 64, 80]  | value within range false | $lt:16 false | $gt:10 true | match false
```
To Find documents within a range the condition needs to be passed within `$elemMatch`
```js
db.potions.find({"sizes": {$elemMatch: {$gt: 10, $lt: 16}}})
```

#### And
```js
db.wands.find({"maker": {$ne: "Foxmond"}, "level_required": {$lte: 75}})
// same as
db.bank_data.find({ $and: [{"maker": {$ne: "Foxmond"}, "level_required": {$lte: 75}} ] })
```

#### Or
```js
db.bank_data.find({ $or: [{"maker": {$ne: "Foxmond"}, "level_required": {$lte: 75}} ] })
```

Example of a complex query
```js
db.wands.find(
  {
    "maker": {$ne: "Foxmond"},
    "level_required": {$lte: 75},
    "price": {$lt: 50},
    "lengths": {$elemMatch: {$gte: 3, $lte:4}}
  }
)
```

## Query Projection
Find takes a second parameter called a `projection` object that we can use to specify the exact fields we want back by setting their values to `true` or `1` or specify the fields we don't want by setting the values to `false` and `0`. **The only case a projection can both is values when hiding the `_id`**


## Pagination
Limiting and skipping can be implemented over documents

```js
db.potions.find().limit(3) // limits to 3 results (1 - 3)
db.potions.find().skip(3).limit(3) // limits to 3 results, skip 3 results (4 - 6)
db.potions.find().skip(3).limit(3) // limits to 3 results, skip 6 results (7 - 9)
```

```js
db.potions.find({"grade": {$gte: 80}}, {"_id": false, "name": true, "vendor": true})
// db.potions.find({"grade": {$gte: 80}}, {"_id": 0, "name": 1, "vendor": 1})
```

Example advance query pagination
```js
db.wands.find().sort({"price": -1}).limit(3) // find 3 most expensive wands
```

## Sort
Sorts documents descending `1` or ascending `-1`
```js
db.potions.find().sort({ "price": 1 }}) // sorts documents descending by price
db.potions.find().sort({ "price": -1 }) // sorts documents ascending by price
```

## Deleting
Uses a `query` parameter to delete matching set of documents.

```js
db.potions.remove({"name": "Shrinking"})      // WriteResult({ "nRemoved": 1 })
db.potions.remove({"vendor": "Kettlecooked"}) // WriteResult({ "nRemoved": 3 })
```

## Updating
Uses a `query` parameter and `update` parameter to update matching set of documents, **without using `$set` it overwrites the whole document**, to update multiple files `{multi: true}` needs to be added.
[Update Operators](https://docs.mongodb.org/manual/reference/operator/update/)

Updates price
```js
db.potions.remove({"name": "Love"}, {$set: {"price": 39.99} })                         
```

Updates multiple all KC vendors to Kettlecooked
```js
db.potions.remove({"vendor": "KC"}, {$set: {"vendor": "Kettlecooked"}}, {multi: true})
```

Increments the click count
```js
db.potions.remove({"name": "Shrinking"}, {$inc: {"count": 1}})                         
```

Creates it even if it does not exist
```js
db.potions.update({"potion": "Love"}, {$inc: {"count": 1}}, {upsert: true})
```


## Advanced Modifications
[Query and Projection Operators](https://docs.mongodb.org/manual/reference/operator/query/)

#### $unset
Removes the `color` field on all documents.
```js
db.potions.update({}, {$unset: {"color": ""}}, {"multi": true})       
```
#### $rename
Renames the `score` to `grade` field on all documents.
```js
db.potions.update({}, {$rename: {"score": "grade"}}, {"multi": true})
```

#### $set
The symbol `$` is a placeholder for the matched value.
```
["newt toes", "secret", "laughter"]  |  $ equals position 1
["quark", "rubber duck", "secret"]   |  $ equals position 2
```

Changes the 2nd ingredient `key` in the ingredients `Array` on all documents.
```js
db.potions.update({}, {$set: {"ingredients.1": 42}}, {"multi": true})
```

Changes the `"secret"` ingredient `key` in the ingredients `Array` on all documents.
```js
db.potions.update( {"ingredients": "secret"}, {$set: {"ingredients.$": 42}}, {"multi": true} )
```

Changes the rating strength `key: value` on the ratings `Object` of the document named `"Shrinking"`
```js
db.potions.update( {"name": "Shrinking"}, {$set: {"ratings.strength": 5}})
```

#### $push
Adds the budget `key` to the category `Array` of the document named `"Shrinking"`
```js
db.potions.update( {"name": "Shrinking"}, {$push: {"category": "budget"}} )
```

#### $addToSet
Adds the budget `key` to the category `Array` of the document named `"Shrinking"` **only if it doesn't exists already**
```js
db.potions.update( {"name": "Shrinking"}, {$addToSet: {"category": "budget"}} )
```

#### $pop
Removes the 2nd `key` from the category `Array` of the document named `"Shrinking"`. `1` for last element, `-1` for first element.
```js
db.potions.update( {"name": "Shrinking"}, {$pop: {"category": 1}} )
```

#### $pull
Removes the specific `key` from the category `Array` of the document named `"Shrinking"`, if passed an empty value `""` it will remove all
```js
db.potions.update( {"name": "Shrinking"}, {$pull: {"category": "tasty"}} )
```

## Iteration
Using a `for loop` documents can be iterate. To print to the mongo shell use `print()` not `console.log()`

```js
var potionsBy = db.potions.find({}, {"name": true, "vendor": true})

// For Loop
for(var i = 0; i < potionsBy.count(); i++) {
  // print to the mongo shell
  print('The ' + potionsBy[i].name + ' potion by ' + potionsBy[i].vendor);
}
```
```js
"The Invisibility potion by Kettlecooked"
...
```

## Aggregation
A fancy word for combining data, allows for advance computation by using `stage operators`

1. `$group`: Groups data by any the field we specify in it's `group key`
2. `group key`: **Always required**, returns a objects containing unique `_id`s
3. `"$vendor_id"`: Dollar sign field are `field paths` they link to a field in a document
4. `accumulator`: Computes the expression for grouped documents
5. `$sum`: Adds 1 for each matching document

Finds how many potions there is for each vendor
```js
db.potions.aggregate(
  // |--1--| |--------2--------| |-------4------|
  [{ $group: {"_id": "$vendor_id", total: {$sum:1}} }]
  //                |----3----|         |--5--|    
)
```
```json
[
  {"_id": "Kettlecooked", "total": 2},
  {"_id": "Brewers", "total": 1},
  {"_id": "Leprechaun Inc", "total": 1}
]
```

Finds the total of vendors grades, their average, their max and min grades
```js
db.potions.aggregate([{
  $group: {
    "_id": "$vendor_id", total: {$sum:1},
    "grade_total": {$sum: "$grade"},
    "avg_grade": {$avg: "$grade"},
    "max_grade": {$max: "$grade"},
    "min_grade": {$min: "$grade"}
  }
}])
```
```json
[
  {
    "_id": "Kettlecooked",
    "total": 2, "grade_total": 400,
    "avg_grade": 82, "max_grade": 94, "min_grade": 70
  },
  {
    "_id": "Brewers",
    "total": 1, "grade_total": 340,
    "avg_grade": 57, "max_grade": 84, "min_grade": 30
  }
]
```

#### Aggregation Pipeline
Multiple `stage operators` can be pipped stage to stage within the aggregation method.

```js
db.potion.aggregate([
  // works like `find()` should be used early as possible
  { $match: {"price": {"$lt": 15}} },
  // should be used early on
  { $project: {"_id": false, "vendor_id": true, "grade": true} },
  { $group: {"_id": "$vendor_id", "avg_grade": {$avg: "$grade"}} },
  { $sort: {"avg_grade": -1} },
  { $limit: 3 }
])
```
```json
{"_id": "Kettlecooked", "avg_grade": 99},
{"_id": "Leprechaun Inc", "avg_grade": 95},
{"_id": "Brewers", "avg_grade": 90},
```

Another example
```js
db.wands.aggregate([
  {$match: {"price": {$lt: 50}}},
  {$group: {"_id": "$maker", "average_magic": {$avg: "$damage.magic"}}},
  // stages can be used multiple times
  {$match: {"average_magic": {$gt: 40}}}
])
```
```json
{"_id": "Foxmond", "average_magic": 42.5}
{"_id": "Sageseer", "average_magic": 47.5}
```
