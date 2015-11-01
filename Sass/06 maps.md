## Sass - List Maps


Resources:
- [Syntax for Sass Maps](http://www.sitepoint.com/using-sass-maps/)
- [Sass Script Map Functions](http://sass-lang.com/documentation/Sass/Script/Functions.html)

## Lists
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

#### Nested Lists
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

## Maps
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
