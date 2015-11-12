# Angular - Custom Directives


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
    restrict: 'E'// Type of Directive, (E for HTML Element)
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

## Element Directives
Best expressing complex `UI` widgets. Defined by `restrict: 'E'`
```html
<product-title></product-title>
```

## Attribute Directives
Best for mixin behaviors, like a tooltip. Defined by `restrict: 'A'`
```html
<h3 product-title></h3>
```


## Directive Controllers
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

## Directive Attributes


```js

```
