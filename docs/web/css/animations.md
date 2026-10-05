# CSS - Animations

## Animation

CSS Animation consist of two points, Keyframes and a set of properties. To be able to see it we need to bind it to a selector.

Shorthand example:

```css
.box {
  animation: animation-name 3s ease-in-out infinite 3s forwards;
}
```

## Name

Defines what animation keyframes we are using on the element

```css
animation-name: animation-name;
```

## Duration

Defines how longs it takes to complete a play cicle

```css
animation-duration: 2s;
```

## Function

Define the speed of the transition timing. Values `ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`, `step-start`, `step-end`, `steps()`, `cubic-bezier()`.

```css
animation-function: linear;
```

## Iteration Count

Define the number of times a animation it played. Values: `1`, `2`... `infinite`.

```css
animation-iteration-count: infinite;
```

## Animation delay

Define the pause before the animation runs

```css
animation-delay: 3s;
```

## Animation Direction

Defines if the animation plays on reverse. Values: `normal`, `reverse`, `alternate` (evens), `alternate-reverse` (odds).

```css
animation-direction: normal;
```

## Fill Mode

Defines the style before and after styles of the runned element. Values `backwards` causes to hold first keyframe at the end (only works on animation with a delay bigger than 0), `forwards` makes the animation hold on the last keyframe, `Both` does both jobs.

```css
animation-fill-mode: backwards;
```

## Play State

Allows to use a pseudo class to control the animation. Values `running`, `paused`.

```css
animation-play-state: paused;
```

## Keyframes

Defines the start, end and inbetween points of animation. Values `from` and `to`, or percentages `0%`, `50%`, `100%`. we need to add browser prefixes `-webkit-`, `-moz-`, `-o-` unprefixed.

```css
@-webkit-keyframes animation-name {
  0% {
    width: 0;
  }
  /* it canhave comma seperate values */
  30%, 60% {
    width: 50%;
  }
  70% {
    width: 80%;
  }
  100% {
    width: 100%;
  }
}
```

Shorthand example, If the `0%` and `100%` are the same we can simply omit them

```css
@-webkit-keyframes rock-boat {
  0% {
    -webkit-transform: rotate(0) translateY(0);
  }
  50% {
    -webkit-transform: rotate(-5deg) translateY(-10px);
  }
  100% {
    -webkit-transform: rotate(0) translateY(0);
  }
}

/* The browser automaticly creates 0% and 100% according to the element properties */
@-webkit-keyframes rock-boat {
  50% {
    -webkit-transform: rotate(-5deg) translateY(-10px);
  }
}
```
