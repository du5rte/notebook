---
title: "CSS - Selectors"
type: doc
created: 2015-11-01
updated: 2026-10-07
tags: [css]
---
# CSS - Selectors

A selector is how a rule picks which elements to style. Learning selectors is like learning to give directions: "every paragraph", "the first item in the list", "any link that opens a PDF". The better your directions, the less HTML you need to change.

## The basic four

```css
* { }         /* universal: every element */
p { }         /* type: every <p> */
.card { }     /* class: every element with class="card" */
#top { }      /* id: the one element with id="top" */
```

Classes can repeat on a page, IDs must be unique. Style with classes. Keep IDs for things that need a unique handle, like in-page anchors:

```html
<a href="#top">Back to top</a> <!-- jumps to the element with id="top" -->
```

## Grouping

A comma means "and also". The declarations apply to each selector in the list.

```css
.square,
.circle {
  width: 200px;
  height: 200px;
}
```

## Combinators: family relations

Combinators describe how elements relate in the HTML tree.

| Combinator | Example | Matches |
| --- | --- | --- |
| space (descendant) | `nav a` | any `a` inside `nav`, at any depth |
| `>` (child) | `nav > a` | `a` that is a direct child of `nav` |
| `+` (next sibling) | `h2 + p` | the `p` right after an `h2` |
| `~` (later siblings) | `h2 ~ p` | every `p` after an `h2`, same parent |

```html
<p>Intro</p>
<h2>Menu</h2>
<p>Coffee</p>  <!-- h2 + p and h2 ~ p -->
<p>Tea</p>     <!-- h2 ~ p only -->
```

## Attribute selectors

Match elements by their attributes.

```css
input[type="email"] { }   /* exact value */
a[target="_blank"] { }    /* links that open a new tab */
a[href^="https://"] { }   /* starts with */
a[href$=".pdf"] { }       /* ends with */
img[src*="thumb"] { }     /* contains */
```

`a[href$=".pdf"]` is a nice trick: style every PDF link without adding a class.

## Pseudo-classes: state and position

A pseudo-class (one colon) matches an element when it is in a certain state.

```css
a:hover { }          /* pointer is over it */
a:visited { }        /* already visited */
button:focus-visible { } /* focused from the keyboard */
input:disabled { }
input:checked + label { } /* the label right after a ticked checkbox */
```

Use `:focus-visible` for focus rings. It shows them to keyboard users without flashing them on every mouse click.

## Structural pseudo-classes

Pick elements by their position among siblings.

```css
li:first-child { }
li:last-child { }
li:nth-child(2) { }      /* the second */
li:nth-child(odd) { }    /* 1st, 3rd, 5th... zebra stripes */
li:nth-child(3n) { }     /* every third */
li:nth-child(n + 4) { }  /* from the 4th onwards */
p:first-of-type { }      /* first <p> among its siblings */
div:empty { }            /* no children, no text */
```

`nth-child(an + b)` reads as "every `a`th item, starting at `b`". `:nth-child` counts all siblings, `:nth-of-type` only counts siblings of the same tag.

## :not(), :is() and :where()

These take a list of selectors.

```css
li:not(:last-child) { border-bottom: 1px solid #ddd; } /* a divider between items */
:is(h1, h2, h3) a { color: inherit; } /* shorter than three selectors */
:where(ul, ol) { padding-left: 1rem; } /* same, but zero specificity */
```

`:is()` takes the specificity of its strongest selector. `:where()` always has zero, which makes it perfect for defaults that are easy to override.

## :has(): the parent selector

For years CSS could only look down the tree. `:has()` lets an element match based on what it contains.

```css
.card:has(img) { padding-top: 0; }           /* cards with a picture */
form:has(input:invalid) button { opacity: .5; } /* dim submit while the form is invalid */
label:has(+ input:required)::after { content: " *"; }
```

Before `:has()`, all of these needed JavaScript.

## Pseudo-elements

A pseudo-element (two colons) styles a part of an element, or adds content that is not in the HTML.

```css
p::first-line { font-weight: bold; }
p::first-letter { font-size: 3em; } /* drop caps */
li::marker { color: tomato; }      /* the bullet */
::placeholder { color: gray; }
```

`::before` and `::after` insert a child at the start or end. They need a `content` property, even an empty one.

```css
.phone::before { content: "\2706 "; } /* a phone symbol before the number */
a[href$=".pdf"]::after { content: " (PDF)"; }
.download::after { content: " " attr(href); } /* show the link's address */
```

Old code writes `:before` with one colon. Browsers still accept it, but `::` is the modern form.

## Native nesting

Nesting used to be the main reason to reach for Sass. Now it is plain CSS, and every current browser supports it. `&` stands for the parent selector.

```css
.card {
  padding: 1rem;

  & h2 { margin-top: 0; }                 /* .card h2 */
  & > img { width: 100%; }                /* .card > img */
  &:hover { background: #f5f5f5; }        /* .card:hover */
  &.is-featured { border: 2px solid gold; } /* .card.is-featured */

  @media (width >= 40rem) {
    padding: 2rem;                        /* .card on wider screens */
  }
}
```

Keeping the media query inside the rule means everything about `.card` lives in one place.

One Sass habit does not carry over: `&` cannot glue on a suffix to build a new class name.

```css
/* ❌ worked in Sass, does not mean .card__title in CSS */
.card { &__title { font-weight: bold; } }

/* ✅ write the full class */
.card__title { font-weight: bold; }
```

Nest one or two levels at most. Deep nesting creates long, specific selectors that are hard to override.

## Common mistakes

- `h2 + p` vs `h2 ~ p`: `+` is only the very next sibling.
- `:nth-child(2)` on a `p` is "the second child, if it is a `p`", not "the second `p`". Use `:nth-of-type` for that.
- Forgetting `content` on `::before`/`::after`. Nothing renders.
- Nesting four levels deep, or long chains like `body main .list ul li a`. They break when the HTML moves. See [[docs/css/css-modular|CSS - Modular CSS]].

## Try it

1. Make every other row of a list `whitesmoke` with one selector.
2. Add " (PDF)" after every link to a `.pdf` file without touching the HTML.
3. Give a `.card` a gold border only when it contains a `<button>`.

## Related
- [[docs/css/css|CSS - Basics]]
- [[docs/css/css-modular|CSS - Modular CSS]]
