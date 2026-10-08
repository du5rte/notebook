---
title: "SVG - Elements"
type: doc
created: 2017-02-24
updated: 2026-10-07
tags: [svg]
---
# SVG - Elements

Every SVG drawing is built from a handful of shapes: rectangles, circles, lines, polygons, text and paths. Learn these and you can read any SVG file, tweak an icon by hand, or draw a simple badge without opening a design tool. In this lesson we build an "SVG" badge: a circle, a triangle, a line, some text and a few repeated decorations.

## Fill and stroke

Every shape has two paint jobs. `fill` is the inside, `stroke` is the outline.

```html
<circle cx="50" cy="50" r="40" fill="gold" stroke="black" stroke-width="4" />
```

- `fill="none"` gives you only the outline.
- The stroke is centred on the edge: half sits inside the shape, half outside.
- These attributes can also be set in CSS (`fill: gold;`), and CSS wins over the attribute.

## Rectangles

`x` and `y` set the top left corner, `width` and `height` the size. `rx` and `ry` round the corners.

```html
<svg viewBox="0 0 100 110" width="100">
  <!-- a phone: body, screen and a button -->
  <rect x="5" y="5" width="70" height="100" rx="10" fill="white" stroke="#ff2626" stroke-width="10" />
  <rect x="15" y="15" width="50" height="70" fill="#ddd" />
  <circle cx="40" cy="95" r="3" fill="#ff2626" />
</svg>
```

Shapes are painted in order: later shapes sit on top of earlier ones. There is no `z-index` in SVG.

## Circles vs ellipses

A circle has a centre (`cx`, `cy`) and one radius `r`. An ellipse has two radii: `rx` across and `ry` down.

```html
<circle cx="50" cy="50" r="40" />
<ellipse cx="50" cy="50" rx="40" ry="20" />
```

## Lines

A line goes from point `(x1, y1)` to point `(x2, y2)`. It has no inside, so it needs a `stroke` to be visible.

```html
<line x1="47" y1="198" x2="221" y2="198" stroke="black" stroke-width="5" />
```

## Polygons and polylines

`polygon` joins a list of `x,y` points and closes the shape back to the first point. `polyline` does the same but leaves it open.

```html
<!-- a triangle -->
<polygon points="52,190 134,30 216,190" fill="#008b6f" stroke="black" stroke-width="2" />

<!-- a zig-zag -->
<polyline points="0,10 10,0 20,10 30,0" fill="none" stroke="black" />
```

## Text

`<text>` places text at `x, y`. By default that point is the left end of the text's baseline. `text-anchor="middle"` centres it on that point instead.

```html
<text x="134" y="142" text-anchor="middle" font-size="60" font-weight="900" fill="#f6f7f3" stroke="black" stroke-width="3">SVG</text>
```

Text in an SVG stays real text: searchable, selectable and readable by screen readers.

## Groups and transforms

`<g>` groups shapes so you can style or move them together. Children inherit the group's `fill`, `stroke` and so on.

`transform` moves, turns and resizes:

- `translate(x, y)`: move.
- `rotate(degrees, cx, cy)`: turn around the point `(cx, cy)`. Without it, around `(0, 0)`.
- `scale(amount)`: resize.

```html
<g fill="#59bfc6" stroke="black" transform="translate(45, 67) rotate(10, 12.5, 12.5)">
  <!-- these points are now measured from the group's new origin -->
  <polygon points="7,10 12,0 17,10" />
  <polygon points="0,25 5,15 10,25" />
  <polygon points="15,25 20,15 25,25" />
</g>
```

Transforms apply from right to left: here the group is rotated first, then moved.

## Reuse with symbol and use

`<symbol>` defines a drawing without showing it. `<use>` stamps a copy wherever you need it. Draw once, use many times.

```html
<symbol id="triangles" viewBox="0 0 25 25">
  <polygon points="7,10 12,0 17,10" />
  <polygon points="0,25 5,15 10,25" />
  <polygon points="15,25 20,15 25,25" />
</symbol>

<use href="#triangles" x="45" y="67" width="25" height="25" fill="#59bfc6" />
<use href="#triangles" x="198" y="67" width="25" height="25" fill="#59bfc6" />
```

```html
<!-- ❌ old: needs the xlink namespace -->
<use xlink:href="#triangles" />
<!-- ✅ now: plain href works in all current browsers -->
<use href="#triangles" />
```

This is also how icon sprites work: one hidden SVG full of `<symbol>`s, and a `<use>` for each icon on the page.

## Paths

`<path>` can draw anything. Every other shape is a shortcut for a path. The `d` attribute is a list of commands, each a letter followed by numbers.

| Command | Meaning |
|---------|---------|
| `M x y` | move the pen to a point without drawing |
| `L x y` | draw a straight line to a point |
| `H x` / `V y` | horizontal / vertical line |
| `Q cx cy x y` | quadratic curve with one control point |
| `C c1x c1y c2x c2y x y` | cubic curve with two control points |
| `A …` | an arc (part of an ellipse) |
| `Z` | close the shape back to the start |

Capital letters use absolute coordinates; lowercase ones are relative to where the pen is.

```html
<!-- the same triangle as the polygon above -->
<path d="M52,190 L134,30 L216,190 Z" />

<!-- a smile -->
<path d="M100,200 Q200,300 300,200" fill="none" stroke="black" stroke-width="8" stroke-linecap="round" />
```

Don't try to write complex paths by hand. Draw them in a design tool and export. What you need is to *read* them well enough to tweak a point or a colour.

Strokes on paths have a few extra settings worth knowing:

- `stroke-linecap`: the ends of a line (`butt`, `round`, `square`).
- `stroke-linejoin`: the corners (`miter`, `round`, `bevel`).
- `stroke-dasharray` and `stroke-dashoffset`: dashes, and the classic "drawing" animation in [[docs/svg/svg-animations|SVG - Animations]].

## Accessibility

An inline SVG that means something needs a name. The simplest way: `role="img"` plus `aria-label`.

```html
<svg viewBox="0 0 268 268" role="img" aria-label="SVG badge: a green triangle in a circle">
  …
</svg>
```

You can also put a `<title>` (the short name) and a `<desc>` (a longer description) as the first children of the `<svg>`. A purely decorative SVG should get `aria-hidden="true"` instead, so screen readers skip it.

## Putting it together

```html
<svg viewBox="0 0 268 268" width="268" role="img" aria-label="SVG badge">
  <symbol id="triangles" viewBox="0 0 25 25">
    <polygon points="7,10 12,0 17,10" />
    <polygon points="0,25 5,15 10,25" />
    <polygon points="15,25 20,15 25,25" />
  </symbol>

  <circle cx="134" cy="134" r="130" fill="none" stroke="#008b6f" stroke-width="7" />
  <line x1="47" y1="198" x2="221" y2="198" stroke="black" stroke-width="5" />
  <polygon points="52,190 134,30 216,190" fill="#008b6f" stroke="black" stroke-width="4" />
  <text x="134" y="142" text-anchor="middle" font-size="60" font-weight="900" fill="#f6f7f3" stroke="black" stroke-width="3">SVG</text>

  <use href="#triangles" x="45" y="67" width="25" height="25" fill="#59bfc6" />
  <use href="#triangles" x="198" y="67" width="25" height="25" fill="#59bfc6" />
  <use href="#triangles" x="121" y="211" width="15" height="15" fill="#59bfc6" />
</svg>
```

## Common mistakes

- A `line` or `polyline` with no `stroke`, so nothing shows.
- Expecting `rotate(45)` to spin around the shape's centre. Pass the centre point, or see `transform-box` in [[docs/svg/svg-animations|SVG - Animations]].
- Expecting `z-index` to work. Reorder the elements instead.
- Using `xlink:href` in new code.

## Try it

1. Draw a traffic light: one rounded `rect` and three circles.
2. Turn one circle into a `<symbol>` and stamp it three times with `<use>`, each a different `fill`.
3. Rewrite your `polygon` triangle as a `path`, then change one point to make it lopsided.

## Related

- [[docs/svg/svg|SVG - Basics]]
- [[docs/svg/svg-animations|SVG - Animations]]
- [[docs/html/html-media|HTML - Images and Media]]
