# Cryptography

Resources:
- [Journey into cryptography](https://www.khanacademy.org/computing/computer-science/cryptography?ref=resume_learning#crypt)
- [SSCP Cryptography](https://app.pluralsight.com/player?course=sscp2015-cryptography)
- [tools4noobs](https://www.tools4noobs.com/online_tools/)

## Encryption
Passwords are commonly stores as `encrypted hashes`. If passwords were stored in plain text form a hacker could run an *dictionary attack* against a user, or worst if it gain access to the server it'd get access to all the registered users passwords.

*dictionary attack, trying a list of commonly used passwords*
*cipher-text, the result of a plain text passed through an `encryption` algorithm*




## ?? Confidentiality
passwords

## ?? Integrity
Use to check data hasn't been tampered with,
to know it hasn't been tampared with
example email verification
proof of origin




## Hashing
Hashing is good for `integrity` but not `confidentiality`, a hacker can decipher a `hash` by passing it through multiple commonly used hashing algorithms.

```
hello world > MD5 128 bit > 5eb63bbbe01eeed093cb22bb8f5acdc3
Hello World > MD5 128 bit > b10a8db164e0754105b7a99be72e3fe5
```


## Salting
Adding extra characters into a hash

## Symmetric Encryption

Ceaser Cipher substitution cipher rotated by `13` places
```
HELLO > ROT13 > URYYB
```


## ?? Asymmetric Encryption
public private key


Here both parts need to share a rotation secret key e.g. `ROT13`

but over time someone can figure it out, so maybe we share multiple keys e.g. monday `ROT3`, tuesday `ROT8`

Advance Encryption Standard (AES) 128, 192, 256


## Digital Signatures
Commonly used with email `S/MIME` (Asymmetric encryption) provided integrity (is hashed) provided proof of origin, not confidential by default

## Non-Repudiation
A person can not reasonably deny that they are responsible for the action or message used for logging and auditing
