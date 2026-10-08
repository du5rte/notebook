---
title: "CSS - Flexbox"
type: doc
created: 2020-04-11
updated: 2026-10-07
tags: [css]
---
# CSS - Flexbox

Flexbox lays things out in **one direction**: a row or a column. It's the tool for nav bars, button groups, a card's header with a title on the left and an icon on the right, or centring something in a box. You put `display: flex` on a parent (the flex container) and its direct children become flex items that share the space.

## Turning it on

```css
.nav {
  display: flex;
  gap: 1rem; /* space between items, no margins needed */
}
```

```html
<ul class="nav">
  <li>Menu</li>
  <li>Order</li>
  <li>Contact</li>
</ul>
<!-- three items side by side, 1rem apart -->
```

Only direct children become flex items. Grandchildren keep their normal layout.

## Two axes

Flexbox thinks in a **main axis** (the direction items flow) and a **cross axis** (perpendicular to it). `flex-direction` sets the main axis.

```css
.nav  { flex-direction: row; }    /* default: main axis runs left to right */
.menu { flex-direction: column; } /* main axis runs top to bottom */
```

This is the key idea. The alignment properties below follow the axes, not "horizontal" and "vertical", so they swap meaning when you switch to `column`.

## justify-content: along the main axis

Distributes items along the main axis.

```css
.nav { justify-content: space-between; } /* first at the start, last at the end */
```

Common values: `flex-start` (default), `center`, `flex-end`, `space-between`, `space-around`, `space-evenly`.

## align-items: across the cross axis

Lines items up on the cross axis.

```css
.header { align-items: center; } /* vertically centred in a row */
```

Default is `stretch`: items grow to fill the container's height in a row. That's why flex items are often taller than you expect.

The famous one-liner for perfect centring:

```css
.hero {
  display: flex;
  justify-content: center;
  align-items: center; /* the child sits dead centre */
}
```

## align-self: one item breaks ranks

```css
.toolbar .help { align-self: flex-end; } /* only this item drops to the bottom */
```

## margin-left: auto: push things apart

An `auto` margin soaks up all the free space on its side. Great for "logo on the left, login button on the right".

```css
.nav .login { margin-left: auto; } /* login pushed right, the rest stay left */
```

## Growing and shrinking: flex

The `flex` shorthand says how an item shares space.

```css
.sidebar { flex: 0 0 15rem; } /* don't grow, don't shrink, start at 15rem */
.content { flex: 1; }         /* take all the remaining space */
```

`flex: 1` on several items splits the free space equally. `flex: 2` on one of them gives it twice the share of the others.

The three values are `flex-grow`, `flex-shrink` and `flex-basis` (the starting size). Most of the time you only need `flex: 1` or `flex: none`.

## Wrapping

By default items squeeze onto one line. `flex-wrap: wrap` lets them flow onto the next.

```css
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem; /* tags wrap like words in a sentence */
}
```

## order

Changes the visual order without touching the HTML.

```css
.featured { order: -1; } /* moves to the front */
```

Use it sparingly: keyboard and screen reader users still follow the HTML order, so the two can get out of sync.

## Responsive: switch the direction

```css
.layout { display: flex; flex-direction: column; }

@media (width >= 50rem) {
  .layout { flex-direction: row; } /* side by side on wide screens */
}
```

## Flexbox vs grid

Flexbox is content-first: items decide their size and flexbox spreads them along a line. When you need rows **and** columns lining up, reach for [[docs/css/css-grid|CSS - Grid]].

## Common mistakes

- ❌ Using margins on every item for spacing. ✅ Use `gap` on the container.
- Expecting `justify-content` to centre vertically in a `column`. In a column, the main axis is vertical, so `align-items` is the horizontal one.
- Putting `display: flex` on the item instead of the parent.
- Text overflowing a `flex: 1` item. Flex items won't shrink below their content; add `min-width: 0` to the item.

## Try it

1. Build a nav bar: logo on the left, three links next to it, a "Log in" button on the far right.
2. Centre a `.modal` horizontally and vertically on the screen.
3. Make a sidebar of `15rem` with content filling the rest, stacking on narrow screens.

## Related
- [[docs/css/css-grid|CSS - Grid]]
- [[docs/css/css-box-model|CSS - Box Model]]
- [[docs/css/css-media-queries|CSS - Media Queries]]
- [[docs/css/css-tailwind|CSS - Tailwind]]
