# CSS - Media Queries

# Media

Specifies what media we want to target

```css
@media print {
}
```

## Media Features

Checks if the property inputed property is true or not. It can check for various things like

- `width` (`min` and `max`)
- `height` (`min` and `max`)
- `device-width`
- `device-height`
- `orientation`
- `aspect-ratio`
- `device-aspect-ratio`
- `color`
- `color-index`
- `monocrome`
- `resolution`
- `scan`
- `grid`

```css
@media screen and (orientation: portrait) {
}
```

## Value

We can set any value unit `pixels`, `em`, `percentages`, etc.

```css
@media screen and (max-width: 768px) {
}
```

## Combined Expressions

We can combine expressions to get really specific

```css
@media screen and (max-width: 768px) and (min-width: 481px) {
}
```

## Multiple media queries

Separted by a `,` (or)

```css
@media only screen and (min-width: 768px),
  only screen and (min-width: 700px) and (orientation: landscape) {
}
```

## Inline Media Queries

We can also link and define media queries in our html file. This is bad practice as it requests multiple files from the server even if the media queries are not true they are still downloaded.

```html
<link
  href="css/example.css"
  rel="stylesheet"
  media="screen and (max-width: 768px) and (min-width: 481px)"
/>
```

## Import Media Queries

We can also import media queries css files into our project. Also bad pratice as it requires multiple file requests from server.

```css
@import url("example.css") screen and (max-width: 768px) and (min-width: 481px);
```

## Not

Allows to specify styles to not target certain medias

```css
@media not screen and (monochrome) {
}
```

## Only

Useful to prevent older browsers to apply the styles

```css
@media only screen and (min-width: 481px) {
}
```

## Viewport

Use a virtual viewport that's bigger than the actual size. We need to add a `<meta>` to make the viewport the width of device.

```html
<meta name="viewport" content="width=device-width" />
```

## Devices Media Queries

max-device-width actually check for the device (e.g. `desktop`, `laptop`, `smart phone`) total screen width not just the browser width.

```css
@media screen and (max-device-width: 479px) {
}
```

## Orientation

We can define styles for either portrait or landscape.Orientation can also affect desktops, when width is bigger than height it's considered lanscape.

```css
@media screen and (orientation: portrait) {
}
```

## Device Pixel Ratio

Allows us to target devices with retina display for example iPhones, with have a double ratio of pixels densaty. Example iPhone resolution `640x1136`, actual size of screen `320x568`. Older browsers might need -webkit- newer browser use resolution.

```css
@media screen and (-webkit-min-device-pixel-ratio: 2) {
}
```

## Resolution

Display resolution of a screen is the total amount of pixels available. Usually define as ppi (pixel per inch) or dpi (pixels per inch). Normal devices are `1 = 96dpi` | `2 * 96dpi = 192dpi`. The comma works as a `or`. E.g. use device pixel ratio `or` resolution. A good catch all value is 1.5 and 144dpi.

```css
@media screen and (-webkit-min-device-pixel-ratio: 2),
  screen and (min-resolution: 192dpi) {
}
```

## dppx

A newer measurement unit for Dots per Pixels. **Lack browser support**.

```css
@media screen and (-webkit-min-device-pixel-ratio: 2),
  screen and (min-resolution: 192dpi),
  (min-resolution: 1.5dppx) {
}
```

## Media Print

Targets styles for user who might want to print our website Good Example [thenextweb.com](https://thenextweb.com/). Print style should be simple and hide any unnecessary fields.

```css
@media print {
}
```

```css
@media print {
  * {
    background: transparent !important;
    color: black !important;
  }
  nav,
  header,
  footer,
  comments {
    display: none;
  }
  a[href^="http:"]::after {
    content: " [" attr(href) "]";
    color: blue;
  }
}
```

## Page

Allows us to define styles for the printed page

```css
@media print {
  @page {
    margin: 0.5cm;
  }
  @page :first {
    margin-top: 2cm;
  }
  h2,
  ul {
    page-break-after: avoid;
  }
  p {
    orphans: 3;
    widows: 3;
    font-size: 11pt;
  }
  img {
    display: none;
  }
}
```