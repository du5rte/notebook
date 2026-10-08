---
title: "CSS - Values and Units"
type: doc
created: 2020-04-11
updated: 2026-10-07
tags: [css]
---
# CSS - Values and Units

Every declaration needs a value: a length, a colour, a keyword. Choosing the right unit is what makes a design scale gracefully, from a phone to a big monitor, and for people who bump up their browser's font size. This lesson covers the units you actually use, colours, custom properties and the maths functions.

## px: the absolute unit

`px` is fixed. Good for things that should never scale, like a `1px` border.

```css
.card { border: 1px solid #ddd; }
```

CSS also has `cm`, `mm`, `in` and `pt`. They are for print stylesheets; on screens, ignore them.

## em and rem

Both are relative to a font size. The browser default is `16px`.

- `rem` is relative to the **root** (`<html>`) font size. Predictable everywhere.
- `em` is relative to the **current element's** font size (for `font-size` itself, the parent's).

```css
html { font-size: 100%; }  /* 16px, respects the user's setting */
h1 { font-size: 2rem; }    /* 32px */

.button {
  font-size: 1.25rem;      /* 20px */
  padding: 0.5em 1em;      /* 10px 20px: grows with the button's text */
}
```

A good rule: `rem` for font sizes and layout spacing, `em` for padding that should scale with its own text.

**The em trap**: em compounds when you nest.

```css
li { font-size: 1.2em; }
/* a list inside a list: 1.2 x 1.2 = 1.44 times the base */
```

## Percentages

Relative to the parent. For `width`, the parent's width.

```css
.sidebar { width: 25%; }
```

## Viewport units

Relative to the browser window.

```css
.hero {
  min-height: 100dvh; /* full height of the visible screen */
  padding: 5vw;       /* 5% of the viewport width */
}
```

`vw`/`vh` are 1% of the viewport width/height. On phones, `100vh` can be taller than the visible area because of the browser's toolbars. `dvh` (dynamic) follows the toolbars as they show and hide; `svh` and `lvh` are the small and large versions.

## Colours

```css
color: tomato;               /* named colour */
color: #ff0033;              /* hex: red, green, blue */
color: #f03;                 /* short hex, same colour */
color: rgb(255 0 51);        /* 0 to 255 per channel */
color: rgb(255 0 51 / 0.3);  /* with 30% opacity */
color: hsl(348 100% 50%);    /* hue, saturation, lightness */
color: hsl(348 100% 50% / 0.7);
```

Modern syntax separates values with spaces and puts the alpha after a `/`. The older comma form (`rgba(255, 0, 51, .3)`) still works.

`hsl` is easier to reason about: keep the hue, change the lightness, and you get a lighter or darker shade of the same colour. Newer spaces like `oklch()` do this even more evenly; MDN covers them.

## Custom properties (CSS variables)

Name a value once, reuse it everywhere. A custom property starts with `--` and is read with `var()`.

```css
:root {
  --brand: #e85d3f;
  --space: 1rem;
}

.button {
  background: var(--brand);
  padding: var(--space);
  color: var(--text, black); /* fallback if --text is not set */
}
```

They replace what we used Sass variables for, and do more, because they live in the browser:

| | Sass `$brand` | CSS `--brand` |
| --- | --- | --- |
| Needs a build step | ✅ yes | ❌ no |
| Inherits down the tree | ❌ | ✅ |
| Change in a media query or on a class | ❌ | ✅ |
| Read or set from JavaScript | ❌ | ✅ |

```css
.theme-dark { --brand: #ff8a65; } /* everything inside picks up the new colour */
```

## color-mix(): shades without a preprocessor

Sass had `lighten()` and `darken()`. CSS now has `color-mix()`: mix two colours by a percentage.

```css
:root { --brand: #e85d3f; }

.button:hover {
  background: color-mix(in oklch, var(--brand), black 15%); /* 15% darker */
}
.badge {
  background: color-mix(in oklch, var(--brand), transparent 80%); /* a soft tint */
}
```

`in oklch` is the colour space the mix happens in. `oklch` gives even, natural-looking steps; `srgb` also works.

## calc(), min(), max() and clamp()

CSS can do maths, and it can mix units.

```css
.main { width: calc(100% - 2rem); }
.card { width: min(100%, 30rem); } /* the smaller of the two */
```

`clamp(min, preferred, max)` picks the preferred value but keeps it between a floor and a ceiling. It gives fluid type without media queries:

```css
h1 {
  font-size: clamp(1.75rem, 4vw + 1rem, 3rem);
  /* grows with the window, never below 1.75rem or above 3rem */
}
```

## Keywords that work everywhere

```css
a { color: inherit; } /* take the parent's value */
p { color: initial; } /* the spec's default */
p { color: unset; }   /* inherit if inheritable, else initial */
p { color: revert; }  /* back to the browser's default style */
```

And `auto`, which means "let the browser work it out" (`margin: 0 auto` centres a block).

## Strings and URLs

Strings go in quotes. Escape a quote of the same kind with a backslash.

```css
.quote::before { content: "\201C"; }        /* a curly opening quote */
.note::after   { content: "Say \"hi\""; }
.hero          { background-image: url("img/bg.jpg"); }
```

## Common mistakes

- Using `px` for font sizes. Users who set a bigger default font get ignored. Use `rem`.
- Nesting `em` font sizes and wondering why text keeps growing.
- `100vh` on mobile hiding content behind the toolbar. Use `100dvh`.
- `var(--Brand)` vs `--brand`: custom property names are case-sensitive.

## Try it

1. Set a `--brand` colour on `:root` and use it on a button and a link. Change it once and watch both update.
2. Make an `h1` that grows with the window but stays between `2rem` and `4rem`.
3. Write the same colour as a hex, `rgb()` and `hsl()`, then make a 50% transparent version.

## Related
- [[docs/css/css|CSS - Basics]]
- [[docs/css/css-box-model|CSS - Box Model]]
- [[docs/css/css-fonts|CSS - Fonts]]
- [[docs/css/css-visual-effects|CSS - Visual Effects]]
