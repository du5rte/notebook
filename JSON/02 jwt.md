## JSON - Json Web Tokens

Resources:

- [jwt.io](https://auth0.com/learn/json-web-tokens/)
- [Get Started with JSON Web Tokens](https://auth0.com/learn/json-web-tokens/)
- [IETF JWT](https://tools.ietf.org/html/rfc7519)
- [Auth0 - Secure Your React and Redux App with JWT Authentication](https://auth0.com/blog/2016/01/04/secure-your-react-and-redux-app-with-jwt-authentication/)
- [scotch.io - Anatomy of JTW](https://scotch.io/tutorials/the-anatomy-of-a-json-web-token)
- [scotch.io - Authenticating node with JTW](https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens)


## JWT
Json Web Tokens are most commonly used for authentication and passing data securely

#### Header
Contains information about the `type` and `algorithm`
```
{
  "typ": "JWT",
  "alg": "HS256"
}
```

#### Payload
Contains the actual information we're after

#### Verify Signature
A typical `JWT` looks something like
```js
var jwt = require('jsonwebtoken')

jwt.sign({username: 'monteirocode'}, 'mySecret', {audience: 'myApp'})
```
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im1vbnRlaXJvY29kZSIsImlhdCI6MTQ1ODA2NjA3MywiYXVkIjoibXlBcHAifQ.JT3hyD-EZD96XADTroUXAAztGiHtDTfK1AJ4inLENyY
```

## Authentication
A typical authentication would then expect a `JWT` to be found in the header

```
Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im1vbnRlaXJvY29kZSIsImlhdCI6MTQ1ODA2NjA3MywiYXVkIjoibXlBcHAifQ.JT3hyD-EZD96XADTroUXAAztGiHtDTfK1AJ4inLENyY"
```
