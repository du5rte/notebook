# Angular Utilities


## Bootstraping
Starts the app without needing to use a `ng-app="app"`

```js
// Angular Bootstrap
// replaces ng-app="appName" with angular.module('THISNAMEHERE', [])
angular.element(document).ready(function () {
  angular.bootstrap(document, [app.name], {
    //strictDi: true
  });
});
```
