# CSS - Other Features

## Background

### Background

Background Shorthand, We only need to specify the values we need. Format `background: color image repeat attachment position size;`.

```css
background: #e4e4e4 url("img/bg.png") no-repeat scroll center / cover;
```

It's good pratice to keep the background-size seperated

```css
background-size: cover;
```

### Background Color

Defines the color of the content background. Values can be transparent, word key values, RGBa or HSLa values.

```css
background-color: hsla(196, 41%, 64%, 0.72);
```

### Background Image

Sets the background image displayed in a element. If a image is important for the document is should be a `<img>`.

```css
background-image: url("img/bg.png");
```

We should always have a backup color as a fall back!

```css
.box {
  background-image: url ("img/bg.png");
  background-color: #7eb5c9;
}
```

### Background Repeat

Allows us to define the repeat method on a background image. Values: `repeat`, `repeat-x`, `repeat-y`, `no-repeat`.

```css
background-repeat: no-repeat;
```

### background Position

Allows us to define the position of a background image
1st value determns the `X` axis. and 2nd determns the `Y` axis. Values: `top left`, `right bottom`, `center`, `-100px 80%`;

```css
background-position: center;
```

### Background Attachment

Allows us to change how a image looks when we scroll the page. Values `Scroll`, `fixed`, `local`.

```css
background-attachment: fixed;
```

### Background Size

Allows us to specify the size of the background. Values an be numeric values, percentages or `cover` and `contain`.

```css
background-size: cover;
```

### Background Clip

Specifities how far the background should visibly extend to. Values: `border-box`, `content-box`, `padding-box`. Very useful when using transparent boxers to avoid overlaps.

```css
background-clip: padding-box;
```

### Background-origin

Similar to background clips determins how a background is calculated. Good use for when using contain and wanting overlapped borders. Values: `border-box`, `content-box`, `padding-box`.

```css
background-origin: border-box;
```

### Multiple Backgrounds

Allow us to stack multiple layers of backgrounds separated by commas.

```css
.box {
  background: url("img/img1.jpg") no-repeat right top, url("img/img1.jpg")
      no-repeat left bottom, url("img/img2.jpg") no-repeat #d6bb80;
  /* We can use background-size separated by commas to adjust the sizes */
  background-size: 200px 300px, 50% 30%, 110%;
}
/* Or we can have it all inside the short hand, but some browser do not yet support this function */
 {
  background: url("img/img1.jpg") 350 200px / 250px 200px no-repeat, url("img/img1.jpg")
      50px 50px / 50% 45% no-repeat,
    url("img/img2.jpg") center / 110% no-repeat #d6bb80;
}
```

## Gradients

[Colorzilla Ultimate CSS Gradient Generator](http://www.colorzilla.com/gradient-editor/)

### Linear Gradients

Allows us to create a background gradient, some browsers require a prefix -webkit- and different order

```css
background: linear-gradient(orange, darkblue);
```

By defaults its set from top `to bottom` but we can set the direction. Values `to down`, `to top`, `to bottom` `right`, `0deg`.

```css
background: linear-gradient(15deg, orange, darkblue);
```

We can create more color complex linear and radial gradients using color stops. Format `color position`

```css
background: linear-gradient(orange, darkblue 30%, red 30%, black);
background: radial-gradient(75% 25%, orange, darkblue, red, black 120%;
```

We can create transparent gradients using alpha colors or `transparent`. Values: `transparent`, `transparent 75%` or `rgba(0,0,0, 0.5)`. `transparent` value is a rgba(0,0,0, 0.0) which sometimes it can make it look grayish.

```css
background: linear-gradient(hsla(0, 100%, 50%, 0.5), transparent);
```

### Radial Gradient

Are like linear gradients but radiate from the center out. Some browsers require a prefix `-webkit-` **and different order**.

```css
background: radial-gradient(orange, darkblue);
```

To make the gradient shape in a circle we need to add the `circle` word

```css
background: radial-gradient(circle, orange, darkblue);
```

We can position the gradient origin. Values: `center`, 1st value `X` axis, 2nd value `Y` axis.

```css
background: radial-gradient(circle at top, orange, darkblue);
background: radial-gradient(circle at 250px 50px, orange, darkblue);
background: radial-gradient(circle at 75%, orange, darkblue);
```

We can control the radius of gradients. Values: `farthest-corner`, `farthest-side`, `closest-corner`, `closest-side`.

```css
background: radial-gradient(circle closest-side at 75% 25%, orange, darkblue);
```

## Multiple Layers Gradients

We can stack multiple gradients with image and colors

```css
.box {
  background: linear-gradient(hsla(0, 100%, 50%, 0.5), transparent 25%),
    url("img/background.jpg");
  background-size: cover;
}
```

## Repeating Gradients

We can create patterns using repeating gradients

```css
background: -webkit-repeating-linear-gradient(
  rbga(58, 122, 187, 0.8),
  rba(43, 79, 115) 50px
);
```

We can customise it like linear gradients

```css
background: -webkit-repeating-linear-gradient(
  -45deg,
  rbga(58, 122, 187, 0.8) 20px,
  rba(43, 79, 115) 2%,
  rbga(58, 122, 187, 0.8)
);
```

We can also create repeating radial gradients

```css
background: -webkit-repeating-linear-gradient(
  rbga(58, 122, 187, 0.8),
  rba(43, 79, 115) 20px,
  rbga(58, 122, 187, 0.8) 60px
);
```

We can customise it like radial gradients

```css
background: -webkit-repeating-linear-gradient(
  0 0,
  circle,
  rbga(58, 122, 187, 0.8),
  rba(43, 79, 115) 20px,
  rbga(58, 122, 187, 0.8) 100px
);
```

## Border-radius

Allows us to create rounded corners to elements

Shorthand (all corners)

```css
border-radius: 20px;
```

Shorthand: top left + bottom right / top right + bottom
left

```css
border-radius: 30px 0;
```

Shorthand: top, left / top right + bottom left / bottom
right

```css
border-radius: 30px 0 60px;
```

Shorthand: top left / top right / bottom right / bottom
left

```css
border-radius: 30px 0 60px 80px;
```

Elipsie corners radius shorthand horizontal axis /
vertical axis

```css
border-radius: 50px / 100px;
```

Elipsie corners radius shorthand

```css
border-radius: 50px 100px / 25px 50px;
```

Perfect Circle

```css
border-radius: 50%;
```

We can specify eliptical corners by adding a second value

```css
.box {
  border-top-left-radius: 50% 20%;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 80px 40px;
  border-bottom-left-radius: 20px;
}
```

## Box Shadow

Allows us to add a drop shadow effect to elements. Format `(inset) horizontal-offset vertical-offset blur spread color`;

```css
box-shadow: box-shadow: 0 20px 30px -10px rgba(0,0,0,0.8);
```

We can set various box shadows within a box shadow seperated by commas

```css
box-shadow: 2px 2px 15px 5px blue, -2px -2px 15px 5px red, 0 20px 25px -8px #000;
```

## Cursors

specifies the mouse cursor displayed is over an element [MDN list of cursors](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor)
http://www.sitepoint.com/css3-cursor-styles/

```css
div {
  cursor: pointer;
}

div {
  cursor: grab;
}
```

## Point Events

Allows to disable click events on elements.

```css
pointer-events: none
```

## User Select

Allows to disabled text selection on elements.

```css
user-select: none;
```

## Blending Modes

### Masking
 Allows us to obscure visual portions of an element by masking out certain areas. The less opaque a portion of the mask is, the less visible the element will be at that position. We should `.png` image for this. **Only chrome and safari support it and requires the -webkit-prefix**.

 ```css
-webkit-mask-image: url('mask.png');
 ```

When aligning with a background it's best pratice to use padding.

```css
padding: 210px 0 0 120px;
```

	