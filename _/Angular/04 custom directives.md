# Angular - Custom Directives

Resources:
- [Binding to Directive Controllers](http://blog.thoughtram.io/angularjs/2015/01/02/exploring-angular-1.3-bindToController.html)

## ng-include
Makes and ajax call for the include and includes it in the page, the name of the files has to be placed in `'single'` quotes, inside the `"double"` quotes
```html
<h3 ng-include="'product-title.html'"></h3>
```

Inside `product-title.html`
```html
{{product.name}}
<em class="pull-right">{{product.price}}</em>
```

Turning into
```html
<h3 ng-include="'product-title.html'">
  <em class="pull-right">{{product.price}}</em>
</h3>
```


## Custom Directive
Directs are a useful way to **express** application behavior, by using `<custom-directives>` an application is easier to undertand, they can be used for expressing complex `UI`, reusing common components and calling events.

Directives are defined with `.directive()` and returning a `Configuration Object` that defines out the directive will work
```js
app.directive('productTitle', function() {
  return {
    // Type of Directive
    // `E` for HTML Element, `A` (default) for Attribute
    restrict: 'E'
    templateUrl: 'product.html' // url of template
    // or
    template: '<div> ... </div>'
  };
})
```
Camel cased `ProductTitle` is translated into `product-title`
```
<product-title></product-title>
```

#### Template-expanding Directives
The simplest, define a attribute that is expanded or replaced, can include Controller logic if needed

#### Element Directives
Best expressing complex `UI` widgets. Defined by `restrict: 'E'`
```html
<product-title></product-title>
```

#### Attribute Directives
Best for mixin behaviors, like a tooltip. Defined by `restrict: 'A'`
```html
<h3 product-title></h3>
```


#### Directive Controllers
Controllers can also be set inside directives

```html
<product-panels ng-controller="PanelController as panels">
  <!-- template -->
</product-panels>
```
```js
app.controller("TabController", function() {
  /* code */
});
```

The controller goes inside or is linked to `controller` and `controllerAs` defines it's alias
```js
// p
app.directive('product-panels', function() {
  return {
    restrict: 'E'
    templateUrl: 'product-panels.html'
    controller: function () {
      /* goes inside here */
    }
    controllerAs: 'panels'
  };
})
```

## Link
Is a function that run after the directive is compiled and linked up. Link automatically injects `scope` and `element`

With jQuery it searched the entire DOM and it could miss as it renders at differente times.
```js
$('div.card').on('click', function() {
  $('div.card p').toggleClass('hidden')
})
```

Using `element` refers to the template container and no longer searches the entire DOM.
```js
.directive('awesome', function() {
  return {
    restrict: 'E',
    link: function(scope, element) {
      element.on("click", function() {
        element("div.card p").toggleClass("hidden")
      })
    }
  }
})
```

Using `attrs` accessed the directive attributes
```html
<awesome test="1, 2, 3"></awesome>
```
```js
.directive('awesome', function() {
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      element.on("click", function() {
        element("div.card p").toggleClass("hidden")
      })
      console.log(attrs.test) // '1, 2, 3'
    }
  }
})
```

For example it can pass through a markdown transpiler


```js
.directive('markdown', function(){
  return {
    scope: {
      header: '=',
      body: '='
    },
    link: function(scope, element) {
      // scope.body = markdown.toHTML(scope.body);
      //
      scope.body = $sce.trustAsHtml(markdown.toHTML(scope.body));
    }
  }
})
```
Strict Contextual Escaping Service tells angular 'Trust this html', don't worry about escaping


For safe reasons `{{ }}` won't allow direct html
```html
<div> {{body}} </div>
```

To pass `html` we use `ng-bind-html`
```html
<div ng-bind-html="body"> </div>
```

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
      this.title = num++;
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
      this.title = num++;
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

## Requiring
```js
.directive('navCategory', function() {
  return {
    /* *** */
    link: function(scope, element, attrs, category) {
      scope.categories = Categories.query();
    },
    controller: function () {
      this.setActiveCategory = function(category) {
        this.activeCategory = category
      }
    }
    /* *** */
  }
})
```
```js
.directive('navCategoryItem', function() {
  return {
    /* ... */
    scope: { category: '='},
    // `^` indicates it's looking for a parent directive
    require: '^category',
    // links has a 4th parameters for require
    link: function(scope, element, attrs, navCategory) {
      scope.activate = function() {
        navCategory.setActiveCategory( scope.category );
      }
      // Check if the category is equals to the active category
      scope.isActive = function() {
        return navCategory.activeCategory() === scope.category;
      }
    }
  }
})
```
```html
<!-- on click it sets the active category to its own -->
<!-- add class active when categoryActive is true -->
<a ng-click="activate()" ng-class="{'active': isActive()}"> {{category.name}} </a>
```
