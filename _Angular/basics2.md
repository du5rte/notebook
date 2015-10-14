### DOM vs MVC

When we do the AJAX Call:
1. We have to Loop through the entire array,
2. Create a individual element,
3. Give different classes to each key (name, profession, home town),
4. Append it to the html, once we build the list,
5. It has not more connection to the data,
6. If we want to update it we have to go through this process again

### DOM Data Binding with jQuery

```xml
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

```xml
<html ng-app>
	<body>
		<input type="text" ng-model="name">
		<h2> Hello {{ name }} </h2>
	</body>
</html>
```

### Why use a MVC?
MVC are the best choice for when dealing with dynamic data.

When we use DOM Manipulation the flow of data only goes in one direction, with no pipeline back to allow our users to edit or interact with that data.

In contrast AngularJS maintains a pipeline that connects what the `view` with the `model` (the data). MVCs encourage a single master of record for our data, The MVC then makes sure that every view or method that relies on that data is synced automatically

### When to use a MVC?
To maintain connection between your HTML and data we should use a MVC Framework, To apply visual, polish, such as animations, to some already existing data we should use a DOM Manipulation Library


### The 4 Main Elements of AngularJS

- `Directives` - The building block of Angular, via the `$scope` object, they form the connection between the attribute and the JavaScript functionality.

- `Factories` - They are often used to provide an abstraction layer between your directives and your APIs.

- `Controllers` - Predominantly used for data connections and logical restains around them.

- `Filters` - Used to implement temporary transformations of data as it travels between the model and the view


## Angular Architecture

### MVC
- Modal
- View
- Controler

### View
Where we put our directive, filter and data binding. We don't want to put all our logic in the view as it's not maintainable, testable or very dynamic.

### Controllers
Instead we want to contain all our logic inside the `controller`, to drives things around, like what data gets bond into the view, if that data gets sent back to the controller it can `POST` to the backend (which it can then do something or in turn send it to a database)...etc

### $scope *View Modal*
The `view` doesn't have to know about the `controller` and the `controller` cares less about the view.
> The `$ccope` is the glue between the view and the controller, that allows to connect the two.

```
Module ─┐
     Config ─┐
           Routes ─┐
                  View ┬─ Directives,
                   │   ├─ Filters
                   │   └- etc..
                   ├─ $scope
                   │
               Controller ┬─ *Factories
                          ├─ Services
                          ├─ Provider
                          ├─ value
                          └─ etcs..
```

## Modules
Modules are containers, off modulars we can create custom objects. `ng-app` could as well been called `ng-module="app"`

To create a module we call `angular.module`, define a name and in the empty array we pass in together modules that it depends on

```js
angular.module('moduleExample', []);
```

### Dependencies
We can make a module require another module in our dependencies
```js
angular.module('moduleExample', ['anotherModule']);
```

We need call it out on the HTML

```xml
<html ng-app="moduleExample"></html>
```

## Controllers
Allows us to bond data to the `$scope`

```js
angular.module('moduleExample', [])
  // Define our controller and pass in a annonynous function
  .controller('SimpleController', function ($scope) {

    // e.g. tying a variable
    $scope.name = "Eddie";
    // e.g. tying an object .customers into $scope
    $scope.customers = {
      name: 'John',
      city: 'London'
    }
    // e.g. tying a function
    $scope.updateName = function() {
      $scope.name = "Eddie Monteiro!";
    }
});
```

The HTML won't just know about our controller, we need to define it on the markup (call it out)

```xml
<div ng-controller="SimpleController"></div>
```

### Attaching Functions
Attaches a function to the `$scope` that is called when clicked
In our `controller` we can add the function and attached it to the `$scope`

```js
app.controller('SimpleController', function ($scope) {
    $scope.addCustomer = function() {/*
      $scope.customers.push({
        name: $scope.newCustomer.name,
        city: $scope.newCustomer.city
        });
    */};
});
```
```xml
<button ng-click="addCustomer()">Add Customer</button>
```


## Two-way Data-Binding
Any properties updated in the model are synchronized with the View and any changes to the view are sent back to the model like a loop.

## Single Page Application (SPA)
> A page that works as a shell that allows us to load multiple views (mini-webpages) much quicker

## $first

[](http://stackoverflow.com/questions/19635636/first-in-ngrepeat)

```js
li(ng-repeat="variation in product.color.variations")
	input(type="radio" ng-checked="$first")
```
## Dynamic Page Title

https://coderwall.com/p/vcfo4q/angularjs-change-title-based-on-route
