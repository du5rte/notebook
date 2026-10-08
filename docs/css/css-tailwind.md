---
title: "CSS - Tailwind"
type: doc
created: 2026-10-07
updated: 2026-10-07
aliases: ["Tailwind CSS"]
tags: [css]
---
# CSS - Tailwind

Tailwind is a utility-first CSS framework: instead of writing a class like `.card` and styling it in a separate file, you build the design right in the markup from small single-purpose classes like `p-4`, `rounded-xl` and `shadow-md`. It's what I use on the web today. It sounds messy at first, then you notice you haven't opened a CSS file in a week. 🎉 This lesson assumes you know the CSS underneath: every Tailwind class is one or two plain CSS declarations.

## The utility-first idea

```html
<!-- ❌ classic: invent a name, switch files, write the CSS -->
<div class="order-card">...</div>
<!-- .order-card { padding: 1rem; border-radius: 0.75rem; background: white; } -->

<!-- ✅ utility-first: the styles are the classes -->
<div class="p-4 rounded-xl bg-white shadow-md">...</div>
```

Each class does one thing: `p-4` is `padding: 1rem`, `rounded-xl` sets a border radius, `bg-white` the background.

## Why it works

- **No naming.** No more debating `card__inner` vs `card-body`.
- **Local changes.** Editing a class on one element can't break another page. The global-CSS problem that [[docs/css/css-modular|BEM]] solves by convention is gone by design.
- **A design system for free.** Spacing, colours and font sizes come from a scale, so `p-4` and `p-5` are the only choices, not `17px`.
- **CSS stops growing.** Tailwind only generates the classes you use, and they're reused everywhere.

The cost: long class lists. Components fix that (see below).

## Setup in Tailwind 4

Tailwind 4 is configured in CSS, not in a JavaScript config file. Your main stylesheet starts with one import:

```css
/* app.css */
@import "tailwindcss";
```

Add it to your build with the Vite plugin (`@tailwindcss/vite`) or the PostCSS plugin (`@tailwindcss/postcss`). It finds the classes in your source files on its own.

## Your design tokens with @theme

`@theme` defines the tokens. Each one is a CSS custom property, and Tailwind creates the matching utilities.

```css
@import "tailwindcss";

@theme {
  --color-brand: #e85d3f;          /* bg-brand, text-brand, border-brand... */
  --font-display: "Inter", sans-serif; /* font-display */
  --breakpoint-3xl: 120rem;        /* 3xl: variant */
}
```

```html
<button class="bg-brand text-white font-display">Order</button>
```

Because tokens are real custom properties, plain CSS can use them too: `color: var(--color-brand)`. See [[docs/css/css-values|CSS - Values and Units]].

## Variants: hover:, md:, dark:

A prefix applies a class only in a certain state. It's media queries and pseudo-classes, written inline.

```html
<button class="bg-brand hover:bg-brand/80 focus-visible:outline-2 disabled:opacity-50">
  Order
</button>
<!-- /80 means 80% opacity -->
```

Breakpoints are **mobile first**: no prefix means every screen, `md:` means "from medium up".

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- 1 column on phones, 2 on tablets, 4 on desktops -->
</div>
```

`dark:` follows the user's system setting (`prefers-color-scheme`) by default.

```html
<div class="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">...</div>
```

Variants stack: `md:hover:underline` underlines on hover, from medium screens up. Container queries are built in too: put `@container` on the parent and use `@md:` on the children.

## Arbitrary values

When the scale doesn't have it, square brackets drop to raw CSS. Use them as an escape hatch, not a habit.

```html
<div class="w-[13.5rem] grid-cols-[15rem_1fr]">...</div>
```

## When to extract a component

Repeating the same ten classes on every button? Don't reach for a new CSS class first. Extract a **component** in your framework.

```tsx
// ✅ the class list lives in one place, the API stays small
function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-full bg-brand px-4 py-2 font-medium text-white hover:bg-brand/80">
      {children}
    </button>
  );
}
```

Rule of thumb: wait for the third copy, then make a component. Tailwind still has `@apply` to pull utilities into a CSS class, and `@utility` to add your own utility. Keep them for the few places with no component, like styling Markdown output or a third-party widget.

## Tailwind vs plain CSS

| | Plain CSS + BEM | Tailwind |
| --- | --- | --- |
| Naming things | ⚠️ every element | ✅ almost never |
| Where styles live | a separate file | in the markup |
| Risk of breaking other pages | ⚠️ | ✅ low |
| Readable markup | ✅ | ⚠️ long class lists |
| Needs CSS knowledge | ✅ | ✅ still, every class is CSS |

## Common mistakes

- Building class names with string pieces, like `` `bg-${colour}-500` ``. Tailwind only sees full class names written in your source; map to complete names instead.
- Copy-pasting the same long class list everywhere instead of making a component.
- Arbitrary values everywhere (`p-[13px]`). If you need a value often, add it to `@theme`.
- Learning Tailwind before CSS. When something looks wrong, you debug the CSS underneath.

## Try it

1. Add a `--color-brand` token with `@theme` and use it as a button background with a hover state.
2. Build a card grid: one column on phones, three from `lg:` up.
3. Turn that button into a `Button` component and use it three times.

## Related
- [[docs/css/css-modular|CSS - Modular CSS]]
- [[docs/css/css-values|CSS - Values and Units]]
- [[docs/css/css-media-queries|CSS - Media Queries]]
- [[docs/css/css-flexbox|CSS - Flexbox]]
- [[docs/css/css-grid|CSS - Grid]]
