---
title: "Networking - Curl"
type: doc
created: 2018-06-18
updated: 2026-10-07
tags: [network]
---
# Networking - Curl

`curl` sends HTTP requests from the terminal and shows you exactly what came back. It's the quickest way to test an API, check a redirect or see a server's headers without a browser getting in the way. It's installed on macOS, most Linux distributions and Windows, so whatever machine you SSH into, it's probably there.

## GET: the default

With just a URL, curl sends a `GET` and prints the response body.

```sh
curl https://example.com
# <!doctype html>
# <html>
# ...
```

Add `-s` (silent) to hide the progress bar when you pipe the output somewhere:

```sh
curl -s https://api.example.com/menu | jq '.[0].name'
# "Flat white"
```

## Seeing headers

The body is only half the story. Headers tell you the status, content type, caching and redirects.

| Flag | Shows |
|---|---|
| `-i` | Response headers **and** body |
| `-I` | Response headers only (sends a `HEAD` request) |
| `-v` | Everything: the request curl sent, the TLS handshake, the response headers |

```sh
curl -sI https://example.com
# HTTP/2 200
# content-type: text/html; charset=UTF-8
# ...
```

When something is weird, reach for `-v` first. Lines starting with `>` are what you sent, `<` is what came back.

## Following redirects

curl doesn't follow redirects unless you ask. Without `-L` you only see the `3xx` response.

```sh
curl -sI http://example.com/old-page
# HTTP/1.1 301 Moved Permanently
# Location: https://example.com/new-page

curl -sL http://example.com/old-page
# (the body of /new-page)
```

## POST: sending data

`-d` sends a body and switches the method to `POST` for you. Each `-d` adds a form field.

```sh
curl https://api.example.com/login -d email='ana@example.com' -d password='flatwhite'
# sent as: Content-Type: application/x-www-form-urlencoded
# email=ana%40example.com&password=flatwhite
```

For JSON, set the header yourself, or use `--json`, which sets `Content-Type` and `Accept` for you on recent versions of curl:

```sh
curl https://api.example.com/orders \
  -H 'Content-Type: application/json' \
  -d '{"drink":"Flat white","name":"Ana"}'

# same thing, shorter
curl https://api.example.com/orders --json '{"drink":"Flat white","name":"Ana"}'
```

## Other methods

Use `-X` to pick a method that `-d` doesn't imply.

```sh
curl -X PATCH https://api.example.com/orders/42 --json '{"milk":"oat"}'
curl -X DELETE https://api.example.com/orders/42
```

You don't need `-X POST` together with `-d`: `-d` already means `POST`.

## Headers and auth

`-H` adds a request header. The most common one is `Authorization`, for a token.

```sh
curl https://api.example.com/me \
  -H 'Authorization: Bearer eyJhbGciOi...'
# {"name":"Ana","email":"ana@example.com"}
```

The full list of flags is in `man curl`, or `curl --help all`.

## Common mistakes

- **Missing quotes.** `?a=1&b=2` in a URL without quotes: the shell treats `&` as "run in the background". Quote URLs with query strings.
- **Forgetting `-L`.** You get an empty body and think the API is broken. It just redirected.
- **Sending JSON without `Content-Type`.** `-d` alone says "form data", so the server won't parse it as JSON.
- **Pasting real tokens into shared commands.** Your shell history keeps them. Use an environment variable: `-H "Authorization: Bearer $TOKEN"`.

## Try it

1. Run `curl -sI` on a site you use and find the status code, `content-type` and HTTP version.
2. Run `curl -v https://example.com` and find the line where the TLS certificate is checked.
3. Start a local API (or `nc -l 5000`) and `POST` a JSON coffee order to it. With netcat you'll see the raw request curl sends.

## Related

- [[docs/http|Networking - HTTP]]
- [[docs/networking|Networking - Basics]]
- [[docs/ssl|Networking - HTTPS and TLS]]
