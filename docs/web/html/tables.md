# HTML Tables


## Table
The table element represents data in a series of rows and columns. Tables should only be used for displaying tabular data, and never for page layout.

```html
<table>
	<tr>
		<th>Name</td>
		<th>E-mail</td>
		<th>Job Role</td>
	</tr>
	<tr>
		<th>Nick</td>
		<td>nick@example.com</td>
		<td>Web Designer</td>
	</tr>
	<tr>
		<th>Andrew</td>
		<td>andrew@example.com</td>
		<td>Fron-End Developer</td>
	</tr>
</table>
```

## Table Row
The table row element defines a row of cells in a table. Table rows can be filled with table cells and table header cells.

```html
<tr></tr>
```

## Table Cell
The table cell element contains data and represents a single table cell. Each table cell should be inside a table row.

```html
<td></td>
```

## Tabled Head
The table header cell helps label a group of cells in either a column or a row.

```html
<th></th>
```

## scope
Defines the cells that the header element relates to. e.g. row col rowgroup colgroup auto.

```html
<th scope="col"></th>
```

## Table Head
The table head element (not to be confused with the table header cell element) defines a set of rows that make up the header of a table.

```html
<thead></thead>
```

## Table Body
The table body element defines one or more rows that make up the primary contents (or "body") of a table.

```html
<tbody></tbody>
```

## Table Footer
The table foot element contains a summary of the table. This might be totals for columns of numerical data or meta information about the source of data.

```html
<tfoot></tfoot>
```

## Colspan
Defines for how many columns the cell extends. Default value is 1

```html
<td colspan="3"></td>
```

## Caption
The caption element represents the title of the table. Good for `SEO`

```html
<table>
	<caption>Employee Information</caption>
	<thead>
		<tr>
			<th scope="col">Name</td>
			<th scope="col">E-mail</td>
			<th scope="col">Job Role</td>
		</tr>
	</thead>
	<tfoot>
		<td colspan="3">Date is updated every 15 minutes.</td>
	</tfoot>
	<tbody>
		<tr>
			<th scope="row">Nick</td>
			<td>nick@example.com</td>
			<td>Web Designer</td>
		</tr>
		<tr>
			<th scope="row">Andrew</td>
			<td>andrew@example.com</td>
			<td>Fron-End Developer</td>
		</tr>
	</tbody>
</table>
```
