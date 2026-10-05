# Webpack

Resources
- [Webpack](http://webpack.github.io)
- [Getting Started](http://webpack.github.io/docs/tutorials/getting-started/)
- [Pete Hunt OSCON 2014](https://youtu.be/VkTCL6Nqm6Y)
- [Pete Hunt - webpack how to](https://github.com/petehunt/webpack-howto)
- [Ditching RequireJS for Webpack](http://blog.player.me/ditching-requirejs-webpack-reasons-lessons-learned/)
- [Webpack & Angular](http://shmck.com/webpack-angular-part-1/)
- [Introduction to Webpack with practical examples](http://julienrenaux.fr/2015/03/30/introduction-to-webpack-with-practical-examples/#ECMAScript_6_compilation)
- [What's new in webpack 2](https://gist.github.com/sokra/27b24881210b56bbaff7)

## Module Bundler
It's job it's to take all different assets, `.js`, `.css` and turn them into a static bundle

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
We want too import the content from `file2` into our `document.write()`

entry.js
```js
// by default it looks for `.js`, otherwise use extention e.g. `.coffee`
document.write(require('./content'));
```

content.js
```js
module.exports = "It works from content.js.";
```

We can bundle it together
```sh
# webpack <entry> <output>
$ webpack ./entry.js bundle.js
```
```js
document.write(require(  "It works from content.js."  ));
```

## Styles

`entry.js`
```js
document.write(require("./content.js"));
// can be imported here
require("!style!css!./style.css");
```

`content.js`
```js
// or here
// require("!style!css!./style.css");
module.exports = "It works from content.js.";
```

## Binding Loaders
We don’t want to write such long requires `require("!style!css!./style.css");`

```js
// require("!style!css!./style.css");
require("./style.css");
```
```sh
$ webpack ./entry.js bundle.js --module-bind 'css=style!css'
```

## Config File
We want to move the config options into a config file: add `webpack.config.js`

```sh
$ webpack
```
```js
module.exports = {
    // Main Entry File
    entry: "./entry.coffee",
    output: {
        // This is where images AND js will go, './build'
        path: __dirname,
        // This is used to generate URLs to e.g. images
        // publicPath: 'http://mycdn.com/',
        filename: "bundle.js"
    },
    module: {
        // Loaders
        loaders: [

            { test: /\.css$/, loader: "style!css" },
            // use ! to chain loaders `!css!autoprefixer`
            { test: /\.scss$/, loader: "style!css!autoprefixer!sass" },
            // Sass Indented Syntax
            { test: /\.sass$/, loader: "style!css!autoprefixer!sass?indentedSyntax" },
            { test: /\.coffee$/, loader: "coffee-loader" },
            // inline base64 URLs for <=8k images, direct URLs for the rest
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
        ]
    },
    resolve: {
        // you can now require('file') instead of require('file.coffee')
        extensions: ['', '.js', '.json', '.coffee']
    },
    externals: [
      // Tells webpack we're loading `require('angular')` from somewhere else, like a CDN
      'Modernizr',
      'jQuery',
      'angular'
    ],
};
```

Multiple entry points
```js
// webpack.config.js
module.exports = {
  entry: {
    Profile: './profile.js',
    Feed: './feed.js'
  },
  output: {
    //path to where webpack will build your stuff
    path: 'build/assets',
    //path that will be considered when requiring your files
    publicPath: "/assets/",
    filename: '[name].js' // Template based on keys in entry above
  }
};
```

## Development
Invoke Webpack flags for development

```sh
$ webpack # for building once for development
$ webpack -p # for building once for production (minification)
$ webpack --watch # for continuous incremental build in development (fast!)
$ webpack -d # to include source maps
```

Extra flags
```sh
$ webpack --progress --colors --watch
--progress # Show's a progress bar
--colors # Show's colors
--watch # compiles on save
```

## Web Development Server
Creates a watch server on `http://localhost:8080/`

```sh
$ npm install --save-dev webpack-dev-server
```
```sh
$ webpack-dev-server
```
Extras
```sh
--hot # hot module replace
--inline
--config webpack.config.js # define webpack config
```

### Dependencies
[Webpack ProvidePlugin vs externals?](http://codereply.com/answer/7upd1z/webpack-provideplugin-vs-externals.html)
http://dontkry.com/posts/code/single-page-modules-with-webpack.html#comment-1337363183

```html
<!-- Loading from CDN -->
<script src="https://code.jquery.com/jquery-git2.min.js"></script>
```
```js
// loading from local files
resolve: { alias: { jquery: "/path/to/jquery-git2.min.js" } }
```
```js
// the artifial module "jquery" exports the global var "jQuery"
externals: { jquery: "jQuery" }

// inside any module
var $ = require("jquery");

// OR

plugins: [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'windows.jQuery': 'jquery',
  })
]

// If you use "$", jquery is automatically required
$('body').html("It works!");
```

## libraries
What about third party libraries that doesn’t have Webpack support? I mean, libraries that are not exporting anything. That will include thelibrary on the build and that is good enough.

```js
import 'thelibrary';
```

### Code Spliting
- [code splitting](http://webpack.github.io/docs/code-splitting.html)
- [bundle-loader](https://github.com/webpack/bundle-loader)
- [bundle-loader "lazy" meaning](https://github.com/webpack/bundle-loader/issues/2)
- [oclazyload](https://oclazyload.readme.io)
- [lazy load with angular and webpack](http://michalzalecki.com/lazy-load-angularjs-with-webpack/)
- [Alexand Rubadiu](http://alexandrubadiu.ro/talks/angular_webpack/#/)


```js
var bundle = require("bundle!./file.js"); // <= browser sends request here
bundle(function(fileExports) { // callback is called when the module is ready
  // fileExports can be used
});
```
Basically the bundle-loader is like:
```js
require(["./file.js"], function(fileExports) {
  // fileExports can be used  
});
```

```js
var bundle = require("bundle?lazy!./file.js");
bundle(function(fileExports) { // <= browser sends request here
  // fileExports can be used
});
```
