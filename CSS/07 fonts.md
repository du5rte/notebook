## CSS - Fonts

## Font

The convinent shorthand property for setting all of the properties we just learned in one declaration

- The `font-size` and the `font-family` have to be specified
- Style Varient and Weight have to be put before the Size
- Any value omitted will be set to it's initial value, not inherit value
- font family has to be the last value defined

```css
	h1 {
		font: italic small-caps bold 1.5em Georgia, "Times New Roman", Times, serif:
	}
```

### Font Family

Specifies a typeface for the text in an element. Ideally it's good to set up a Font Stack so if one is not available css will use the next on on the list. If a font is made of more than one words it needs to be quoted `""`, `''`. [www.w3.org/Style/Examples/007/fonts.en.html](www.w3.org/Style/Examples/007/fonts.en.html).

```css
	p {
		font-family: Georgia, "Times New Roman", Times, serif:
	}
```

### Serif fonts

have finishing strokes, e.g. `Times`, `Georgia`, `serif`.

### San-serif Fonts -

fonts have plain stroke endings, e.g. `Helvetica`, `Verdana`, `Arial`, `san-serif`.

### Monospace Fonts

all letters and characters have the same fixed width and each occupy the same amount of horizontal space. E.g. `courier`, `"lucida console"`, `monospace`.

### Font Weight

Specifies the weight style in the font, it sets how thick or thin the characters are displayed. Values: `100`, `800` or `lighter`, `normal` (`400`) and bold(`700`).

```css
font-weight: 600;
```

### Font Size

Specifies the size of a font by using keywords or units. Values: `small`, `medium` or `larger`, `16px` `1em`, `50%`.

```css
font-size: 2.5em;
```

### Font Style

Specifies the fonts style for the text. Values `normal`, `italic`, `oblique`.

```css
font-style: italic;
```

### Font Style

Specifies whether text should be displayed in small caps font.

```css
font-style: small-caps;
```

### Web Fonts

We can import fonts by adding a meta link on the html head

```html
<link
  href="http://fonts.googleapis.com/css?family=Open+Sans:400,700"
  rel="stylesheet"
  type="text/css"
/>
```

Or we can import it through our css using `@import`

```css
@import url(http://fonts.googleapis.com/css?family=Open + Sans:400, 700);
```

We can import the webkit files using `@font-face`. When using `@font-face` we can name it anything we want.

- `.eot`: ie format
- `.eot`: ie6-8 format
- `.woff`: Best most supported formate
- `.ttf`: for safary, android and iOS displays
- `svg`: legagy versions of iOS

```css
@font-face {
  font-family: "OpenSans";
  src: url("fonts/OpenSans-Regular-webfont.eot");
  src: url("fonts/OpenSans-Regular-webfont.eot?iefix") format("eot"), url("fonts/OpenSans-Regular-webfont.woff")
      format("woff"),
    url("fonts/OpenSans-Regular-webfont.ttf") format("truetype"), url("fonts/OpenSans-Regular-webfont.svg#webfont")
      format("svg");
  font-weight: bold;
  font-style: normal;
}
```

## Text

### Line Height

Specifies the vertical spacing between lines of text. A line `height = font-size + leading`. Values normal, `1.5`, `1.5em`, `150%`.

```css
line-height: 1.5;
```

### Text Align

Specifies the horizontal alignment of text. Values `left`, `right`, `center`, `justify`.

```css
text-align: center;
```

### Text Decoration

Specifies the line decoration of text. Values `none`, `underline`, `overline`, `line-through`.

```css
text-decoration: none;
```

### Text Indent

Specifies the first line of text indent. Values `24px`, `-24px`, `1.5em`, `150%`.

```css
text-indent: 24px;
```

### Text Transform

Specifies the case of text. Values `lowercase` and `capitalize`.

```css
text-transform: uppercase;
```

### White Space

Specifies how the white-space in an (html) element is displayed.

Values:

- `normal`: Ignore multiple spaces and linebreaks
- `nowrap`: Forces text into one line
- `pre`: Honors all spaces, indentation and breaklines
- `pre-line`: Honor line breaks but not multiple spaces
- `pre-wrap`: Honors double spaces and line breaks

```css
white-space: nowrap;
```

### Text Shadow

Specifies the shadow used to create drop shadows for text. Format `text-shadow: h-offset, v-offset, blur(optional), color;`

```css
text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
```

Can take multiple entries seperated by comma

```css
h1 {
  text-shadow: 0 -1px #767676, 0 -2px #262626, 0 0 8px rgb(62, 106, 168);
}
```

### Text Overflow

Specifies what should happen when text overflow its containing element. Values: `clip`, `hidden`, `ellipsis`.

```css
text-overflow: ellipsis;
```

### Word Wrap

Gives us a simple way of wrapping text within a single world. Good use for long links. Values `normal`, `break-word`.

```css
word-wrap: break-word;
```

## Lists

### List Style

Shorthand property that defines all the list properties in one declaration. Format can take any of the 3 properties in any order.

```css
list-style: circle inside;
```

### List Style Type

Specifies the style of `ul` or `ol` lists. Values: `disc`, `circle`, `square`, `lower-roman`, `decimal-leading-zero`, etc. See more on: [developer.mozzila.org/en-US/docs/CSS/list-style](developer.mozzila.org/en-US/docs/CSS/list-style)

```css
list-style-type: square;
```

### List Style Position

Specifies if the list market is inside or outsite the list item. Values: `outsite`, `inside`.

```css
list-style-position: inside;
```

**Browsers by defaults add margin on the left older**, iE uses padding. It's good pratice to use both when wanting to remove list indentation.

```css
li {
  margin-left: 0;
  padding-left: 0;
}
```

### List Style Image

Allows to use a image as a market in place of a bullet.

```css
list-style-image: url("img/marker.png");
```

**If icons are a little make sure to use a `no-repeat`**

```css
ul {
  list-style-type: none;
  background: url("img/market.png") no-repeat 0 2px;
}
```

## Unicode

Using `content` css can be used to display unicode

```css
p:after {
  content: "\00A0"; /* Non-breaking Space */
}
```

font-awesome icon

```css
p:after {
  family-font: FontAwesome;
  content: "\f00d";
}
```

## Icon Fonts

A fast way to have icons in our website, They load up to x14 faster than images and are 90% smaller than `svgs`.

```css
@font-face {
  font-family: "icomoon";
  src: url("fonts/icomoon.eot");
  src: url("fonts/icomoon.eot?iefix") format("eot"), url("fonts/icomoon.woff")
      format("woff"), url("fonts/icomoon.ttf") format("truetype"), url("fonts/icomoon.svg#webfont")
      format("svg");
}
```

We can then include icons using pseudo classes

```css
.title::before {
  content: "\e000";
  font-family: "icomoon";
}
```
