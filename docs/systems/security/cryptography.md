# Cryptography

Resources:
- [Journey into cryptography](https://www.khanacademy.org/computing/computer-science/cryptography?ref=resume_learning#crypt)
- [SSCP Cryptography](https://app.pluralsight.com/player?course=sscp2015-cryptography)
- [tools4noobs](https://www.tools4noobs.com/online_tools/)

## Terms

#### Encryption
Transform `plaintext` information in a `cipher`

#### decryption
Deconstruct a `cipher` into `plaintext` information

#### Cypher
Are a form of `locker` for data but instead uses mathematical algorithms

#### Frequency fingerprint
Each language has distinctive frequency of letters (fingerprint), by analyzing the frequency of the message a cypher can be decrypted. The lighter the fingerprint the stronger the cypher is.

#### Frequency Stability Property
Human randomness simulation is flawed, as we tend to prefer certain patterns when making guesses resulting in a uneven pattern. A true random sequence will equally like to contain every sequence of any length.

#### Brute Force Search
Trying every number in a locker

#### Dictionary attack
Trying a list of commonly used passwords

#### Integrity
Use to check proof of origin or that data hasn't been tampered with, e.g. email verification

#### Electronic Cookbook Mode (ECM)
When using the same key and algorithm an attacker can start to build an `ECM` on commonly used messages

#### Digital Signatures
Commonly used with email S/MIME for integrity proof of origin

#### Non-Repudiation
A person can not reasonably deny that they are responsible for the action or message. used for logging, auditing and digital signatures

## Common Encryptions

#### MD5
Message Digest Algorithm 128 bit hash commonly used for non secure applications

#### SHA-1
Secure Hash Algorithm 160 bit hash commonly used, however considered insecure against well trained attackers

#### SHA-2
Bits 224, 256, 384, 512 secure but still believed to be vulnerable

#### SHA-3
The new kid

#### AES
Advanced Encryption Standards (AES) 128, 192, 256 bit. The gold standard in encryption

#### RC4
Rivest's Cipher used in SSL and HTTPS

#### RSA
Rivest, Shamir, Adleman (RSA), Uses larges prime numbers (1024, 2048 bits) to create public and private keys

#### SSL
Secure Socket Layer

#### TLS
Transform Layer Security

## Encryption Methods

#### Hashing
Hashing is good for `integrity` but not `confidentiality`, a hacker can decipher a `hash` by passing it through multiple commonly used hashing algorithms.

#### Salting
Adding extra characters into a hash to make it more secure

#### Symmetric Encryption
Uses the same key to `encrypt` and `decrypt` e.g. Caesar cipher. Over time an attacker can figure it out, over time keys need to be changed.

#### Block Encryption
Encrypts the whole thing as a block

#### Stream Encryption
Encrypts bit for bit (small blocks)

#### Asymmetric Encryption
Uses key pairs (`public` and `private`) to `encrypt` and `decrypt` e.g. PKI (Public Key Infrastructure). Slower than symmetric not good for large amounts of data. Often use to initiate a session to exchange symmetric key.

#### Steganography
Hides a message inside another message, e.g. a message in a picture

#### Elliptic Curve
Based on logarithm math to determine a point on a elliptic curve. Reduce the overhead of calculation using large prime numbers. Leads to other Wave encryption (Quantum Cryptography)

#### Hybrid Encryption
Combines both asymmetric and symmetric, the bases of SSL/TLS

## Ciphers

#### Caeser Cipher
Uses a secret `number` to shift the letters

Secret: `3`
```
HELLO WORLD
IFMMP XPSME
```


#### Polyalphabetic
Uses a secret `shift word` to shift the letters

Secret: `SNAKE`
```
HELLO WORLD
ASMWT PCSWI
```
It creates a lighter fingerprint but the `shift word` creates a repetitive pattern, the longer the secret word the stronger the cypher.


#### One Time Pad
Uses a sequence of `random numbers` as long as the message to shift the letters. While using `brute force` with the `caeser cipher` there's `26` possibilities, now there's `26*26*26*26*26 = 11881376` possibilities

Secret: `14 15 1 23 19`
```
ALICE
14 15 1 23 19
```
