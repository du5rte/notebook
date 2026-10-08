---
title: "HTML - Tables"
type: doc
created: 2015-08-27
updated: 2026-10-07
aliases: ["HTML Tables"]
tags: [html]
---
# HTML - Tables

A table shows data in rows and columns, like a spreadsheet or a train timetable. Use it whenever the data has two directions: each row is a thing, each column is a property of it. Never use tables for page layout. That is what [[docs/css/css-flexbox|Flexbox]] and grid are for. In this lesson we build a small staff table for a café.

## Rows and cells

Three elements do most of the work:

- `<table>` wraps it all.
- `<tr>` (table row) is one row.
- `<td>` (table data) is one cell inside a row.

```html
<table>
  <tr>
    <td>Nick</td>
    <td>nick@example.com</td>
    <td>Barista</td>
  </tr>
  <tr>
    <td>Andrew</td>
    <td>andrew@example.com</td>
    <td>Baker</td>
  </tr>
</table>
```

Every cell must be inside a row. There is no column element for data: columns appear because each row has its cells in the same order.

## Header cells and scope

`<th>` is a header cell. It labels a column or a row, and the browser makes it bold and centred by default. `scope` says which way it labels.

```html
<tr>
  <th scope="col">Name</th>
  <th scope="col">Email</th>
  <th scope="col">Role</th>
</tr>
<tr>
  <th scope="row">Nick</th>
  <td>nick@example.com</td>
  <td>Barista</td>
</tr>
```

This is what makes a table accessible. When a screen reader lands on "Barista", it can say "Role, Nick, Barista". Without headers, it just reads a stream of words.

## Caption

`<caption>` is the title of the table. It must be the first thing inside `<table>`.

```html
<table>
  <caption>Café staff</caption>
  ...
</table>
```

## thead, tbody, tfoot

These group rows into the head, the body and the footer. They help screen readers, make styling easier, and when printing a long table the browser can repeat the header on every page.

Don't confuse `<thead>` (a group of header *rows*) with `<th>` (one header *cell*).

```html
<table>
  <caption>Café staff</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Nick</th>
      <td>nick@example.com</td>
      <td>Barista</td>
    </tr>
    <tr>
      <th scope="row">Andrew</th>
      <td>andrew@example.com</td>
      <td>Baker</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">Updated every Monday.</td>
    </tr>
  </tfoot>
</table>
```

`<tfoot>` is for a summary: totals, notes, the data source.

## Spanning cells: colspan and rowspan

`colspan` makes a cell stretch across several columns, `rowspan` down several rows. Both default to 1.

```html
<tr>
  <td colspan="3">Closed for holidays</td>
  <!-- one cell as wide as three -->
</tr>
```

Use spans sparingly. Every merged cell makes the table harder to read for screen readers and harder to restyle.

## Styling tips

Tables look cramped by default. Two lines of CSS fix most of it:

```css
table { border-collapse: collapse; }
th, td { padding: 0.5rem 1rem; border-bottom: 1px solid #ddd; }
```

`border-collapse: collapse` merges the double borders between cells into one. On small screens, wrap a wide table in a `<div>` with `overflow-x: auto` so it scrolls sideways instead of breaking the page.

## Common mistakes

- Using tables to lay out a page. Use CSS layout instead.
- Mismatched tags such as `<th>Name</td>`. Close each cell with the tag that opened it.
- Rows with different numbers of cells, which shifts the columns.
- Putting `<td>` straight inside `<tfoot>` or `<thead>` without a `<tr>`.

## Try it

1. Build a weekly opening hours table with a caption, a header row and a row per day.
2. Add `scope` to every header cell and check it with your browser's accessibility inspector.
3. Add a footer row that spans all columns with a note.

## Related

- [[docs/html/html|HTML - Basics]]
- [[docs/html/html-text|HTML - Text]]
- [[docs/html/html-forms|HTML - Forms]]
