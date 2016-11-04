# Angular - Modules


## Modules
Modules are containers for code, `ng-app` could as well be called `ng-module="app"`

To create a module we call `angular.module`, define a name and a empty array for dependencies
```js
angular.module('store', [])

.controller('StoreController', function() { /**/ })
// Products should be in it's own module
.directive('productTitle', function() { /**/ })
.directive('productGallery', function() { /**/ })
```

products.js
```js
angular.module('store-products', [])

.controller('StoreController', function() { /**/ })
// Products should be in it's own module
.directive('productTitle', function() { /**/ })
.directive('productGallery', function() { /**/ })
```

## Dependencies
Tell a module that it requires another module

then set it as a dependency back in app.js
```js
angular.module('store', ['store-products'])

.controller('StoreController', function() { /**/ })
```
and include the `.js` file

```html
<script src="angular.js"></script>
<script src="app.js"></script>
<script src="products.js"></script>
```
