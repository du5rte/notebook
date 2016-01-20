## JavaScript - Asynchronous









## Blocking
Most web servers, languages and frameworks handle one set of tasks from beginning to end before repeating the process again, doing the same set of steps for another task, this can be problematic when accessing a database or uploading files, as it blocks the handling of other requests as the application can't do anything until it finishes executing the first task.

## Blocking vs Non-Blocking

Blocking
```
action1######### action2######### action3#########
|-------------------------|-----------------------------|
0s                       0.5s                           1s
```

Non-Blocking
```
action1#########
action2#########
action3#########
|-------------------------|-----------------------------|
0s                       0.5s                           1s
```



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
<!-- TODO: document better promises functions -->

## Generators
Is a function that can return **multiple** values with `yield`, which works like an intermediante `return`.


Iterator , Observer = generator

Iterator only flows data one way

Generator allow 2 sides communication

```js
function* awesomeGenerator() {
  yield 'generator'
  yield 'functions'
  yield 'are'
  return 'great'
}

var iterator = awesomeGenerator()

iterator.next() // {value: "generator", done: false}
iterator.next() // {value: "functions", done: false}
iterator.next() // {value: "are",       done: false}
iterator.next() // {value: "great",     done: true}
```


## Async Functions
<!-- TODO: document better async functions -->


```js
// finished last
$.getJSON( "http://www.filltext.com/?callback=?", {rows: 5,delay: 1,address: '{streetAddress}'})
  .done(function( data ) {
    $.each( data, function( i, item ) {
      console.log(item.email)
    })
  });


// finished second (delay 1 second)
(async function() {

  let data = await $.getJSON( "http://www.filltext.com/?callback=?", {rows: 5,delay: 1,address: '{streetAddress}'})
  data.forEach(function(item) {
    console.log(item)
  })

})()

// finished first
console.log('Hello World')
```
