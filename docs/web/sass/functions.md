# Sass - Functions

Resources:
- [Sass functions](http://sass-lang.com/documentation/Sass/Script/Functions.html)

## Functions
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


## Color Functions
Sass contains useful color functions to create dynamic color palettes

```scss
desaturate($color, 10%)     // desaturates color by 10%
complement($color)          // picks opposite color on the wheel
mix($color1, $color2)       // mixes different colors
lighten($color, 20%)        // lightens the color by 20%
darken($color, 30%)         // darkens the color by 30%
transparentize($color, 0.5) // transparentizes the color by half
```

## String Functions

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

## Random
Works just like JavaScript, generates a random number between 0 ~ 1.

```scss
.block {
  color: rgb(random(255), random(255), random(255));
  background: rgba(random(255), random(255), random(255), random(10) * 0.1);
}
```

## Validators
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
