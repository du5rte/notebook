---
title: "Webpack"
type: doc
created: 2015-08-27
updated: 2020-04-11
tags: [tools]
---
# Webpack

Fundamentals kept from [[archive/tools/webpack|Webpack (v1)]].

## Module Bundler
Its job is to take all different assets, `.js`, `.css` and turn them into a static bundle

## Old Days
Traditionally we'd have to define a huge list of `script` tags and they would have to be in order

> e.g. the code in `app.js` might depend on `angular.js`


```html
<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-route/angular-route.js"></script>
<script src="bower_components/slick.js/slick/slick.min.js"></script>
<script src="bower_components/sticky/jquery.sticky.js"></script>
<script src="js/app.js"></script>
<script src="js/ux.js"></script>
```


## Scripts
We want to import the content from `file2` into our `document.write()`

entry.js
```js
// by default it looks for `.js`, otherwise use extension e.g. `.coffee`
document.write(require('./content'));
```

content.js
```js
module.exports = "It works from content.js.";
```

## Config File
We want to move the config options into a config file: add `webpack.config.js`

```sh
$ webpack
```

## Web Development Server
Creates a watch server on `http://localhost:8080/`

```sh
$ npm install --save-dev webpack-dev-server
```

## Dependencies

```html
<!-- Loading from CDN -->
<script src="https://code.jquery.com/jquery-git2.min.js"></script>
```
```js
// loading from local files
resolve: { alias: { jquery: "/path/to/jquery-git2.min.js" } }
```
```js
// the artificial module "jquery" exports the global var "jQuery"
externals: { jquery: "jQuery" }

// inside any module
var $ = require("jquery");

// OR

plugins: [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
  })
]

// If you use "$", jquery is automatically required
$('body').html("It works!");
```

## Libraries
What about third party libraries that don't have Webpack support? I mean, libraries that are not exporting anything. That will include the library on the build and that is good enough.

```js
import 'thelibrary';
```

## Related
- [[docs/node/npm|npm]]
- [[docs/node/modules|Node - Modules]]
- [[docs/node/modules-commonjs|Node.js - Modules]]
