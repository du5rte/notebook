# Angular - Services

Resources:
- [odetocode - Using Resolve](http://odetocode.com/blogs/scott/archive/2014/05/20/using-resolve-in-angularjs-routes.aspx)
- [Values and constants](https://lostechies.com/gabrielschenker/2014/01/14/angularjspart-9-values-and-constants/)
- [JavaScript Promises and AngularJS $q Service](http://www.webdeveasy.com/javascript-promises-and-angularjs-q-service/)


## Services
Gives angular additional functionality like fetching `JSON` data from a web service with `$http`, log messages to the JavaScript console with `$log`, filter through an array with `$filter`.

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

#### Shortcut methods
```js
// Get
$http.get('/path/to/products.json', {apiKey: 'myApiKey'})
// Post
$http.get('/path/to/products.json', {param: 'value'})
// Put
$http.put('/path/to/products.json', {data: 'value'})
// Delete
$http.delete('/path/to/products.json')
// Other
$http({method: 'OPTIONS', url: '/path/to/products.json'})
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

## Services Recipes

- Value: The simplest service used for sharing a value that is used often throughout a app repeatedly.
- Factory: Shares methods and objects. (most commonly used).
- Service: Shares instances of methods and objects. (rarely used)
- Provider: Shares methods and objects (like an Factory), but allows for configuration.
- Constant: Shares an value within application configurations

## Value


## Factories
Using services to fetch data is a best practice, they can then be reused across controllers, directives, filters and even other services. `Factory` and `Provide` are the too most common used methods. Provider is similar to Factory but allows for configuration.

```js
.factory('Products', function ProductFactory() {
  return {
    all: function() {
      return $http({method: 'GET', url: '/products'});
    },
    single: function(product) {
      return $http.get('/products/' + product);
    }
  }
})
```
```js
app.controller('StoreController', function(Products) {
  this.products = []
  Products.all().success(function(data) {
    store.products = data
  })

})
```

Connecting to an API example, if a factory only return one method we can just return a function and then use `Auth()`
```js

.factory('Auth', function(){
  var url = 'http://api.example.com/'
  var ApiKey = 'auth1134151523';
  return function() {
      return $http.get( url + '/auth/' + ApiKey);
    }
  }
})
```

Posting to a API


```js
.factory('Gravatar', function TweetableFactory($http) {
  var avatarUrl = 'http://www.gravatar.com/avatar/'
  // Default Size
  var avatarSize = 80;

  // If a factory return only one method we can return a `function` instead of a `object`
  // return function() { /**/ };

  return {
    generate: function(email) {
      // CryptoJS is a simple JavaScript library that has an `.md5` string hashing function.
      // alyssa@codeschool.com = bf4ee76b5f3a6bfed26bca5460bc3f22
      return avatarUrl + CryptoJS.MD5(email) + '?size=' + avatarSize.toString();
    }
  }

});
```
in controller
```js
.controller('exampleController', function(Gravatar) {
  this.getGravatar = function(email) {
    return Gravatar.generate(email);
  }
})
```

## Promises with $q

[$q](https://docs.angularjs.org/api/ng/service/$q) is a smaller subset of `Q` for AngularJS. To turn this function into a promise we need to create a `defer` and return a `promise`. Inside it we can do 3 things:

## What are Promise and Deferred?
When creating a deferred, it’s state is `pending` and it doesn’t have any result. Until we `resolve()` or `reject()` the deferred. We can easily create an asynchronic operation before even decide what’s going to happen after the resolve. It doesn’t have to know how it continues, it only has to signal when it is _ready_.

- `resolve`
- `reject`
- `notify`


```js
var q = $q.defer()

async(function(value) {  
    myFirstDeferred.resolve(value);
}, function(errorReason) {
    myFirstDeferred.reject(errorReason);
});

// return a promise
q.promise;

```


## Providers
While in factories values are hard coded with provider we can change those values using the `this.$get` function.

```js
// provider runs before everything else
// It can only inject another providers
.provider('serviceName' function serviceNameProvider(otherProvider) {
  // `$get` generates the factory and is where we pass dependencies
  this.$get function($http) {

  }
})
```


```js
.provider('Gravatar' function GravatarProvider() {
  var avatarUrl = 'http://www.gravatar.com/avatar/';
  var avatarSize = 80;

  // Each configuration requires a configuration function
  this.setSize = function(size) {
    avatarSize = size;
  }


  this.$get = function() {
    return {
      generate: function(email) {
        return avatarUrl + CryptoJS.MD5(email) + '?size=' + avatarSize.toString();
      }
    }
  }
})
```

Then we set it using `.config`
```
.config(function (GravatarProvider) {
  Gravatar.Provider.setSize(100);
});

```

## ngResource
So far we've used `$http` to grab and change data, these methods are very common and there's a better way to do it with `$resource`.

```js
.factory('Notes', function() {
  return {
    all: function() {
      return $http({ /**/ });
    },
    find: function(id) {
      return $http({ /**/ });
    },
    update: function(obj) {
      return $http({ /**/ });
    },
    create: function(obj) {
      return $http({ /**/ });
    }
  }
})
```

First it needs to be installed
```js
angular.module('app', ['ngResource'])
```
Inject it in the factory and replace the old code
```js
.factory('Notes', function($resource) {
  return $resource('/notes/:id', {}, {});
})
```

Get a single resource
```js
Note.get({id: $roteParams.id})
```

Get all resources
```js
Note.query()
```

Delete resource
```js
Note.$delete()
```

Create new resource
```js
$scope.note = new Note();
note.$save();
```

Creating a custom method
```js
.factory('Notes', function($resource) {
  return $resource('/notes/:id', {}, {
    update: { method: "PUT" }
  });
})
```
```js
note.$update
```

In controller
```js
.controller('exampleController', function($routeParams, Note) {

  // Note.find($routeParams.id).success(function(data) {
  //   this.note = data;
  // })
  this.note = Note.get({id: $routeParams.id})

  // Note.all().success(function(data) {
  //   this.note = data;
  // })
  this.notes = Note.query();

  // Note.create(product)
  //   .catch(function(error) {
  //     this.errors = [error.data.error];
  //   }).finally(function() {
  //     this.updating = false;
  //   });
  this.newNote = new Note();
  note.$save(note)
    .catch(function(error) {
      this.errors = [error.data.error];
    }).finally(function() {
      this.updating = false;
    });
})
```
