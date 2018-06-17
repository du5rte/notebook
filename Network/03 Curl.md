# Networking - Curl

## Curl
Really easy way to send requests


### GET
By default Curl issues a `GET` request and prints out the body,

```sh
$ curl localhost:5000
```
```sh
GET / HTTP/1.1
Host: localhost:5000
User-Agent: curl/7.54.0
Accept: */*
```

To gets rid of annoying progress output `s`
```$
$ curl -s https://google.com
```
```html
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>302 Moved</TITLE></HEAD><BODY>
<H1>302 Moved</H1>
The document has moved
<A HREF="https://www.google.co.uk/?gfe_rd=cr&amp;dcr=0&amp;ei=lTfmWeTpJsv38AeSwYzACA">here</A>.
</BODY></HTML>
```

To include the headers `i`, to return only the headers `I`,
```sh
$ curl -sI https://google.com
```
```
HTTP/2 302
cache-control: private
content-type: text/html; charset=UTF-8
referrer-policy: no-referrer
location: https://www.google.co.uk/?gfe_rd=cr&dcr=0&ei=8TjmWaSzLJPHXo25l_gD
content-length: 270
date: Tue, 17 Oct 2017 17:08:01 GMT
alt-svc: quic=":443"; ma=2592000; v="39,38,37,35"
```

### POST

```sh
$ curl -X POST localhost:5000 -d email='peter@klaven' -d password='cityslicka'
```
```
POST / HTTP/1.1
Host: localhost:5000
User-Agent: curl/7.54.0
Accept: */*
Content-Length: 38
Content-Type: application/x-www-form-urlencoded

email=peter@klaven&password=cityslick
```

### HEADERS

```sh
$ curl -X POST localhost:5000/api/user/modify -H Authorization:'Bearer QpwL5tke4Pnpja7X' -d new_password=stickytown
```
```
POST /api/user/modify HTTP/1.1
Host: localhost:5000
User-Agent: curl/7.54.0
Accept: */*
Authorization:Bearer QpwL5tke4Pnpja7X
Content-Length: 23
Content-Type: application/x-www-form-urlencoded

new_password=stickytown≈
```
