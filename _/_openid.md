## OpenID
Built on top of `OAuth2` used for authentication.


someone buildint a malevious application could use the copy of the user token and use it to impersonate him

OAuth 2.0 for login but it's really OpenID Connect

builds on top of OAuth2 authorization
code flow for server applications

implicit flow for client applications

adds new concepts like `ID Token`


```sh
GET
  /authorize?
  client_id=webapp&
  redirect_uri=https://webapp/cb&
  scope=openid profile&
  response_type=code&
  state=123

GET
  /cb?
  code=aA.bB.cC&
  state=123
```

inside `aA.bB.cC`
```js
{
  "access_token": "abc",
  // this id_token is unique for the app
  "id_token": "uU.vV.wW",
  "experies_in": "3600",
  "token_type": "Bearer",
  "refresh_token": "xX.yY.zZ"
}
```

inside `uU.vV.wW`
```js
{
  // issuer, does it come from openID I directed it to?
  // e.g. facebook, google, etc.
  "iss",
  // identifies the user
  "sub",
  // audience verified it's for us only
  "aud",
  "exp"
}
```
