 # AJAX BASICS
*Introduction*

- AJAX
	- Request
	- Response
- How AJAX Works
	1. Creating HRX Object
	2. Creating a callback function
	3. Opening a request
	4. Sending the request


## AJAX

*Asynchronous JavaScript and XML, or AJAX*
Uses a faster and more user friendly way of loading pages, allowing the Client to make requests from the web server

> (AKA XMLHttpRequest Object)

When the response arrives with the data javascript uses that data to selectively change parts of the website.

> **Request:** we ask the server for information

>	**Response** when the server replies with data

## How AJAX Works

AJAX Works Asynchronous
> Done without waiting wihout freezing the page
 JavaScript (the language we use to make it all work)
 And
 XML

1. Create an XMLHTTPRequest Object
	- This tell tells the browser to get ready
	- Web Browser needs to create a object, of the methods you need to send and receive data (often shortened to HRX Object)
2. Create a callback function
	- The programing you want to run when the server respondes
	- It's where you process the response and update the html
3. Open a request
	- We give the browser 2 informations
	- the methods we use (get/post) and the url where its sent
4. Sent the request
	- The last step if finally sendinf of the request

## 1. Creating an HRX Object
For each AJAXRequest should be created a new XMLHttpRequest object

```javascript
var xhr = new XMLHttpRequest();
```


## 2. Creating a callback function
The Callback function is at the heart of AJAX here we set all the instructions, We can never guess the order of the responses, to trigger the call back we use a special browser events.

`.onreadystatechange` Runs each time there's a change in the state of the AJAXRequest, (e.g. like a new request, sending out the request

`.readyState` The last server response step '4' the only we are interested in.

`.innerHTML` Sets or gets the HTML inside the element's descendants.
We'll get a chunk of html wich we want to place inside a div with a `id="ajax"`

`.responseText` The response the server sends back

```javascript
xhr.onreadystatechange = function() {
	if (xhr.readyState === 4 ) {
		document.getElementById('ajax').innerHTML = xhr.responseText;
	}
};
```
html element where we want to load the content

```xml
<ul id="ajax"></ul>
```


## 3. Opening a request
*Prepares the browser for sending the information*


`.open` Takes two values

1. The http method `GET` if we getting the data, `POST` if we are posting the data (e.g. to save to a database)
2. Where the request is going (e.g. could point to a file or a server-sise program on our web server)

```javascript
xhr.open('GET', 'sidebar.html');
```

## 4. Sending the request
Because we are only `GET`ting we don't need to provide any information, but when posting we can pass information

```
xhr.send();
```

### Inline HTML Sending
We can create a send button on the html by calling a function

```javascript
function sendAJAX() {
	xhr.send();
	// hides the button after  clicking
	document.getElementById('load').style.display = "none";
}
```
html button
```xml
<button id="load" onclick="sendAJAX()">Bring it!</button>
```
