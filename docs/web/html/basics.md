# HTML Basics

resources:
- [Understand the Favicon - Jonathan T. Neal](http://www.jonathantneal.com/blog/understand-the-favicon/)
- [Favicons - CSS Tricks](https://css-tricks.com/favicon-quiz/)

## Doctype
Identifies the document as html5 Type

```html
<!doctype html>
```

## HTML
Hyper Text Markup Language

```html
<html lang="en"></html>
```


## Head
Used to include metric information, meta tags, stylishsheets and javascript

```html
<head></head>
```

## Meta
Used to include metric information, some are used for `SEO` in google searches

```html
<meta charset="utf-8">
<!--- forces devices --->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Free Web tutorials">
<meta name="author" content="John Smith">
<!-- no longer used for seo -->
<meta name="keywords" content="HTML,CSS,JavaScript">
```

## Title
Used to title the page

```html
<title>My Page</title>
```

## Link
Used to include stylesheets
```html
<link rel="stylesheet" type="text/css" href="css/application.css">
```

## Script
Used to include or run `JavaScript` in the browser

```html
<script type="text/javascript" src="js/app.js"></script>
<script type="text/javascript">
	alert("Hello World!");
</script>
```

On the other hand `noscript` in only run if `JavaScript` is disabled in the browser, useful to display an message to turn it on.
```html
<noscript>
	<p>Please turn on JavaScript to view this webpage properly.</p>
<noscript>
```

## Render-Blocking
Script tags can affect the document rendering time

```html
<html>
  <head>
	<!-- BAD, blocks the document from loading until file is loaded -->
	<script type="text/javascript" src="main.js"></script>
	<!-- OK, if small -->
  <script type="text/javascript">
    /* some JavaScript */
  </script>
	<!-- OK, non-blocking just executes when done loading -->
	<script async src="main.js"></script>
  </head>
  <body>
    <!-- OK, document already loaded -->
    <script type="text/javascript" src="main.js"></script>
  </body>
</html>
```

## Body
Where the view is rendered

```html
<body>Everything that is rendered</body>
```

## Comments
Allows us to write comments

```html
<!-- This text is commented out -->
```
