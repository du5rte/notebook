# CSS - Values and Units

## Absolute Length Units

### Centimeters
```css
width: 21.16cm;
```

### Milimeters
```css
width: 211.6mm;
```

### Inches
```css
width: 8.33in;
```

### Picas
```css
width: 50pc;
```

### Points
```css
width: 600pt;
```

### Pixels
```css
width: 800px;
```

## Relative Length Units

### Ex Units
High of the `x` character `1ex = 16` pixels by default. Scales acording to it's parent value.

```css
font-size: 3ex;
```

### Em Unit 
1em = 16 pixels by default. Scales acording to it's inherit value

```css
font-size: 0.75em; /* 12pixels */
```

### rem Unit 
Rem stands for Root Em. Relates back to the scale of the root html element

```css
font-size: 1.2em; /* 19.2px */
```

## View Port Relative Units
Scale based on the viewport size.
	
### vw
`vw` stands for Viewport Width `1vw = 1%` of the viewport width

```css
width: 15vw;
```

### vw
`vw` stands for Viewport Height `1vw = 1%` of the viewport height

```css
width: 80vh;
```

### vmin
`1vmin = 1%` of the mininum height/width

```css
width: 80vmin;
```

## Textual Data Types

## Auto Value
Calculate the margins automaticly for each side

```css
margin: auto;
```

## Inherit Value
Inherits the value from it's parent (good use for `<a>` elements)
```css
color: inherit;
```

## Initial Value
Reverts back to its unstyled state. Not support by i9 and moz needs prefix.

```css
color: -moz-inherit;
color: initial;
```

## Strings
Passes a string either inside `""` or `''`. To pass quote inside a string we need to add backslashes. (e.g.`\"Text\"`). To add back slashes to a string they also need backslashes `"This is a black slashe \\"`

```css
div:after {
    content: "A string with \"escape\" double quotes";
}
```

## URLs
A value can also be a url reference, it can be quotes with `""` or `''` and have white space after or before. e.g. `url( "img/avatar.png" );`

```css
div {
    background-image: url('img/bg.jpg');
}
```

## Integers and Numeric Values

### Negative Values
```css
margin-top: -5em;
```

### Integerns
```css
margin-top: 3.5em;
```

### Percentages
```css
width: 50%;
```

## Color Values

### Color Keywords
One of the 16 predefined keywords, (e.g. `red`, `green`, `blue`).

```css
color: blue;
```

### Extended Color Keywords
Use with the predefined keywords, (e.g. `lightblue`, `tomato`, `sandybrown`). Complete list on http://www.w3.org/TR/css3-color/#svg-color

```css
color: lightblue;
```

### Hexadecimal Value
A combination of RGB values using values of `0-9` `a-f` (e.g. `#ff0033` or `#f03` = R=255 G=0 Blue=51)

```css
color: #ff0033;
```

### RGB Method
Uses a functional to pass the values of Red Green and Blue from `0` to `255`

```css
color: rgb(255, 0, 51);
```

### RGBa Method
Similar to above but allows a alpha value (transperancy)

```css
color: rgb(255, 0, 51, .3);
```

### HSL Method
Stands for Hue Saturation and Lightness. Hue is a value of the 360 color wheel, saturation and lighness are measured in percentages

```css
color: hsl(348, 100%, 50%);
```

### HSLa Method
Just like RGBa it allows a alpha value (transperancy)

```css
color: hsl(348, 100%, 50%, .7);
```












