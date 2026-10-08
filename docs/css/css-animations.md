---
title: "CSS - Animations"
type: doc
created: 2020-04-11
updated: 2026-10-07
tags: [css]
---
# CSS - Animations

A transition goes from A to B when something changes. An **animation** can go through many steps, start on its own, loop, and run without any hover or click. Loading spinners, a pulsing "new" badge or a boat rocking on the waves are animations. You define the steps once with `@keyframes`, then attach them to an element with `animation`.

## Keyframes

`@keyframes` names an animation and describes what happens at each point in time, in percentages.

```css
@keyframes rock-boat {
  0%   { transform: rotate(0) translateY(0); }
  50%  { transform: rotate(-5deg) translateY(-10px); }
  100% { transform: rotate(0) translateY(0); }
}
```

`from` and `to` are aliases for `0%` and `100%`. Several points can share a style: `30%, 60% { ... }`.

If you leave out `0%` or `100%`, the browser uses the element's normal styles. So this does the same as the example above:

```css
@keyframes rock-boat {
  50% { transform: rotate(-5deg) translateY(-10px); }
}
```

## Attaching it

```css
.boat {
  animation: rock-boat 3s ease-in-out infinite;
  /* name, duration, timing function, iteration count */
}
```

The animation starts as soon as the element is on the page.

## The parts of an animation

You can set each part with the shorthand or its own property.

| Property | What it does | Example |
| --- | --- | --- |
| `animation-name` | which `@keyframes` | `rock-boat` |
| `animation-duration` | how long one cycle takes | `3s` |
| `animation-timing-function` | the speed curve | `ease-in-out`, `linear`, `steps(8)` |
| `animation-delay` | wait before starting | `0.5s` |
| `animation-iteration-count` | how many times | `1`, `3`, `infinite` |
| `animation-direction` | play order | `normal`, `reverse`, `alternate` |
| `animation-fill-mode` | styles before and after | `forwards`, `backwards`, `both` |
| `animation-play-state` | pause or run | `paused`, `running` |

In the shorthand, the first time is the duration and the second is the delay:

```css
.toast { animation: slide-in 0.4s ease-out 1s both; } /* waits 1s, then slides in over 0.4s */
```

## alternate: ping-pong

`alternate` plays forwards, then backwards, then forwards. Smooth loops with no jump back to the start.

```css
@keyframes pulse { to { scale: 1.1; } }

.badge { animation: pulse 0.8s ease-in-out infinite alternate; }
```

## fill-mode: before and after

By default, an element only wears the keyframe styles **while** the animation runs.

- `forwards`: keep the last keyframe after it ends. A toast that slides in should stay in.
- `backwards`: apply the first keyframe during the delay, so it doesn't flash in its normal state first.
- `both`: both. Usually what you want for entrance animations with a delay.

```css
/* ❌ visible during the 1s delay, then jumps back to the start and slides in */
.toast { animation: slide-in 0.4s ease-out 1s; }

/* ✅ hidden during the delay, stays in place after */
.toast { animation: slide-in 0.4s ease-out 1s both; }
```

## Pausing

`animation-play-state` lets a hover or a class pause it.

```css
.spinner:hover { animation-play-state: paused; }
```

## Respect reduced motion

Some people get dizzy or sick from movement on screen and turn on "reduce motion" in their system settings. Only run big or looping animations when they haven't.

```css
@media (prefers-reduced-motion: no-preference) {
  .boat { animation: rock-boat 3s ease-in-out infinite; }
}
```

## Transition vs animation

| | Transition | Animation |
| --- | --- | --- |
| Starts when | a property changes | on its own (or when a class is added) |
| Steps | start and end only | as many as you like |
| Loops | ❌ | ✅ |
| Best for | hover, focus, open/close | loaders, attention, entrances |

## Common mistakes

- Writing `animation-function` instead of `animation-timing-function`.
- Old code with `@-webkit-keyframes` and `-webkit-animation`. Prefixes haven't been needed for years.
- Animating `width`, `left` or `margin`. Animate `transform` and `opacity` for smooth motion. See [[docs/css/css-transform-transitions|CSS - Transitions and Transforms]].
- An entrance animation that flashes before it starts: add `both` or `backwards`.

## Try it

1. Build a loading spinner: a circle with one coloured border side, rotating forever at a linear speed.
2. Make a "New" badge pulse gently with `alternate`, and stop it for reduced motion.
3. Slide a notification in from the right after a `1s` delay, and keep it there.

## Related
- [[docs/css/css-transform-transitions|CSS - Transitions and Transforms]]
- [[docs/css/css-media-queries|CSS - Media Queries]]
- [[docs/svg/svg-animations|SVG - Animations]]
