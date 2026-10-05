# Sass - Extends

Resources:
 - [Cross-Media Query @extend](http://www.sitepoint.com/cross-media-query-extend-sass/)

## Extends
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
