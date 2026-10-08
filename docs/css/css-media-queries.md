---
title: "CSS - Media Queries"
type: doc
created: 2020-04-11
updated: 2026-10-07
tags: [css]
---
# CSS - Media Queries

A media query applies styles only when a condition is true: the screen is wide enough, the user prefers dark mode, the page is being printed. It's how one stylesheet serves a phone, a laptop and a sheet of paper. Think of it as an `if` statement for CSS.

## The viewport meta tag first

Without this line in the `<head>`, phones pretend to be a desktop-width screen and zoom out, and your media queries never fire.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

## Your first media query

```css
.layout { display: block; }

@media (width >= 48rem) {
  .layout { display: flex; } /* side by side from 48rem up */
}
```

The range syntax (`>=`, `<`) reads like maths. You will also see the older form, which means the same:

```css
@media (min-width: 48rem) { } /* same as width >= 48rem */
@media (max-width: 47.99rem) { } /* same as width < 48rem */
```

## Mobile first

Write the phone styles as the default, then add media queries as the screen gets **bigger**.

```css
/* ❌ desktop first: undo things for small screens */
.cards { grid-template-columns: repeat(3, 1fr); }
@media (width < 48rem) { .cards { grid-template-columns: 1fr; } }

/* ✅ mobile first: build up for big screens */
.cards { grid-template-columns: 1fr; }
@media (width >= 48rem) { .cards { grid-template-columns: repeat(3, 1fr); } }
```

Phones get the least CSS, and the simple layout is the default.

## Combining conditions

```css
@media (48rem <= width < 64rem) { }          /* tablets only */
@media (width >= 48rem) and (orientation: landscape) { }
@media (width < 30rem), print { }            /* comma means "or" */
```

## Choosing breakpoints

Pick breakpoints where **your content** breaks, not for specific devices. Make the window narrower until the layout looks wrong, and add a query there. Use `rem` for breakpoints so they respect the user's font size.

## User preferences

Media queries can also ask how the user has set up their device. These are some of the most useful ones today.

```css
@media (prefers-color-scheme: dark) {
  :root { --bg: #111; --text: #eee; } /* dark theme from custom properties */
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none; transition: none; } /* respect motion sickness settings */
}

@media (hover: hover) {
  .card:hover { transform: translateY(-2px); } /* only on devices with a real pointer */
}
```

## High-resolution screens

`resolution` targets screens with dense pixels (often called "retina").

```css
@media (resolution >= 2dppx) {
  .logo { background-image: url("logo@2x.png"); }
}
```

For `<img>` tags, prefer `srcset` in the HTML and let the browser pick the right file.

## Print styles

Printed pages need less: no nav, no backgrounds, black text, and link addresses written out.

```css
@media print {
  nav, footer, .comments { display: none; }
  body { color: black; background: none; }

  a[href^="http"]::after { content: " (" attr(href) ")"; }

  h2 { break-after: avoid; }   /* don't leave a heading alone at the bottom of a page */
  p { orphans: 3; widows: 3; } /* at least 3 lines at the top and bottom of a page */
}

@page { margin: 1.5cm; }
```

## Container queries

A media query asks about the **window**. A container query asks about the **parent**. That matters for components: the same card can sit in a wide main column or a narrow sidebar.

```css
.card-list { container-type: inline-size; } /* this parent can be queried */

.card { display: block; }

@container (width >= 30rem) {
  .card { display: flex; } /* image beside text, only when the parent is wide */
}
```

Rule of thumb: media queries for the page layout, container queries for components.

## Common mistakes

- Forgetting the viewport meta tag. Everything looks like a tiny desktop site on phones.
- Overlapping breakpoints like `max-width: 768px` and `min-width: 768px`: at exactly `768px` both apply. The range syntax (`<` and `>=`) avoids it.
- Breakpoints named after devices ("iPhone"). Devices change every year; your content doesn't.
- Using `max-device-width`. It's deprecated; use `width`.

## Try it

1. Make a layout that stacks on phones and shows two columns from `48rem` up, mobile first.
2. Add a dark theme with `prefers-color-scheme` that only changes custom properties.
3. Write a print stylesheet that hides the nav and prints link addresses.

## Related
- [[docs/css/css-flexbox|CSS - Flexbox]]
- [[docs/css/css-grid|CSS - Grid]]
- [[docs/css/css-values|CSS - Values and Units]]
- [[docs/css/css-tailwind|CSS - Tailwind]]
