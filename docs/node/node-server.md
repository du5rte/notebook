---
title: "Node - Server"
type: doc
created: 2016-03-18
updated: 2026-10-07
aliases: [Express]
tags: [node]
---
# Node - Server

Node on its own is low level: in [[docs/node/node-http|Node - HTTP]] you saw that every route is an `if` on `req.url`, and you read the body chunk by chunk. **Express** is a small framework on top of `node:http` that does that plumbing for you: routes, URL parameters, JSON bodies, static files. It's been the default Node server framework for years, and most others borrow its ideas, so it's the right one to learn first.

## Setting up

```sh
npm init -y
npm install express
```

Add `"type": "module"` to `package.json` (see [[docs/node/node-modules|Node - Modules]]), then:

```js
// server.js
import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Welcome to the coffee shop ☕')
})

app.listen(3000, () => console.log('Listening on http://localhost:3000'))
```

```sh
node --watch server.js
curl localhost:3000   # Welcome to the coffee shop ☕
```

Compare that to the plain Node version: no `writeHead`, no `Content-Type`, no `res.end()`. `res.send` works it out.

## Routing

A route is a method plus a path plus a handler. Express has a method for each HTTP verb.

```js
const menu = [
  { id: 'espresso', name: 'Espresso', price: 2 },
  { id: 'flat-white', name: 'Flat white', price: 3 },
]

app.get('/menu', (req, res) => {
  res.json(menu)
})

app.post('/orders', (req, res) => {
  res.status(201).json({ ok: true })
})

app.get('/old-menu', (req, res) => {
  res.redirect(301, '/menu')
})
```

If nothing matches, Express answers `404 Cannot GET /whatever` for you.

## Route and query parameters

A `:name` in the path captures that part of the URL into `req.params`. Anything after `?` lands in `req.query`.

```js
app.get('/menu/:id', (req, res) => {
  const item = menu.find((drink) => drink.id === req.params.id)
  if (!item) return res.status(404).json({ error: 'Not on the menu' })
  res.json(item)
})

app.get('/search', (req, res) => {
  const term = (req.query.q ?? '').toLowerCase()
  res.json(menu.filter((drink) => drink.name.toLowerCase().includes(term)))
})
```

```sh
curl localhost:3000/menu/espresso   # {"id":"espresso","name":"Espresso","price":2}
curl "localhost:3000/search?q=flat" # [{"id":"flat-white",...}]
```

| | Route params | Query params |
|---|---|---|
| URL | `/menu/espresso` | `/search?q=flat` |
| Read with | `req.params.id` | `req.query.q` |
| Use for | which thing | how to filter, sort or page it |

## Responding

Every request must get exactly one response. The ones you'll use most:

| Method | Sends |
|---|---|
| `res.send(text)` | text or HTML |
| `res.json(data)` | JSON, with the right header |
| `res.status(code)` | sets the status, chain it: `res.status(404).json(...)` |
| `res.redirect(url)` | a redirect |
| `res.sendFile(path)` | a file from disk |

The full list is in the Express docs.

## Middleware

Middleware is the key idea in Express. A request passes through a line of functions, like an order moving down a coffee bar: take the order, check the payment, make the drink, hand it over. Each function gets `req`, `res` and `next`. It can change `req`, end the request with a response, or call `next()` to pass it on.

```mermaid
flowchart LR
  R[Request] --> L[logger] --> J[express.json] --> H[route handler] --> S[Response]
```

```js
// runs for every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})
```

Order matters: middleware runs in the order you `app.use` it, so register it above the routes it should affect.

Express ships with a body parser. Without it, `req.body` is `undefined`.

```js
app.use(express.json())

app.post('/orders', (req, res) => {
  const { drink, name } = req.body
  res.status(201).json({ message: `${drink} for ${name}, coming up` })
})
```

```sh
curl -X POST localhost:3000/orders \
  -H 'Content-Type: application/json' \
  -d '{"drink":"latte","name":"Ana"}'
# {"message":"latte for Ana, coming up"}
```

Pass a path to `app.use` and the middleware only runs for URLs that start with it:

```js
app.use('/admin', (req, res, next) => {
  if (req.get('x-api-key') !== process.env.ADMIN_KEY) {
    return res.status(401).send('Nope')
  }
  next()
})
```

## Static files

`express.static` serves a folder as-is: HTML, CSS, images. Great for a small site or a built front end.

```js
app.use(express.static('public'))
// public/logo.png  →  http://localhost:3000/logo.png

app.use('/assets', express.static('public'))
// public/logo.png  →  http://localhost:3000/assets/logo.png
```

The path is relative to where you run `node`. To make it relative to the file instead, use `import.meta.dirname`:

```js
import path from 'node:path'

app.use(express.static(path.join(import.meta.dirname, 'public')))
```

## Errors

Middleware with **four** arguments is an error handler. Put it last. Anything that calls `next(error)`, or throws inside a handler, ends up here.

```js
app.get('/menu/:id', async (req, res) => {
  const item = await loadFromDatabase(req.params.id) // if this throws...
  res.json(item)
})

app.use((error, req, res, next) => {
  console.error(error)
  res.status(500).json({ error: 'Something went wrong' }) // ...we answer here
})
```

## Calling another server

A route can fetch from another API and pass the result on. Use the built-in `fetch` (see [[docs/node/node-http|Node - HTTP]]).

```js
app.get('/weather', async (req, res) => {
  const upstream = await fetch('http://localhost:3001/today')
  if (!upstream.ok) return res.status(502).json({ error: 'Weather service is down' })
  res.json(await upstream.json())
})
```

`502 Bad Gateway` is the honest status when the problem is the other server, not yours.

## Common mistakes

- **Sending two responses.** `res.json(...)` followed by `res.send(...)` throws "Cannot set headers after they are sent". Use `return res.status(404)...` in early exits.
- **Never responding or calling `next()`.** The request hangs.
- **`req.body` is `undefined`.** You forgot `app.use(express.json())`, or registered it after the route.
- **Error handler with three arguments.** Express only treats it as an error handler when it has all four, even if you don't use `next`.

## Try it

1. Build `GET /menu` and `GET /menu/:id` with a proper `404` for unknown drinks.
2. Add `POST /orders` that rejects a body without a `drink` with a `400`.
3. Write a middleware that adds `req.startedAt = Date.now()` and logs how long each request took.

## Related
- [[docs/node/node-http|Node - HTTP]]
- [[docs/node/node-npm|Node - npm and pnpm]]
- [[docs/node/node-process|Node - Process]]
- [[docs/http|Networking - HTTP]]
- [[docs/curl|Networking - Curl]]
