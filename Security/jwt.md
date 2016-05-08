# JWT

Resources:
- [jwt.io](https://auth0.com/learn/json-web-tokens/)
- [Get Started with JSON Web Tokens](https://auth0.com/learn/json-web-tokens/)
- [IETF JWT](https://tools.ietf.org/html/rfc7519)
- [Auth0 - Secure Your React and Redux App with JWT Authentication](https://auth0.com/blog/2016/01/04/secure-your-react-and-redux-app-with-jwt-authentication/)
- [scotch.io - Anatomy of JTW](https://scotch.io/tutorials/the-anatomy-of-a-json-web-token)
- [scotch.io - Authenticating node with JTW](https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens)

## Security Tokens
Are protected data structures signed for `authenticity` proof that typically contain an expiration time

#### Authentication
Finding if something is legit, such as that comes from a trusted source or that it hasn't been tampered with

#### Authorization
Giving permission to do something

#### History

###### SAML
Security Assertion Markup Language were very expressive `XML` based token with many encryptions and signature options.

###### SWT
Simple Web Tokens were simple key value pairs `form`/`url` encoded with only symmetric signatures

###### JWT
The new standard `JSON` encoded tokens with symmetric & asymmetric signatures (HMACSHA256-385, ECDSA, RSA) and symmetric & asymmetric encryption (RSA, AES,/CGM)

## JWT
Json Web Tokens are most commonly used for authentication and passing data securely.

Because of their small size they can be send throught an `URL`, `PORT Parameter`  or inside ans `HTTP Header`

It's made of 3 parts seperated by dots, Header, Payload and Signature

```
xxxxx.yyyyy.zzzzz
```

## Header
Contains information about the `type` and `algorithm` used to encrypt the token

```json
{
  "typ": "JWT",
  "alg": "HS256"
}
```

## Payload
Contains `claims`, statements about an user and additional metadata e.g. issuer (`iss`), expiration (`exp`), etc.

```json
{
  "name": "John Smith",
  "admin": true,
  "custom": "anything you want"
}
```

## Signature

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

## Verify Signature
A typical `JWT` looks something like
```js
var jwt = require('jsonwebtoken')

jwt.sign({username: 'monteirocode'}, 'mySecret')
```
result
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im1vbnRlaXJvY29kZSIsImlhdCI6MTQ1ODA2NjA3MywiYXVkIjoibXlBcHAifQ.JT3hyD-EZD96XADTroUXAAztGiHtDTfK1AJ4inLENyY
```

## Authentication
A typical authentication would then expect a `JWT` to be found in the header

```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im1vbnRlaXJvY29kZSIsImlhdCI6MTQ1ODA2NjA3MywiYXVkIjoibXlBcHAifQ.JT3hyD-EZD96XADTroUXAAztGiHtDTfK1AJ4inLENyY
```
