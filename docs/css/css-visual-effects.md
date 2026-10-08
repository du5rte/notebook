---
title: "CSS - Visual Effects"
type: doc
created: 2020-04-11
updated: 2026-10-07
aliases: ["CSS - Other Features"]
tags: [css]
---
# CSS - Visual Effects

Once the layout works, these are the properties that give a page its look: backgrounds, gradients, rounded corners, shadows, filters and masks. They used to need images exported from Photoshop and a pile of vendor prefixes. Now they are one line of CSS each.

## Background colour and image

```css
.hero {
  background-color: #7eb5c9;               /* shows while the image loads, or if it fails */
  background-image: url("img/coffee.jpg");
  background-size: cover;                  /* fill the box, crop what doesn't fit */
  background-position: center;
  background-repeat: no-repeat;
}
```

Always set a background colour behind an image, especially with light text on top.

If an image is content (a product photo, a chart), use `<img>` with `alt` text instead. Backgrounds are for decoration.

## cover vs contain

| | `cover` | `contain` |
| --- | --- | --- |
| Fills the whole box | ✅ | ❌ may leave gaps |
| Shows the whole image | ❌ may crop | ✅ |
| Use for | hero banners | logos, illustrations |

The same idea works on `<img>` with `object-fit: cover`.

## The background shorthand

Order is flexible, but size must follow position after a `/`.

```css
.hero { background: #7eb5c9 url("img/coffee.jpg") center / cover no-repeat; }
```

## Multiple backgrounds

Comma-separated layers. The first one is on top.

```css
.hero {
  background:
    linear-gradient(rgb(0 0 0 / 0.5), transparent), /* dark fade for readable text */
    url("img/coffee.jpg") center / cover;
}
```

## Linear gradients

A gradient is an image the browser draws for you.

```css
.a { background: linear-gradient(orange, darkblue); }         /* top to bottom */
.b { background: linear-gradient(to right, orange, darkblue); }
.c { background: linear-gradient(135deg, orange, darkblue); }
```

**Colour stops** set where each colour sits. Two stops at the same position make a hard edge:

```css
.flag { background: linear-gradient(to right, green 50%, red 50%); } /* two solid halves */
```

## Radial and conic gradients

```css
.glow  { background: radial-gradient(circle at top, orange, darkblue); }
.chart { background: conic-gradient(tomato 0 40%, gold 40% 70%, teal 70%); } /* a pie chart */
```

## Repeating gradients

Repeat a short gradient to make patterns, like stripes:

```css
.stripes {
  background: repeating-linear-gradient(
    -45deg,
    rgb(58 122 187 / 0.8) 0 10px,
    rgb(43 79 115) 10px 20px
  ); /* diagonal stripes, 10px each */
}
```

## border-radius

```css
.card   { border-radius: 0.75rem; }   /* all corners */
.tab    { border-radius: 1rem 1rem 0 0; } /* top-left, top-right, bottom-right, bottom-left */
.avatar { border-radius: 50%; }       /* a circle, if the box is square */
.pill   { border-radius: 999px; }     /* fully round ends at any width */
```

## box-shadow

`x y blur spread colour`, with an optional `inset` for an inner shadow.

```css
.card { box-shadow: 0 10px 30px -10px rgb(0 0 0 / 0.3); }
```

Negative spread keeps the shadow under the card instead of around it. Stack several for more realistic depth:

```css
.card {
  box-shadow:
    0 1px 2px rgb(0 0 0 / 0.1),
    0 8px 24px rgb(0 0 0 / 0.1);
}
```

## Filters

`filter` applies photo-style effects to an element. `backdrop-filter` applies them to whatever is **behind** it, for frosted glass.

```css
.thumbnail:hover { filter: grayscale(1); }
.navbar {
  background: rgb(255 255 255 / 0.7);
  backdrop-filter: blur(8px); /* frosted glass */
}
```

## Blending and masks

`mix-blend-mode` blends an element with what's below it, like layer modes in Photoshop. `mask-image` hides parts of an element: where the mask is transparent, the element is invisible.

```css
.title { mix-blend-mode: multiply; }
.fade-out {
  mask-image: linear-gradient(black 70%, transparent); /* fades out at the bottom */
}
```

## Interaction helpers

```css
.button        { cursor: pointer; }       /* the hand icon */
.overlay       { pointer-events: none; }  /* clicks pass straight through */
.drag-handle   { user-select: none; }     /* text can't be selected */
```

MDN has the full list of `cursor` values: <https://developer.mozilla.org/en-US/docs/Web/CSS/cursor>

## Common mistakes

- Light text on a background image with no colour fallback or overlay. Unreadable while it loads.
- Decorative images as `<img>`, or important images as backgrounds.
- `border-radius: 50%` on a rectangle gives an ellipse, not a pill. Use a large fixed radius.
- Copying old `-webkit-` gradient and mask syntax. The plain properties work everywhere now.

## Try it

1. Build a hero banner with a photo, a dark gradient overlay and readable white text.
2. Make a pill-shaped "Add to order" button with a soft shadow that grows on hover.
3. Draw a three-slice pie chart with `conic-gradient`.

## Related
- [[docs/css/css|CSS - Basics]]
- [[docs/css/css-values|CSS - Values and Units]]
- [[docs/css/css-transform-transitions|CSS - Transitions and Transforms]]
