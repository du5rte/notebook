---
title: "Webpack (v1)"
type: doc
created: 2015-08-27
updated: 2020-04-11
tags: [tools]
---
# Webpack (v1)

Still-valid fundamentals moved to [[docs/tools/webpack|Webpack]].

Resources
- [Webpack](http://webpack.github.io)
- [Getting Started](http://webpack.github.io/docs/tutorials/getting-started/)
- [Pete Hunt OSCON 2014](https://youtu.be/VkTCL6Nqm6Y)
- [Pete Hunt - webpack how to](https://github.com/petehunt/webpack-howto)
- [Ditching RequireJS for Webpack](http://blog.player.me/ditching-requirejs-webpack-reasons-lessons-learned/)
- [Webpack & Angular](http://shmck.com/webpack-angular-part-1/)
- [Introduction to Webpack with practical examples](http://julienrenaux.fr/2015/03/30/introduction-to-webpack-with-practical-examples/#ECMAScript_6_compilation)
- [What's new in webpack 2](https://gist.github.com/sokra/27b24881210b56bbaff7)

## Scripts
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
