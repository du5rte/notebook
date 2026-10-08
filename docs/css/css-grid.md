---
title: "CSS - Grid"
type: doc
created: 2026-10-06
updated: 2026-10-07
tags: [css]
---
# CSS - Grid

Grid lays things out in **two directions** at once: rows and columns. Think of a spreadsheet, or a chocolate bar: you define the cells, then drop content into them. It's the tool for page layouts, photo galleries and card grids where everything needs to line up both ways.

## Turning it on

```css
.gallery {
  display: grid;
  grid-template-columns: 200px 200px 200px; /* three columns */
  gap: 1rem;                                /* space between cells */
}
```

Every direct child becomes a grid item and fills the next free cell, left to right, then wraps onto a new row. You don't need to define rows: grid creates them as needed.

## The fr unit

`fr` means "a fraction of the free space". It's what makes grids fluid.

```css
.gallery { grid-template-columns: 1fr 1fr 1fr; }   /* three equal columns */
.layout  { grid-template-columns: 15rem 1fr; }     /* fixed sidebar, content takes the rest */
.split   { grid-template-columns: 2fr 1fr; }       /* two thirds and one third */
```

`repeat()` saves typing:

```css
.gallery { grid-template-columns: repeat(3, 1fr); } /* same as 1fr 1fr 1fr */
```

## gap

`gap` sets the space between rows and columns, never around the outside.

```css
.gallery {
  gap: 1rem;          /* both directions */
  gap: 2rem 1rem;     /* rows, then columns */
}
```

## A responsive grid with no media queries

This one line is worth memorising:

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
}
/* phone: 1 column. tablet: 2. desktop: 3 or 4. */
```

Read it as: "fit as many columns as you can, each at least `16rem` wide, and share any leftover space equally."

- `minmax(16rem, 1fr)`: a column is never narrower than `16rem`, and grows to fill.
- `auto-fit` vs `auto-fill`: both create as many columns as fit. With only a few items, `auto-fit` stretches them to fill the row; `auto-fill` keeps empty columns so the items stay narrow.

## Placing items across cells

Grid lines are numbered from `1`. An item can span from one line to another.

```css
.featured {
  grid-column: 1 / 3;   /* from line 1 to line 3: two columns wide */
}
.banner {
  grid-column: 1 / -1;  /* -1 is the last line: full width */
}
.tall {
  grid-row: span 2;     /* two rows high */
}
```

## Named areas

For page layouts, you can draw the layout in text. Each string is a row; each word is a cell.

```css
.page {
  display: grid;
  grid-template-columns: 15rem 1fr;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  gap: 1rem;
}

.page > header { grid-area: header; }
.page > aside  { grid-area: sidebar; }
.page > main   { grid-area: main; }
.page > footer { grid-area: footer; }
```

Changing the layout on phones is then just redrawing the picture:

```css
@media (width < 40rem) {
  .page {
    grid-template-columns: 1fr;
    grid-template-areas: "header" "main" "sidebar" "footer";
  }
}
```

## Aligning in grid

The same words as flexbox: `justify-*` for the inline (row) direction, `align-*` for the block (column) direction. The shortest centring in CSS:

```css
.hero {
  display: grid;
  place-items: center; /* centred both ways */
}
```

## Grid vs flexbox

| | Flexbox | Grid |
| --- | --- | --- |
| Directions | one: a row **or** a column | two: rows **and** columns |
| Who decides size | the content | the container |
| Best for | nav bars, toolbars, button groups | page layouts, galleries, card grids |
| Items line up across rows | ❌ each row is on its own | ✅ |

Rule of thumb: if you are drawing columns that things must line up in, use grid. If you are spreading a few things along a line, use flexbox. They mix well: a grid of cards, with flexbox inside each card.

## Multi-column text

For flowing text into newspaper-style columns, neither grid nor flexbox is right. `columns` splits one block of text across columns, like a magazine.

```css
.article {
  columns: 3 16rem;        /* up to 3 columns, each at least 16rem */
  column-gap: 2rem;
  column-rule: 1px dotted #999; /* a line between columns */
}
.article h2 { column-span: all; } /* the heading crosses every column */
```

## Common mistakes

- Expecting `grid-template-columns` on a child to do anything. It goes on the container.
- Using `%` columns with `gap`: `33% 33% 33%` plus gaps overflows. Use `fr`.
- Reaching for media queries before trying `repeat(auto-fit, minmax(...))`.
- Rebuilding a simple row of buttons with grid. Flexbox is simpler there.

## Try it

1. Build a photo gallery that shows one column on a phone and four on a desktop, with no media queries.
2. Draw a header / sidebar / main / footer layout with `grid-template-areas`.
3. Make the first card in a grid span two columns.

## Related
- [[docs/css/css-flexbox|CSS - Flexbox]]
- [[docs/css/css-box-model|CSS - Box Model]]
- [[docs/css/css-media-queries|CSS - Media Queries]]
- [[docs/css/css-tailwind|CSS - Tailwind]]
