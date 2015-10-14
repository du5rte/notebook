# JavaScript - Async

Callbacks, Promises, Generators

[LearnCode.academy plunkr](http://plnkr.co/edit/1ArvFxI0gWmajTpDaOSB?p=preview)
[Q](https://github.com/kriskowal/q)
[$q](https://docs.angularjs.org/api/ng/service/$q)
[AngularJS Promises with $q](https://youtu.be/cdG_T6ufcbE)
[Remove Render-Blocking JavaScript](https://developers.google.com/speed/docs/insights/BlockingJS)

Async in whenever we start something that will end later on, it's a great feature of JavaScript but sometimes we need to chain scripts

## The “Pyramid of Doom”

```js
step1(function (value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        // Do something with value4
      });
    });
  });
});
```
## Chaining
```js
step1(function (value1) {
  step2();
});
step1(function (value2) {
  step3();
});
step1(function (value3) {
  step4();
});
stepFinal(function (value4) {
  // Do something with value4
});

```


## AngularJS Promises with $q

`$q` is a smaller subset of `Q` for AngularJS. To turn this function into a promise we need to create a

```js
.controller('theController', function($scope, $q) {
  // At the beginning
  var q = $q.defer();

  if(true) {
    q.resolve(val1);
  } else {
    q.reject
  }
  // At the end
  return q.promise
})
```

## Render-Blocking JavaScript
[Shouldn't we use <noscript> tag?](http://stackoverflow.com/questions/2170484/shouldnt-we-use-noscript-tag)

Inline Javascript hold the document from loading until it's ready
```html
<html>
  <head>
    <script type="text/javascript" src="small.js"></script>
  </head>
  <body>
    <div>
      Hello, world!
    </div>
  </body>
</html>
```

Inlining javascript allows the browsers to load faster
```html
<html>
  <head>
  <script type="text/javascript">
    /* contents of a small JavaScript file */
  </script>
  </head>
  <body>
    <div>
      Hello, world!
    </div>
  </body>
</html>
```

## JavaScript Asynchronous
asynchronous scripts are not guaranteed to execute in specified order
```html
<script async src="my.js">
```
