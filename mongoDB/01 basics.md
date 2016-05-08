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
