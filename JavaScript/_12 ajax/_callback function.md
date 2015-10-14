# AJAX Basics

*Part 2 - The Callback Function*

- `.onreadystatechange`
- `.readyState`
- `.status`
- `.statusText`

## .onreadystatechange

Fires each times there's a change in the XMLHttpRequest object

```javascript
xhr.onreadystatechange = function() {
	// if (xhr.readyState === 4) {
	//	run code
	// }
};
```
## .readyState
Holds a number from `0 - 4`, which represents each stage of the ajax request, `0 - 3` are early stages, from when it's created `0` to when the response is coming `3`, but we are only concern about `4`.
```javascript
// xhr.onreadystatechange = function() {
	if (xhr.readyState === 4) {
		// run code
	}
// };
```

But sometimes that's not enough, the web server might not connect to a database or the web program crashes or the pointed url file no longer exists and we need to let the user know.


## .status

THE status property is a number sent from the server

we can add more reliability by adding a `.status` but any problems come back quietly
```javascript
// xhr.onreadystatechange = function() {
	if (xhr.readyState === 4 && xhr.status === 200) {
		// run code
	}
// };
```
Values:
> Other number than 200 are not usually good

	200 = OK (standard successful http response)
	404 = file not found
	401 = not authorized (might require login)
	500 = server error

We can add programing to deal with each possible problems

```javascript
// xhr.onreadystatechange = function() {
	if (xhr.readyState === 4) {
		if (xhr.status === 200) {
			 run code
		} else if (xhr.status === 200) {
			 file not found
		} else if (xhr.status === 500) {
			 server had a problem
		}
	}
// };
```


## .statusText

Accompanying the status object is an explanation of the status

	200 = Okay
	404 = Not found

In most cases we don't want to pop up any alerts that will distract users unless we users are for example submitting a form then we can let them so it was successfully submit or to try again

```javascript
// xhr.onreadystatechange = function() {
	if (xhr.readyState === 4) {
		if (xhr.status === 200) {
			 run code
		} else {
			alert(xhr.statusText);
		}
	}
// };
```
