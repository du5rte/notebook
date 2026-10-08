---
title: "Security - Cryptography"
type: doc
created: 2016-05-08
updated: 2026-10-07
aliases: ["Cryptography"]
tags: [security]
---
# Security - Cryptography

Cryptography is the maths of keeping secrets and proving things haven't been tampered with. You'll never write your own algorithm (please don't), but you use it every day: HTTPS, SSH keys, password storage, signed tokens. This lesson gives you the vocabulary and the mental model, so the rest of the security lessons make sense.

## Encoding vs hashing vs encryption

The three get mixed up all the time. Start here.

| | Reversible? | Needs a key? | Use it for |
|---|---|---|---|
| Encoding (Base64) | ✅ By anyone | ❌ | Making data safe to send, not secret |
| Hashing (SHA-256) | ❌ One way | ❌ | Fingerprints, integrity, passwords |
| Encryption (AES) | ✅ With the key | ✅ | Keeping data secret |

```ts
btoa('flat white') // 'ZmxhdCB3aGl0ZQ=='  anyone can decode this
```

Base64 is not security. If you can read it with `atob()`, so can everyone else.

## Ciphers: the old way

A **cipher** turns readable **plaintext** into scrambled **ciphertext** using a secret. The classic ones are broken, but they teach the ideas.

### Caesar cipher

Shift every letter by a secret number.

```ts
const caesar = (text: string, shift: number) =>
  text.replace(/[A-Z]/g, (letter) =>
    String.fromCharCode(((letter.charCodeAt(0) - 65 + shift) % 26) + 65),
  )

caesar('HELLO WORLD', 3) // 'KHOOR ZRUOG'
```

There are only 25 possible shifts, so an attacker just tries them all. That's a **brute force** attack.

### Frequency analysis

Every language has a **fingerprint**: in English, `E` is the most common letter. Count the letters in a Caesar message, and the most common one is probably `E`. The flatter the letter frequencies in the ciphertext, the stronger the cipher.

### Polyalphabetic (Vigenère)

Use a **shift word** instead of one number, so each letter gets a different shift. With the secret `SNAKE` (`S` shifts by 19, `N` by 14, and so on):

```
HELLO WORLD
ASMWT PCSWI
```

The fingerprint is flatter, but the word repeats, and repeats are patterns an attacker can find. Longer secret, stronger cipher.

### One-time pad

Use random shifts as long as the message itself, and never reuse them. For `ALICE` with shifts `14 15 1 23 19`, every 5-letter word is an equally likely answer: there are `26 ** 5` (11,881,376) of them, and nothing to tell the right one apart. It's unbreakable, and also impractical: you need a secret as long as everything you'll ever send.

Modern cryptography is about getting close to that strength with a short key.

## Symmetric encryption

**One key** locks and unlocks. Fast, so it's used for the actual data.

```
plaintext + key → ciphertext → + same key → plaintext
```

✓ **AES** is the standard. The catch: both sides need the same key. How do you share it safely with a server you've never met?

## Asymmetric encryption

**A key pair**: a **public key** you share with everyone and a **private key** you never share.

- Anyone can **encrypt** with your public key; only your private key can decrypt. Like a letterbox: anyone can post, only you can open it.
- You can **sign** with your private key; anyone can check it with your public key. Like a wax seal.

**RSA** and **elliptic curve** algorithms (like Ed25519) are the common ones. Elliptic curves give the same strength with much smaller keys, which is why `ssh-keygen -t ed25519` is the modern default. Asymmetric crypto is slow, so it's rarely used for big data.

## Hybrid: how HTTPS does it

Put the two together: use asymmetric crypto once to agree on a symmetric key, then use the fast symmetric key for everything else. That's exactly what TLS does in [[docs/ssl|Networking - HTTPS and TLS]].

## Hashing

A **hash** turns any input into a fixed-size fingerprint. Same input, same hash. Change one character and the hash changes completely. You can't go backwards.

```ts
import { createHash } from 'node:crypto'

createHash('sha256').update('hello').digest('hex')
// '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
```

Use hashes to check **integrity**: did this download arrive intact?

| Algorithm | Use it? |
|---|---|
| MD5, SHA-1 | ❌ Broken: attackers can make two inputs with the same hash |
| SHA-256, SHA-3 | ✅ Integrity and signatures |
| bcrypt, Argon2 | ✅ Passwords only. See [[docs/security|Security - Basics]] |

Fast hashes like SHA-256 are **wrong for passwords**: an attacker can try billions of guesses a second. Password hashes are slow on purpose.

### Salting

A **salt** is random data added to each password before hashing, so two people with the same password get different hashes. It defeats precomputed tables of common passwords (a **dictionary attack** with the work done in advance). bcrypt and Argon2 salt for you.

## Signatures

A **digital signature** is a hash of the message, signed with a private key. Anyone with the public key can check two things: it came from the key's owner, and it wasn't changed. That gives you **integrity** and **non-repudiation**: the sender can't reasonably deny sending it.

You'll meet signatures in signed [[docs/jwt|JWTs]], DKIM email, Git commits and software updates.

## Common mistakes

- **Rolling your own crypto.** Use your platform's library (`node:crypto`, Web Crypto) or a well-known package.
- **Base64 as "encryption".** It's encoding. Anyone can reverse it.
- **SHA-256 for passwords.** Too fast. Use Argon2 or bcrypt.
- **Hard-coding keys** in code or committing them to Git. Keys go in environment variables or a secrets manager.

## Try it

1. Write `decaesar(text, shift)` and decode `'KHOOR ZRUOG'`.
2. Hash `'hello'` and `'Hello'` with SHA-256. How many characters stay the same?
3. Run `ssh-keygen -t ed25519 -f /tmp/demo` and look at both files. Which one would you share?

## Related

- [[docs/security|Security - Basics]]
- [[docs/jwt|Security - JWT]]
- [[docs/ssl|Networking - HTTPS and TLS]]
- [[docs/ssh|DevOps - SSH]]
