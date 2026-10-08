---
title: "Security - Basics"
type: doc
created: 2018-06-18
updated: 2026-10-07
aliases: ["Security", "Passport"]
tags: [security]
---
# Security - Basics

Most security bugs in web apps aren't clever hacks. They're the same handful of mistakes, made again and again: passwords stored badly, user input trusted, a missing permission check. This lesson covers the habits that prevent most of them: store passwords properly, know who's logged in and what they're allowed to do, and treat every input as hostile. For the maths underneath, see [[docs/cryptography|Security - Cryptography]].

## Hashing vs encryption

The first decision for any sensitive data: do you need it back?

| | Hashing | Encryption |
|---|---|---|
| Reversible | ❌ One way | ✅ With the key |
| Use for | Passwords, checking integrity | Data you must read later: API keys you call out with, personal details |
| If the database leaks | Attackers still have to guess each password | Safe only if the key didn't leak too |

Rule: you never need a user's password back, only to check it. So passwords are **hashed**, never encrypted.

## Storing passwords

Use a slow, salted password hash: ✓ **Argon2** (Argon2id) first, **bcrypt** if Argon2 isn't available. Both add a random salt and store it inside the hash for you.

```ts
import argon2 from 'argon2'

const hash = await argon2.hash('flatwhite123')
// '$argon2id$v=19$m=65536,t=3,p=4$...'  the salt and settings are inside

await argon2.verify(hash, 'flatwhite123') // true
await argon2.verify(hash, 'latte')        // false
```

With bcrypt:

```ts
import bcrypt from 'bcrypt'

const hash = await bcrypt.hash('flatwhite123', 12) // 12 = cost: higher is slower
await bcrypt.compare('flatwhite123', hash)          // true
```

Why slow? You check one password when Ana logs in, so 100 milliseconds is nothing. An attacker with your leaked database wants to try billions of guesses, and slow hashes make that take years. Because the settings are stored in the hash, you can raise them later and rehash each password at the user's next login.

❌ Never: plain text, MD5, SHA-1, or plain SHA-256 for passwords.

## Authentication vs authorisation

- **Authentication**: who are you? Logging in.
- **Authorisation**: what can you do? Can Ana refund this order?

Every request needs both, and authorisation always happens **on the server**. Hiding the "Delete" button in the UI is design, not security.

Two common ways to model permissions:

- **Roles (RBAC)**: users get roles (`admin`, `barista`, `customer`), roles get permissions. Simple, and enough for most apps.
- **Access control lists (ACL)**: each resource lists who can do what. Fits "Ana can edit this document, Ben can only view it".

## Auth strategies

There are many ways to prove who someone is: email and password, a magic link, "Sign in with Google" ([[docs/oauth2|OAuth 2 and OpenID Connect]]), passkeys. Libraries like Passport.js call each one a **strategy**: different ways in, one result at the end, a known user.

```ts
// every strategy ends the same way: "this request belongs to user 42"
const user = await loginWithPassword(email, password)
// or
const user = await loginWithGoogle(idToken)

startSession(user.id)
```

Keep that shape in your own code. Adding a new login method then doesn't touch the rest of the app.

## Sessions vs tokens

Once someone is logged in, how does the next request prove it? [[docs/http|HTTP]] is stateless, so the client must send something every time.

| | Sessions | Tokens (JWT) |
|---|---|---|
| Client holds | A random session id in a cookie | A signed token with the user's details |
| Server holds | The session (in memory, Redis, the database) | Nothing, just the key to check signatures |
| Log out / ban now | ✅ Delete the session | ⚠️ Hard: valid until it expires |
| Many services checking | ⚠️ All need the session store | ✅ Anyone with the key can verify |
| Good for | ✅ Most web apps | APIs, mobile apps, many services |

✓ My pick for a single web app: sessions in an `HttpOnly`, `Secure`, `SameSite=Lax` cookie. Store only the user id in the session and load the rest from the database. Reach for [[docs/jwt|JWTs]] when several services need to verify the same user.

## Multi-factor authentication

MFA asks for two or more **different kinds** of proof:

- Something you **know**: a password.
- Something you **have**: a phone, a security key.
- Something you **are**: a fingerprint, a face.

Two passwords is still one factor. Passkeys combine "have" and "are" in one step, which is why they're replacing passwords.

## The usual suspects

The OWASP Top Ten is the industry's list of the most common web app risks. These are the ones you'll prevent most often:

### Injection

Never build a query by gluing in user input.

```ts
// ❌ an email of "' OR '1'='1" returns every user
db.query(`SELECT * FROM users WHERE email = '${email}'`)

// ✅ parameterised: the input is always data, never SQL
db.query('SELECT * FROM users WHERE email = $1', [email])
```

### Cross-site scripting (XSS)

User content rendered as HTML can run scripts in other users' browsers. Frameworks like React escape text by default, so the danger is the escape hatches: `dangerouslySetInnerHTML`, `innerHTML`, `v-html`. Sanitise anything you render as HTML, and add a Content Security Policy header.

### Cross-site request forgery (CSRF)

Another site makes Ana's browser send a request to yours, cookies included. `SameSite=Lax` cookies stop most of it; for the rest, require a CSRF token on forms that change data.

### Broken access control

The most common one: checking that someone is logged in, but not that the thing belongs to them.

```ts
// ❌ any logged-in user can read any order by changing the id
const order = await getOrder(params.id)

// ✅ scope every lookup to the current user
const order = await getOrder({ id: params.id, userId: session.userId })
```

### And the rest

- **HTTPS everywhere.** See [[docs/ssl|Networking - HTTPS and TLS]].
- **Secrets in environment variables**, never in Git.
- **Rate-limit logins** and password resets.
- **Update dependencies.** `npm audit` shows known vulnerabilities.
- **Don't store what you don't need.** Data you never kept can't leak. Let a payment provider hold card numbers.

## Common mistakes

- **Rolling your own auth** when a well-tested library or provider exists.
- **Different errors for "no such user" and "wrong password".** It tells attackers which emails exist. Say "Email or password is wrong".
- **Trusting the client.** Prices, roles and user ids from the request body are suggestions. Check them on the server.
- **Logging secrets.** Passwords and tokens end up in log files and error trackers.

## Try it

1. Hash the same password twice with Argon2. Why are the hashes different, and why does `verify` still work?
2. Find one query in a project of yours that builds SQL with a template string, and parameterise it.
3. For a coffee shop app with customers, baristas and a manager, write down the roles and what each may do.

## Related

- [[docs/cryptography|Security - Cryptography]]
- [[docs/jwt|Security - JWT]]
- [[docs/oauth2|Security - OAuth 2 and OpenID Connect]]
- [[docs/ssl|Networking - HTTPS and TLS]]
- [[docs/server-setup|DevOps - Server Setup]]
