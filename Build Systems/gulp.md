# Build Systems - Gulp

Resources
- [Joel Longie - Gulp.js Build System](https://www.youtube.com/watch?v=LmdT2zhFmn4&list=PLv1YUP7gO_viROuRcGsDCNM-FUVgMYb_G)
- [LevelUpTuts - Learning Gulp](https://youtu.be/wNlEK8qrb0M?list=PLhIIfyPeWUjoySSdufaqfaSLeQDmCCY3Q)


## Installing

    $ npm install -g gulp
    $ npm install gulp --save-dev

## Gulp Structure

A typical Gulp file has 4 separate components


## 1. Required Modules

This is where we define our dependencies

```js
var gulp = require('gulp');
var uglify = require('gulp-uglify');

```


## 2. Tasks

Then we define a load of tasks, from compressing static images,
to copying files, deployment build

```js
// the scripts tasks will be run with $ gulp scripts
gulp.task('scripts', function() {
  // place code here
});

// default tasks will be automatically run with $ gulp
gulp.task('default', function() {
  // place code here
});
```

#3. Watch Tasks
We define our watch task, and tell it what to do when change
happens on these files in this case run `'scripts'`

```js
gulp.task('watch', function() {
  gulp.watch('app/js/**/*.js', ['scripts']);
});
```

#4. Default Tasks
We define our task to run on defaults
Note: tasks run asynscronously (all at the same time)

```js
gulp.task('default', ['scripts','watch']);
```


Installing Gulp

     $ npm install gulp --save-dev


Create a empty `gulpfile.js`


    $ touch gulpfile.js



## Erros

Gulp will just crash when errors happen but there's a few ways to prevent that

### gulp-plumber
Catches erros and prints in to the console so gulp doesn't crash

```js
gulp.task('scripts', function() {
  gulp.src('./app/scripts/*.js')
  We insert it before uglify
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('./app/js'))
});
```

### .on('Error')
Some plugins are a better structured with their own `.on('error')` methods

```js
gulp.task('templates', function() {
  return gulp.src('./app/jade/*.jade')
    .pipe(jade({pretty: true})
      .on('error', jade.logError))
    .pipe(gulp.dest('./app'))
});
```

### swallowError
A better general solutions is to create a function to *Swallow* any errors and print them to the console.

```js
function swallowError (error) {
  console.log(error.toString());
  this.emit('end');
}
```

## Asynchronous

`return` before `gulp.src()` indicates that the task returns a stream so it's **Asynchronous**.

```js
gulp.task('templates', function() {
  return gulp.src('*.jade')
    // .pipe(jade({pretty: true})
    //   .on('error', jade.logError))
    // .pipe(gulp.dest('./app'))
});
```

## Gulp + Bower
Use main-bower-files It grabs all production (main) files of your Bower packages defined in your project's bower.json
- [stackoverflow - integrating bower with gulp](http://stackoverflow.com/questions/22901726/how-can-i-integrate-bower-with-gulp-js)
- [Build automation gulpjs](http://www.pluralsight.com/courses/javascript-build-automation-gulpjs)

```js
// Bower (+uglify +rename)
gulp.task('bower', function() {
Filters
  var jsFilter = gulpFilter('*.js');
  var cssFilter = gulpFilter('*.css');
  var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);
app/bower.json
  return gulp.src(mainBowerFiles({ paths: 'app' }))
  Only if bower.json has been modified
    //.pipe(newer('app/bower.json'))

  JavaScript (+uglify +concat)
    .pipe(jsFilter)
    .pipe(uglify())
    //.pipe(concat('vendor.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(jsFilter.restore())

  CSS (+minifycss +concat)
    .pipe(cssFilter)
    .pipe(minifycss())
    //.pipe(concat('vendor.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(cssFilter.restore())

  Fonts
    .pipe(fontFilter)
    .pipe(flatten())
    .pipe(gulp.dest('build/fonts'));
});
```

## Creating our own flags
Define your plugins here, make sure you have `gulp-util`
[Example](https://gist.github.com/markgoodyear/9100177)

```js
var gutil = require('gulp-util');
var gulpif = require('gulp-if');

// Define dev CLI flag
var isDev = gutil.env.dev;

gulp.task('scripts', function() {
  return gulp.src('src/scripts/*/**.js')
      .pipe(concat('main.js'))
      // If we use the `--dev` flag, uglify will not take place.
      .pipe(gulpif(!isDev, uglify()))
      .pipe(gulp.dest('dist/scripts'));
});

```
