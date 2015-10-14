# Angular - Services


## Factories
A placeholder for common back-end tasks, example getting a customer from a database

```js
var app = angular.module('moduleExample' []);

app.factory('simpleFactory', function() {
  var factory = {};
  factory.getCustomers = function() {/*
    // In a real-life app this would connect to a database
    var customers = [
      {
        name: 'John',
        city: 'Newcastle'
      },
      {
        name: 'Lewis,
        city: 'Manchester'
      }
    ];*/
    return customers;
  }
  return factory;
});

// In real time the factory object will be attached to the $scope
app.controller('SimpleController', function($scope, simpleFactory) {
  $scope.customers = simpleFactory.getCustomers();
});
```

We can use Angular Async to do AJAX calls

```js
app.factory('simpleFactory', function($http) {
  // Simple GET request example:
  $http.get('/someUrl')
    .success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
    })
    .error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
});
```

## Resolve

A resolve is a property you can attach to a route in both ngRoute and the more robust UI router. A resolve contains one or more promises that must resolve successfully before the route will change. - [odetocode - Using Resolve](http://odetocode.com/blogs/scott/archive/2014/05/20/using-resolve-in-angularjs-routes.aspx)

```js
// uses $q to simulate the async work required to fetch some data.
app.factory("messageService", function($q){
    return {
        getMessage: function(){
            return $q.when("Hello World!");
        }
    };
});
```

```js
$routeProvider
    .when("/news", {
        templateUrl: "newsView.html",
        controller: "newsController",
        resolve: {
            message: function(messageService){
                return messageService.getMessage();
        }
    }
})
```
