## Angular - Scope


## $scope
When using `controllerAs`, the controller's context (`this`) attaches things to the current `scope` behind the scenes.

```js
.directive('awesome', function() {
  return {
    restrict: 'E',
    controller: function() {
      this.title = 'Awesome Directive';
    },
    controllerAs: 'awesome',
    template: '<h2>{{ awesome.title }}</h2>'
  }
})
```

Same results using `$scope` instead of alias
```js
.directive('awesome', function() {
  return {
    restrict: 'E',
    controller: function($scope) {
      $scope.title = 'Awesome Directive';
    },
    template: '<h2>{{ title }}</h2>'
  }
})
```

## Scope Inheritance
By default directives inherit from their parent `$scope` and have their own scope set to false `scope: false`.

```js
.directive('awesome', function() {
  return {
    restrict: 'E',
    controller: function() {
      this.title = 'Awesome Directive';
    },
    controllerAs: 'awesome',
    template: '<h2>{{ awesome.title }}</h2>'
  }
})
```
```html
<awesome>
  <!-- Awesome Directive -->
</awesome>
```

That means they can access information from other directives
```js
.directive('evenAwesome', function() {
  return {
    restrict: 'E',
    controller: function($scope) {
      $scope.subtitle = 'Even More ';
    },
    template: '<h2>{{ subtitle + " " + awesome.title }}</h2>'
  }
})
```
```html
<awesome>
  <!-- Awesome Directive -->
</awesome>
<even-awesome>
  <!-- Even More Awesome Directive -->
</even-awesome>
```

Here `num` instead of iterating will print the total of times the directive is called.
```js
app.directive('evenAwesome', function() {
  var num = 1;
  return {
    restrict: 'E',
    controller: function($scope) {
      $scope.subtitle = 'Even More ';
      this.num = num++;
    },
    controllerAs: 'awesome'
    template: '<h2>{{ subtitle + " " + awesome.title + " " + num++ }}</h2>'
  }
})
```
```html
<even-awesome>
  <!-- Even More Awesome Directive 3 -->
</even-awesome>
<even-awesome>
  <!-- Even More Awesome Directive 3 -->
</even-awesome>
<even-awesome>
  <!-- Even More Awesome Directive 3 -->
</even-awesome>
```

## Isolated Scope
Scope inheritance can be switch to it's own isolated scope by creating a `scope` Object.
```js
app.directive('evenAwesome', function() {
  var num = 1;
  return {
    restrict: 'E',
    scope: {},
    controller: function($scope) {
      $scope.subtitle = 'Even More ';
      this.num = num++;
    },
    controllerAs: 'awesome'
    template: '<h2>{{ subtitle + " " + awesome.title + " " + num++ }}</h2>'
  }
})
```

Number now iterates like it was expected because is only exists `even.scope`, but no longer it can access other directives logic because they don't exist within the isolated scope.
```html
<even-awesome>
  <!-- Even More 1 -->
</even-awesome>
<even-awesome>
  <!-- Even More 2 -->
</even-awesome>
<even-awesome>
  <!-- Even More 3 -->
</even-awesome>
```

## Binding Isolated Scope
There's 3 options to bind data to an isolated scope

- `@` : Attribute string binding
- `=` : Two-way model binding
- `&` : Callback method binding

```js
scope: {
  text: "@myText",
  twoWayBind: "=myTwoWayBind",
  oneWayBind: "&myOneWayBind"
}
```
```html
<div my-directive my-text="hello {{ bar }}" my-two-way-bind="foo" my-one-way-bind="bar">
```

```js
app.directive('evenAwesome', function() {
  var num = 1;
  return {
    restrict: 'E',
    scope: {
      title: '@'
    },
    controller: function($scope) {
      $scope.subtitle = 'Even More ';
      this.num = num++;
    },
    controllerAs: 'awesome'
    template: '<h2>{{ subtitle + " " + title + " " + num++ }}</h2>'
  }
})
```
```html
<even-awesome title="{{awesome.title}}">
  <!-- Even More Awesome Directive 1 -->
</even-awesome>
<even-awesome title="{{awesome.title}}">
  <!-- Even More Awesome Directive 2 -->
</even-awesome>
<even-awesome title="{{awesome.title}}">
  <!-- Even More Awesome Directive 3 -->
</even-awesome>
```

More flexible directed can now be created by passing data to parameters.
```js
app.directive('socialIcon', function() {
  var num = 1;
  return {
    restrict: 'E',
    scope: {
      media: '@',
      url: '@'
    },
    template: '<a href="{{ url }}"><i class="fa fa-{{ media }}"></i></a>'
  }
})
```
```html
<social-icon media="twitter" url="http://twitter.com/username">
  <!-- <a href="http://twitter.com/username"><i class="fa fa-twitter"></i></a> -->
</social-icon>
```
