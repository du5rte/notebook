---
title: "CSS - Fonts"
type: doc
created: 2020-04-11
updated: 2026-10-07
tags: [css]
---
# CSS - Fonts

Most of a website is text, so typography does most of the design work. This lesson covers choosing a font, loading web fonts, sizing and spacing text, and the handful of text properties you'll use every week. Think of it like setting a menu at a coffee shop: one or two typefaces, readable sizes, plenty of room between lines.

## font-family and font stacks

`font-family` takes a list. The browser uses the first font it has, so end with a generic family as a safety net.

```css
body {
  font-family: "Inter", system-ui, sans-serif;
}
code {
  font-family: ui-monospace, "Cascadia Code", monospace;
}
```

Quote names with spaces in them. The generic families:

- `serif`: little finishing strokes (Georgia, Times).
- `sans-serif`: plain stroke endings (Helvetica, Arial).
- `monospace`: every character the same width. For code.
- `system-ui`: the operating system's own font. Fast, because nothing loads.

## Web fonts with @font-face

You can ship your own font files. Today you only need **WOFF2**: every current browser supports it, and it's the smallest.

```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter.woff2") format("woff2");
  font-weight: 100 900;   /* a variable font: every weight in one file */
  font-display: swap;     /* show a fallback font until this one loads */
}
```

`font-display: swap` stops the "invisible text" flash while the font downloads. Old tutorials list `.eot`, `.ttf` and `.svg` formats too: those were for browsers that no longer exist.

Services like Google Fonts give you a `<link>` tag to paste instead. Self-hosting is often faster and avoids a request to another server.

## font-size

Use `rem` so text respects the user's browser setting. See [[docs/css/css-values|CSS - Values and Units]].

```css
html { font-size: 100%; }  /* 16px by default */
body { font-size: 1rem; }
h1   { font-size: clamp(2rem, 5vw, 3.5rem); } /* fluid heading */
```

## font-weight and font-style

```css
strong { font-weight: 700; }  /* bold. 400 is normal */
.light { font-weight: 300; }
em     { font-style: italic; }
.label { font-variant: small-caps; }
```

A weight only looks right if the font has it. With a variable font any number between its range works; with static files the browser fakes missing weights, badly.

## line-height

The space between lines. Use a number with no unit: it scales with the font size of each element.

```css
body { line-height: 1.5; }  /* comfortable for paragraphs */
h1   { line-height: 1.1; }  /* headings need less */
```

```css
/* ❌ with a unit, children inherit the computed px value */
body { font-size: 1rem; line-height: 24px; }
h1   { font-size: 3rem; } /* 48px text on 24px lines: overlapping */

/* ✅ unitless, recalculated for every element */
body { line-height: 1.5; }
```

## The font shorthand

Sets several properties at once. Size and family are required, family comes last, and anything left out is reset.

```css
h1 { font: italic 700 2rem/1.1 Georgia, serif; }
/*         style weight size/line-height family */
```

Handy, but easy to get wrong. Separate properties are clearer while learning.

## Text properties you'll use

```css
p      { text-align: left; }            /* left, right, center, justify */
a      { text-decoration: none; }       /* remove the underline */
.label { text-transform: uppercase; letter-spacing: 0.05em; }
h1     { text-wrap: balance; }          /* even line lengths in headings */
p      { max-width: 65ch; }             /* about 65 characters per line: easy to read */
.url   { overflow-wrap: anywhere; }     /* break long links instead of overflowing */
```

`text-shadow` takes `x y blur colour`:

```css
.hero h1 { text-shadow: 0 2px 4px rgb(0 0 0 / 0.4); }
```

## Truncating with an ellipsis

`text-overflow` only works with its two friends:

```css
.title {
  white-space: nowrap;      /* keep it on one line */
  overflow: hidden;         /* clip what doesn't fit */
  text-overflow: ellipsis;  /* show … at the cut */
}
```

## white-space

How spaces and line breaks in the HTML are treated.

- `normal`: collapse spaces, wrap lines. The default.
- `nowrap`: collapse spaces, never wrap.
- `pre`: keep every space and line break, like `<pre>`.
- `pre-wrap`: keep them, but still wrap long lines.

## Lists

```css
.menu {
  list-style: none;  /* remove bullets */
  margin: 0;
  padding: 0;        /* browsers indent lists with padding */
}
li::marker { color: tomato; } /* style the bullet itself */
ol { list-style-type: lower-roman; }
```

## Icons: fonts vs SVG

Icon fonts (Font Awesome, IcoMoon) put icons inside a font and show them with `content` in a pseudo-element. You'll still see them in older projects. Inline SVG icons are the better choice today: sharp at any size, colourable with `currentColor`, and readable by screen readers when you add a title.

## Common mistakes

- No generic family at the end of the stack.
- `line-height` in `px`, causing overlapping lines on large headings.
- Loading six weights of a font and using two.
- `text-overflow: ellipsis` without `overflow: hidden` and `white-space: nowrap`.

## Try it

1. Self-host a WOFF2 font with `@font-face` and `font-display: swap`, with `system-ui` as the fallback.
2. Set body text to `1rem` with a `1.5` line height and a `65ch` max width. Compare readability before and after.
3. Truncate a long product name to one line with an ellipsis.

## Related
- [[docs/css/css-values|CSS - Values and Units]]
- [[docs/css/css-box-model|CSS - Box Model]]
- [[docs/css/css-selectors|CSS - Selectors]]
