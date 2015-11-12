# AngularJS - Controllers

Resources:
- [“Controller as”](http://toddmotto.com/digging-into-angulars-controller-as-syntax/)

## Controllers
Bind `data`, `functionality` or `services` to the `$scope`

## Creating a Controller
Controllers are created by binding `.controller` to the angular app
```js
angular.module('store', [])
  // For consistency we capitalize Controllers
  .controller('StoreController', function() {
    this.product = gem;
  });

var gem = {
  name: 'Dodecahedron',
  price: 2.95,
  description: '....',
}
```

- Directive: `ng-controller`
- Controller Name: `StoreController`
- Alias Name: `store`

```xml
<div ng-app="store">
  <div ng-controller="StoreController as store">
    <h1>{{store.product.name}}</h1>
    <h2>{{store.product.price}}</h2>
    <p>{{store.product.description}}</p>
  </div>
</div>
```

## Cleaning our HMTL with Controllers

Before
```html
<section>
  <ul class="nav nav-pills">
    <li ng-class="{ active:tab === 1}">
      <a href ng-click="tab = 1">Description</a>
    </li>
    <li ng-class="{ active:tab === 2}">
      <a href ng-click="tab = 2">Specifications</a>
    </li>
    <li ng-class="{ active:tab === 3}">
      <a href ng-click="tab = 3">Reviews</a>
    </li>
  <ul>
  <div class="panel" ng-show="tab === 1">
    <h4>Description</h4>
    <p>{{ product.description }} </p>
  </div>
</section>
```

After
```js
app.controller("PanelController", function(){
  this.tab = 1;
  this.selectTab = function(setTab) {
    this.tab = setTab;
  }
  this.isSelected = function(checkTab) {
    return this.tab === checkTab;
  }
})
```
```xml
<section ng-controller="PanelController as panel">
  <ul class="nav nav-pills">
    <li ng-class="{active: panel.isSet(1)}">
      <a href ng-click="panel.setTab(1)">Description</a>
    </li>
    <li ng-class="{active: panel.isSet(2)}">
      <a href ng-click="panel.setTab(2)">Specifications</a>
    </li>
    <li ng-class="{active: panel.isSet(3)}">
      <a href ng-click="panel.setTab(3)">Reviews</a>
    </li>
  <ul>
  <div class="panel" ng-show="panel.isSet(1)">
    <h4>Description</h4>
    <p>{{ product.description }}
  </div>
</section>
```
