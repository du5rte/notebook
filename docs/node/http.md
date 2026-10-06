---
title: "Node - HTTP"
type: doc
created: 2015-11-01
updated: 2017-08-12
tags: [node]
status: draft
---




# Node - HTTP

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

## Related
- [[docs/node/http-server|Node - HTTP Server]]
- [[docs/node/server|Node - Server]]
- [[docs/network/http|Networking - HTTP]]
