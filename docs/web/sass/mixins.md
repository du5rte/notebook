# Sass - Mixins

## Mixins
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


## Parameters
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

## Content
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
