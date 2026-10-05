## Sass - Directives

## Directives
With them we can work with complex multiple assignments using `conditionals`, `loops`, `errors`, and more.

## Conditionals
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

## Each
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

## For
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


## Errors & Warnings
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

## At Root
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
