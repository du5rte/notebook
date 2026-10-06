---
title: "JavaScript - Asynchronous Programming"
type: doc
created: 2016-03-18
updated: 2016-06-18
tags: [javascript]
---
# JavaScript - Asynchronous Programming

Blocking vs non-blocking, Promises and Async Functions kept from [[archive/javascript/ajax|JavaScript - AJAX (2016)]].

## Asynchronous

Blocking
```js
// blocks everything until it gets back the response
let results = doLongTask("value")

render(results)
```

Non-blocking
```js
doLongTask("value", function (results) {
  render(results)
})
```

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

## Promises
The promise object creates a `pending` task that can either be `resolved` or `rejected`, once it's `fulfilled` any `then` will run, if any errors occur it's passed to `catch`


```js
function ajax(method, url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        // resolve if successful
        resolve(JSON.parse(xhr.response))
      } else {
        // reject if the wrong status
        reject(new Error(xhr.status))
      }
    }

    // reject on error
    xhr.onerror = () => {
      reject(new Error("Error Fetching Results"))
    }

    xhr.send()

  })
}
```
```js
ajax("GET", "http://www.filltext.com?rows=10&f={firstName}")
  .then((data) => {
    console.log( data )
  })
  .catch((error) => {
    console.log('Error: ', error)
  })
```

## Async Functions
Can be used with tasks that return a promise. any code inside a `async function` that depends on a value wrapped by `await` is smart enough to wait for it to resolve.

```js
(async function() {
  let data = await ajax("GET", "http://www.filltext.com?rows=10&f={firstName}")
  console.log(data)
})()
```

## Related
- [[docs/node/events|Node - Events]]
- [[docs/javascript/decorators|JavaScript - Common Patterns]]
