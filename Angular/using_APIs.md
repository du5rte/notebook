

- [AngularJS](http://angularjs.org/)
- [AngularJS Docs](http://docs.angularjs.org/)
- [Twitter Bootstrap](http://twitter.github.com/bootstrap/)
- [Dribbble](http://dribbble.com/)
- [Dribbble API](http://dribbble.com/api)



We call on dribbble API and then pass the data into `$scope.list`
```js
  // triggered by <div ng-controller="ShotsListCtrl">
  .controller('ShotsListCtrl', function($scope, $http) {
    $scope.list;

    // Triggers a JSONP Call
    $http.jsonp('http://api.dribbble.com/shots/popular?callback=JSON_CALLBACK')
    // Our Call back
    .then(function(data) {
      // Bind the data to $scope.list so we can access it in our view
      $scope.list = data.data;
      console.log(data);
    });
  });
```
Now we can interpret our `list`

```xml
<!-- triggers `angular.controller('ShotsListCtrl')` -->
<div ng-controller="ShotsListCtrl">
  <ul class="thumbnails">
    <li class="thumbnail" ng-repeat="shot in list.shots">
      {{ shot.title }}
      <!-- note we use `ng-src` -->
      <img ng-src="{{shot.image_url}}">
      <!-- otherwise html will try to get `{{shot.image_url}}` -->
    </li>
  </ul>
</div>
```

## Hash URLs
Allow us to change the `URL` in a way which won't reload the page, angular can listen to these and change the page

```xml
<a class="player" href="#/players/{{shot.player.username}}">
  {{shot.player.name}}
</a>
```

## ngRoute setup
First we need to require the ngRoute dependency

```js
angular.module('dabbble', ['ngRoute'])
```

### $routeProvider
Detects and handles our routes, injecting templates and controllers

because we are saying which `controller` is called we no longer need to include it in our `view`

```js
.config( function($routerProvider) {
  // here `:list` works as a variable which will match any routes on `/`
  $routeProvider.when("/:list", {
    // we pass it in quotes so it evaluate later
    controller: "ShotsListCtrl",
    templateUrl: "partals/shots_list.html"

  })

});
```
We can chain various routes on to another to `$routeProvider` on of them is `otherwise`

```js
.config( function($routeProvider) {
  $routeProvider

    .when("/:list", {
      controller: "ShotsListCtrl",
      templateUrl: "shots_list.html"
    })

    .when("/shots/:id", {
      controller: "ShotsCtrl",
      templateUrl: "shots.html"
    })

    .otherwise({redirectTo: "/popular"})
})
```
### $routeParams
Allows us to know in which `route` we are


So here we can use that parameter to change the API call and get a different results with each url on `#/:list`

e.g. `#/polular` `#/everyone` `#/debuts`
```js
.controller('ShotsListCtrl', function($scope, $http, $routeParams) {
  console.log($routeParams); // object {list: "everyone"}
  var list = $routeParams.list;

  $http.jsonp('http://api.dribbble.com/shots/' + list + '?callback=JSON_CALLBACK')
  .then(function(data) {
    $scope.list = data.data;
    console.log(data);
  });
})
```

## filters
A filter requires a value and to return something,


```xml
{{shot.created_at}}
<!-- 2015/05/29 03:00:28 -0400 -->

{{shot.created_at | dabbbleDate:"MMM d, yyyy"}}
<!-- May 29, 2015 -->
```

```js
// we can use angular's filters by passing it here
.filter('dabbbleDate', function ($filter) {
  return function (value, format) {
    console.log(value, format)
    if (value) {
      value = Date.parse(value);
    }
    // then we pass that value into filters
    return $filter('date')(value, format);
  }
})
```

## Services
I would be nice not to have repeat the JSONP call and we can create a `factory` for this

```js
.factory('dribbble', function($http) {

  return {
    list: function(type) {
      return $http.jsonp('http://api.dribbble.com/shots/' + type + '?callback=JSON_CALLBACK')
    }
  }
})
```

and now our controllers are much simpler
```js
// we first need to require it in our function
.controller('ShotsListCtrl', function($scope, $routeParams, dribbble, $http) {
  var list = $routeParams.list;
  // then call the object `dribbble.get()` and pass our variable `list`
  dribbble.get(list).then(function(data) {
    $scope.list = data.data;
  });
})
```

## ngClick
Our call is returning 50 shots so we want to page them in 15 shots per page

```xml
<button
  class="btn btn-primary"
  ng-show="list.page < list.pages"
  ng-click="list.loadNextPage()">
  Load More
</button>
```
