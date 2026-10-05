# CSS - Flexbox

## Flex

Uses flex containers and flex items to easily align elements respecting the container and each other. Some browsers like safari still need prefixes.

https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction

```css
.nav {
  display: -webkit-flex;
}
```

## Flex Direction

Allows us the change the flexbox axis directions, Main Axis (X left to right), Cross Axis (Y top to bottom). Values `row`, `row-reverse`, `column`, `column-reverse`.

```css
.nav {
  flex-direction: row;
}
```

## Justify Content

Adjusts the position and spacing of flex items on the X-Axis. Values `flex-start`, `flex-end`, `center`, `space-between`.

```css
.nav {
  justify-content: space-between;
}
```

## Margin Auto

Auto absorbs extra space and push other flex items in opposite way

```css
.nav li:last-child {
  margin-left: auto; /* pushed to the right others to the left */
}
```

## Flex Wrap

Fixes overflowing elements by creating a multi-line container

```css
.nav {
  flex-wrap: wrap;
}
```

## Flex or Flex Grow

Determins how much the flex item will grow relative to others. all items take the same free space

```css
.nav li {
  flex-grow: 1;
}
.col-c {
  flex: 2;
}
```

## Order

Allow us to change the order of items

```css
.col-c {
  -webkit-order: -1;
}
```

## Align Self

Allows us to vertically align blocks

```css
.col-b {
  -webkit-align-self: center; /* centers on the Y-Axis */
  -webkit-align-self: flex-end; /* Pushes to the end of Y-Axis */
  -webkit-align-self: stretch; /* Default values, fill the space */
}
```

## Media Queries

We can use media queries to easily change layouts

```css
@media screen and (max-width: 999px) {
  .main {
    -webkit-flex-direction: column;
  }
}
```

## Multi-Coulmn Layout

Defines multiple content columns with widths, space and rules

```css
.main {
  /* Columns */
  -webkit-column-count: 3;
  -webkit-column-gap: 3em;
  -webkit-column-width: 250px; //acts like a max-width
  /* shorthand ! with a S ! */
  -webkit-columns: 250px 3;

  /* Columns-rules */
  -webkit-column-rule-width: 2px;
  -webkit-column-rule-style: dotted;
  -webkit-column-rule-color: black;
  /* shorthand */
  -webkit-column-rule: 2px dotted black;
}
/* Column Span */
h1 {
  -webkit-column-span: all;
}
```
