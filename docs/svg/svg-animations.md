---
title: "SVG - Animations"
type: doc
created: 2015-11-01
updated: 2026-10-07
tags: [svg]
---
# SVG - Animations

Inline SVG shapes are elements in the page, so you can animate them like any other element: a logo that draws itself, an icon that spins while loading, a checkmark that pops in after an order. Most of the time plain [[docs/css/css-animations|CSS animations]] are all you need. In this lesson we start with CSS, fix the one gotcha that trips everyone up, then build the classic line-drawing effect.

## Three ways to animate

| Way | Good for | Verdict |
|-----|----------|---------|
| CSS transitions and keyframes | hovers, loaders, simple entrances | ✅ start here |
| JavaScript (Web Animations API, or a library like GSAP) | timelines, scroll or user-driven motion | ✅ when CSS gets awkward |
| SMIL (`<animate>` inside the SVG) | animation that must live inside a standalone `.svg` file | ⚠️ works, but rarely needed |

SMIL is SVG's own built-in animation syntax. It once looked like it was on its way out, but current browsers support it. CSS and JavaScript are more familiar and easier to control, so most people use those.

## Animating with CSS

Give the shape a class and animate it like HTML. Remember the SVG must be inline for page CSS to reach it.

```html
<svg viewBox="0 0 100 100" width="80">
  <circle class="dot" cx="50" cy="50" r="20" fill="sienna" />
</svg>
```

```css
.dot {
  transition: fill 0.3s;
}
.dot:hover {
  fill: gold;
}
```

You can animate presentation properties like `fill`, `stroke`, `opacity` and `stroke-width` in CSS, plus `transform`. Some geometry attributes such as `r`, `cx` and `cy` also work as CSS properties in current browsers.

## The transform-origin gotcha

On an HTML element, `rotate` spins around its centre. On an SVG shape it spins around the top left corner of the whole SVG, `(0, 0)`. So your spinner swings across the canvas instead of turning in place.

```css
/* ❌ spins around the SVG's top left corner */
.spinner {
  animation: spin 1s linear infinite;
}

/* ✅ spins around its own centre */
.spinner {
  transform-box: fill-box;
  transform-origin: center;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

`transform-box: fill-box` makes percentages and `center` refer to the shape's own box instead of the whole SVG.

## Drawing a line

This is the effect everyone wants: a path that looks like it's being drawn. It uses two stroke properties.

- `stroke-dasharray` turns the stroke into dashes and gaps of a given length.
- `stroke-dashoffset` slides those dashes along the path.

The trick: make one dash as long as the whole path, then slide it out of view and back in.

```html
<svg viewBox="0 0 120 60" width="240">
  <path class="draw" pathLength="1" d="M10,30 Q60,-10 110,30" fill="none" stroke="black" stroke-width="4" />
</svg>
```

```css
.draw {
  stroke-dasharray: 1;      /* one dash the full length of the path */
  stroke-dashoffset: 1;     /* slid fully out of view */
  animation: draw 2s ease forwards;
}

@keyframes draw {
  to { stroke-dashoffset: 0; } /* slide it into place */
}
```

`pathLength="1"` tells the browser to treat the path as 1 unit long, whatever its real length. That's why `1` works in the CSS. Without it, you need the real length from JavaScript:

```js
const path = document.querySelector('.draw')
path.getTotalLength() // 125.3 (in viewBox units)
```

## Animating with JavaScript

For anything you'd describe as a timeline ("this, then that, then those three together"), JavaScript is easier. The browser's built-in Web Animations API uses the same ideas as CSS keyframes.

```js
const check = document.querySelector('.check')

document.querySelector('form').addEventListener('submit', () => {
  check.animate(
    [{ transform: 'scale(0)' }, { transform: 'scale(1)' }],
    { duration: 300, easing: 'ease-out' },
  )
})
```

For complex sequences or morphing shapes, a library like GSAP saves a lot of work. Reach for it when you feel yourself fighting the timing by hand.

## Respect reduced motion

Some people get dizzy or distracted by motion and turn it down in their system settings. Honour it.

```css
@media (prefers-reduced-motion: reduce) {
  .spinner,
  .draw {
    animation: none;
  }
}
```

## Common mistakes

- Animating an SVG loaded with `<img>`. Page CSS can't reach inside it. Inline it.
- Forgetting `transform-box: fill-box`, so rotations and scales happen from the wrong point.
- A line-drawing effect on a shape with a `fill`, so the inside shows straight away. Use `fill="none"`.
- Ignoring `prefers-reduced-motion`.

## Try it

1. Make a loading spinner from one `circle` with a dashed stroke, and spin it in place.
2. Draw your signature (or a wavy line) with the `pathLength` trick.
3. Turn the animations off under `prefers-reduced-motion` and test it in DevTools' rendering settings.

## Related

- [[docs/svg/svg|SVG - Basics]]
- [[docs/svg/svg-elements|SVG - Elements]]
- [[docs/css/css-animations|CSS - Animations]]
- [[docs/css/css-transform-transitions|CSS - Transitions and Transforms]]
