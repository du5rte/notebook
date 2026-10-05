# JavaScript - Asynchronous Programming


## Callbacks
JavaScript works on a single tread some tasks can take longer so it's important to keep our code `asynchronous`, `functions` can be passed as `arguments`, why a lot of Javascript syntax is the way it is.

```js
// Here we are only passing the callback, not calling it yet!
function testMic(sequence, callback) {
    console.log('Testing ' + sequence)
    callback()
}

testMic('1 2 3', function() {
    console.log('done');
})
// 'Testing 1 2 3'
// 'done'
```

Commonly seen in jQuery, when we say this, we are actually passing a `callback` that `.click()` will fire after the `click-event` is done

```js
$('button').click(function() {
  console.log('clicked!')
})

// or

function handleClick() {
  console.log('clicked!')
}

// no execution `()` here, click will call it when it's done
$('button').click(handleClick)
```

Commonly it's added in an `conditional` otherwise it would throw a missing parameter error if we called it without a `callback`.
```js
function add(first, second, callback) {
    console.log(first + second)
    // only runs the function if a callback exists
    if (callback) {
      callback()
    }
}
```
