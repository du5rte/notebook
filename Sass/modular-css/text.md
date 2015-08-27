# Modular CSS with Sass

## The Project Config File

We put all our `variables` and `maps` within the `_config.scss` file

Typography
```scss
// Font Stacks
$font-url--google        : 'http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900';
$font-family--primary    : 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
$font-family--secondary  : 'Helvetica Neue', Helvetica, Arial, sans-serif;

```
Imports a Google Fonts if the variable `$font-url--google` is defined
```scss
@if variable-exists(font-url--google) {
  @import url($font-url--google);
}
```

```scss
// Font Weights
$font-weight--thin       : 100;
$font-weight--light      : 300;
$font-weight--medium     : 400;
$font-weight--bold       : 700;
$font-weight--ultra-bold : 900;
```

```scss
// Text
$base__font-size : 16px;
$base__line      : 24px;
```
## Headlines

```scss
.headline {
  font-size: 42px
  font-family: san-serif;
  color: grey;
  font-weight: 400;
  margin-bottom: 24px;
  &-primary {
    @extend .headline;
    color: black;
    margin-bottom; 42px;
    &--grouped {
      margin-bottom: 0;
    }
  }
  &-secondary {
    @extend .headline;
    color: grey;
    &--grouped {
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }
}
```
```scss
h1 {
  @extend .headline-primary;
}
h2 {
  @extend .headline-secondary;
}
```
Now we can use them both as `classes` or html `tags`

```xml
<!-- Same result -->
<h1>Hello World</h1>
<h4 class="headline-primary">Hello World</h4>

```

```css
p {}
blockquote {}

```
