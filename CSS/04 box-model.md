# CSS - Box model

It applies and wraps around to all html elements, elements are either displayed as block or inline elements. We can inspect and modify the box model on browsers developer tool/metrics.

```
                          top
      ┌───────────────────────────────────────────┐
      │                  margin                   │
      │    ┌─────────────────────────────────┐    │
      │    │             border              │    │
      │    │    ┌───────────────────────┐    │    │
      │    │    │        padding        │    │    │
      │    │    │    ┌─────────────┐    │    │    │
left  │    │    │    │   content   │    │    │    │ right
      │    │    │    └─────────────┘    │    │    │
      │    │    │                       │    │    │
      │    │    └───────────────────────┘    │    │
      │    │                                 │    │
      │    └─────────────────────────────────┘    │
      │                                           │
      └───────────────────────────────────────────┘
```

## Block Elements

Form a seperate block, taking the available full width of it's parent. (e.g. `div`, `h1`, `p`, `ul`).

## Inline Elements

Only take has much space as it needs, no forcing new lines (e.g. `span`, `img`, `strong`, `a`)

## Content

Is the area comtaining the actual content

## Padding

Surrounds the content, creating space between the content and the border. It's best pratice to use percentages for padding `{padding: 18% 24%;}`. Percentages are calculated by object's width (NOT HEIGHT)

```css
.box {
  /* Long Declaration */
  padding-top: 100px;
  padding-right: 120px;
  padding-left: 100px;
  padding-bottom: 120px;
  /* Short Declations */
  padding: 100px; /* Applies 100px to all sides */
  padding: 100px 120px; /* Applies 100px to top and bottom and 120px to left and right */
  padding: 100px 120px 200px; /* Applies 100px to top, 120px to left and right and 200px to bottom */
  padding: 100px 120px 200px 120px; /* Applies 100px to top, 120px to right, 200px on bottom and 120px to the left */
}
```

## Border

```css
.box {
  /* 
   * Sets the width of the border 
   * does not take negative or percentages values
   */
  border-width: 10px; /* medium, thick and thin, or unit values */

  /* Accepts different border widths on different sides */
  border-width: thick 15px thin 30px;
  border-style: solid; /* none, solid, dotted and dashed */

  /* Accepts different border styles on different sides */
  border-style: solid dotted dashed none;
  border-color: #ffa499;
}
```

## Margin

Exists outside the element it's what separates it from other elements. It accepts numeric, negative and percentage units and the word auto.

```css
.box {
  /* Long Declaration */
  margin: 30px;
  /* Short Declations */
  margin: 30px 2em 6% -30px;
  /* The auto value center the object verticaly in its parent */
  margin: auto;
}
```

## Display

Display allow us to hide or the the display style. Values `none`, `block`, `inline`, `inline-block`. Inline-block allow for height, width and margins to be added.

```css
display: block;
```

## Visibility

Allow us to hide an element but still maintaining it's space. Values `hidden`, `visible`.

```css
visibility: hidden;
```

## Width/Height

Allows us to defines the size of the content. Values numeric values and percentages.

```css
.box {
  width: 20em;
  height: 100%;
}
```

## Box-sizing

Forces the border and padding into the width and height. iE7 doesn't support it and mozilla needs a prefix -moz-.

```css
box-sizing: border-box;
```

## Min-width/Min-height

Defines the mininum width a object can be squished

```css
min-width: 500px;
```

## Max-width/Max-height

Defines the maxinum width a object can be streched

```css
max-width: 700px;
```

## Overflow

Allow us to control a overflown text. Values `default`, `scroll`, `auto`.

```css
overflow: hidden;
```

## Floats

Floats remove elements from their normal document vertical follow. Values `none`, `left`, `right`.

```html
<div>
  <img />
  <h4></h4>
  <p></p>
</div>
```

Important, if we want to add space betweent the image float on top of a paragraph we need to add it to the floated image

```css
img {
  float: left;
  margin: 0 25px;
}
p {
  float: left;
}
```

If a parent contains float children it will collapse to NO height We can use clear to fix this. Values `none`, `left`, `right`, `both` (best pratice).

```css
/* Either by creating a <br /> just before the </div> not good pratice. */
br {
  clear: both;
}
/* Or by adding a overflow property to the parent container, not good pratice, scroll bars can appear in some browsers. */
div {
  overflow: hidden;
}
```

## Micro Clearfix

The Best pratice is to use a [micro Clearfix](http://nicolasgallagher.com/micro-clearfix-hack/), This uses pseudo-classes to generate content and prevent collapsing. We can then add the `.clearfix` class to the html.

```css
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
/* For IE6 and 7 compatibility we need to add this to prevent a rendering bug */
.clearfix {
  *zoom: 1;
}
```

## Position Property

Allows us to position elements in the browser. Relative and Absolute positions are relative to the first parent element that isn't static, if not parent up the nesting chain is static then it will alocate to the window.

Values:

- `static`: default position, also ignores any position and z-indexes.
- `relative`: positions without affecting others, moves from original position.
- `absolute`: object is completely removed from context and set new location.
- `fixed`: stays in the same position regarless of scrolling the window

```css
.wrapper {
  position: relative;
  div {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
```

## Z Index

Allows us to change the normal stacking order of elements on the z axis. The lower z-index will look closer `z-index: 20;` > `z-index: 50;`. Only relative, absolute or fixed objects can have z-index.

```css
z-index: 20;
```
