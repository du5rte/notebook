# Angular - Services

Resources:
- [odetocode - Using Resolve](http://odetocode.com/blogs/scott/archive/2014/05/20/using-resolve-in-angularjs-routes.aspx)

## Services
Gives controllers additional functionality like fetching `JSON` data from a web service with `$http`, log messages to the JavaScript console with `$log`,filter through an array with `$filter`

In a real-life example keeping data in `controllers` is a terrible practice, instead we should pull it from a API
```js
app.controller('StoreController' function() {
  //
  this.products = [
    {name: '..', price: 1.99 },
    {name: '..', price: 1.99 }
  ]
})
```


## Dependencies Injection
To use services within controller they need to be injected inside it
```js
app.controller('StoreController', function($http, $log) {
  // resolves `this` scope
  var store = this

  // Now we can use services
  this.products = []

  $http.get('/products.json').success(function(data) {
    // `this` would refer to the `$http.get( )` method
    store.products = data
  })

})
```

## $http
Makes `async` requests to a server

By passing an options object
```js
$http({method: 'GET', url: '/products.json'})
```

and then use a promise
```
.success()
.error()
```

### Shortcut methods

#### Get
```js
$http.get('/path/to//products.json', {apiKey: 'myApiKey'})
```

#### Post
```js
$http.get('/path/to//products.json', {param: 'value'})
```

#### Delete
```js
$http.delete('/path/to//products.json')
```

#### Other
```js
$http({method: 'OPTIONS', url: '/path/to/products.json'})
```
