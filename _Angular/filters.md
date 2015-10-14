# AngularJS - filters
Passes a values through a `pipe` `|` which formats and output its - [Angular Filters](https://docs.angularjs.org/api/ng/filter/filter)
[Everything about custom filters in AngularJS](http://toddmotto.com/everything-about-custom-filters-in-angular-js/)

```html
<!-- 2 gets piped into $2.00 -->
<em>{{ product.price | currency }}</em>
```

## Formate
Angular as loads of filter each all work like:
```html
{{ data | filter:options }}
```

## Examples
```html

<!-- data -->
{{ '1388123412323' | data:'MM/dd/yyyy @ h:mma' }} <!-- 12/27/2013 @ 12:50AM -->

<!-- uppercase and lowercase -->
{{ 'octagon gem' | uppercase }} <!-- OCTAGON GEM -->

<!-- limitTo -->
{{ 'My Description' | limitTo: 8 }} <!-- My Descr -->
<!-- Can use with ng-repeat -->
<li ng-repeat="product in store.products | limitTo:3">

<!-- orderBy -->
<li ng-repeat="product in store.products | orderBy:'-price'">
<!-- without the `-` products would list in ascending order -->  
```

Works like pipping, where we use the value from cust.name and pipe it through a property

e.g. orders the repeat by `customer.name`

```xml
<li ng-repeat="customer in customers | orderBy: 'name'">
  <!-- e.g. the values get pipe into uppercase -->
  {{ customer.name | uppercase }}
</li>
```
More advance example, uses a input `.customerSearch` to filter the whole iteration of `.customers`

```xml
<input type="text" ng-model="customerSearch" />
<li ng-repeat="customer in customers | filter:customerSearch | orderBy:'name'">
  {{customer.name}} - {{customer.surname}} - {{customer.city | uppercase}}
</li>
```
