## MongoDB - MongoDB Driver

Resources:
- [Node MongoDB Native Driver Documentation](http://mongodb.github.io/node-mongodb-native/2.1/api/)

## MongoDB Driver
`mongodb` is the NodeJS driver to communicate with the `mongo` server


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
