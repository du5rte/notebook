---
title: "CSS - Transitions and Transforms"
type: doc
created: 2020-04-11
updated: 2026-10-07
tags: [css]
---
# CSS - Transitions and Transforms

A **transform** moves, rotates, scales or skews an element without affecting the layout around it. A **transition** animates the change from one value to another, so a hover doesn't snap but glides. Together they give you most of the small, friendly motion on the web: a button that lifts, a card that grows, a menu icon that turns.

## Transforms

```css
.badge { transform: rotate(-8deg); }
.card:hover { transform: translateY(-4px) scale(1.02); } /* lift and grow a little */
```

The four basics:

| Function | Does | Example |
| --- | --- | --- |
| `translate(x, y)` | moves | `translate(50%, -1rem)` |
| `scale(n)` | resizes, `1` is normal | `scale(1.5)` |
| `rotate(angle)` | turns | `rotate(45deg)`, `rotate(0.5turn)` |
| `skew(angle)` | slants | `skewX(10deg)` |

Each has `X` and `Y` versions: `translateX()`, `scaleY()` and so on.

**Order matters.** Transforms apply from right to left, so `rotate(45deg) translateX(100px)` and `translateX(100px) rotate(45deg)` end up in different places.

## Individual transform properties

Modern CSS also has `translate`, `rotate` and `scale` as their own properties. They're easier to change one at a time, for example on hover.

```css
.icon { rotate: 0deg; scale: 1; }
.icon:hover { scale: 1.2; } /* rotation is untouched */
```

## Angles

`deg` is the one you'll use. `turn` is handy for full spins.

```
1turn = 360deg = 400grad ≈ 6.283rad
```

## transform-origin

The point the transform happens around. The default is the centre.

```css
.door { transform-origin: left; transform: rotateY(60deg); } /* swings on its hinge */
```

## Transforms don't move the layout

A transformed element is painted somewhere else, but its original space stays reserved. Neighbours don't move. That's why transforms are smooth: the browser doesn't need to recalculate the layout.

```css
/* ❌ animating layout properties: the page reflows every frame */
.card:hover { margin-top: -4px; }

/* ✅ animating a transform: cheap, smooth even on low-end phones */
.card:hover { transform: translateY(-4px); }
```

Rule of thumb: animate `transform` and `opacity`. Avoid animating `width`, `height`, `top` or `margin`.

## 3D in one example

3D needs `perspective` on the parent: how far the viewer is from the screen. Smaller numbers mean a stronger effect.

```css
.scene { perspective: 800px; }

.flip-card {
  transform-style: preserve-3d;   /* children live in the same 3D space */
  transition: transform 0.6s;
}
.flip-card:hover { transform: rotateY(180deg); }

.flip-card .front,
.flip-card .back { backface-visibility: hidden; } /* hide the side facing away */
.flip-card .back { transform: rotateY(180deg); }
```

That's a card that flips on hover to show its back.

## Transitions

A transition says: "when this property changes, take this long to get there."

```css
.button {
  background: steelblue;
  transition: background 0.3s ease;
}
.button:hover {
  background: lightcoral; /* fades over 0.3s, and back again on mouse out */
}
```

Put the `transition` on the **base** state, not on `:hover`. Then it runs both ways: in and out.

The shorthand is `property duration timing-function delay`, and you can list several:

```css
.card {
  transition:
    transform 0.2s ease-out,
    box-shadow 0.2s ease-out 0.05s; /* shadow starts a tiny bit later */
}
```

## Timing functions

How the speed changes along the way.

- `ease`: the default. Starts fast, ends slow.
- `ease-out`: fast then slow. Feels responsive for things entering or reacting to the user.
- `ease-in`: slow then fast. Good for things leaving.
- `linear`: constant speed. Good for spinners.
- `steps(4)`: jumps in 4 steps, no smoothing. Good for sprite animations.
- `cubic-bezier(0.5, -0.5, 0.3, 1.3)`: your own curve. Values below `0` or above `1` overshoot for a bouncy "pop".

## Common mistakes

- `transition: all`. It animates things you didn't mean to, and costs performance. Name the properties.
- Putting the transition only on `:hover`, so it snaps back instantly.
- Trying to transition to or from `display: none` or `height: auto`. Neither animates the simple way; fade with `opacity` instead.
- Forgetting users who turn off motion. Wrap big movements in `@media (prefers-reduced-motion: no-preference)`.

## Try it

1. Make a button that lifts by `2px` and gets a shadow on hover, smoothly in both directions.
2. Rotate a "+" icon into an "×" with a transition when its parent has `.is-open`.
3. Build the flip card above with a coffee name on the front and its price on the back.

## Related
- [[docs/css/css-animations|CSS - Animations]]
- [[docs/css/css-visual-effects|CSS - Visual Effects]]
- [[docs/svg/svg-animations|SVG - Animations]]
