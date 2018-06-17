# Security


## Hashing
Keep secrets from everyone and to verify content

md5
sha256
shake_218
argon2i

Use a hashing algorithm that stresses the processor
or memory of a computer

time and memory against an attacker
avoid collisions by passing a salt
keep track of the algorithm used
so you can upgrade as algorithms change

## Encryption
Keep sensitive data locked away from unauthorized eyes

end to end encryption
forward encryption

Async-encryption
Uses public and private keys
TCL
SSL
Open Whisper Systems

forward secrecy
each new message uses a new public key

## Identifying and Validating

authenticqtion
  email password

OAuth
OPenID
  facebook login


2 factor authentication
  should require 3 things
  something you are // finger print
  something you have // phone
  something you know // password

authorization
By using an access control scheme, you can enforce authentication (knowing who a user is) and authorization (what that user is allowed to do).

  ACL Access control list
  RBAC Role-based access control

  claims can be a role these belong to,
  a resource they can access,
  or a action they can perform

## Handling data
What data you should not store
