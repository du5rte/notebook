# MongoDB - Basics

Resouces:
- [MongoDB Docs](https://docs.mongodb.org/getting-started/node/introduction/)
- [Installing](http://docs.mongodb.org/master/tutorial/install-mongodb-on-os-x/?_ga=1.148455231.929616701.1431273906)
- [MongoDB Tutorial for Beginners - YouTube](https://www.youtube.com/watch?v=W-WihPoEbR4)
- [Getting Started With MongoDB Queries](https://github.com/sedouard/mongodb-mva/tree/master/module2_getting_started)

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
$ mongoimport <path to file.json> --jsonArray --db <db name> --collection <coll name>
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
var eddie = {
  name: "Eddie",
  surname: "Monteiro",
  email: "monteirocode@gmail.com",
  mobile: "07123456789",
  address: {
    street: "123 Awesome Road",
    city: "Gateshead",
    location: "Tyne and Wear",
    postcode: "NE8 1PX",
    telephone: "019123456789"
  }
}

// values can be accessed
eddie.surname # Monteiro

// and changed
eddie.name # Eddie
eddie.name = "Duarte"
eddie.name # Duarte
```

## BSON
Documents are persisted in a formated called `BSON`, similar to `JSON` but with some additions

Stores:
- Strings: "Invisibility"
- Numbers: 1400, 3.14
- Booleans: true, false
- Arrays: ["newt toes", "pickles"]
- Objects: {"type": "potion"}
- Null: null
- ObjectID: ObjectId(...)
- Date: ISODate(...)


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

## Sort

```js
sort({ "price": 1 }}) // sorts documents descending by price
sort({ "price": -1 }) // sorts documents ascending by price
```

## Queries
The `find` function queries for specific documents from the collection.

```js
db.bank_data.find()         // finds all documents e.g. {} * 50000
db.bank_data.find().count() // prints the count of documents e.g. 50000
db.bank_data.findOne()      // finds the first document e.g. {..}
```

#### Query by Field
Uses a `query` parameter to return matching set of documents. **Queries are case sensitive**.
```js
// finds potions that match the name
db.potions.find({"name": "Invisibility"})    
// finds potions with laughter
db.potions.find({"ingredients": "laughter"})
// finds the best tasting potions within ratings
db.potions.find({"ratings.flavour": 5})      
```

#### Query Projection
Uses a `projection` object to return only specific data from the results. `1` as `show` or `0` as `hide`

```js
db.potions.find({"vendor": "Kettlecooked"}, {_id:0, "name": 1,} )
```
```json
{ "name" : "Invisibility" }
{ "name" : "Passion" }
{ "name" : "Shrinking" }
```

#### Comparison Query Operators

- `$gt`: Greater than
- `$gte`: Greater than or equal to
- `$lt`: Less than
- `$lte`: Less than or equal to
- `$ne`: Not equal to


Finds document priced less than 20.
```js
db.potions.find({"price": {$lt: 20}})         
```
Finds document priced between 10 and 20.
```js
db.potions.find({"price": {$t: 10, $lt: 20}})
```
Finds documents not vended by Brewers.
```js
db.potions.find({"vendor": {$ne: "Brewers"}})
```
Finds documents with a size(Array) key bigger than 10 and a key less than 16. **Warning** `[2, 8, 16]` would return as a match because it's `8` is less than `$lt:16` and `16` is bigger than `$gt:10`.
```js
db.potions.find({"sizes": {$elemMatch: {$gt: 10, $lt: 16}}})
```


## Deleting
Uses a `query` parameter to delete matching set of documents.

```js
db.potions.remove({"name": "Shrinking"})      // WriteResult({ "nRemoved": 1 })
db.potions.remove({"vendor": "Kettlecooked"}) // WriteResult({ "nRemoved": 3 })
```

## Updating
Uses a `query` parameter and `update` parameter to update matching set of documents, **without using `$set` it overwrites the whole document**, to update multiple files `{multi: true}` needs to be added.

```js
// updates price
db.potions.remove({"name": "Love"}, {$set: {"price": 39.99} })                         
// updates multiple all KC vendors to Kettlecooked
db.potions.remove({"vendor": "KC"}, {$set: {"vendor": "Kettlecooked"}}, {multi: true})
// increments the click count
db.potions.remove({"name": "Shrinking"}, {$inc: {"count": 1}})                         
// creates it even if it does not exist
db.potions.update({"potion": "Love"}, {$inc: {"count": 1}}, {upsert: true})            
```

## Advanced Modifications
[Update Operators](https://docs.mongodb.org/manual/reference/operator/update/)

```js
// removes color field on all documents
db.potions.update({}, {$unset: {"color": ""}}, {"multi": true})       
// renames `score` field on all documents
db.potions.update({}, {$rename: {"score": "grade"}}, {"multi": true})
 // changes the `2nd` ingredient(Array) on all documents
db.potions.update({}, {$set: {"ingredients.1": 42}}, {"multi": true})
// changes the `secret` ingredient(Array) on all documents
// $ is a placeholer for the matched value
// e.g. ["newt toes", "secret", "laughter"] | $ equals position 1
// e.g. ["quark", "rubber duck", "secret"] | $ equals position 2
db.potions.update( {"ingredients": "secret"}, {$set: {"ingredients.$": 42}}, {"multi": true} )
// changes the `strength` rating(Object) on the document
db.potions.update( {"name": "Shrinking"}, {$set: {"ratings.strength": 5}})
// Adds a category(Array) on the document
db.potions.update( {"name": "Shrinking"}, {$push: {"category": "budget"}} )
// Adds a category(Array) on the document, only if it doesn't exists already
db.potions.update( {"name": "Shrinking"}, {$addToSet: {"category": "budget"}} )
// Removes the 2nd category(Array) on the document | 1 for last element, -1 for first element
db.potions.update( {"name": "Shrinking"}, {$pop: {"category": 1}} )
// Removes specify category(Array) on the document | if empty "" will remove all
db.potions.update( {"name": "Shrinking"}, {$pull: {"category": "tasty"}} )
```












#### Element Match
The `$elemMatch` projection operator allows us to return just the first element in an array that meets the criteria.
```js
db.bank_data.find({last_name: "SMITH", "accounts.account_type": "Savings" }, { first_name: 1, last_name: 1, accounts: { $elemMatch : { 'account_type' : 'Savings' } } } )[12]
```
```json
{
  "first_name": "CHRISTOPHER",
  "last_name": "SMITH",
  "accounts": [ /* just the saving account */ ]
}
```






#### Query by Condition
Uses [Conditional and Comparison Operators](http://docs.mongodb.org/manual/reference/operator/query/) to return a matching set of documents.

```js
// And `$and`
db.bank_data.find({ $and: [{ first_name: "JOE"}, {last_name: "MARTINEZ"} ] }).count() // 1
db.bank_data.find({ first_name: "JOE", last_name: "MARTINEZ" }).count() //  1

// Or `$or`
db.bank_data.find({ $or: [{ first_name: "JOE"}, {last_name: "MARTINEZ"} ] }).count() // 599

// Greater than `$gt`
db.bank_data.find({ 'accounts.account_balance': {$gt: 9000000} }).count() // 19464

// Less than `$lt`
db.bank_data.find({ 'accounts.account_balance': {$lt: 100} }).count() // 3

// Greater than + And
// Might seem like it's searches for a 9 Billion USD dollars account
// But in fact searches for a 9 billion account and a USD account
db.bank_data.find({ 'accounts.account_balance': {$gt: 9000000}, 'accounts.currency': 'USD' }).count()
12481

// Element Match + Greater than
// Now it searches for a 9 Billion USD dollars account
db.bank_data.find({ accounts: { $elemMatch: { 'account_balance': {$gt: 9900000}, currency: "USD"  } } } ).count() // 445


// Element Match + Greater than + Projection Object `$` + Sort Descendent
db.bank_data.find({ accounts: { $elemMatch: { 'account_balance': {$gt: 9900000}, currency: "USD"  } } }, {'accounts.$':1 } ).sort({ 'accounts.account_balance': -1 })

```

#### Iterating
With a `for loop` it can iterate just like JavaScript. To print in the mongo shell use `print()` not console.log

```js
var smithPersons = db.bank_data.find({last_name : "SMITH"}, {first_name : 1, last_name: 1});
// For Loop
for(var i = 0; i < smithPersons.count(); i++) {
  // print to the mongo shell
  print(smithPersons[i].first_name + ' ' + smithPersons[i].last_name );
}
```
