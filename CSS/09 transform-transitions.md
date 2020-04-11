# CSS - Transitions and Transforms


## Transform

Allows us to transform elements

Shorthand example:

```css
.box {
  -webkit-transform: scale(1.5) rotate(25deg) translate(50%, -25%);
}
```

We need the prefixes for different browsers

```css
.box {
  -webkit-transform: scale(1.5) rotate(25deg) translate(50%, -25%);
  -webkit-transform: scale(1.5) rotate(25deg) translate(50%, -25%);
  -moz-transform: scale(1.5) rotate(25deg) translate(50%, -25%);
  -o-transform: scale(1.5) rotate(25deg) translate(50%, -25%);
  transform: scale(1.5) rotate(25deg) translate(50%, -25%);
}
```

### Rotation

Allows us to rotate objects around a specific axis and turns

```
400grad = 1 full rotation | 1rad = 57deg | 3.14rad = 180deg | 3.28 = 360deg
```

```
1turn = 1 full rotation | 0.5turn = half rotation
```

```css
transform: rotate(400grad);
```

We can combine transforms with transitions

```css
.box {
  transition: 1s ease-in-out;
}
.box:hover {
  -webkit-transform: rotate(2turn);
  /* We can change the rotation axis with keywords or % 1st x-axis | 2nd y-axis */
  -webkit-transform-origin: 20% 50%;
}
```

### Scale

Allows us to scale objects in the `X`, `Y` or both axis. Values `scaleX()`, `scaleY()`, `scale()`

```css
transform: scaleX(1.5);
```

### Skew

Allows us to skew objects in the `X` or `Y` axis. Values `skewX()`, `skewY()`

```css
transform: scaleX(45deg);
```

### Translate

Allows us to translate (move) objects in the `X`, `Y` or both axis. Values `translateX()`, `translateY()`, `translate()`

```css
transform: translate(200px, -300px);
```

## 3D Transform

Allows us to transform 2D elements in 3D perpectives

### Perspective

We can change the perfective origin, which is `center` by default (`50% 50%`). Values: `100% 100%`, `center top`,

```css
perspective: 800px;
```

### Rotate 3D

Allow us to rotate in 3 dimensions on the `X`, `Y`, `Z` axis.

Z axis:

```css
transform: rotateZ(45deg);
```

3D axis, the first 3 values determine if a element rotates and the last the amount.

```css
transform: rotate3d(1, 1, 0, 65deg);
```

### Translate 3D

Allow us to translate in 3 dimensions on the `X`, `Y`, `Z` axis.

Z axis:

```css
transform: translateZ(-200px);
```

3D axis:

```css
transform: translate3d(100px, 50px, 150px);
```

### Scale 3D

Allow us to scale in 3 dimensions on the `X`, `Y`, `Z` axis.

```css
transform: scaleZ(2);
```

ScaleZ is dependable on translateZ (2 \* 100px)

```css
transform: scaleZ(2) translateZ(200px);
```

### Preserve 3D

Allows us to pass down the 3D perspective space

```css
transform-style: preserve-3d;
```

### Backface Visibility

Default 3d elements by default show the back, with backface-visibility we can hide it

```css
backface-visibility: hidden;
```

## Transition

Allows us to transition css properties

```css
.box {
  background: steelblue;
}
.box:hover {
  background: lightcoral;
  transition-property: background;
  transition-duration: 0.3s;
}
```

We can create various transitions as long as we add them on properties

```css
.box:hover {
  background: lightcoral;
  border-radius: 50%;
  /* Or we can write 'all', which is the default value so we can delete it */
  transition-property: background, border-radius;
  /* We can optionally add a different duration for each property */
  transition-duration: 0.3s, 1s;
}
```

Shorthand example:

```css
.box {
  transition: 0.3s ease-in-out;
}
```

We can have multiple shorthand transitions:

```css
.box {
  transition: margin 1s cubic-bezier(0.5, -0.5, 0.3, 1.3) 0s, background 0.6s
      ease 1s;
}
```

If we want to slowly revert it back we need add it to the original too

```css
.box {
  background: steelblue;
  transition-duration: 0.3s;
}
.box:hover {
  background: lightcoral;
  transition-duration: 0.3s;
}
```

For the transition duration to be the same we only need it on the original

```css
.box {
  background: steelblue;
  transition-duration: 0.3s;
}
.box:hover {
  background: lightcoral;
}
```

We need the prefixes for different browsers

```css
.box {
  background: steelblue;
  -webkit-transition-duration: 0.3s;
  -moz-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
}
.box:hover {
  background: lightcoral;
}
```

### Transition timing

We can define the speed of the transition using 8 timing functions. Values: `ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`, `step-start`, `step-end`, `steps()`, `cubic-bezier()`.

```css
transition-timing-function: ease-in-out;
```

Steps allow us to create stops during the animation

```css
transition-timing-function: steps(4, end);
```

For more animation control we can use `cubic-bezier(P1x,P1y,P2x,P2y)`, Using negative allows create a more of a realist pop effect.

```css
transition-timing-function: cubic-bezier(0.5, -0.5, 0.3, 1.3);
```
