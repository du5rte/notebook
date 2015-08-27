# AngularJS - Promises





## What are Promise and Deferred?

When creating a deferred, it’s state is `pending` and it doesn’t have any result. Until we `resolve()` or `reject()` the deferred. We can easily create an asynchronic operation before even decide what’s going to happen after the resolve. It doesn’t have to know how it continues, it only has to signal when it is _ready_.

[JavaScript Promises and AngularJS $q Service](http://www.webdeveasy.com/javascript-promises-and-angularjs-q-service/)


## Promises with $q




[$q](https://docs.angularjs.org/api/ng/service/$q) is a smaller subset of `Q` for AngularJS. To turn this function into a promise we need to create a `defer` and return a `promise`. Inside it we can do 3 things:

- `resolve`
- `reject`
- `notify`






```js
var q = $q.defer()

async(function(value) {  
    myFirstDeferred.resolve(value);
}, function(errorReason) {
    myFirstDeferred.reject(errorReason);
});

// return a promise
q.promise;

```
