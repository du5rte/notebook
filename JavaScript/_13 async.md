## JavaScript - Asynchronous


## Callbacks
Functions can be passed as `arguments`, a common use for it is with `callbacks` a way to let us know a function has finished it's job.

```js
// Here we are only defining the callback parameter
function testMic(sequence, callback) {
    console.log('Testing ' + sequence);
    callback(/* console.log('done') */);
}

testMic('1 2 3', function() {
    console.log('done'); // 'Testing 1 2 3' 'done'
});
```

A function is a first class `object`, basically a `variable`, so functions can be passed just like variable parameters.
```js
function logDone() {
    console.log('done');
}
// logDone` is a `variable` which just happens to contain a function
testMic(2,3,logDone);
```

It's a common practice to wrap callbacks in a `if` statement so we only pass it if we require feedback.
```js
function testMic(sequence, callback) {
    console.log('Testing ' + sequence);
    // only runs if we pass a callback
    if(callback) {
      callback(/* console.log('done') */);
    }
}
```

## Promises


## Generators


## Async Functions