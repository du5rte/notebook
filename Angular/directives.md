# AngularJS - Directives
A directive is a marker on a `HTML` tag that tells Angular to run or reference some JavaScript, they work much like *start* `function() {}`

    Extend the HTML by teaching it new tricks


## ng-app
Attaches the Application Module to the page
```html
<html ng-app>
<html ng-app="myModule">
```


## ng-controller
Attaches a controller function to the page
```html
<body ng-controller="StoreController as store"></body>
```
```js
app.controller('StoreController', function() {
  alert('Welcome!');
});
```


## {{ }}
Uses Mustache's double brackets to (ng-bind) bind to a property
```html
{{ product.name }}
```


## ng-show
Shows a element only if the value of it's expression is `true` or `Truthy`

```html
<!-- Even without the property, undefined will be a falsey value -->
<button ng-show="store.product.canPurchase"> Add to Cart </button>
```


## ng-hide
Hides a element only if the value of it's expression is `true` or `Truthy`
```html
<!-- Same as: -->
<button ng-show="!store.product.canPurchase"> Add to Cart </button>
<!-- Just Clearer -->
<button ng-hide="store.product.soldOut"> Add to Cart </button>
```


## ng-class
Sets classes dynamically by data binding an expression, uses the `:` operator to perform the equivalent of an `if` modifier - [conditionally apply a class?](http://stackoverflow.com/questions/7792652/what-is-the-best-way-to-conditionally-apply-a-class)
```html
<!-- activates the class .active when on the correct tab -->
<li ng-class="{active: tab === 1}">
<!-- adds class .instore when the state is withing '/store' -->
<div class="navbar" ng-class="{instore: $state.includes('store')}">
```


## ng-src
Without it the browser will try to load `{{image_url}}` and fail.

```html
<img ng-src="{{product.image_url}}"/>
```


## ng-repeat
Iterates through an array of data
writing a `<li>` for each value in the array

```html
<ul>
  <li ng-repeat="name in names"> {{name}} </li>
</ul>
```


## ng-click
performs a expression or calls a function, that should exist inside a controller

```xml
<!-- expression -->
<button ng-click="tab = 1">Add Customer</button>
<!-- function -->
<button ng-click="addCustomer()">Add Customer</button>
```


## ng-init
Create initialization data (most used for testing or debugging)

```xml
<!-- initializing a variable -->
<div ng-init="tab = 1"></div>
<!-- initializing an array -->
<div ng-init="names=['Dave', 'John', 'Edward', 'Sarah']"></div>
```


## ng-model
Binds the form element value to the property, angular has built-in validations for common input types

```xml
<!-- input: text -->
<input type="text" ng-model="review.title">
```
```xml
<!-- select -->
<select ng-model="review.starts">
  <options value="1">1 star</option>
  <options value="2">2 stars</option>
  <options value="3">3 stars</option>
</select>
<!-- text area -->
<textarea ng-model="review.body"></textarea>
<!-- type: email (is only valid if there's a @ ) -->
<input type="email" ng-model="review.author">
<!-- type: url -->
<input type="url" name="homepage">
<!-- type: number min=1 max=10 -->
<input type="number" name="quantity">
<!-- type: submit -->
<input type="submit" value="submit">
```


## ng-submit
Allows us to call a function when the form is submitted
```xml
<form name="reviewForm" ng-controller="ReviewContrller as reviewCtrl" ng-submit="reviewCtrl.addReview(product)">
```
```js
app.controller('ReviewContrller', function() {
  this.review = {};
  this.addReview = function(product) {
    // Push review onto this product's reviews array
    product.review.push(this.review);
    // Clear form
    this.review = {};
  }
});
```
### Validators
Allows to specify what our form needs before being submitted

#### novalidate
Turns off default `html` validation
```xml
<form name="reviewForm" ng-controller="ReviewContrller as reviewCtrl" ng-submit="reviewCtrl.addReview(product)" novalidate>
```

#### required
Lets angular now it's a required input field
```xml
<input type="email" name="author" ng-model="reviewCtrl.review.author" required>
```

#### $valid
Call a property on a forms to check if it's value is valid

```xml
<div> reviewForm is {{reviewForm.$valid}} </div>
<!-- only submits if reviewForm is valid -->
<form name="reviewForm"
      ng-controller="ReviewContrller as reviewCtrl"
      ng-submit="reviewForm.$valid && reviewCtrl.addReview(product)"
      novalidate
></form>
```
#### ng-invalid
As $valid changes so does the class on the input
```xml
<!-- invalid -->
<input name="author" ... class="ng-pristine ng-invalid">
<!-- typed in and invalid -->
<input name="author" ... class="ng-dirty ng-valid">
<!-- typed in and valid -->
<input name="author" ... class="ng-dirty ng-valid">
```

## ng-focus & ng-blur

```html
<input ng-focus="hasFocus = true" ng-blur="hasFocus = false" type="text" placeholder="Click to add focus"/>
<p ng-show="hasFocus">The field has focus! Click outside input to blur.</p>
```