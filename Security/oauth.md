# OAuth

## OAuth2
*Open Authorization* is a framework for delegating authorization through tokens which grant web apps access to resources.

## Code Flow

###### Authorization Request

```
User - Hey App can I use you?
App - Sure, but I need of your facebook resources.
User - I'm not giving you password ...
App - You don't have to, just go to this URL.
```

###### Token Request

```sh
GET
  facebook/authorize?
  # hey Facebook it's App
  client_id=app&
  # I need this resources from this user
  scope=resource&
  # when you're done sent him back here
  redirect_uri=https://app/callback
  # together with an authorization code
  response_type=code&
  # also to make sure it came from you
  # pass me this random key back
  state=123
```

###### Token Request

```
User - Hey Facebook, give App what it asked for.
Facebook - Sure User, just sign this consent form.
```
```sh
POST
  # hey App
  app/callback?
  # here's an access JWT access token
  code=xyz&
    # xyz = {
    #   "access_token": "abc",
    #   "expires_in": "3600",
    #   "token_type": "Bearer",
    #   "refresh_token": "xyz"
    # }
  # and here's the random key you ask to send back
  state=123
```
```
App - Got it
```
###### Access
```sh
Header
  # I have an access token let me through
  Authorization: Bearer access_token

GET
  # Get me User resources
  facebook/resource
```
```
App - I have the resources, welcome in User
```
```
User - Cheers!
```
###### Refresh Token
```
App - I'll keep this saved to use it in the future
```
