# JavaScript - AJAX


Resources:
- [HTTP Request methods](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)
- [HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
- [JSON validator](http://jsonlint.com/)
- [Fetch](https://github.com/github/fetch)

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

## AJAX
*Asynchronous JavaScript and XML* allows the client to `respond` and `request` from a web server.

Steps:
1. Create the `XMLHTTPRequest` Object
2. Create the `callback` function
3. `Open` a request
4. `Send` the request


#### XMLHttpRequest
For each AJAXRequest should be created a new `XMLHttpRequest` object, which will contain the methods needed to send and receive data.

```js
var xhr = new XMLHttpRequest();
```

#### Callback
Where we defined all the instructions to run when the server eventually responds back. The `xhr.onreadystatechange` fires each time there's a change and `xhr.readyState` hold it's `stage` code, `0` when created, `1 - 3` early stages and `4` when it's done. The `xhr.status` hold the http status code and the `xhr.statusText` the attaching message (e.g. `200` Okay, `404` Not Found)

 in the request until it reaches the last step `4` (done), `xhr.readyState === 4` at which point we can access the `xhr.responseText`

```javascript
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200 ) {
    console.log(xhr.statusText)
    console.log(xhr.responseText)
  }
}
```

#### Open
Takes two values the `http method` (e.g. `GET`, `POST`) and the `url` to where its sent to.

```js
var method = 'GET'
var url = 'info.json'

xhr.open(method, url)
```


#### Send
Finally `send` triggers the request to be sent
```js
xhr.send()
```

Could be attached to a `DOM` event
```javascript
function sendAJAX() {
  xhr.send();
  // hides the button after  clicking
  document.getElementById('load').style.display = "none";
}
```
```html
<button id="load" onclick="sendAJAX()">Bring it!</button>
```

### Examples
All of it can be wrapped in a function that takes a `method`, `url` and a `callback` to be used later on or with promises it use `then` or a `async function` in ES7


#### AJAX Function

```js
function ajax(method, url, callback) {
  let xhr = new XMLHttpRequest()

  xhr.open(method, url)

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr.responseText)
    }
  }

  xhr.send()
}
```
```js
ajax("GET", "http://www.filltext.com?rows=10&f={firstName}", function(data) {
  console.log( JSON.parse(data) )
})
```

## Promises
The promise object creates a `pending` task that can either be `resolved` or `rejected`, once it's `fulfilled` it any `then` will run, if any errors occur it's passed to `catch`


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
