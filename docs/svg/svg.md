---
title: "SVG - Basics"
type: doc
created: 2015-11-01
updated: 2026-10-07
tags: [svg]
---
# SVG - Basics

SVG (Scalable Vector Graphics) describes an image as shapes instead of pixels: "a circle here, a line there". Because it's maths, not dots, it stays sharp at any size, from a favicon to a billboard, and the file is often tiny. Reach for SVG for logos, icons, simple illustrations and charts. Photos stay as JPEG, WebP or AVIF.

## SVG vs a photo format

| | SVG | PNG / JPEG / WebP |
|---|---|---|
| Made of | shapes | pixels |
| Sharp when scaled up | ✅ | ❌ gets blurry |
| Good for | logos, icons, charts | photos |
| Style with CSS | ✅ when inline | ❌ |
| Readable as text | ✅ it's markup | ❌ |

## Your first SVG

An SVG is markup, a lot like HTML. This draws a coffee cup from two shapes.

```html
<svg viewBox="0 0 100 100" width="100" height="100">
  <rect x="20" y="30" width="50" height="60" rx="6" fill="sienna" />
  <circle cx="75" cy="55" r="12" fill="none" stroke="sienna" stroke-width="6" />
</svg>
```

The coordinates start at the top left corner, `(0, 0)`. `x` grows to the right and `y` grows **down**, not up like in maths class.

## viewBox: the coordinate system

`viewBox="minX minY width height"` sets the drawing's own coordinate system. `width` and `height` set how big it shows on the page. The browser scales one to fit the other.

```html
<!-- drawn on a 100 × 100 grid, shown at 300 × 300 pixels: everything is 3× bigger -->
<svg viewBox="0 0 100 100" width="300" height="300">…</svg>
```

Think of `viewBox` as the paper you draw on, and `width`/`height` as the frame you hang it in. Leave out `width` and `height` and give it a size with CSS instead: the SVG then scales to its container, which is what you want for responsive pages.

## Four ways to put SVG on a page

### 1. As an image

The simplest. Treat it like any other image.

```html
<img src="img/logo.svg" alt="Ana's Coffee Shop" width="120" height="40">
```

✅ cached, simple, has `alt` text. ❌ CSS on your page can't change its colours.

### 2. As a CSS background

```css
.hero {
  background: url('../img/beans.svg') center / cover no-repeat;
}
```

Good for decoration. Background images are invisible to screen readers, so never put meaning there.

### 3. Inline in the HTML

Paste the `<svg>` straight into the page. In HTML you don't need the `xmlns` or `version` attributes.

```html
<button class="like">
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="currentColor" />
  </svg>
  Like
</button>
```

✅ style and animate every shape with CSS and JavaScript. ❌ not cached separately, and it makes the HTML longer.

`fill="currentColor"` makes the icon use the text colour of its parent, so it changes colour with the button on hover. That's the trick behind most icon sets.

### 4. As a data URI

A small SVG can be written straight into a URL, saving a separate download.

```css
.dot {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Ccircle cx='5' cy='5' r='5' fill='%23c60'/%3E%3C/svg%3E");
}
```

Here `xmlns` is required, because it's a standalone file. Encode `<`, `>` and `#` (as `%3C`, `%3E` and `%23`). Don't Base64 an SVG: plain URL-encoded text is usually smaller.

### Which one?

- An image with meaning, like a logo or illustration: **`<img>`**.
- An icon you want to recolour: **inline** with `currentColor`.
- Decoration only: **CSS background**.
- A tiny repeated shape in CSS: **data URI**.

## Optimise before shipping

SVGs exported from design tools carry editor metadata, hidden layers and long decimals. Run them through an optimiser such as SVGO before you ship. Files often shrink a lot without any visible change.

## Common mistakes

- Forgetting that `y` grows downwards.
- A missing or wrong `viewBox`, so the drawing gets cropped or won't scale.
- Inline SVG with no text alternative. Decorative ones get `aria-hidden="true"`; meaningful ones need a label (see [[docs/svg/svg-elements|SVG - Elements]]).
- Forgetting `xmlns` in a standalone `.svg` file or data URI. Then it won't render.

## Try it

1. Draw the coffee cup above, then change the `viewBox` to `0 0 200 200` and see what happens.
2. Put the same icon on a page as `<img>` and inline, and try to change its colour with CSS in each case.
3. Make an inline icon with `fill="currentColor"` inside a link, and change the link colour on hover.

## Related

- [[docs/svg/svg-elements|SVG - Elements]]
- [[docs/svg/svg-animations|SVG - Animations]]
- [[docs/html/html-media|HTML - Images and Media]]
- [[docs/css/css|CSS - Basics]]
