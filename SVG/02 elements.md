# SVG - Elements

References:
- [polynom.co](http://polynom.co/)
- [SVG Path Builder](https://codepen.io/anthonydugois/pen/mewdyZ)
- [A Closer Look at SVG Path Data](https://www.sitepoint.com/closer-look-svg-path-data/)
- [The SVG `path` Syntax: An Illustrated Guide](https://css-tricks.com/svg-path-syntax-illustrated-guide/)

## SVG
Acts like the Viewport (canvas) and while viewBox acts like the Base Coordinate System for our assets. It needs a `width` and `height` or a `viewBox` with Origin and Size `x y width height`.

```html
<svg
  /* Sets the size of the canvas */
  height="268"
  width="268"

  /* Specifies its version */
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"

  /* viewBox Origin and Size */
  viewBox="0 0 268 268"
>
  <rect height="80" width="100" />
</svg>
```



## Rectangle

```html
<rect height="80" width="100" />

<rect height="50" width="80" x="" y="" fill="red" stroke="blue" stroke-width="10 "/>
```


### iMac
```html
<svg
  height="100"
  width="100"
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
>
  <rect height="80" width="100" />
  <rect height="50" width="80" x="10" y="10" fill="white" />
  <rect height="10" width="40" x="30" y="90" />
</svg>
```

## Circles
horizontal center `cx` and vertical center `cy` and radius `r`
```html
<circle cx="50" cy="50" r="100" />
```

## Ellipses
Unlike circles ellipses have two different radius horizontal radius `rx` and vertical radius `ry`
```html
<ellipse cx="50" cy="50" rx="50" ry="100" />
```
```html
<svg
  height="200"
  width="100"
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
>
  <rect
        height="100"
        width="70"
        x="5"
        y="5"
        fill="white"
        stroke="#FF2626"
        stroke-width="10"

        /* Rounds Corners */
        rx="10"
        ry="25"
   />
  <circle cx="40" cy="105" r="3" fill="white"/>
</svg>
```

## Line
To draw a line it needs two `x,y` points

```html
<svg height="268" width="268">
  <line
    x1="47" y1="198" x2="221" y2="198"
    stroke="black"
    stroke-width="5px"
  />
</svg>
```

## Text
for text to appear we need to specify the anchor points and font size
```html
<text
  x="134" y="142"
  font-size="60"
  text-anchor="middle"
  font-family="Helvetica Neue"
  font-weight="900"
  stroke="#000"
  stroke-width="3"
  fill="#F6F7F3"
>SVG</text>
```

## polygon
Connects the `x,y` points to draw the shape and connects the last point to the first point.

```html
<polygon
  points="52,190 134,30 216,190"
  fill="#008B6F"
  stroke="black"
  stroke-width="2px"
/>
```

## Groups
Groups allows to style or transform a groups of elements. Transform allows us to do use multiple things like `translate`, `rotate` and `scale`.

```html
<polygon points="7,10 12,0 17,10" fill="#59BFC6" stroke-width="1px" />
<polygon points="0,25 5,15 10,25" fill="#59BFC6" stroke-width="1px" />
<polygon points="15,25 20,15 25,25" fill="#59BFC6" stroke-width="1px" />
```

translate(`x move`, `y move`)
rotate(`degrees`, `x origin`, `y origin`)
scale(`amount`)
```html
<g
   fill="#59BFC6"
   stroke="black"
   stroke-width="1px"
   transform="translate(45, 67) rotate(10 12.5 12.5) scale(0.8)"
>
    <!-- this points now start from the group origin -->
    <polygon points="7,10 12,0 17,10" />
    <polygon points="0,25 5,15 10,25" />
    <polygon points="15,25 20,15 25,25" />
  </g>
```

## Symbol
Stores elements for later use

```html
<symbol id="triangles">
  <g
    fill="#59BFC6"
    stroke="black"
    stroke-width="3"
    transform="translate(3, 3)"
  >
    <polygon points="7,10 12,0 17,10" />
    <polygon points="0,25 5,15 10,25" />
    <polygon points="15,25 20,15 25,25" />
  </g>
</symbol>

<use xlink:href="#triangles" transform="translate(45, 67) rotate(10 12.5 12.5)" />
<use xlink:href="#triangles" transform="translate(198, 67) rotate(-10 12.5 12.5)" />
<use xlink:href="#triangles" transform="translate(121.5, 211) scale(0.6)" />
```

## Paths
A very powerful to creating complicated SVG but they are better suited for creation by software. [A Closer Look at SVG Path Data](https://www.sitepoint.com/closer-look-svg-path-data/), [The SVG `path` Syntax: An Illustrated Guide](https://css-tricks.com/svg-path-syntax-illustrated-guide/).

These attributes exist to style the path:
- stroke
- stroke-width
- stroke-linecap: Shape of lineCap (e.g. butt, square, round)
- stroke-linejoin: Shape of lineJoin (e.g. miter, round, bevel)
- stroke-dasharray: Length of dashes for the stroke
- stroke-dashoffset: Offset for when the stroke begins

### Straight paths
Draw straight lines using the `MLZ` properties
```
M[x,y L[x,y]] Z
```

`M` start Path `L` draw line between points `Z` close path
```html
<polygon points="52,190 134,30 216,190" />
<!-- same as -->
<path d="M52,190 L52,190 L134,30 L216,190 Z" />
```

### Cubic Bézier Paths
Draw a Cubic Bézier lines using the `C` property

```
M[x,y C[ x,y x,y] x,y]
```
```html
<path d="M 100 300 C 0 150 250 -100 250 50" />
```

### Quadratic Bézier Curve
Draws a Quadratic Bézier Curve using the `Q` property
```html
<path d="M100 200 Q200 0 300 200" />
```

### Elliptical Arc Curve
Draw a Elliptical Arc Curve using the `A` property
```html
<path d="M350 300 A50 50 0 1 0 150 300 C150 400 350 300 350 400 A50 50 0 1 1 150 400" />
```


## Accessibility

```html
<!-- Label for the asset -->
<title>Schuffle Phone Icon</title>
<!-- A detailed description of what the asset looks like -->
<desc>
  A phone with a large red border with rounded
  corners, a white screen, and a white round
  button centered bellow the screen.
</desc>
```

```html
<svg viewBox="0 0 268 268">
  <symbol id="triangles">
    <!-- Label for the asset -->
    <title>Triangles</title>
    <!-- A detailed description of what the asset looks like -->
    <desc>
      A group of 3 triangles
    </desc>
    <g
      fill="#59BFC6"
      stroke="black"
      stroke-width="3"
      transform="translate(3, 3)"
    >
      <polygon points="7,10 12,0 17,10" />
      <polygon points="0,25 5,15 10,25" />
      <polygon points="15,25 20,15 25,25" />
    </g>
  </symbol>
  <circle
    r="130" cx="134" cy="134"
    fill="none"
    stroke="#008b6f"
    stroke-width="7px"
  />
  <line
    x1="47" y1="198" x2="221" y2="198"
    stroke="black"
    stroke-width="5px"
  />
  <polygon
    points="52,190 134,30 216,190"
           fill="#008B6F"
           stroke="black"
           stroke-width="4"
  />
  <text
    x="134" y="142"
    font-size="60"
    text-anchor="middle"
    font-family="Helvetica Neue"
    font-weight="900"
    stroke="#000"
    stroke-width="3"
    fill="#F6F7F3"
  >SVG</text>
  <use xlink:href="#triangles" transform="translate(45, 67) rotate(10 12.5 12.5)" />
  <use xlink:href="#triangles" transform="translate(198, 67) rotate(-10 12.5 12.5)" />
  <use xlink:href="#triangles" transform="translate(121.5, 211) scale(0.6)" />
</svg>
```
