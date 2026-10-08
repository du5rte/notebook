---
title: "HTML - Basics"
type: doc
created: 2016-03-18
updated: 2026-10-07
aliases: ["HTML Basics", "HTML - Objects"]
tags: [html]
---
# HTML - Basics

HTML (HyperText Markup Language) describes what each part of a page *is*: a heading, a paragraph, a list, a form. The browser reads it and builds the page. Think of it as the skeleton: [[docs/css/css|CSS]] is the clothing and [[docs/javascript/javascript|JavaScript]] is the movement. In this lesson we build the bare page that every other HTML lesson fills in.

## The smallest useful page

Every page starts with the same few lines. Save this as `index.html` and open it in a browser.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ana's Coffee Shop</title>
  </head>
  <body>
    <h1>Ana's Coffee Shop</h1>
    <p>Fresh coffee every morning.</p>
  </body>
</html>
```

- `<!doctype html>` tells the browser to use modern standards mode. Always the first line.
- `<html lang="en">` wraps everything. `lang` helps screen readers pronounce words and lets browsers offer translation.
- `<head>` holds information *about* the page. Nothing in it shows on screen.
- `<body>` holds everything the visitor sees.

## Elements, tags and attributes

An element is usually an opening tag, some content and a closing tag. Attributes add extra information inside the opening tag.

```html
<a href="menu.html">See the menu</a>
<!-- element: a, attribute: href, content: "See the menu" -->
```

Some elements are empty and have no closing tag, like `<img>`, `<br>`, `<meta>` and `<input>`.

Comments are notes for humans. The browser ignores them, but anyone can read them with "View source", so never put secrets there.

```html
<!-- This text is commented out -->
```

## The head: meta, title and link

The `<head>` is where we describe the page and load what it needs.

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Fresh coffee and pastries in town.">
  <title>Ana's Coffee Shop</title>
  <link rel="stylesheet" href="css/styles.css">
  <link rel="icon" href="favicon.svg">
</head>
```

- `charset="utf-8"` lets the page show any character: é, ç, 你好, ☕.
- The `viewport` meta tag makes phones use the real screen width instead of pretending to be a desktop. Without it, [[docs/css/css-media-queries|media queries]] won't behave.
- `description` is often the snippet search engines show under your link. The old `keywords` meta tag is ignored by search engines, so skip it.
- `<title>` is the text on the browser tab and in bookmarks.
- `<link rel="stylesheet">` loads CSS. You no longer need `type="text/css"`.

## Scripts and render-blocking

`<script>` loads or runs JavaScript. Where you put it and which attribute you use decides *when* it runs.

```html
<!-- Blocks: the browser stops building the page until this downloads and runs -->
<script src="app.js"></script>

<!-- defer: downloads in parallel, runs in order after the page is parsed -->
<script src="app.js" defer></script>

<!-- async: downloads in parallel, runs as soon as it arrives (order not guaranteed) -->
<script src="analytics.js" async></script>

<!-- module: deferred by default, and lets you use import/export -->
<script type="module" src="main.js"></script>
```

A good default: put scripts in the `<head>` with `defer`, or use `type="module"`. Use `async` for independent scripts like analytics, where order doesn't matter. Placing a plain script at the end of `<body>` also works, and is what older tutorials do.

| Attribute | Blocks parsing? | Runs in order? | Runs when |
|-----------|----------------|----------------|-----------|
| none | yes | yes | immediately |
| `defer` | no | yes | after parsing |
| `async` | no | no | as soon as downloaded |
| `type="module"` | no | yes | after parsing |

`type="text/javascript"` is the default, so you can leave it out.

`<noscript>` shows its content only when JavaScript is turned off:

```html
<noscript>
  <p>Please turn on JavaScript to place an order.</p>
</noscript>
```

## Structuring the body: semantic elements

Inside `<body>`, choose elements for what the content *means*, not how it looks. Screen readers, search engines and your future self all understand the page better.

```html
<body>
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/menu">Menu</a>
    </nav>
  </header>

  <main>
    <article>
      <h1>New autumn menu</h1>
      <p>Pumpkin spice is back.</p>
    </article>

    <section>
      <h2>Opening hours</h2>
      <p>Every day, 8:00 to 18:00.</p>
    </section>
  </main>

  <footer>
    <p>Ana's Coffee Shop</p>
  </footer>
</body>
```

| Element | Use it for |
|---------|-----------|
| `<header>` | intro content or navigation at the top of a page or section |
| `<nav>` | a group of main navigation links |
| `<main>` | the main content, once per page |
| `<article>` | something that makes sense on its own: a blog post, a product card |
| `<section>` | a themed group of content, usually with its own heading |
| `<aside>` | side content: a tip, related links |
| `<footer>` | closing info for a page or section |

## div vs span

When no semantic element fits, use a generic one. They mean nothing on their own; they are hooks for CSS and JavaScript.

- `<div>` is a **block** element: it starts on a new line and takes the full width. Use it to group things for layout.
- `<span>` is an **inline** element: it sits inside a line of text. Use it to style a few words.

```html
<div class="card">
  <p>Today's special: <span class="price">€3.50</span></p>
</div>
```

```html
<!-- ❌ div soup: looks fine, means nothing -->
<div class="nav"><div class="link">Menu</div></div>
<!-- ✅ the browser and screen readers know what this is -->
<nav><a href="/menu">Menu</a></nav>
```

Reach for `<section>`, `<article>` or `<nav>` first, and fall back to `<div>` when none of them describes the content.

## Common mistakes

- Forgetting the `viewport` meta tag, then wondering why the site looks tiny on phones.
- Loading a big script in the `<head>` without `defer`, which leaves the page blank while it downloads.
- Building everything from `<div>`s. It works visually, but screen readers lose all the structure.
- Using more than one `<main>`, or skipping heading levels (`<h1>` then `<h4>`) for the visual size. Use CSS for size.

## Try it

1. Write the smallest useful page from memory, with a title and a heading for your favourite café.
2. Add a `<header>` with a `<nav>` of three links, a `<main>` and a `<footer>`.
3. Add a script with `console.log('ready')` twice: once plain in the `<head>`, once with `defer`. Check in DevTools which one can find `document.querySelector('h1')`.

## Related

- [[docs/html/html-text|HTML - Text]]
- [[docs/html/html-media|HTML - Images and Media]]
- [[docs/html/html-forms|HTML - Forms]]
- [[docs/css/css|CSS - Basics]]
- [[docs/browser/browser|Browser - DOM]]
