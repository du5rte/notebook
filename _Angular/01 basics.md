# AngularJS - Basics

Resources
- [angular.js](https://angularjs.org/)
- [Documentation](https://docs.angularjs.org/api)
- [AngularJS Fundamentals in 60-ish Minutes](AngularJS Fundamentals In 60-ish Minutes)
- [LevelUpTuts -  AngularJS For Everyone](https://www.youtube.com/watch?v=NJ4FYsRV3nU&list=PLLnpHn493BHF6utwkwpo7RN-GPg1sZhvK)
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
Expressions are re-evaluated when a property changes. Any properties updated in the model are synchronized with the View and any changes to the view are sent back to the model like a loop.

#### DOM Data Binding with jQuery

```html
<html>
	<body>
		<input id="name" type="text">
		<h2 id="greeting"></h2>
	</body>
</html>
```
```js
var name = $('#name');
var greeting = $('#greeting');
name.keyup(function () {
	greeting.text('Hello ' + name.val() + '!');
})
```

### MVC Data Binding with AngularJS
Our `View` (the html) as becomes much smarter, now our html and data and linked so any changes will update automatically
```html
<html ng-app>
	<body>
		<input type="text" ng-model="name">
		<h2> Hello {{ name }} </h2>
	</body>
</html>
```

#### DOM vs MVC
When we do the AJAX Call:

1. We have to Loop through the entire array,
2. Create a individual element,
3. Give different classes to each key (name, profession, home town),
4. Append it to the html, once we build the list,
5. It has not more connection to the data,
6. If we want to update it we have to go through this process again

## Bootstraping
`ng-app="app"` bootstraps the passed mobule `app`

```html
<html ng-app></html>
```
Same as
```js
// replaces ng-app="app"
angular.element(document).ready(function () {
  angular.bootstrap(document, ['app'], {
    //strictDi: true
  });
});
```
