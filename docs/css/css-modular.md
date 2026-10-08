---
title: "CSS - Modular CSS"
type: doc
created: 2015-11-01
updated: 2026-10-07
tags: [css]
---
# CSS - Modular CSS

CSS is global: every rule can touch every element on every page. On a small site that's fine. On a big one, changing a margin in one place breaks something three pages away. Modular CSS is a set of habits for naming and structuring styles so each piece is self-contained, like LEGO bricks you can move around without the rest falling apart. These ideas still matter even if you never write BEM by hand: they're the same thinking behind components and utility classes.

## The goal: styles that don't depend on where they live

```css
/* ❌ tied to its location: move the nav out of the header and it loses its margins */
header nav {
  margin-top: 2rem;
}

/* ✅ tied to a name: the nav looks the same wherever you put it */
.site-nav {
  margin-top: 2rem;
}
```

Rule of thumb: **style by class, not by position**. Keep selectors short and flat.

## BEM: Block, Element, Modifier

BEM is a naming convention that makes the HTML explain the CSS.

- **Block**: a stand-alone component. `.card`
- **Element**: a part of a block, joined with `__`. `.card__title`
- **Modifier**: a variation, joined with `--`. `.card--featured`, `.card__title--small`

```html
<form class="search search--compact">
  <input class="search__field" type="text">
  <button class="search__button">Search</button>
</form>
```

```css
.search { display: flex; gap: 0.5rem; }
.search__field { flex: 1; }
.search--compact .search__button { padding: 0.25rem 0.5rem; }
```

Every selector is a single class, so specificity stays low and equal. You can read `search__button` and know exactly which file and block it belongs to.

## To BEM or not to BEM?

Just because something sits inside a block doesn't make it an element of that block. Ask: "is it styled this way **because** it's in here?"

```html
<!-- the logo happens to be in the header, but could live in the footer too -->
<header class="header">
  <a class="logo" href="/">Café</a>   <!-- ✅ its own block -->
</header>
```

If it's both a thing of its own and adjusted by its context, give it both classes:

```html
<div class="content">
  <h1 class="headline content__headline">Today's specials</h1>
</div>
```

And a themed variation is a modifier:

```css
.site-logo { }
.site-logo--xmas { } /* the festive version */
```

## The media object: spot the pattern

The "media object" is a famous example of OOCSS (Object-Oriented CSS): an image on one side, text on the other. Once you see it, it's everywhere: comments, tweets, order summaries, contact cards. Build it once, reuse it.

```html
<div class="media">
  <img class="media__img" src="avatar.png" alt="">
  <div class="media__body">
    <h3>Ana</h3>
    <p>One flat white, please.</p>
  </div>
</div>
```

```css
.media { display: flex; gap: 1rem; align-items: flex-start; }
.media__body { flex: 1; }
```

The lesson isn't the class names: it's **separating structure from skin**. The layout is one object; colours and borders are added on top.

## SMACSS: sorting rules into layers

SMACSS (Scalable and Modular Architecture for CSS) sorts styles into categories:

1. **Base**: element defaults (`body`, `a`, `h1`).
2. **Layout**: the big page regions.
3. **Module**: reusable components (cards, buttons).
4. **State**: temporary changes (`.is-open`, `.is-active`).
5. **Theme**: alternative colours and images.

Native CSS can now enforce that order with cascade layers, so a later layer always wins regardless of specificity:

```css
@layer base, layout, components, states;
```

## How this looks today

The same ideas, different tools:

| Idea | 2015 | Today |
| --- | --- | --- |
| One self-contained piece | a BEM block | a React component |
| No naming collisions | BEM prefixes | CSS Modules, or utility classes |
| Predictable order | SMACSS by convention | `@layer` |
| Reusable patterns | the media object | a component, styled with utilities |

With [[docs/css/css-tailwind|Tailwind]] you mostly stop naming classes at all: the component **is** the module. When you write plain CSS, BEM is still a clear, boring, good choice.

## Common mistakes

- Styling by location (`.sidebar .button`) instead of making a modifier (`.button--small`).
- Elements of elements: `.card__body__title`. Keep it to one level: `.card__title`.
- Using IDs for styling. They outrank classes and break the flat specificity.
- Mixing naming systems in one project.

## Try it

1. Rewrite `header nav ul li a` as BEM classes.
2. Build a media object for an order summary: product photo on the left, name and price on the right.
3. Add a `--sold-out` modifier that greys out the price.

## Related
- [[docs/css/css-selectors|CSS - Selectors]]
- [[docs/css/css|CSS - Basics]]
- [[docs/css/css-tailwind|CSS - Tailwind]]
