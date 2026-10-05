# Networking - HTTP


## HTTP
Hyper Text Transfer Protocol, how web server and browsers communicate.

### HTTP Verbs
Requests start with a verb

- `GET` - fetch a document
- `POST` - submit a form
- `HEAD` - fetch metadata about a document
- `PUT` - upload a file

### HTTP HEADERS
Headers have a key followed by a colon followed by a value

```
key: value
```

```sh
nc google.com 80
GET / HTTP/1.0
Host: google.com
```

### HTTP GET

We get back a response which also include a Header
```sh
HTTP/1.0 302 Found
Cache-Control: private
Content-Type: text/html; charset=UTF-8
Referrer-Policy: no-referrer
Location: http://www.google.co.uk/?gfe_rd=cr&dcr=0&ei=4_nTWYfBGZT38Af08rbQDg
Content-Length: 271
Date: Tue, 03 Oct 2017 20:58:11 GMT

<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>302 Moved</TITLE></HEAD><BODY>
<H1>302 Moved</H1>
The document has moved
<A HREF="http://www.google.co.uk/?gfe_rd=cr&amp;dcr=0&amp;ei=4_nTWYfBGZT38Af08rbQDg">here</A>.
</BODY></HTML>
```

### HTTP POST
Forms in html are often delivered with a `POST`

Posts often require `Content-Type` and `Content-Length` which referes to the length of the content.


```
POST /form HTTP/1.1
Host: localhost
Content-Length: 51
Content-Type: application/x-www-form-urlencoded

title=whatever&date-1421044443&body=beep%20boop%21
```
```sh
nc localhost 5000 < post.txt
```

Server responds with this, the data was send through 3 chunks
```
HTTP/1.1 200 OK
Date: Mon, 12 Jan 2015 06:37:51 GMT
Connection: keep-alive
Transfer-Encoding: chunked

3
ok
```