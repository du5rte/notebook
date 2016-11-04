# Angular - Utility Libraries

Resources:
- [nganimate.org](http://www.nganimate.org)
- [Animations: the Angular Way](https://css-tricks.com/animations-the-angular-way/)
https://github.com/AngularClass/ng-fx
- [AngularHotkeys.js](http://chieffancypants.github.io/angular-hotkeys/)
- [AngularJS UI Router Animated View Transitions](https://www.youtube.com/watch?v=W89DYSthCTQ)
## ngAnimate
Triggers a series of classes that we can use to style transition and add animations

```js
angular.module('app', ['ngAnimate'])
```

#### Transitions
Different directives using different classes, check which one to use here - [nganimate.org](http://www.nganimate.org)

```scss
.toggle {
  transition: .3s linear;
  // starts to renders
  &.ng-enter { opacity: 0; }
  // while transition is running
  &.ng-enter-active { opacity: 1; }
  // starts to leaves the dom
  &.ng-leave { opacity: 1; }
  // white finishes leaving the dom
  &.ng-leave-active { opacity: 0; }
}
```

If using the same transition on entering and leaving it can be grouped this way:
```scss
.toggle {
  &.ng-enter, &.ng-leave-active { opacity: 0; }
  &.ng-enter-active, &.ng-leave { opacity: 1; }
}
```


#### Animations
Are a little more simple and use only `ng-leave` and `ng-enter`

```scss
.bounce {
  &.ng-enter { animation: bounceIn 700ms; }
  &.ng-leave{ animation: bounceOut 700ms; }
}
```

## Directives for 3rd-party Plugins
It's easier to wrap plugins in directives

```html
<script src="/js/vendor/bootstrap.js"></script>
```
```js
.directive('title', function($timeout) {
  // return{ link: function(scope, element){ /**/ } }

  // Alternatively we can return a function
  return function (scope, element) {
    $timeout(function () {
      element.tooltip({ container: "body" });
    });

    // Cleans up after the directive
    // Called whenever the directive is removed or the scope is destroyed
    scope.$on('$destroy', function () {
      element.tooltip('destroy');
    })
  };
});
```
