---
title: "Networking - HTTP"
type: doc
created: 2018-06-18
updated: 2026-10-07
tags: [network]
---
# Networking - HTTP

HTTP (HyperText Transfer Protocol) is how browsers, apps and servers talk on the web. It's a simple, text-based conversation: the client sends a **request**, the server sends back a **response**. Every `fetch()`, every page load and every API call is one of these pairs, so once you can read one you can debug almost anything on the web.

## Request and response

A request is a few lines of plain text: a **method**, a **path**, the HTTP version, some **headers**, a blank line, and an optional **body**.

```
GET /menu HTTP/1.1
Host: coffee.example.com
Accept: application/json
```

The response has the same shape, with a **status code** instead of a method.

```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 35

[{"name":"Flat white","price":3.2}]
```

You can have this conversation by hand with netcat. Type the request, then press Enter twice to send the blank line:

```sh
nc example.com 80
GET / HTTP/1.1
Host: example.com

# HTTP/1.1 200 OK
# Content-Type: text/html; charset=UTF-8
# ...
```

The `Host` header is required in HTTP/1.1: one server often hosts many sites, and this is how it knows which one you want.

## Methods

The method says what you want to do with the resource at that path.

| Method | Means | Example |
|---|---|---|
| `GET` | Read it | Get the menu |
| `POST` | Create something / submit | Place a new order |
| `PUT` | Replace it completely | Replace order 42 |
| `PATCH` | Change part of it | Change the milk on order 42 |
| `DELETE` | Remove it | Cancel order 42 |
| `HEAD` | Like `GET`, headers only | Check a file's size |
| `OPTIONS` | What's allowed here? | Browsers send it for CORS checks |

Two properties worth knowing:

- **Safe**: doesn't change anything on the server. `GET`, `HEAD`, `OPTIONS`.
- **Idempotent**: doing it twice has the same effect as doing it once. `GET`, `PUT`, `DELETE` are; `POST` isn't. Press "Pay" twice with `POST` and you might pay twice.

## Status codes

The first digit tells you who's to blame.

| Range | Meaning | Ones to know |
|---|---|---|
| `1xx` | Informational | `101 Switching Protocols` (WebSockets) |
| `2xx` | ✅ Success | `200 OK`, `201 Created`, `204 No Content` |
| `3xx` | Go somewhere else | `301 Moved Permanently`, `302 Found`, `304 Not Modified` |
| `4xx` | ❌ You (the client) got it wrong | `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `429 Too Many Requests` |
| `5xx` | ❌ The server got it wrong | `500 Internal Server Error`, `502 Bad Gateway`, `503 Service Unavailable` |

`401` vs `403` trips everyone up: `401` means "I don't know who you are" (log in), `403` means "I know who you are, and you can't do this". The full list is on MDN.

## Headers

Headers are `key: value` lines carrying extra information about the request or response. Names are case-insensitive.

```
Content-Type: application/json
Authorization: Bearer eyJhbGciOi...
Cache-Control: max-age=3600
Set-Cookie: session=abc123; HttpOnly; Secure
```

The ones you'll use most:

- `Content-Type`: what the body is (`application/json`, `text/html`).
- `Authorization`: who you are, usually a token. See [[docs/jwt|Security - JWT]].
- `Cookie` / `Set-Cookie`: the server hands the browser a cookie, the browser sends it back on every request.
- `Cache-Control`: how long a response may be reused.
- `Location`: where to go next, sent with `3xx` redirects and `201 Created`.

## Sending a body

`POST`, `PUT` and `PATCH` usually carry a body, and the `Content-Type` header says how to read it.

```
POST /orders HTTP/1.1
Host: coffee.example.com
Content-Type: application/json
Content-Length: 35

{"drink":"Flat white","name":"Ana"}
```

```
HTTP/1.1 201 Created
Location: /orders/42
```

HTML forms send `application/x-www-form-urlencoded` by default (`drink=Flat+white&name=Ana`); APIs mostly use JSON.

## HTTP is stateless

Each request stands alone: the server doesn't remember the last one. Logins work because the client sends something with every request (a cookie or a token) that lets the server look you up again. That's the whole topic of [[docs/security|sessions vs tokens]].

## HTTP/1.1 vs HTTP/2 vs HTTP/3

The meaning (methods, status codes, headers) is the same in every version. What changed is how the bytes travel.

| | HTTP/1.1 | HTTP/2 | HTTP/3 |
|---|---|---|---|
| Format | Plain text | Binary frames | Binary frames |
| Requests per connection | One at a time | ✅ Many at once (multiplexing) | ✅ Many at once |
| Runs on | TCP | TCP | QUIC, over UDP |
| Slow packet blocks others | ❌ Yes | ⚠️ Yes, at the TCP level | ✅ No |

HTTP/2 lets one connection carry many requests in parallel and compresses headers. HTTP/3 moves to QUIC, which handles lost packets per request, so one slow packet no longer holds up everything else. In practice browsers only use HTTP/2 and 3 over HTTPS, and your server or CDN negotiates the version for you. You keep writing the same `fetch()`.

## Common mistakes

- **Using `GET` to change data.** Crawlers and prefetching follow links. A `GET /delete-account` link will get clicked by something.
- **Returning `200` with `{"error": ...}`.** Use the status code; clients, caches and monitoring all rely on it.
- **Forgetting `Content-Type: application/json`.** Many servers won't parse the body without it.
- **Treating `fetch()` errors as HTTP errors.** `fetch` only rejects on network failure. A `404` or `500` still resolves: check `response.ok`.

## Try it

1. Use `nc example.com 80` to send a `GET` by hand and read the status line and headers.
2. Open your browser's Network tab on any site. Find one `GET`, one `POST`, one `3xx` and the protocol column (`h2`, `h3`).
3. Design the routes for a coffee order API: list orders, create one, change the milk, cancel. Which methods and status codes would you use?

## Related

- [[docs/networking|Networking - Basics]]
- [[docs/curl|Networking - Curl]]
- [[docs/ssl|Networking - HTTPS and TLS]]
- [[docs/dns|Networking - DNS]]
- [[docs/node/node-http|Node - HTTP]]
- [[docs/node/node-server|Node - Server]]
