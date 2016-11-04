# AngularJS

Resources:
- [ui-router](https://github.com/angular-ui/ui-router)
- [odetocode - Using Resolve](http://odetocode.com/blogs/scott/archive/2014/05/20/using-resolve-in-angularjs-routes.aspx)

## ng-Route
Moves through different `views` inside a shell page, needs to be added as a dependency to our module.

```js
angular.module('app', ['ngRoute']);
```
View Render
```html
<div ng-view></div>
```

```js
angular.module('moduleExample', ['ngRoute'])
  // Inject dependencies
  .config(function($routeProvider) {
    $routeProvider

      // Default view
      .when('/', {
        // html template link
        templateUrl: 'views/home.html'
        // or inline
        template: '<h1> Hello World! </h1>'
      })

      // Redirecting a view to another view
      .when('/home', { redirectTo: '/' })

      // View with controller logic
      .when('/store', {
        // controller for Route
        controller: 'StoreController',
        // or inline
        controller: function() {
          this.title = "Hello World!"
        },
        // Controller Alias
        controllerAs: 'home'
        // Template with controller logic
        template: '<h1> {{ home.title }} </h1>'
      })

      // Otherwise redirect to Home
      .otherwise({ redirectTo: '/' });
  });
```
Now we can created reference our views links in our `<a>`

```html
<a ng-href="#/view2"> View 2 </a>
```

## UI-Router

`ng-Router` is a more advance routes that allows nests multiple `states` inside `views`

```js
angular.module('app', ['ui-router']);
```
View Render
```html
<div ui-view></div>
<!-- or -->
<ui-view></ui-view>
```

`$urlRouterProvider` is the route giving by the browser `$stateProvider` is the state given by `ui-view`

```js
angular.module('app', ['ui.router'])
  // Inject dependencies
  .config(function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/');
    // Is what's given to us by ui-view
    $stateProvider

      .state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })

      .state('about', {
        url: '/about',
        templateUrl: 'about.html',
      })

  }])
```

## Parameters
Url parameters can be accessed by routers and used as variables
```
http://example.com/#/product/42
```

With `ngRoute`
```js
angular.module('app', ['ngRoute'])
  .config(function($urlRouterProvider, $routeParams) {
    $stateProvider

      .state('product/:id', {
        url: '/product',
        templateUrl: 'product.html',
        // $stateParams
        controller: function($http, $routeParams) {
          var _this = this;
          $http.get('/notes' + $routeParams.id )
            .success(function(data){ _this.note = data;})
        },
        controllerAs: 'product'
      })

  }])
```

With `ui-route`
```js
angular.module('app', ['ui.router'])
  .config(function($urlRouterProvider, $stateProvider) {
    $stateProvider

      .state('product/:id', {
        url: '/product',
        templateUrl: 'product.html',
        // $stateParams
        controller: function($http, $stateParams.id) {
          var _this = this;
          $http.get('/product/' + $routeParams.id )
            .success(function(data){ _this.product = data;})
        },
        controllerAs: 'product'
      })

  }])
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
