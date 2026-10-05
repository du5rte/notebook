# MongoDB - Basics

Resouces:
- [MongoDB Docs](https://docs.mongodb.org/getting-started/node/introduction/)
- [MongoDB Jump Start by sedouard](https://github.com/sedouard/mongodb-mva)
- [Installing](http://docs.mongodb.org/master/tutorial/install-mongodb-on-os-x/?_ga=1.148455231.929616701.1431273906)
- [MongoDB Tutorial for Beginners - YouTube](https://www.youtube.com/watch?v=W-WihPoEbR4)
- [Getting Started With MongoDB Queries](https://github.com/sedouard/mongodb-mva/tree/master/module2_getting_started)
- [robomongo](http://robomongo.org)

## MongoDB
Is a NoSQL `Document Oriented` database, where data is structured in `Documents` like `json` files and `Collections` arrays of
`Objects`.

Server MongoDB Database Structure
```
.                             ┌─ Collection1
                ┌─ database0 ─┤─ Collection0
                │             └─ CollectionN
MongoDB Server ─┤
                │             ┌─ Collection1
                └─ databaseN ─┤─ Collection0
                              └─ CollectionN
```

## Installing

```sh
$ brew install mongodb
```

## Import Data
```sh
$ mongoimport --db test --collection restaurants --drop --file primer-dataset.json
```

## mongod (server)
By default `mongod` looks for documents on `/data/db` and runs on port `27017`, the folder needs to be created and given enough permission to use.

```sh
$ sudo mkdir -p /data/db
$ sudo chown -R $USER /data/db
$ mongod
```

Or create data directory and pass it to `mongod`
```sh
$ mkdir -p data/db/
$ mongod --dbpath ./data/db
```

## mongo (shell)
The `mongo` shell works like an JavaScript shell, for a guide write `help`

```js
// variables and functions can be created
var hello = "hello world"

hello // "hello world"
```

## mongoDB Driver
To access the mongoDB with an application it needs a driver for it's language

```sh
$ npm install --save mongodb
# or mongoose
$ npm install --save mongoose
```
```js
var mongo = require('mongodb');
var mongoClient = mongo.Client
```

## BSON
Documents are persisted in a formated called `BSON`, similar to `JSON` but with some additions. [BSON Types](https://docs.mongodb.org/manual/reference/bson-types/#bson-types-comparison-order)

Stores:
- Strings: `"Invisibility"`
- Numbers: `1400`, `3.14`
- Booleans: `true`, `false`
- Arrays: `["newt toes", "pickles"]`
- Objects: `{"type": "potion"}`
- Null: `null`
- ObjectID: `ObjectId(...)`
- Date: `ISODate(...)`

Example:
```js
{
  "_id": ObjectId("56577932e33e68f07fc31d1f")
  "name": "Invisibility",
  "vendor": "Kettlecooked",
  "price": 10.99,
  "score": 59,
  "tryDate": ISODate("2012-09-12T23:00:00Z"),
  "ingredients": ["newt toes", "secret", "laughter"],
  // Objects can be embedded in the document
  "ratings": {
    "strength": 2,
    "flavour": 5
  },
  "sizes": [2, 8, 16]
}
```


## Document Referencing
Sometimes `referencing` is better than `embedding`

To update the embedded `vendor` to non-organic we would have to change all documents that contain it, **not to mention duplication**
```js
{
  "_id": ObjectId( ... ),
  "name": "Invisibility",
  ...
  "vendor": {
    "name": "Kettlecooked",
    "phone": 555555555,
    "organic": true
  }
}
```

Instead we can create a new vendor `collection` where we create a vendor with the name as the `_id`
```js
db.vendors.insert({
  "_id": "Kettlecooked",
  "phone": 555555555,
  "organic": false
})
```
Then we can reference it in our potion document
```js
{
  "_id": ObjectId( ... ),
  "name": "Invisibility",
  ...
  "vendor_id": "Kettlecooked" // Referes to vendor "Kettlecooked"
}
```

Query the whole document first we query the potion
```js
db.potions.find({"name": "Invisibility"})
```
Then the potion vendor
 ```js
 db.vendors.find({"_id": "Kettlecooked"})
 ```

## Embed vs Reference

#### Atomicity
When we write on `embedded` documents it writes completely or doesn't write at all

When writing multiple documents it does not support `atomicity`, if a new `potion` is successful created but a new `vendor` fails, the `potion` is still created, **and it can reference a `potion` that doesn't exist**.
```
db.potions.insert({ ... }) // succeed
db.vendors.insert({ ... }) // failed
```

#### Embedded Documents
Data is readily available, with a single query we can get all the data, supports `atomicity`.


#### Referenced Documents
Data exists in a entirely different `collection`, it only needs to be change in one place, requires an **additional query per reference**, does not support multi-document `atomicity`.

#### Deciding
Lets say we want to allow users to comment on potions, potions are gonna have many comments and each comment will belong to a user.
```
Potion -> Comment -> User
```

In most cases embedding is the best option

How often it's used together? | Always | Sometimes | Rarely
------------------------------|--------|-----------|-------
Embed                         | X      | X         | X
Reference                     |        | X         | X

Depending on it's size or expansion it might be a good idea to reference instead

Expected Size | Less than 100 | More than a few hundred | Thousands
--------------|---------------|-------------------------|----------
Embed         | X             | X                       |
Reference     |               | X                       | X

Data that it's not expected to change often can be safely embedded but dynamic data is better of being referenced

Frequency of Change | Never/Rarely | Occasionally | Constantly
--------------------|--------------|--------------|-----------
Embed               | X            | X            |
Reference           |              | X            | X

#### Verdict
Comments are strongly related to potions, small in size and rarely change, so embedding is the best option, on the other hand although users are even related to it's comments, they can be much bigger in size and their data can change occasionally.

```js
{
  "name": "Invisibility",
  ...
  "comments": [
    "title": "The best potion!",
    "body": "Lorem ipsum abra cadrbra",
    "user_id": "Azrius" // usernames can be changed and are unique
  ]
}
```

Generally, embedding is the best starting point and referencing as data expands in size and frequency of change.

# Mongo Shell

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
db.potions.insert({
  name: 'Invisibility',
  vendor: 'Kettlecooked',
  price: 10.99,
  score: 59,
  tryDate: new Date(2012, 8, 13), // Turns into a ISODate( ... )
  ingredients: ['newt toes', 'secret', 'laughter'],
  // Objects can be embedded in the document
  ratings: {
    strength: 2,
    flavour: 5
  },
  sizes: [2, 8, 16]
})

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
db.potions.find({ name: 'Invisibility' })

```

Finds potions with laughter
```js
db.potions.find({ ingredients: 'laughter' })

```

Finds the best tasting potions within ratings
```js
db.potions.find({ 'ratings.flavour': 5 })
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
db.potions.find({ price: { $lt: 20 } })

```

Finds document priced between 10 and 20.
```js
db.potions.find({ price: { $gt: 10, $lt: 20 } })

```

Finds documents not vended by Brewers.
```js
db.potions.find({ vendor: { $ne: 'Brewers' } })

```
#### $$elemMatch
**Warning** comparisons compare each `key` separately so `[2, 8, 16]` would return as a match because individually `8` is less than `$lt:16` and `16` is bigger than `$gt:10`.
```
[2, 8, 16]    | value within range false | $lt:16 true  | $gt:10 true | match true
[32, 64, 80]  | value within range false | $lt:16 false | $gt:10 true | match false
```
To Find documents within a range the condition needs to be passed within `$elemMatch`
```js
db.potions.find({ sizes: { $elemMatch: { $gt: 10, $lt: 16 } } })

```

#### And
```js
db.wands.find({ maker: { $ne: 'Foxmond' }, level_required: { $lte: 75 } })
// same as
db.bank_data.find({
  $and: [{ maker: { $ne: 'Foxmond' }, level_required: { $lte: 75 } }]
})
```

#### Or
```js
db.bank_data.find({
  $or: [{ maker: { $ne: 'Foxmond' }, level_required: { $lte: 75 } }]
})
```

Example of a complex query
```js
db.wands.find({
  maker: { $ne: 'Foxmond' },
  level_required: { $lte: 75 },
  price: { $lt: 50 },
  lengths: { $elemMatch: { $gte: 3, $lte: 4 } }
})

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
db.potions.find(
  { grade: { $gte: 80 } },
  { _id: false, name: true, vendor: true }
)
// db.potions.find({"grade": {$gte: 80}}, {"_id": 0, "name": 1, "vendor": 1})
```

Example advance query pagination
```js
db.wands.find().sort({ price: -1 }).limit(3) // find 3 most expensive wands
```

## Sort
Sorts documents descending `1` or ascending `-1`
```js
db.potions.find().sort({ price: 1 }) // sorts documents descending by price
db.potions.find().sort({ price: -1 }) // sorts documents ascending by price
```

## Deleting
Uses a `query` parameter to delete matching set of documents.

```js
db.potions.remove({ name: 'Shrinking' }) // WriteResult({ "nRemoved": 1 })
db.potions.remove({ vendor: 'Kettlecooked' }) // WriteResult({ "nRemoved": 3 })
```

## Updating
Uses a `query` parameter and `update` parameter to update matching set of documents, **without using `$set` it overwrites the whole document**, to update multiple files `{multi: true}` needs to be added.
[Update Operators](https://docs.mongodb.org/manual/reference/operator/update/)

Updates price
```js
db.potions.remove({ name: 'Love' }, { $set: { price: 39.99 } })
```

Updates multiple all KC vendors to Kettlecooked
```js
db.potions.remove(
  { vendor: 'KC' },
  { $set: { vendor: 'Kettlecooked' } },
  { multi: true }
)
```

Increments the click count
```js
db.potions.remove({ name: 'Shrinking' }, { $inc: { count: 1 } })
```

Creates it even if it does not exist
```js
db.potions.update({ potion: 'Love' }, { $inc: { count: 1 } }, { upsert: true })
```


## Advanced Modifications
[Query and Projection Operators](https://docs.mongodb.org/manual/reference/operator/query/)

#### $unset
Removes the `color` field on all documents.
```js
db.potions.update({}, { $unset: { color: '' } }, { multi: true })
```
#### $rename
Renames the `score` to `grade` field on all documents.
```js
db.potions.update({}, { $rename: { score: 'grade' } }, { multi: true })
```

#### $set
The symbol `$` is a placeholder for the matched value.
```
["newt toes", "secret", "laughter"]  |  $ equals position 1
["quark", "rubber duck", "secret"]   |  $ equals position 2
```

Changes the 2nd ingredient `key` in the ingredients `Array` on all documents.
```js
db.potions.update({}, { $set: { 'ingredients.1': 42 } }, { multi: true })
```

Changes the `"secret"` ingredient `key` in the ingredients `Array` on all documents.
```js
db.potions.update(
  { ingredients: 'secret' },
  { $set: { 'ingredients.$': 42 } },
  { multi: true }
)
```

Changes the rating strength `key: value` on the ratings `Object` of the document named `"Shrinking"`
```js
db.potions.update({ name: 'Shrinking' }, { $set: { 'ratings.strength': 5 } })
```

#### $push
Adds the budget `key` to the category `Array` of the document named `"Shrinking"`
```js
db.potions.update({ name: 'Shrinking' }, { $push: { category: 'budget' } })
```

#### $addToSet
Adds the budget `key` to the category `Array` of the document named `"Shrinking"` **only if it doesn't exists already**
```js
db.potions.update({ name: 'Shrinking' }, { $addToSet: { category: 'budget' } })
```

#### $pop
Removes the 2nd `key` from the category `Array` of the document named `"Shrinking"`. `1` for last element, `-1` for first element.
```js
db.potions.update({ name: 'Shrinking' }, { $pop: { category: 1 } })
```

#### $pull
Removes the specific `key` from the category `Array` of the document named `"Shrinking"`, if passed an empty value `""` it will remove all
```js
db.potions.update({ name: 'Shrinking' }, { $pull: { category: 'tasty' } })
```

## Iteration
Using a `for loop` documents can be iterate. To print to the mongo shell use `print()` not `console.log()`

```js
var potionsBy = db.potions.find({}, { name: true, vendor: true })

// For Loop
for (var i = 0; i < potionsBy.count(); i++) {
  // print to the mongo shell
  print('The ' + potionsBy[i].name + ' potion by ' + potionsBy[i].vendor)
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
  //  |--1--| |--------2--------|  |---------4--------|
  ;[{ $group: { _id: '$vendor_id', total: { $sum: 1 } } }]
  //                 |-----3-----|        |----5----|    
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
db.potions.aggregate([
  {
    $group: {
      _id: '$vendor_id',
      total: { $sum: 1 },
      grade_total: { $sum: '$grade' },
      avg_grade: { $avg: '$grade' },
      max_grade: { $max: '$grade' },
      min_grade: { $min: '$grade' }
    }
  }
])
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
  { $match: { price: { $lt: 15 } } },
  // should be used early on
  { $project: { _id: false, vendor_id: true, grade: true } },
  { $group: { _id: '$vendor_id', avg_grade: { $avg: '$grade' } } },
  { $sort: { avg_grade: -1 } },
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
  { $match: { price: { $lt: 50 } } },
  { $group: { _id: '$maker', average_magic: { $avg: '$damage.magic' } } },
  // stages can be used multiple times
  { $match: { average_magic: { $gt: 40 } } }
])
```
```json
{"_id": "Foxmond", "average_magic": 42.5}
{"_id": "Sageseer", "average_magic": 47.5}
```

## Indexes
Allow for quick lookups of documents for queries on fields that have been indexed

```js

db.posts.getIndexes()

// sort ascending
db.posts.createIndex({  title: 1  })
```

## Driver
`mongodb` is the NodeJS driver to communicate with the `mongo` server

Resources:
- [Node MongoDB Native Driver Documentation](http://mongodb.github.io/node-mongodb-native/2.1/api/)


```js
var MongoClient = require('mongodb').MongoClient
var  test = require('assert')

MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
  if(err) {
    console.log('there was an error connecting to database')
  } else {
    console.log('successfully connected to database')
  }
})
```

## DB
Once it's connected we have access to the `database`

```js
MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
  // ensure it's connected
  test.equal(null, err)

  db.collection('users').insert({
    first_name: "John",
    last_name: "Smith"
  }, function(err, docs) {
    if(err) {
      console.error(err)
      return db.close()
    }

    console.log(`inserted ${docs.length} documents`)
    // close connection
    return db.close()
  })

})
```

## Dump and Restore

```sh
mongodump --db database_name  --out ./data
mongorestore --db database_name --drop ./data
```

Or

```sh
mongorestore --uri="mongodb+srv://username:password@myexamplecluster0-kjge4.mongodb.net/haystack-development" --drop .
```

copy & paste a db
```sh
mongodump --uri="mongodb+srv://username:password@myexamplecluster0-kjge4.mongodb.net/old_database" --gzip --archive | mongorestore --uri="mongodb://localhost:27017/new_database" --nsFrom="old_database.*" --nsTo="new_database.*" --gzip --archive
```