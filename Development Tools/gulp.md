# Gulp

Resources:
- [Joel Longie - Gulp.js Build System](https://www.youtube.com/watch?v=LmdT2zhFmn4&list=PLv1YUP7gO_viROuRcGsDCNM-FUVgMYb_G)
- [LevelUpTuts - Learning Gulp](https://youtu.be/wNlEK8qrb0M?list=PLhIIfyPeWUjoySSdufaqfaSLeQDmCCY3Q)

## Installing
```sh
$ npm install -g gulp
$ npm install gulp --save-dev
# gulp 4
$ npm i -D gulpjs/gulp.git#4.0
# Create a empty `gulpfile.js`
$ touch gulpfile.js
```
## Gulp Structure
A typical Gulp file has 4 separate components

## 1. Required Modules
This is where we define our dependencies

```js
var gulp = require('gulp');
var uglify = require('gulp-uglify');
```


## 2. Tasks
Then we define tasks from compressing static images to copying files to deployment build.
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

## Handling Erros
Gulp will just crash when errors happen but there's a few ways to prevent that

### gulp-plumber
Catches errors and prints in to the console so gulp doesn't crash

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

## Custom Flags
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

## Gulp 4
[installing Gulp 4 before it's released](https://demisx.github.io/gulp4/2015/01/15/install-gulp4.html)

Installing
```sh
# uninstall the global gulp command line interface
$ npm uninstall gulp-cli -g
# and project dependency
$ npm uninstall gulp

# install Gulp 4 CLI tools globally from 4.0 GitHub branch
$ npm install gulpjs/gulp-cli#4.0 -g
# install Gulp 4 into your project
$ npm install gulpjs/gulp.git#4.0 --save-dev
```

New Commands
```js
// runs tasks async
gulp.parallel()
// runs tasks sync
gulp.series()
```
