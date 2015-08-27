# BrowserSync

- [BrowserSync](http://www.browsersync.io)
- [API](http://www.browsersync.io/docs/api/)

## BrowserSync + Gulp.js
There's no official BrowserSync plugin for Gulp, because it's not needed! You simply require the module, utilise the API's and configure it with options.

First, you'll need to install BrowserSync & Gulp as development dependencies.
```sh
$ npm install browser-sync gulp --save-dev
```

Then, use them within your `gulpfile.js`:
```js
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Or as a Proxy
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "yourlocal.dev"
    });
});
```
