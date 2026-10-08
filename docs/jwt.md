---
title: "Security - JWT"
type: doc
created: 2016-05-08
updated: 2026-10-07
aliases: ["JWT", "JSON Web Token"]
tags: [security]
---
# Security - JWT

A JWT (JSON Web Token, said "jot") is a small, signed piece of JSON that says something about a user: "this is Ana, she's an admin, valid for 15 minutes". The server signs it, the client sends it back with every request, and the server can trust it without a database lookup because nobody can change it without breaking the signature. You'll meet JWTs as API access tokens and as the `id_token` in [[docs/oauth2|OpenID Connect]].

Resources:
- [RFC 7519, the JWT spec](https://tools.ietf.org/html/rfc7519)

## Authentication vs authorisation

Two words that sound alike and mean different things:

- **Authentication**: who are you? (logging in)
- **Authorisation**: what are you allowed to do? (can Ana delete this order?)

A JWT usually carries the answer to the first and hints for the second.

## Three parts, separated by dots

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbmEiLCJyb2xlIjoiYWRtaW4ifQ.k3P...
└────────── header ─────────────────┘└────────── payload ───────────────────┘└ signature
```

Each of the first two parts is JSON, Base64URL-encoded.

### Header

Which algorithm signed the token.

```json
{ "alg": "HS256", "typ": "JWT" }
```

### Payload

The **claims**: statements about the user, plus a few standard fields.

```json
{
  "sub": "ana",
  "role": "admin",
  "iss": "https://coffee.example.com",
  "aud": "coffee-api",
  "iat": 1760000000,
  "exp": 1760000900
}
```

| Claim | Means |
|---|---|
| `sub` | Subject: who the token is about (a user id) |
| `iss` | Issuer: who created it |
| `aud` | Audience: who it's meant for |
| `iat` / `exp` | Issued at / expires at, in seconds since 1970 |

### Signature

The header and payload, signed with a secret or a private key:

```
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

Change one character of the payload and the signature no longer matches.

## Signed, not encrypted

This is the big one. Anyone can read a JWT's payload: paste it into any decoder, or just:

```ts
const [, payload] = token.split('.')
JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
// { sub: 'ana', role: 'admin', ... }
```

The signature stops people **changing** it, not **reading** it. Never put passwords, card numbers or anything private in a payload.

## Signing and verifying

With the `jsonwebtoken` package in Node:

```ts
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET!

const token = jwt.sign({ sub: 'ana', role: 'admin' }, secret, { expiresIn: '15m' })
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

jwt.verify(token, secret)
// { sub: 'ana', role: 'admin', iat: ..., exp: ... }

jwt.verify(token, 'wrong-secret')
// throws JsonWebTokenError: invalid signature
```

`jwt.decode()` also exists, and **doesn't check the signature**. Use `verify` for anything you trust.

## HS256 vs RS256

| | HS256 | RS256 / ES256 |
|---|---|---|
| Keys | One shared secret | Private key signs, public key verifies |
| Who can verify | Only those holding the secret | Anyone with the public key |
| Use when | ✅ One app signs and checks its own tokens | ✅ Many services verify, one issues (OAuth, OpenID) |

With HS256, anyone who can verify can also **create** tokens. With RS256, services only get the public key, so they can check but not forge. Asymmetric keys are explained in [[docs/cryptography|Security - Cryptography]].

## Sending it

The client sends the token in the `Authorization` header:

```
GET /orders HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

On the web, prefer keeping it in an `HttpOnly` cookie over `localStorage`: JavaScript can read `localStorage`, so one XSS bug leaks every token.

## The catch: you can't take it back

A JWT is valid until `exp`, even if the user logs out or gets banned. The server isn't checking a list; that's the whole point. So:

- Keep access tokens **short-lived** (minutes).
- Use a longer-lived **refresh token**, stored safely and checked against the database, to get new ones.

If you need instant logout and you have one server, a plain session might be simpler. See [[docs/security|Security - Basics]] for sessions vs tokens.

## Common mistakes

- **Secrets in the payload.** It's readable by anyone.
- **`decode` instead of `verify`.** Decoding trusts whatever the client sent.
- **No expiry.** A leaked token works forever.
- **Accepting any algorithm.** Pin the algorithm you expect (`jwt.verify(token, key, { algorithms: ['RS256'] })`) so an attacker can't switch it, or send `"alg": "none"`.
- **A weak HS256 secret.** Short secrets can be brute-forced offline. Use a long random one.

## Try it

1. Sign a token for `{ sub: 'ana' }` that expires in 10 seconds. Verify it straight away, then again after 15 seconds.
2. Change one letter of the payload part of a token and verify it. What error do you get?
3. Decode a real access token from an app you use (Network tab, `Authorization` header). Which claims does it carry?

## Related

- [[docs/oauth2|Security - OAuth 2 and OpenID Connect]]
- [[docs/security|Security - Basics]]
- [[docs/cryptography|Security - Cryptography]]
- [[docs/http|Networking - HTTP]]
