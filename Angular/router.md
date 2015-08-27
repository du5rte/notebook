# AngularJS - Routes
Allows us to move through different partials *(mini-webpages)* inside a shell page

  /view1 ← → /view2
     ↑          ↑
     ↓          ↓
  /view4 ← → /view3


## ng-Route
First we need to add it to our html

```
$ bower install angular-route
```
```xml
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-route.min.js"></script>
```
Then list the dependency in our module dependencies array

```js
angular.module('moduleExample', ['ngRoute'])
// Now we can use .config to define our routes
  .config(function($routeProvider) {
    $routeProvider
      .when('/',
            {
              // Define module for Route
              controller: 'controllerExample',
              // html file location
              templateUrl: 'partials/view1.html'
            })

      .when('/view2',
            {
              // Define module for Route
              controller: 'controllerExample',
              templateUrl: 'partials/view2.html'
            })

      .otherwise({ redictTo: '/' });
  });
```
Now we can created reference our views links in our `<a>`

```xml
<a href="#/view2">View 2</a>
```

## UI-Router

ng-Router is very basic only allowing 1 view while UI-Route lets us nest `states` inside `views` -
[ui-router](https://github.com/angular-ui/ui-router)

### Installing

```
$ bower install angular-ui-router
```
```js
angular.module('app', ['ui-router']);
```

### ng-include
ng-include allows us to add views to our page

```xml
<div class="container" ng-app="app">
  <header ng-include="'templates/nav.html'"></header>
  <div ui-view></div>
  <fotter ng-include="'templates/footer.html'"></fotter>
</div>
```

### Setting up Routes
`$urlRouterProvider` is the route giving by the browser `$stateProvider` is the state given by `ui-view`

```js
angular.module('app', ['ui.router'])
  // we are double defining here to work with minifying
  .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/');
    // Is what's given to us by ui-view
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: function($scope) {
          $scope.title = "Home";
        }
      })
      .state('about', {
        url: '/about',
        templateUrl: 'about.html',
      })
  }])
```

Now in our home.html we can use mustache templating
```xml
<h1> {{ title }} </h1> <!-- Home -->
```

## Resolve
Holds the `controller` and `view` from loading before resolving something, useful it needs to connect to the backend or an API before loading - [resolve](https://github.com/angular-ui/ui-router/wiki#resolve)

```js
.state('home', {
  url: '/',
  templateUrl: 'home.html',
  controller: 'someController',
  resolve: {
  Products: function(Moltin) {
    return Moltin.Products();
  }
})
// When then use Products in our controller
.controller('someController', function(Product) {
  console.log(Product);
});
```
