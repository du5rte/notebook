---
title: "CSS - Box Model"
aliases: ["CSS - Box model"]
type: doc
created: 2020-04-11
updated: 2026-10-07
tags: [css]
---
# CSS - Box Model

Every element on a page is a rectangle. The box model describes the layers of that rectangle: the content, the padding around it, the border, and the margin that keeps other boxes away. Picture a framed photo on a wall: the photo is the content, the mat is the padding, the frame is the border, and the empty wall around it is the margin.

```
┌──────────────── margin ────────────────┐
│  ┌───────────── border ─────────────┐  │
│  │  ┌────────── padding ─────────┐  │  │
│  │  │          content           │  │  │
│  │  └────────────────────────────┘  │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

Open DevTools, select any element and look at the box diagram in the Computed panel. It shows these four layers with real numbers.

## Start with box-sizing: border-box

By default, `width` only sets the content. Padding and border are added on top, so a `width: 300px` box with `20px` padding is really `340px` wide. That surprises everyone.

`box-sizing: border-box` makes `width` include padding and border. Put this at the top of every project:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

.card {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  /* total width: 300px, content shrinks to 258px */
}
```

## Padding

Space inside the border. It takes the element's background colour.

```css
.card {
  padding: 1rem;              /* all four sides */
  padding: 1rem 2rem;         /* top/bottom, left/right */
  padding: 1rem 2rem 3rem;    /* top, left/right, bottom */
  padding: 1rem 2rem 3rem 4rem; /* top, right, bottom, left: clockwise */
}
```

The four-value order is clockwise from the top, like a clock: top, right, bottom, left. Percentages are based on the parent's *width*, even for top and bottom.

## Border

```css
.card {
  border: 2px solid #ffa499;  /* width style color */
  border-bottom: 4px dashed tomato; /* one side only */
}
```

The style is required: without `solid`, `dashed` or `dotted` nothing shows.

## Margin

Space outside the border. Margins can be negative, and `auto` absorbs leftover space.

```css
.page {
  max-width: 60rem;
  margin: 0 auto; /* centres the block horizontally */
}
```

`margin: auto` centres horizontally in normal flow. It does not centre vertically; for that, use flexbox or grid.

**Margin collapse**: when two block elements stack, their vertical margins merge into the larger one instead of adding up.

```css
h2 { margin-bottom: 2rem; }
p  { margin-top: 1rem; }
/* gap between them: 2rem, not 3rem */
```

Flex and grid items do not collapse margins, and `gap` avoids the question entirely.

## Block vs inline

The `display` property sets how a box behaves in the flow.

| | `block` | `inline` | `inline-block` |
| --- | --- | --- | --- |
| New line | yes | no | no |
| Width | fills the parent | fits the content | fits the content |
| `width`/`height` | yes | ignored | yes |
| Vertical margin | yes | ignored | yes |
| Examples | `div`, `p`, `h1`, `ul` | `span`, `a`, `strong` | buttons, badges |

`display: flex` and `display: grid` make the element a block on the outside and a layout container on the inside. See [[docs/css/css-flexbox|CSS - Flexbox]] and [[docs/css/css-grid|CSS - Grid]].

## Hiding things

| | Space kept? | Seen by screen readers? |
| --- | --- | --- |
| `display: none` | no | no |
| `visibility: hidden` | yes | no |
| `opacity: 0` | yes | yes |

## Sizing

```css
.card {
  width: 100%;
  max-width: 40rem;   /* never wider than this */
  min-height: 10rem;  /* at least this tall, can grow */
  aspect-ratio: 16 / 9; /* height follows the width */
}
```

`max-width` plus `width: 100%` is the most useful pair in CSS: fluid on phones, capped on big screens. Avoid fixed `height` on boxes with text; the text will overflow when it grows.

## Overflow

What happens when content is bigger than its box.

```css
.code-sample { overflow: auto; }    /* scrollbars only when needed */
.thumbnail   { overflow: hidden; }  /* clip it */
```

## Position

`position` takes an element out of the normal flow, fully or partly.

- `static`: the default. `top`/`left` and `z-index` do nothing.
- `relative`: moves from where it would be, without moving its neighbours. Also makes it the anchor for absolute children.
- `absolute`: removed from the flow, placed relative to the nearest positioned ancestor (or the page if there is none).
- `fixed`: placed relative to the viewport, stays put when you scroll.
- `sticky`: normal until you scroll past a threshold, then sticks.

```css
.card { position: relative; }
.card .badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem; /* top-right corner of the card */
}

.site-header {
  position: sticky;
  top: 0; /* sticks to the top once it reaches it */
}

.overlay {
  position: absolute;
  inset: 0; /* shorthand for top, right, bottom, left: 0 */
}
```

## z-index

Controls which positioned element sits on top. A **higher** number is closer to you.

```css
.modal    { position: fixed; z-index: 100; }
.backdrop { position: fixed; z-index: 50; } /* behind the modal */
```

`z-index` works on positioned elements and on flex or grid items. It only compares elements inside the same stacking context, which is why `z-index: 9999` sometimes "does nothing".

## Floats: a short history

Before flexbox and grid, whole page layouts were built with `float`, plus a "clearfix" hack to stop parents collapsing. You will still see it in old code. Today `float` has one job: letting text wrap around an image.

```css
.article img {
  float: left;
  margin: 0 1rem 1rem 0;
}
```

If a parent must contain its floats, use `display: flow-root` on the parent instead of a clearfix.

## Common mistakes

- Forgetting `box-sizing: border-box`, then fighting widths that don't add up.
- Expecting `margin: auto` to centre vertically.
- Setting `width` or vertical margin on an inline element like `<a>`. Make it `inline-block` or `block`.
- An absolute child flying to the corner of the page: its parent needs `position: relative`.

## Try it

1. Build a `.card` with `width: 300px`, padding and a border. Measure it in DevTools with and without `border-box`.
2. Centre a `max-width: 40rem` container on the page.
3. Put a "New" badge in the top-right corner of a card with `position`.

## Related
- [[docs/css/css-values|CSS - Values and Units]]
- [[docs/css/css-flexbox|CSS - Flexbox]]
- [[docs/css/css-grid|CSS - Grid]]
- [[docs/css/css-fonts|CSS - Fonts]]
- [[docs/css/css-media-queries|CSS - Media Queries]]
