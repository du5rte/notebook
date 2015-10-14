# Modular CSS with Sass

## Colors

First we define descriptive Base Colors using [chir.ag](http://chir.ag/projects/name-that-color/#6195ED) to generate color names

```scss
$white    : #fff;
$black    : #0b0b0b;
$grey     : #797e83;
```
```scss
$fountain-blue  : #52bab3;
$emerald        : #5ece7f;
$sunglo         : #e67478;
$coral          : #ff784f;
$purple-majesty : #9279c3;
$scooter        : #39add1;
```


Now we can create `$variables` for the most common used colors
```scss
$color-primary   : $fountain-blue;
$color-secondary : $scooter;
$color-accent    : $emerald;
$color-shadow    : transparentize($black, 0.2); // or rbga($black, 0.2)
```

We create a function to access our `$color-palettes` map


```scss
$color-palettes: (
  grey: (
    xx-light : lighten($grey, 43%),
    x-light  : lighten($grey, 35%),
    light    : lighten($grey, 12%),
    base     : $grey,
    dark     : darken($grey, 8%),
    x-dark   : darken($grey, 16%)
  ),
  black: (
    light    : lighten($black, 10%),
    base     : $black,
    dark     : darken($black, 10%)
  )
);
```
```scss
@function palette($palette, $shade: 'base') {
  @return map-get(map-get($color-palettes, $palette), $shade);
}
```
```scss
.example {
  background-color: palette(grey, xx-light); // lighten($grey, 43%)
}
```
For our `$ui-colors` map we'll generate different buttons
```scss
$ui-colors: (
  default : $fountain-blue,
  success : $emerald,
  error   : $sunglo,
  warning : $coral,
  info    : $purple-majesty
);
```
This mixin will generate a a list of `--classes` with `background-color`
```scss
@mixin bg-colors($map) {
  @each $theme, $color, in $map {
    &--#{$theme} {
      background-color: $color;
    }
  }
}
```
```scss
.btn {
  @include bg-colors($ui-colors);
}
```
```css
.btn--success {
  background-color: #52bab3; // fountain-blue
}
.btn--success {
  background-color: #5ece7f; // emerald
}
/* ... */
```
