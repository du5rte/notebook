---
title: "JavaScript - AJAX"
type: doc
created: 2016-03-18
updated: 2016-06-18
tags: [javascript]
---
# JavaScript - AJAX

Still-valid fundamentals moved to [[docs/javascript/async|JavaScript - Asynchronous Programming]].


Resources:
- [HTTP Request methods](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)
- [HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
- [JSON validator](http://jsonlint.com/)
- [Fetch](https://github.com/github/fetch)

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
