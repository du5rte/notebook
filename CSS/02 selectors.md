# CSS - Selectors


## Universal Selector
Selects every element on the page at once

```css
* {}
```

## Type/Element Selectors
Targets the element type `html` tag(s)

```css
body {}
```

## Descendant Selectors
Targets a selector that is inside another selector

```css
h1 span {}
```

## Class Selector
Targets selectors based on class attribute, classes can be repeated throughout the page

```html
<div class="myclass"></div>
```
```css
.myclass {}
```

## ID Selector
An element can only have one ID and a page can only have one element with the same ID name.
```html
<div id="myid"></div>
```
```css
#myid {}
```

IDs have browser functionality, They can be used as identifiers, to create landmarks or  anchors in the page.
```html
<!--
  Will focus the window view to element with id="top",
  commonly applied to a navbar
-->
<a href="#top">Back to top</a>
```

## Selector Groups
Rules containing various selector separated by commas

```css
.square,
.circle,
.ellipse {
  display: inline-block;
  width: 200px;
  height: 200px;
}
```

## Child Selector
Target the direct (only) children of a element using the `>` Child Combinator

```css
main > a {}
```

## Adjacent Sibling Selector
Targets elements next sibling on the page using the `+` Plus-sign Combinator

```css
h2 + p {}
```
```html
<p>Paragraph 0</p>
<h2>Header</h2>
<p>Paragraph 1</p> <!-- selected -->
<p>Paragraph 2</p>
```

## General Sibling Selector
Targets all selected elements sibling on the page after the element, using the `~` General Sibling Combinator

```css
h2 ~ p {}
```
```html
<p>Paragraph 0</p>
<h2>Header</h2>
<p>Paragraph 1</p> <!-- selected -->
<p>Paragraph 2</p> <!-- selected -->
```

## Attribute Selectors
Target elements based on given attribute or value

Targets any given `element` that has a class
```css
[class] {}
```

Targets any `<a>` given element that has a class
```css
a[class] {}
```


Targets any text input element
```css
input[type="text"] {}
```

Targets any `<a>` that open in a new tab (external links)
```html
<a href="#" targets="_blank"></a>
```
```css
a[target="_blank"] {}
```

## Substring Matching Attribute Selectors
Targets specifics attributer values

#### Begins With Selector
targets attribute begining with selected value
```html
<a href="http://foo.com"></a>
```
```css
a[href^="http://"] {}
```

#### Ends With Selector
targets attribute ending with selected value
```html
<a href="file.pdf"></a>
```
```css
a[href$=".pdf"] {}
```

#### Contains Selector
targets attribute containing value
```html
<img src="images/sky_thumbnail.jpg" alt="sky" />
```
```css
img[src*="thumb"] {}
```


## Pseudo Classes
Targets only element on certain conditions, Sudo elements can be use with single `:` or double `::`

Targets elemement if it has a `href` attribute
```css
a:link{}
```

Targets elemement if it has been visited
```css
a:visited{}
```

Targets elemement while it's clicked
```css
a:active{}
```

Targets elemement while it's hovered
```css
div:hover{}
```

Targets elemement while `form` element is active
```css
input:focus {}
```


## Structural Pseudo Classes
Target elements based on their position on the `html` document

#### Child Selector
the very first child of a element
```css
li:first-child {}
```

the very last child of a element
```css
li:last-child {}
```

targets a element only if it's the only element inside a parent
```css
span:only-child {}
```

#### Only of Type Selector
Targets a element only if it's the only kind of it's type inside a parent

```css
p:only-of-type {}
```

#### nth Child Selector
Target child or combination of child elements using a Expression Syntax `nth-child(an+b)` - [codepen :Nth-child() guide](http://codepen.io/yoksel/pen/iLxud)

Expression syntax:
- `b` first item selected
- `an` cycle of elements to be selected after the first one has been selected

```css
li:nth-child() {}
  /* Works the opposite way */
li:nth-last-child() {}
```

#### nth of type Selector
Target a specific child or combination of child elements

```css
div:nth-of-type() {}
div:nth-last-of-type() {}
```

#### Root Selector
Targets the element that is the root of the document `html`, *`:root` has more specificity than `html`*

```css
:root {}
```

#### Target Selector
Target elements that elements ID matches the # in the url

```html
<a herf="#section1">Section 1</a>
```
```css
:target {}
```

#### Empty Selector
Targets empty elements

```html
<a herf="#section1">Section 1</a>
```
```css
div:empty {}
```

#### Not Selector
Targets everything but what we select, e.g. `div:not(:empty) {}` targets all `<div>` expect the empty one

```html
<a herf="#section1">Section 1</a>
```
```css
div:not() {}
```

## UI Elements States Pseudo-Class Selectors
Targets element based on certain interactions

#### Enabled Selector
Targets UI elements that are on a enabled state

```html
<input type="text" name="name" placeholder="name" disable>
```
```css
input[type="text"]:enabled {}
```

#### Disabled Selector
Targets UI elements that are disabled state (that can not be clicked)

```html
<input type="text" name="email" placeholder="email" disable>
```
```css
:disabled {}
```

##### Checked Selector
Targets UI elements that are in a checked state

```css
input[type="radio"]:checked {}

/* Example: Targets the radio button and it's sibling label */
input[type="radio"]:checked + label {}
```

## Sudo Element Selectors
Targets virtual elements that are not defined or the markup or source code

#### First Line Selector
Targets the first line of text
```css
p:first-line {}
```

#### First letter Selector
Targets the first letter of text (like drop caps)
```css
p:first-letter {}
```

#### Before Pseudo-Elements
Allow us to add generated content on a page, Pseudo elements are actually inserded as child elements
```css
div:before {
  content: "";
}
```

e.g. placing a special character phone unicon before the number
```html
<p class="phone">555-867-5309</p>
```
```css
.phone:before {
  content: "\2706";
}
```

e.g. placing a pdf image before any `<a>` with a `.pdf` link
```html
<a class="dload" href="examples.pdf" title="- PDF">Download File</a>
```
```css
a[href$=".pdf"]:before {
  content: url(../img/pdf.png);
}
```

#### After Pseudo-Elements
Works the same way, only it adds after
```css
div:after {
  content: "";
}
```

e.g. placing a href link in front of the `<a>`
```html
<a class="download" href="examples.pdf" title="- PDF">Download File</a>
```
```css
.download:after {
  content: attr(href);
}
```
