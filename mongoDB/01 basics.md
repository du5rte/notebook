# MongoDB - Basics

Resouces:
- [MongoDB Docs](https://docs.mongodb.org/getting-started/node/introduction/)
- [Installing](http://docs.mongodb.org/master/tutorial/install-mongodb-on-os-x/?_ga=1.148455231.929616701.1431273906)
- [MongoDB Tutorial for Beginners - YouTube](https://www.youtube.com/watch?v=W-WihPoEbR4)
- [Getting Started With MongoDB Queries](https://github.com/sedouard/mongodb-mva/tree/master/module2_getting_started)

## MongoDB
Is a `Document Oriented` database, where data is structured in `Documents` like `json` files and `Collections` arrays of `Objects`.

## Server
Starts a database server, needs to be specified a path for the data directory

```sh
$ mkdir -p data/db/
$ mongod --dbpath ./data/db
```

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


## Import
The quickest way to import data

```sh
$ mongoimport <path to file.json> --jsonArray --db <db name> --collection <coll name>
```

## Mongo Shell
Connects to MongoDB's shell, for interactive help, type `help`.

```sh
$ mongo # Welcome to the MongoDB shell
```
```js
show collections // bank_data
db.bank_data.count() // 50000
```

## Queries
The `find` function queries for specific documents from the collection. `.findOne()` finds the first document in the collection.

```js
db.bank_data.find() // {} * 50000
db.bank_data.find().count() // 50000
db.bank_data.findOne() // {..}
```

#### Query by Field
Used a `field` object to return the matching set of documents.
```js
db.bank_data.find({ last_name: "SMITH" }).count() // 100
```

#### Projecting
Uses a projection to return only passed data from a matching set of documents. `1` as `show` or `0` as `hide`

```js
db.bank_data.find({last_name: "SMITH", "accounts.account_type": "Savings" }, {_id:0, first_name: 1, last_name: 1, accounts: 1 } )[12]
```
```json
{
  "first_name": "CHRISTOPHER",
  "last_name": "SMITH",
  "accounts": [ /* all accounts */ ]
}
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



#### Sort

```js
// descending
sort({ 'accounts.account_balance': 1 }})
// ascending
sort({ 'accounts.account_balance': -1 })
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
