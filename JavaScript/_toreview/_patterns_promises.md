
Blocking
```js
let results = getProfileFromServer("Josh")

ui.renderProfile(results)
```



Non-blocking
```js
getProfileFromServer("Josh", function (results) {
  ui.renderProfile(results)
})
```

Continuation-passing Style `CPS`, async programming uses callbacks to contuneie the execution
cascade hell or pyramid of doom
```js
getProfileFromServer("Josh", function (error, results) {
  if(error) {
    // ...
  }
  ui.renderProfile(results, function(error) {
    if(error) {
      // ...
      sendNotificationToServer(message, function (error, response) {
        if (error) {
          /// ...
        }
        doSomethingElseNonBlocking(response, function (error) {
          if (error) {
            /// ...
          }
        })
      })
    }
  })
})
```

## Creating a Promise
pending
fulfilled
rejected

```js
function getFromServer(api) {
  return new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest()
    request.open('GET', api, true)
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        // resolve if successful
        resolve(JSON.parse(request.response))
      } else {
        // reject if the wrong status
        reject(new Error(request.status))
      }
    }

    // reject on error
    request.onerror = function () {
      reject(new Error("Error Fetching Results"))
    }

    request.send()

  })
}
```



```js
getFromServer('/users')
  .then((results) => {
    // return passed it to the next then
    return results.filter( result => result.city === "Orlando")
  })
  .then((results) => {
    renderUsers(results)
  })
  // if error goes straight to catch
  .catch((error) => {
    console.log('Error: ', error)
  })
```
