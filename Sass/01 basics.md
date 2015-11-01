# Sass Basics

Resources:
- [Sass documentation](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)
- [Sass in the Real World](https://www.gitbook.com/book/anotheruiguy/sassintherealworld_book-i/details)
- [Sassmeister](http://sassmeister.com)
- [Compass](http://compass-style.org/)
- [Bourbon](http://compass-style.org/)
- [Susy Grids](http://susy.oddbird.net/)

## Installing
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

## CLI

```sh
# Reads the file test.scss
$ sass test.scss
# Watches the files (the dot means right here)
$ sass --watch .
# Will list help options
$ sass --help
```

## Variables
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

## Maths
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

## Introspection
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

## Nesting
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

#### Parent Nesting
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

#### Child Nesting
Ancestor selector is used to targets only direct children
```scss
.blog {
  > h1 {color: blue;}
}
```
```css
.blog > h1 {color: blue;}
```


#### Media Queries
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

#### Keyframes
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

## Import
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

## Scoping
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
