---
title: "Sass"
type: doc
created: 2015-11-01
updated: 2015-11-01
tags: [sass]
---
# Sass

## Sass Basics

Resources:
- [Sass documentation](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)
- [Sass in the Real World](https://www.gitbook.com/book/anotheruiguy/sassintherealworld_book-i/details)
- [Sassmeister](http://sassmeister.com)
- [Compass](http://compass-style.org/)
- [Bourbon](http://compass-style.org/)
- [Susy Grids](http://susy.oddbird.net/)

### Installing
Sass already comes installed in macs but it should be updated

Gem Sass
```sh
$ sudo gem instal sass
$ sass --version
```

Node Sass
```sh
$ npm install node-sass
```

### CLI

```sh
# Reads the file test.scss
$ sass test.scss
# Watches the files (the dot means right here)
$ sass --watch .
# Will list help options
$ sass --help
```

### Variables
Are placeholders for a value, variables are defined by a `$`
Example:

```scss
$primary-color: light_blue;
$primary-color: #d35050;
$margin: 5px;
```

 variables can point to other variables values
```scss
$padding: $margin;
```

### Maths
We can do inline math using variables

```scss
padding: $margin * 1.5; // multiplication
padding: $margin / 1.5; // division
padding: $margin + 1.5; // addition
padding: $margin - 1.5; // subtraction
```

Sass automatically converts different units
```scss
$padding: $margin + 2pt;
```

Random Function
```scss
$padding: random() + em; // 0.88808343em
```

### Introspection
Works as placeholder `#{ }` to be used within selectors, parameters or strings

```scss
$color: lime;

.#{$color} {
  color: $color;
  background-image: url('images/#{$color}-bg.jpg');
}
```
```css
.blue {
  color: lime;
  background-image: url("images/lime-bg.jpg");
}
 ```

### Nesting
Selectors with the same parent can be nested and sass breaks it down into plain css.

```scss
.blog .entry {
  h1 {font-size: 3em;}
  p {color: #ccc;}
}
 ```
```css
.blog .entry h1 {font-size: 3em;}
.blog .entry p {color: #ccc;}
 ```

##### Parent Nesting
Ampersand `&` works as a `parent` selector, used to create nested `child` or `sibling` selectors and even reversing the order of nesting/

 ```scss
 .box {
   color: orange;
   &es {color: blue;}
   &:hover {color: red;}
   &.is-selected {color: green;}
   .no-touch & {color: purple;}
 }
 ```
 ```css
.box {color: orange;}
.boxes {color: blue;}
.box:hover {color: red;}
.box.is-selected {color: green;}
/* Modernizr conditional styles */
.no-touch .box {color: purple;}
```

##### Child Nesting
Ancestor selector is used to targets only direct children
```scss
.blog {
  > h1 {color: blue;}
}
```
```css
.blog > h1 {color: blue;}
```


##### Media Queries
Media can be nested as inside selectors, and sass reverts the nesting order.
```scss
.content {
  @media (max-width: 480px) {display:none;}
}
```
```css
@media (max-width: 480px) {
  .content {display: none;}
}
```

##### Keyframes
Same for keyframes
```scss
.box {
  height: 300px;
  width: 300px;
  animation: colorSwap 1s alternate infinite;

  @keyframes colorSwap {
    from { background: blue; }
    to { background: red; }
  }
}
```
```css
.box {
  height: 300px;
  width: 300px;
  animation: colorSwap 1s alternate infinite;
}
@keyframes colorSwap {
  from {
    background: blue;
  }
  to {
    background: red;
  }
}
```

### Import
Makes writing Sass more modular by separating stylesheets and using libraries.
```scss
@import "main.scss";
```

prefixing file names with `_` lets sass know not to compile it.
```scss
@import '_example.scss';
```

Importing libraries
```scss
@import 'bourbon/_bourbon.scss';
```

### Scoping
Inside each selector or mixins variables can be created that only affect those scopes

```scss
$text-color: blue;

.error {
  // inside scope variable
  $text-color: red;
  color: $text-color; // red
}

.normal {
  // global scope variable
  color: $text-color; // blue
}

.success {
  // changes the global variable
  $text-color: green !global;
  color: $text-color; // green
}
```

Variables can be redefined from within scopes using the `!global` flag
```scss
$color: yellow;

@mixin colorText($color) {
  $color: $color !global;
  color: $color;
}

p {
  @include colorText(blue); // blue
  background: $color; // blue
}
```

Or optionally defined using the `!default` flag
```scss
$color: yellow;
$color: purple !default; // yellow
```
```scss
$color: purple !default; // purple
```

## Sass - Directives

### Directives
With them we can work with complex multiple assignments using `conditionals`, `loops`, `errors`, and more.

### Conditionals
Create conditionals loops with `@if`, `@else if` and `@else`

```scss
@mixin box($width) {
	// if width is bigger than 100px do nothing
	@if $width > 100px {
		padding: 0px;
	// else if padding is 100px, padding = 5px
	} @else if $width == 100px {
		padding: 5px;
		// we can even add classes to it
		.big {content: "huge!";}
	// otherwise padding = 10px
	} @else {
		padding: 10px;
	}
}
```

SassScript also supports `and`, `or`, `not` operators.
```scss
@if $var1 == value1 and $var2 == value2 {}
```

Parentheses can be used to affect the order of operations in a more complicated expression:
```scss
@if ($var1 == value1 and not ($var2 == value2)) or ($var3 == value3) {}
```

### Each
Loops through lists keys using `@each $key in $list`

```scss
@each $member in thom, jonny, colin, phil {
  .bandmember.#{$member} {
    background: url("image/#{$member}.jpg");
  }
}
```

```scss
$icon-names: (strategy '\e002') (twitter '\e003') (github '\e004');

@each $icon-name in $icon-names {
  .icon-#{nth($icon-name, 1)}:after {
    content: nth($icon-name, 2);
  }
}
```

Or through list maps using multiple `keys`
```scss
@each $name, $pua in $icon-names {
  .icon-#{$name}:after {
    content: $pua;
  }
}
```

### For
Iterates through lists `through` the final value or `to` but not including the final value. The values can be changed to reversed the order.

Generates a white to black gradients using 100 box elements
```scss
@for $i from 1 through 100 {
  .box:nth-child(#{$i}) {
    background: darken(white, $i);
  }
}
```
```css
.span-1 {width: 25%;}
.span-2 {width: 50%;}
/* ... */
```


```scss
@mixin spans($cols) {

  @for $i from 1 through length($cols) {
    .span-#{nth($cols, $i)} {
      width: percentage(( 1 / length($cols)) * $i);
    }
  }

}
```
```scss
@include spans(1 2 3 4);
```
```css
.span-1 {width: 25%;}
.span-2 {width: 50%;}
/* ... */
```
```scss
@include spans(one two three four);
```
```css
.span-one {width: 25%;}
.span-two {width: 50%;}
/* ... */
```
```scss
@include spans(john paul erin sarah);
```
```css
.span-john {width: 25%;}
.span-paul {width: 50%;}
/* ... */
```


### Errors & Warnings
`@error` and `@warn` output a messages to the console. Useful to test mixins and functions.

Error
```scss
@if not variable-exists(foo) {
  @error "Variable foo is missing, check your code.";
}
```

Warning
```scss
@if mixin-exists(bar) {
  @warn "Mixin bar has been deprecated please used the new mixin baz";
}
```

### At Root
`@at-root`

```scss
.box {
  @media (min-width: 400px) {
    display: flex;

    @at-root {
      .inline {
        display: inline-block;
      }
    }

    @at-root(without:media) {
      .inline {
        display: inline-block;
      }
    }

    @at-root(without:rule) {
      .inline {
        display: inline-block;
      }
    }

    @at-root(without:rule media) {
      .inline {
        display: inline-block;
      }
    }

    @at-root(with:rule media) {
      &--inline {
        display: inline-block;
      }
    }

  }
}
```
```css
@media (min-width: 400px) {
  .box {
    display: flex;
  }
  .inline {
    display: inline-block;
  }
}
.box .inline {
  display: inline-block;
}
@media (min-width: 400px) {
  .inline {
    display: inline-block;
  }
}
.inline {
  display: inline-block;
}
@media (min-width: 400px) {
  .box--inline {
    display: inline-block;
  }
}
```

## Sass - Extends

Resources:
 - [Cross-Media Query @extend](http://www.sitepoint.com/cross-media-query-extend-sass/)

### Extends
Merges styles in Groups Selectors, `@extend` works better with Placeholder Selectors `%`, which are invisilbe until called

```scss
h1 {
  font-size: 3.83333em;
  font-family: "Helvetica Neue", Arial, san-serif;
  text-transform: uppercase;
}

h2 {
  @extend h1;
  font-size: 2.66667;
}

.large-copy {
  @extend h1;
}
```
```css
/* selectors groupped */
h1, h2, .large-copy {
  font-size: 3.83333em;
  font-family: "Helvetica Neue", Arial, san-serif;
  text-transform: uppercase;
}

h2 {
  font-size: 2.66667;
}
```

using normal selector can result in this bug
```scss
.foo {
  border: 1px solid red;
  h1 {
    color: white;
  }
}
```
```css
.foo h1, .foo h2, .foo .large-copy {
  color: white;
}
```

It's best practice to use placeholders
```scss
%main-header {
  font-size: 3.83333em;
  font-family: "Helvetica Neue", Arial, san-serif;
  text-transform: uppercase;
}
```

Extends can be nested
```scss
%foo {
  color: orange;
  %bar {
    color: blue;
    %rap {
      color: red;
    }
  }
}

.block {
  @extend %foo;
  &__element {
    @extend %bar;
    &--modifier {
      @extend %rap;
    }
  }
}
```
```css
.block {
  color: orange;
}

.block .block__element {
  color: blue;
}

.block .block__element .block__element--modifier {
  color: red;
}
```

but can lead to problems if you break the pattern
```scss
.anotherblock {
  @extend %foo;
  // skipping `element`
  &--modifier {
    @extend %rap;
  }
}
```
```css
.block .block__element .block__element--modifier, .anotherblock .block__element .block__element--modifier, .block .block__element .anotherblock--modifier, .anotherblock .block__element .anotherblock--modifier {
  color: red;
}
```

Best to use unnested extends
```scss
.block {
  @extend %foo;
  &__element {
    @extend %bar;
    &--modifier {
      @extend %rap;
    }
  }
}
```
```css
.block__element--modifier, .anotherblock--modifier {
  color: red;
}
```

## Sass - Functions

Resources:
- [Sass functions](http://sass-lang.com/documentation/Sass/Script/Functions.html)

### Functions
Unlike mixins `@functions` don't return any css output but `@return` a value.

```scss
@function percentage-to-number($val) {
  @return $val / 100;
}
```

Functions can be used inside `functions` as well `mixins`
```scss
@function set-opacity($color) {
  $lightness: lightness($color);
  $lightness-number: percentage-to-number($lightness);
  $trans-value: transparentize($color, $lightness-number);
  @return $trans-value;
}
```

Functions are a good way to dissect the complexity of mixins

```scss
@mixin the-grid($count, $context: 12, $width: 16, $gutter: 20) {
  $grid-width: ($count - 1) * $gutter + ($count * $width);
  $context-width: $context * ($width + $gutter);
  width: percentage($grid-width / $context-width);
}
```
```scss
@function grid-width($count, $gutter, $width) {
  @return ($count - 1) * $gutter + ($count * $width);
}

@function context-width($context, $width, $gutter) {
  @return $context * ($width + $gutter);
}

@mixin the-grid($count, $context: 12, $width: 16, $gutter: 20) {
  $grid-width: grid-width($count, $gutter, $width);
  $context-width: context-width($context, $width, $gutter);
  width: percentage($grid-width / $context-width);
}
```


### Color Functions
Sass contains useful color functions to create dynamic color palettes

```scss
desaturate($color, 10%)     // desaturates color by 10%
complement($color)          // picks opposite color on the wheel
mix($color1, $color2)       // mixes different colors
lighten($color, 20%)        // lightens the color by 20%
darken($color, 30%)         // darkens the color by 30%
transparentize($color, 0.5) // transparentizes the color by half
```

### String Functions

```scss
$words: 'More words';
$list: 'this is a string of words', $words, 'and even more words';
```
```scss
length($lists)                            // length of the $list array: 3
nth($lists, 1)                            // $list first key: "this is a string of words"
str-length($words)                        // string length of $words: 10
str-length(nth($list, 1))                 // length of the first string: 25
to-upper-case($words)                     // string to uppercase: "MORE WORDS"
to-lower-case($words)                     // string to lowercase: "more words"
str-insert($words, 'awesome ', 6)         // insert a string in $words: "More awesome Words"
str-index(to-lower-case($words), 'words') // searched for 'words' in $words, returns position: 6
```

### Random
Works just like JavaScript, generates a random number between 0 ~ 1.

```scss
.block {
  color: rgb(random(255), random(255), random(255));
  background: rgba(random(255), random(255), random(255), random(10) * 0.1);
}
```

### Validators
Sass can test for variables, functions, mixins and evalute strings and units.

If a variable exists
```scss
.block {
  $color: green;
  @if variable-exists(color) { color: $color; }
}
```

If a global variable exists
```scss
$color: red;
.block {
  // or $color: red !global;
  @if global-variable-exists(color) { color: $color; }
}
```

If a function exists
```scss
@if not function-exists(foo) {
  @error "function foo does not exist";
}
```

If a mixin exists
```scss
@if not mixin-exists(bar) {
  @error "Mixin bar does not exist";
}
```

Inspect for value type
```scss
$number: 2.3em;
$boolean: true;
$string: 'Hello';
$color: #ccc;
```
```scss
type-of($number)  // number
type-of($boolean) // bool
type-of($string)  // string
type-of($color)  // color
```

Inspect for the unit(s) of a number
```scss
$ems: 2em;
$pixels: 5px;
$percents: 25%;
$inches: 1in;
```
```scss
unit($ems)      // em
unit($pixels)   // px
unit($percents) // %
unit($inches)   // in
```

Inspect if units can be operated on
```scss
comparable($ems, $ems)    // true
comparable($ems, $inches) // false
```

## Sass - List Maps


Resources:
- [Syntax for Sass Maps](http://www.sitepoint.com/using-sass-maps/)
- [Sass Script Map Functions](http://sass-lang.com/documentation/Sass/Script/Functions.html)

### Lists
Represent a list of values, like `arrays`.

```scss
$icon-names: twitter codepen github;

.icon-#{nth($icon-names, 1)}:after {
  content: nth($icon-name, 1);
}
```
```css
$icon-names: strategy twitter github;

.icon-twitter:after {
  content: twitter;
}
```

##### Nested Lists
Lists can be nested inside lists keys

```scss
$icon-names: (strategy '\e002') (twitter '\e003') (github '\e004');

.icon-#{nth(nth($icon-names, 1), 1)}:after {
  content: nth(nth($icon-names, 1), 2);
}
```
```css
.icon-twitter:after {
  content: "\e002";
}
```

### Maps
Represent keys and values, where keys are used to look up values. like `objects`.

Old Way
```scss
$gray: #333;

$colors-default-background: lighten($gray, 75%);
$colors-default-border: lighten($gray, 50%);
$colors-default-text: lighten($gray, 5%);

.button--default {
  background-color: $colors-default-background;
  border-color: $colors-default-border;
  color: $colors-default-text;
}
```

With Maps
```scss
$colors: (
  // Indented Map
  default: (
    background: lighten($gray, 75%),
    border: lighten($gray, 50%),
    text: lighten($gray, 5%)
  )
);

.button--default {
  background-color: map-get(map-get($colors, default), background);
  border-color: map-get(map-get($colors, default), border);
  color: map-get(map-get($colors, default), text);
}
```

Using a function
```scss
@function map-get-nested($map, $nested-map, $key) {
  @return map-get(map-get($map, $nested-map), $key);
}

input[disabled] {
  background-color: map-get-nested($input, disabled, background);
  border-color: map-get-nested($input, disabled, border);
  color: map-get-nested($input, disabled, text);
}
```
```css
.button--default {
  background-color: #f2f2f2;
  border-color: #b3b3b3;
  color: #404040;
}
```

Another Example
```scss
$ui-colors: (
  default : #52bab3,
  success : #5ece7f,
  error   : #e67478,
  warning : #ff784f,
  info    : #9279c3
);

@each $theme, $color in $ui-colors {
  .btn--#{$theme} {
    background-color: $color;
  }
}
```
```css
.button--default {background-color: #52bab3;}
.button--success {background-color: #5ece7f;
.button--error {background-color: #e67478;
.button--warning {background-color: #ff784f;}
.button--info {background-color: #9279c3;}
```

## Sass - Mixins

### Mixins
The most powerful feature of Sass, similar to functions but can generate `selectors` and `parameters`. Mixins are declared by `@mixin myMixin` and called by `@include myMixin`. or in **Indented Sass** `=myMixin` `+myMixin`


```scss
@mixin links {
  a {
    color: blue;
    &:clicked {color: red;}
    &:hover {color: purple;}
    &:active {color: green;}
  }
}
```
```scss
@include links;
```
```css
a {color: blue;}
a:clicked {color: red;}
a:hover {color: purple;}
a:active {color: green;}
```


### Parameters
Mixin can do more than just storing styles, they can generate dynamic styles with parameters


```scss
@mixin links($default, $clicked, $hover, $active) {
  a {
    color: $default;
    &:clicked {color: $clicked;}
    &:hover {color: $hover;}
    &:active {color: $active;}
  }
}
```
```scss
@include links(blue, red, purple, green);
```

Parameters can have a `default` value, be `null` (no output) or even equal to a `global variable`. Parameters than don't have a default value need to come first.
```scss
$active-color: red;

@mixin links($default, $hover: null, $clicked: red, $active: $active-color) {
  a {
    color: $default;
    &:clicked {color: $clicked;}
    &:hover {color: $hover;}
    &:active {color: $active;}
  }
}
```
```scss
@include links(blue);
```

Include can also be called with the variables to make it to know what they are
```scss
@include links($default: blue);
```

Or as a way to skip the parameters order.
```scss
@include links($hover: purple, $$default: blue);
```

Using `...` a list can be passed as a parameters.
```scss
@mixin band($name, $members...) {
		@each $member in $members {
		.#{$name}.#{$member} {
			background: url("image/#{$name}/#{$member}.jpg");
		}
	}
}
```
```scss
@include band(radiohead, thom, jonny, colin, phil);
```

### Content
Extend mixins by defining a point where it can pass a block of CSS rules.

```scss
@mixin pseudo($height, $width) {
  position: relative;
  &:after {
    content: '';
    display: block;
    position: absolute;
    height: $height;
    width: $width;
    @content;
  }
}
```
```scss
.box {
  height: 300px;
  width: 300px;
  background: blue;
  @include pseudo(100%, 100%) {
    left: 100%;
    background: red;
  }
}
```

## Related
- [[docs/css/css|CSS]]
- [[docs/html/html|HTML]]
- [[docs/css/css-selectors|CSS - Selectors]]
- [[docs/css/css-modular|CSS - Modular CSS]]
