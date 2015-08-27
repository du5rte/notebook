# AngularJS - Basics

- [angular.js](https://angularjs.org/)
- [Documentation](https://docs.angularjs.org/api)
- [AngularJS Fundamentals in 60-ish Minutes](AngularJS Fundamentals In 60-ish Minutes)
- [8 Tips for Angular.js Beginners](http://leftshift.io/8-tips-for-angular-js-beginners/)

## MVC
- `Model` - The data we care about
- `View` - What the user sees
- `Controller` - Where all the necessary logic to connect the model with the view is contained

There's 2 main types of JavaScript Libraries:
- DOM manipulation `jQuery`
- MVC Frameworks `Angular`, `backbone`

A `DOM manipulation` library focusses on the HTML view. This means that the library does its work on the existing html and css that the browser has already rendered.
A `MVC Frameworks` start first with the data and build the view from that data

## Angular Structure
- `Directives` - `html` Annotations that trigger JavaScript behaviors
- `Modules` - Where our Application components live
- `Controllers` - Where we add application behavior
- `Expressions` - How values get displayed within the page

## Two-way Data-Binding
Expressions are re-evaluated when a property changes.

```html
<ul class="nav nav-pills">
  <!-- or "tab = $index + 1" if it was a ng-repeat -->
  <li> <a href ng-click="tab = 1"> Description </a> </li>
  <li> <a href ng-click="tab = 2"> Specifications </a> </li>
  <li> <a href ng-click="tab = 3"> Reviews </a> </li>
</ul>
{{ tab }}
```
