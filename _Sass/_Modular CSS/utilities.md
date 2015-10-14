# Modular CSS with Sass

## Utilities





```
@mixin bg-image($file, $w, $h, $disp: block) {
	background-image: url('#{$path--images}/#{$file}');
	background-repeat: no-repeat;
	width: $w;
	height: $h;
	display: $disp;
}
```
```scss
.site-logo {
  @include bg-image("logo.svg", 115px, 45px, inline-block);
}
```
