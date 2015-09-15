# Unit Testing Sass

- [Creating Sass Tests - sitepoint](http://www.sitepoint.com/creating-tests-sass-framework/)

```sh
$ npm install sass-true
$ npm install gulp-mocha
```

test_sass.js
```js
var path = require('path');
var truely = require('sass-true');

var sassFile = path.join(__dirname, 'tests.scss');
truely.runSass({file: sassFile}, describe, it);
```

```scss
@import "true";

// Import the project
@mixin color($color) {
  color: $color;
}

// Import the test files

// - test-module: the module (or unit) of code that you are testing; in this case, the type-scale function
@include test-module('Utilities') {

  // Testing Function
  @include test('@function em()') {
    $tests: (24, 16px);
    $units: ('unitless', 'px');
    $expections: (1.5em, 1em);

    @for $index from 1 through length($tests) {
      $test: em(nth($tests, $index));
      $unit: nth($units, $index);
      $expected: nth($expections, $index);

      // assert-true($value) expectes truthy value
      // assert-false($value) expectes falsy, e.g. null or false
      // assert-equal($assert, $expected) expected equal values
      // assert-unequal($assert, $expected) expected unequal values
      @include assert-equal($test, $expected, 'Works with #{$unit}');
    }
  }

  // Testing Mixins
  // - test: a specification or assumption about the unit being tested
  @include test('Font Size [mixin]') {
    // - assertion: the assertion that the actual value meets the expected value.
    @include assert('Outputs a font size and line height based on keyword.') {
      @include input {
        @include color(red);
      }

      @include expect {
        color: red;
      }
    }
  }

}

// Run the tests
// Optionally show summary report in CSS and/or the command line:
// - If you use Mocha, reporting to the command line is automatic.
// - if you use true-cli, report(terminal) is required for output.
@include report();
```
