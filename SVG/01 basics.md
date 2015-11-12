# SVG - Basics

Resources:
- [CSS-Tricks](https://css-tricks.com/using-svg/)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG)
- [Probably Don’t Base64 SVG](https://css-tricks.com/probably-dont-base64-svg/)
- [SVGOMG](http://jakearchibald.github.io/svgomg/)

## SVG
SVG (Scalable Vector Graphics) is an XML markup language that is capable of creating images using vectors.


## As Images
The easiest way to use svg images is as a `<img>` element.

```html
<img src="img/logo.svg" alt="logo">
```

or as a `background-image` style
```html
<div class="logo"></div>
```
```css
.logo {
  height: 200px;
  background-image: transparent url('../img/logo.svg') center center no-repeat;
}
```

## Embedded
By embedding it in the `html` markup we can style and animate svg with css

```html
<html>
  <bod>

    <svg version="1.1" class="logo__wrapper" x="0px" y="0px" viewBox="0 0 208 208"xml:space="preserve">
      <!-- elements can be grouped together using the `<g>` tag -->
      <g class="logo">
        <!-- ... -->
      </g>
    </svg>

  </body>
</html>
```
```css
.logo:hover {
  fill: steelblue;
  stroke-width: 6;
  transition: fill 0.3s;
}
```

## URIs
You can use data URIs for SVG too. nice way of including a resource that would have otherwise been a separate HTTP request.

```html
<img src='data:image/svg+xml;utf8,<svg ... > ... </svg>'>
```
```css
.bg {
  background: url('data:image/svg+xml;utf8,<svg ...> ... </svg>');
}
```
