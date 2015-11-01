# CSS - Basics

Resources:
- [CSS-Tricks](https://css-tricks.com/using-svg/)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [codrops](http://tympanus.net/codrops/css_reference/)
- [WebPlatform.org](https://docs.webplatform.org/wiki/css)
- [Can I Use](http://caniuse.com/)

## CSS
Cascade Style Sheets describe the presentation of web pages.

## Inline
Style directly inside an element's tag using a style attribute take the most priority in the style cascade, also are a bad practice as the code is difficult to maintain.
```html
<body style="background-color: orange;">
```

## External
Internal styles are embedded anywhere in the `<html>` more commonly seen in the `<head>`, inline style also are not a good practice.
```html
<style>
  p {
    font-size: 20px;
    font-weight: bold;
  }
</style>
```

## External Style Sheets
By using extral style sheet various pages can use the same stylesheet saving on repeating styles. `rel`  specifies the relationship between the HTML document and the linked document, `href` attribute points to the location of the CSS file.

```html
<head>
  <link rel="stylesheet" href="css/styles.css">
</head>
```
Inside `styles.css`
```css
p {
  font-size: 20px;
  font-weight: bold;
}
```

## Importing Styles
Another way of importing style sheets, `@import`s must be at the top of the document to work properly

```css
@import 'reset-styles.css';
```

## Cascade
Determines what styles are applied to an element.

```css
h1 {
  color: red;
}

h1 {
  /* overwrites the previous color */
  color: blue;
}
```
Follows 3 step to determine priority:

- `Importance`
- `Specificity`
- `Source Order`


#### Importance
1. `Author styles` - Our custom styles
2. `User Agent styles` - The browsers default styles
3. `User styles` - Special needs styles

#### Specificity
1. `Inline` styles
2. `ID` Selectors styles
3. `Class` Selectors styles
4. `Element` Selectors styles


```html
<!-- priority 1 -->
<h1 class="heading" id="heading" style="color:tomato;">Hello World!</h1>
```
```css
/* priority 2 */
#heading {
  color: orange;
}

/* priority 3 */
.heading {
  color: blue;
}

/* priority 4 */
h1 {
  color: green;
}
```

#### Inheritance
Styles by default are inherite from their parent container

```css
body {
  color: yellow;
}

p {
  /* inherits color: yellow */
}
```

Inheritance can be breaked or enforced

```css
p {
  color: inherit; /* enforces */
  color: initial; /* resets */
}
```
