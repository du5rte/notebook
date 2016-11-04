# AngularJS - Filters

Resources:
- [Angular Filters](https://docs.angularjs.org/api/ng/filter/filter)
- [Everything about custom filters in AngularJS](http://toddmotto.com/everything-about-custom-filters-in-angular-js/)

## Filers
Passes a values through a `pipe` `|` which formats or filters and outputs it

```html
{{ date | <filter:options> }}
```


## Examples

Uppercase and Lowercase
```html
{{ 'octagon gem' | uppercase }} <!-- OCTAGON GEM -->
```

Date, uses an expression to formate a generated date
```html
{{ '1388123412323' | date:'MM/dd/yyyy @ h:mma' }}
<!-- 12/27/2013 @ 12:50AM -->
```

Currency, filters `2` into `$2.00 `
```html
<em>{{ product.price | currency }}</em>
```

Limit To
```html
{{ 'My Description' | limitTo: 8 }} <!-- My Descr -->

<!-- Can use with ng-repeat -->
<li ng-repeat="product in store.products | limitTo:3">
```

orderBy
```html
<li ng-repeat="customer in customers | orderBy: 'name'"></li>

<li ng-repeat="product in store.products | orderBy:'-price'"></li>
<!-- without the `-` products would list in ascending order -->
```

## The filter Filter
Filters a subset of items from an array

Basic Example
```html
<!-- filters all names with an "a" character-->
{{ ["Ana", "Sarah", "Natasha", "Suzy"] | filter: "a" }}
```
Will filter an array of object by it's category name
```html
<div ng-repeat="product in products" | filter: {category: {name:'shirts'}}> </div>
```

Search
```html
<!-- `$` searches for all values -->
<input type="text" ng-model="search.$">
```
```html
<div ng-repeat="product in products | filter:search"></div>
```

## Chaining Filters
Filters can be chained one after the other
```html
<!-- filters all names with an "a" and "s" character -->
{{ ["Ana", "Sarah", "Natasha", "Suzy"] | filter: "a" | filter: "N" }}
 <!-- Natasha -->
```
