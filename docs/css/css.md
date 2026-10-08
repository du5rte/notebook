---
title: "CSS - Basics"
type: doc
created: 2015-11-01
updated: 2026-10-07
tags: [css]
---
# CSS - Basics

CSS (Cascading Style Sheets) describes how a web page looks: colours, spacing, fonts, layout. HTML says *what* things are, CSS says *how they look*. Think of HTML as the furniture in a room and CSS as the paint, the lighting and where everything is placed.

The reference for every property is [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS). This lesson is about the ideas you need before any property makes sense.

## Anatomy of a rule

A rule is a selector plus a block of declarations. Each declaration is a property and a value.

```css
/* selector */
p {
  color: darkslategray;   /* property: value; */
  font-size: 1.25rem;
}
```

Read it out loud: "for every paragraph, make the text dark slate grey and a bit bigger."

## Three places to write CSS

**Inline**, in a `style` attribute. Wins over almost everything and is hard to maintain, so avoid it except for quick tests or values set by JavaScript.

```html
<body style="background-color: orange;">
```

**Internal**, in a `<style>` tag, usually in the `<head>`. Fine for a single-page demo.

```html
<style>
  p { font-weight: bold; }
</style>
```

**External**, in a `.css` file linked from the `<head>`. This is the normal way: every page shares one file, and the browser caches it.

```html
<head>
  <link rel="stylesheet" href="css/styles.css">
</head>
```

`rel` says what the linked file is, `href` says where it lives.

## @import

A stylesheet can pull in another one. `@import` must come before any other rule in the file, or it is ignored.

```css
@import "reset.css";
```

Each `@import` is an extra request the browser only discovers after reading the first file, so in production prefer several `<link>` tags or let a build tool bundle the files.

## The cascade

When two rules set the same property on the same element, the cascade decides who wins.

```css
h1 { color: red; }
h1 { color: blue; } /* wins: same specificity, comes later */
```

The browser checks, in this order:

1. **Origin and importance**: your styles beat the browser's default styles. `!important` flips the usual order, so use it rarely.
2. **Specificity**: a more specific selector beats a less specific one.
3. **Source order**: if everything else ties, the last rule wins.

## Specificity

From strongest to weakest:

| Selector | Example | Strength |
| --- | --- | --- |
| Inline style | `style="color: tomato"` | strongest |
| ID | `#heading` | strong |
| Class, attribute, pseudo-class | `.heading`, `[type]`, `:hover` | medium |
| Element, pseudo-element | `h1`, `::before` | weak |

```html
<h1 class="heading" id="heading" style="color: tomato;">Hello</h1>
```

```css
#heading { color: orange; } /* 2nd */
.heading { color: blue; }   /* 3rd */
h1 { color: green; }        /* 4th */
/* the inline style wins: the heading is tomato */
```

One ID beats any number of classes. That is why most teams style with classes only: everything stays at the same level and source order does the rest.

## Inheritance

Some properties pass down from parent to child, mostly text ones (`color`, `font-family`, `line-height`). Box properties (`margin`, `border`, `width`) do not.

```css
body { color: navy; }
p { /* text is navy, inherited from body */ }
```

You can control it with keywords that work on any property:

```css
a { color: inherit; } /* take the parent's value */
p { color: initial; } /* the property's default from the CSS spec */
p { color: unset; }   /* inherit if the property inherits, else initial */
```

`color: inherit` on links is a classic: links match the text around them.

## Cascade layers

On bigger projects, `@layer` lets you decide the order of whole groups of styles up front. Later layers win over earlier ones, whatever the specificity inside them.

```css
@layer reset, base, components;

@layer components {
  .button { color: white; }
}
@layer base {
  a.button { color: blue; } /* loses: base comes before components */
}
```

## Common mistakes

- Reaching for `!important` or an ID to win a fight. Fix the selector or the order instead.
- Forgetting the `;` after a declaration. The next declaration silently breaks.
- Expecting `margin` or `border` to inherit. Only some properties do.
- Writing `@import` after other rules. It is ignored.

## Try it

1. Link an external stylesheet to an HTML page and make all paragraphs `darkslategray`.
2. Give one paragraph a class and an inline style. Predict the colour, then check in DevTools (the Styles panel shows crossed-out losing rules).
3. Set `color` on `body` and `border` on `body`. Which one do the paragraphs inherit?

## Related
- [[docs/html/html|HTML - Basics]]
- [[docs/css/css-selectors|CSS - Selectors]]
- [[docs/css/css-values|CSS - Values and Units]]
- [[docs/css/css-box-model|CSS - Box Model]]
- [[docs/css/css-visual-effects|CSS - Visual Effects]]
