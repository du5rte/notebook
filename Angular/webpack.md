## AngularJS - With Webpack

in `app.js`
```js
var app = angular.module('app', []);
app.controller('mainCtrl', require('./mainCtrl'));

```
in `mainCtrl.js`
```js
module.exports = function($scope) {
  $scope.firstName = 'John';
  $scope.lastName = 'Doe';
};
```
```js
var app = angular.module('app', []);
app.controller('mainCtrl', function($scope) {
  $scope.firstName = 'John';
  $scope.lastName = 'Doe';
});
```
