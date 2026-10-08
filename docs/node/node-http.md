---
title: "Node - HTTP"
type: doc
created: 2015-08-27
updated: 2026-10-07
tags: [node]
---
# Node - HTTP

HTTP is how browsers and servers talk: a client sends a request ("GET me the menu"), the server sends back a response ("200 OK, here it is"). Node can play both parts. In this lesson you'll build a tiny server with the built-in `node:http` module, so you see what frameworks like Express do for you, and then make requests to other servers with `fetch`. The protocol itself is covered in [[docs/http|Networking - HTTP]].

## Your first server

`http.createServer` takes a function that runs for every request. `listen` keeps the process alive, waiting on a port.

```js
// server.js
import http from 'node:http'

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello World\n')
})

server.listen(3000, () => console.log('Listening on http://localhost:3000'))
```

```sh
node --watch server.js
curl http://localhost:3000   # Hello World
```

Stop it with `Ctrl + C`.

- `req` is the request: what the client asked for.
- `res` is the response: what we send back. Every request must end with `res.end()`, or the client hangs waiting.

## Routes

After the domain comes a path: `/`, `/menu`, `/contact`. That path, together with the method (`GET`, `POST`...), is the **route**. In plain Node we read them from `req.url` and `req.method` and branch.

```js
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    return res.end('Home\n')
  }

  if (req.method === 'GET' && req.url === '/menu') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify(['espresso', 'flat white']))
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' })
  res.end('Not Found\n')
})
```

```sh
curl localhost:3000/menu    # ["espresso","flat white"]
curl localhost:3000/tea     # Not Found
```

This gets messy fast. Query strings, URL parameters and body parsing are all on you. That's exactly the job [[docs/node/node-server|Express]] takes over.

## Status codes and headers

The status code is the first thing a client checks. A handful cover most days:

| Code | Means |
|---|---|
| `200` | OK |
| `201` | Created (after a successful `POST`) |
| `301` / `302` | Moved: look at the `Location` header |
| `400` | Bad request: the client sent something wrong |
| `404` | Not found |
| `500` | Server error: our bug |

Node keeps the short descriptions for all of them:

```js
http.STATUS_CODES[404] // 'Not Found'
```

Headers describe the body. `Content-Type` is the one you'll set most: `text/plain`, `text/html`, `application/json`.

## Reading the request body

When a client `POST`s data, the body doesn't arrive in one piece. `req` is a readable stream (see [[docs/node/node-streams|Node - Streams]]), so the data comes in chunks. We collect them, then join them.

```js
const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/orders') {
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)
    const body = Buffer.concat(chunks).toString()

    try {
      const order = JSON.parse(body)
      res.writeHead(201, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ received: order.drink }))
    } catch {
      res.writeHead(400)
      return res.end('Body must be JSON\n')
    }
  }
  res.writeHead(404)
  res.end()
})
```

```sh
curl -X POST localhost:3000/orders -d '{"drink":"latte"}'
# {"received":"latte"}
```

`JSON.parse` throws on anything that isn't valid JSON, so wrap it in `try...catch` and answer with a `400` instead of crashing.

## Making requests with fetch

Now the other side: our code is the client. Node has the same `fetch` as the browser, built in, no package needed.

```js
const res = await fetch('https://api.example.com/menu')
const menu = await res.json()

res.status // 200
menu       // [ 'espresso', 'flat white' ]
```

Two steps, two `await`s: the first waits for the headers, the second for the body. Pick the body reader that matches the content: `res.json()`, `res.text()`, or `res.arrayBuffer()` for binary.

Sending data is the same call with options:

```js
const res = await fetch('http://localhost:3000/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ drink: 'latte' }),
})

await res.json() // { received: 'latte' }
```

## Handling errors

`fetch` only rejects when the request couldn't happen at all: no network, bad domain, connection refused. A `404` or `500` is still a response, so it resolves. Check `res.ok` (true for any `2xx`).

```js
import http from 'node:http'

async function getMenu() {
  try {
    const res = await fetch('http://localhost:3000/menu')
    if (!res.ok) throw new Error(`${res.status} ${http.STATUS_CODES[res.status]}`)
    return await res.json()
  } catch (error) {
    console.error('Could not load the menu:', error.message)
    return []
  }
}
```

To give up on a slow server, pass a timeout signal:

```js
await fetch(url, { signal: AbortSignal.timeout(5000) }) // rejects after 5s
```

## fetch vs http.request

You'll see `http.get` and `http.request` in older code. They're the low-level way: callbacks, and you collect the `'data'` chunks yourself.

```js
// ❌ the old way
http.get('http://localhost:3000/menu', (res) => {
  let body = ''
  res.on('data', (chunk) => (body += chunk))
  res.on('end', () => console.log(JSON.parse(body)))
}).on('error', (error) => console.error(error.message))

// ✅ the same thing today
const menu = await (await fetch('http://localhost:3000/menu')).json()
```

Reach for `fetch` by default. `http.request` is only worth it when you need fine control over sockets or agents.

## Common mistakes

- **Forgetting `res.end()`.** The request never finishes and the client spins until it times out.
- **Assuming `fetch` throws on `404`.** It doesn't. Always check `res.ok` or `res.status`.
- **Calling `res.json()` on a response that isn't JSON.** It rejects. Check the status first, and use `res.text()` when debugging.
- **Writing to `res` after `res.end()`.** You'll get an error. Use `return res.end(...)` so the rest of the handler doesn't run.

## Try it

1. Add a `GET /hours` route to the server that returns JSON with your opening hours, and a `404` for everything else.
2. Add `POST /orders` and test it with `curl`, then with `fetch` from a second script.
3. Fetch a URL that returns `404` and print `http.STATUS_CODES` for it instead of crashing.

## Related
- [[docs/node/node-server|Node - Server]]
- [[docs/node/node-events|Node - Events]]
- [[docs/node/node-streams|Node - Streams]]
- [[docs/http|Networking - HTTP]]
- [[docs/curl|Networking - Curl]]
- [[docs/javascript/javascript-json|JavaScript - JSON]]
- [[docs/javascript/javascript-async|JavaScript - Asynchronous Programming]]
