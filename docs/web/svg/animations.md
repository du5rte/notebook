# SVG - Animations

Resources
- [Snap.svg](http://snapsvg.io)
- [Sara Soueidan](https://www.youtube.com/watch?v=lf7L8X6ZBu8)
- [SVG attributes we can style with CSS](http://www.w3.org/TR/SVG/propidx.html)

## SMIL
Synchronized Multimedia Integration Language, is SVG built-in animation syntax, unfortunately IE doesn't support it and Chrome is Deprecating it.

## CSS Animating
`transform` handles SVG differently. In `html` elements the axis is in the middle `(50%,50%)`, but with `svg` the axis in the top left corner of the svg canvas `(0,0)`. To fix this we can use `transform-origin`. [https://bugzilla.mozilla.org/show_bug.cgi?id=891074](transform origin bug in firefox)
```css
.logo {
  transform-origin: 50% 50%;
  /* firefox bug solution, cx="200" cy="50" */
  transform-origin: 200px 50px;
  transform: rotate(180deg);
  transition: rotation .8s;
}
```

## JavaScript Animating
JavaScript offers more control over animation, but is more complex than animating with CSS.

Libraries
- Snap.svg
- Velocity.js
- GSAP (GreenSock Animation Platform)

## Animating stroke-dasharray and stroke-dashoffset
Using `stroke-dasharray` and `stroke-dashoffset` we can create the illusion of path drawing, by making the dasharray the size of the line and then animating the offset. [How SVG Line Animation Works](https://css-tricks.com/svg-line-animation-works/)

```css
.logo {
  /* sets an dash the size of the linepath */
  stroke-dasharray: 455;
  animation: dashOffset 3s linear infinite;
}
@keyframes dashOffset {
  /* offsets the dash by the same amount */
  0% {stroke-dashoffset: 455;}
  100% {stroke-dashoffset: 0;}
}
```

Could also be done with JavaScript. [Animated line drawing in SVG](https://jakearchibald.com/2013/animated-line-drawing-svg/)
```js
var path = document.querySelector('.logo');
var length = path.getTotalLength(); // 420.27581787109375
```
