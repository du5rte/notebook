



## http


```
var http = require('http');
```

## Get

```js
http.get("http://www.google.com/index.html", function(response) {
  console.log("Got response: " + response.statusCode); // 302 Found
}).on('error', function(error) {
  console.error("Got error: " + error.message); // error message
});
```
